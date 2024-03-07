import type { NextAuthOptions } from 'next-auth'
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import { MongoClient } from "mongodb"
import type { Adapter } from 'next-auth/adapters';
import CredentialsProvider from "next-auth/providers/credentials"



const client = new MongoClient(process.env.MONGODB_URL as string);
const clientPromise = client.connect();

export const options: NextAuthOptions = {
  debug: process.env.NODE_ENV === "development" ? true : false,
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
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Email',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // TODO: use graphql to authenticate
        return null;
      }
    }), GoogleProvider({
      profile: (profile: GoogleProfile) => {
        return {
          ...profile,
          id: profile.sub,
        }
      },
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    ),
  ],
  pages: {
    newUser: "/auth/newUser",
  }

}
