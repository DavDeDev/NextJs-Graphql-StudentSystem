import type { NextAuthOptions } from 'next-auth'
import { GithubProfile } from 'next-auth/providers/github';
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";

export const options: NextAuthOptions = {
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
  pages:
  {
    signIn: '/auth/signin',
  },
}
