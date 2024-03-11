"use server"

import { signIn } from "@/auth";
import { connectToDB } from "@/lib/database";
import { User } from "@/models/user.model";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas/loginSchema";
import { AuthError } from "next-auth";
import { z } from "zod";

// FIXME: this works dev environment, but not in production because mongoose can't run on edge. 
// export const login = async (values: z.infer<typeof LoginSchema>) => {
//   console.log("🔄️  Logging in");
//   const validateFields = LoginSchema.safeParse(values);
//   if (!validateFields.success) {
//     return { error: { type: '403', message: 'Invalid fields' } }
//   }

//   const { email, password } = validateFields.data;

//   try {
//     // Credentials can be checked on the edge, but we can't use mongoose on the edge!!!
//     await signIn("credentials", {
//       email,
//       password,
//       redirectTo:DEFAULT_LOGIN_REDIRECT,
//     })
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case "CredentialsSignin":
//           return { error: { type: '403', message: 'Invalid credentials' } }
//         default:
//           return { error: { type: '500', message: 'Something went wrong!' } }
//       }
//     }


//   }
// };
interface ErrorOutput {
  error: { type: string, message: string }
}

interface SuccessOutput {
  res: { type: string, message: string }
}
export const login = async (values: z.infer<typeof LoginSchema>): Promise<ErrorOutput | SuccessOutput> => {
  await connectToDB();
  console.log("🔄️  Logging in");
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: { type: '403', message: 'Invalid fields' } }
  }

  const { email, password } = validateFields.data;

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return { error: { type: '403', message: 'Invalid Credentials' } }
  }

  const passwordMatch: boolean = await existingUser.comparePassword(password);
  if (!passwordMatch) {
    return { error: { type: '403', message: 'Invalid Credentials' } }
  }


  try {
    await signIn("credentials", {
      user: JSON.stringify(existingUser),

      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
    // await signIn("passkey")
    return { res: { type: '200', message: 'Success' } }
    
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: { type: '403', message: 'Invalid credentials' } }
        default:
          return { error: { type: '500', message: 'Something went wrong!' } }
      }
    }
    throw error;


  }

  // await signIn("credentials", { user: JSON.stringify(existingUser), redirectTo: DEFAULT_LOGIN_REDIRECT }).catch(
  //   (error) => {
  //     if (error instanceof AuthError) {
  //       switch (error.type) {
  //         case "CredentialsSignin":
  //           return { error: { type: '403', message: 'Invalid credentials' } }
  //         default:
  //           return { error: { type: '500', message: 'Something went wrong, try again later.' } }
  //       }
  //     }

  //     return { error: { type: '500', message: 'Something went wrong, try again later.' } }

  //   }
  // )

};
