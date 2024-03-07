import GitHub from "next-auth/providers/github"

import type { NextAuthConfig } from "next-auth"
import { authConfig } from "./auth.config"
import { MongoClient } from "mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import { Adapter } from "next-auth/adapters";
import clientPromise from "@/lib/mongodb";
import { Cagliostro } from "next/font/google";
import { User } from "./models/user.model";

import "next-auth"


// https://authjs.dev/getting-started/typescript
declare module "next-auth" {
  interface User {
    /** The user's postal address. */
    role: string
  }
  interface Session {
    role: string
  }
}
// FIX: Not working
declare module "@auth/core/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    idToken?: string
    role: string
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  callbacks: {
    async signIn({ user, account }) {
      // // Allow OAuth without email verification
      // if (account?.provider !== "credentials") return true;

      // const existingUser = await getUserById(user.id);

      // // Prevent sign in without email verification
      // if (!existingUser?.emailVerified) return false;

      // if (existingUser.isTwoFactorEnabled) {
      //   const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

      //   if (!twoFactorConfirmation) return false;

      //   // Delete two factor confirmation for next sign in
      //   await db.twoFactorConfirmation.delete({
      //     where: { id: twoFactorConfirmation.id }
      //   });
      // }

      return true;
    },
    async session({ session, token, user }) {
      console.log("USER", user)
      console.log("TOKEN", token)

      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role
      }
      // Send properties to the client, like an access_token and user id from a provider.
      console.log("SESSION", session)

      return session
    },
    // README: we decided to use JWT as strategy, hence we need to define it
    async jwt({ token, account, profile }) {
      console.log("========TOKEN========");
      console.log(token)
      console.log("accounttt");
      console.log(account);
      console.log("PROFILE")
      console.log(profile)
      if (!token.sub) return token;
      const existingUser = await User.findById(token.sub)
      if (!existingUser) return token;
      token.role = existingUser.isAdmin?"admin":"student"
      

      return token;
    }
  },

  // debug: process.env.NODE_ENV === "development" ? true : false,
  // TODO: This adapter "disables" the callback.
  //https://github.com/nextauthjs/next-auth/issues/9493#issuecomment-1872580831
  adapter: MongoDBAdapter(
    clientPromise,
    {
      collections: {
        Users: "users",
        Sessions: "sessions",
        VerificationTokens: "verificationTokens",
        Accounts: "accounts",
      },
      databaseName: "comp308_Auth",
    }
  ) as Adapter,
  session: { strategy: "jwt", },
  ...authConfig,

})