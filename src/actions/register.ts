"use server"

import { signIn } from "@/auth";
import { connectToDB } from "@/lib/database";
import { User, IUser } from "@/models/user.model";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { RegisterSchema } from "@/schemas/registerSchema";
import { HydratedDocument } from "mongoose";
import { Cagliostro } from "next/font/google";
import { redirect } from "next/navigation";
import { z } from "zod";


// TODO: check how to redirect and authorize from here
interface ErrorOutput {
  error: { type: string, message: string }
}

interface SuccessOutput {
  res: { type: string, message: string }
}

export const register = async (values: z.infer<typeof RegisterSchema>): Promise<ErrorOutput | SuccessOutput> => {
  await connectToDB();
  const validateFields = RegisterSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: { type: '403', message: 'Invalid fields' } }
  }

  const existingUser = await User.findOne({ email: values.email });


  if (existingUser) {
    return { error: { type: '400', message: 'Email already in use' } }
  }

  const name: string = `${values.firstName} ${values.lastName}`;
  const newUser = new User({
    ...values,
    name,
    role: values.isAdmin ? "admin" : "student"
  });
  await newUser.save()
    .catch((err) => (
      { error: { type: '500', message: JSON.stringify(err) } }
    ));

      await signIn("credentials", {
        user: JSON.stringify(newUser),

        redirectTo: DEFAULT_LOGIN_REDIRECT,
      })
      return { res: { type: '200', message: 'Success' } }

}