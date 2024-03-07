import GitHub from "next-auth/providers/github"

import type { NextAuthConfig } from "next-auth"
import { authConfig } from "./auth.config"
import { MongoClient } from "mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import { Adapter } from "next-auth/adapters";
import clientPromise from "@/lib/mongodb";


export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({


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