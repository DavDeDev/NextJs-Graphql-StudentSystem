
import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import type { DefaultSession } from "next-auth";
import NextAuth from "next-auth";
import { Adapter } from "next-auth/adapters";
import { authConfig } from "./auth.config";
import { User } from "./models/user.model";

import "next-auth";
import { connectToDB } from "./lib/database";


// https://authjs.dev/getting-started/typescript
declare module "next-auth" {
  interface User {
    /** The user's postal address. */
    role: string
  }
  // FIXME: Investigate why Google provider breaks with this ==> remove password field
  // interface User Pick<IUser, Exclude<keyof IUser, keyof Document>>{
  //   /** The user's postal address. */
  //   role: string
  // }
  interface Session extends DefaultSession {
    user:{
      role: string
    }
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
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account }) {
      await connectToDB();

      const existingUser = await User.findOne({ email: user.email });
      // // Allow OAuth without email verification

      return true;
    },
    async session({ session, token, user }) {
      await connectToDB();

      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role
      }
      // Send properties to the client, like an access_token and user id from a provider.

      return session
    },
    // README: we decided to use JWT as strategy, hence we need to define it
    async jwt({ token, account, profile }) {
      await connectToDB();
      if (!token.sub) return token;
      const existingUser = await User.findById(token.sub)
      if (!existingUser) return token;
      
      token.role = existingUser.role

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