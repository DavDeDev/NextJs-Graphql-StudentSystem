import type { NextAuthOptions } from 'next-auth'
import Github, { GithubProfile } from 'next-auth/providers/github';
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import { connectToDB } from '@/lib/database';
import { MongoClient } from "mongodb"
import type { Adapter } from 'next-auth/adapters';

const client = new MongoClient(process.env.MONGODB_URL as string);
const clientPromise = client.connect();

export const options: NextAuthOptions = {
  // TODO: This adapter "disables" the callback.
  //https://github.com/nextauthjs/next-auth/issues/9493#issuecomment-1872580831
  // adapter: MongoDBAdapter(
  //   clientPromise,
  //   {
  //     collections: {
  //       Users: "user",
  //       Sessions: "sessions",
  //       VerificationTokens: "verificationTokens",
  //       Accounts: "accounts",
  //     },
  //     databaseName: "comp308_Auth",
  //   }
  // ) as Adapter,
  providers: [
    GoogleProvider({
      profile: (profile: GoogleProfile) => {
        console.log("loggin with google");
        console.log(profile);
        return {
          ...profile,
          id: profile.sub,
        }
      },
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    )
  ],

}
