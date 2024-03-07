"use server"

import { signIn } from "@/auth";
import { connectToDB } from "@/lib/database";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas/loginSchema";
import { AuthError } from "next-auth";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  await connectToDB();
  console.log("🔄️  Logging in");
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: { type: '403', message: 'Invalid fields' } }
  }

  const { email, password } = validateFields.data;

  // await signIn("credentials", { email, password, redirectTo: DEFAULT_LOGIN_REDIRECT })
  //   .then((e) => {
  //     console.log("logged successfully!");
  //     return { error: { type: '403', message: 'Invalid fields' } }
  //   })
  //   .catch(
  //     (error) => {
  //       if (error instanceof AuthError) {
  //         switch (error.type) {
  //           case "CredentialsSignin":
  //             return { error: { type: '403', message: 'Invalid credentials' } }
  //           default:
  //             return { error: { type: '500', message: 'Something went wrong, try again later.' } }
  //         }
  //       }

  //       return { error: { type: '500', message: 'Something went wrong, try again later.' } }

  //     }
  //   )
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo:DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: { type: '403', message: 'Invalid credentials' } }
        default:
          return { error: { type: '500', message: 'Something went wrong!' } }
      }
    }

    
  }
};
