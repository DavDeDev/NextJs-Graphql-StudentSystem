
import { NextAuthConfig } from "next-auth";
import { connectToDB } from "./lib/database";
import { GoogleProfile } from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { LoginSchema } from "@/schemas/loginSchema";
import { User } from "./models/user.model";




export const authConfig: NextAuthConfig = {

  providers: [
    Credentials({
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.

      async authorize(credentials, req) {
        console.log("=========AUTHORIZE==========")
        // // TODO: use graphql to authenticate
        console.log(req)

        // // Validate fields
        const validatedFields = LoginSchema.safeParse(credentials);
        console.log("Are fields valid? ", validatedFields);
        console.log("============================")
        if (!validatedFields.success) return null;
        if (validatedFields) {
          const { email, password } = validatedFields.data;

          // https://mongoosejs.com/docs/nextjs.html#:~:text=While%20you%20can%20import%20Mongoose,uses%20to%20connect%20to%20MongoDB.
          const user = await User.findOne({ email });
          console.log(!user);
          console.log("============================")
          if (!user) return null;
          
          const doesPasswordMatch = await user.comparePassword(password);
          if (doesPasswordMatch) return user;
          return user;
          
        }

        return null;
      }
    })
    , Google({
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
  ]
}

