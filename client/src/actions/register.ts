"use server"

import { connectToDB } from "@/lib/database";
import { User, IUser } from "@/models/user.model";
import { RegisterSchema } from "@/schemas/registerSchema";
import { HydratedDocument } from "mongoose";
import { z } from "zod";

interface ErrorOutput {
  error: { type: string, message: string }
}

interface SuccessOutput {
  res: { type: string, message: string }
}

export const register = async (values: z.infer<typeof RegisterSchema>): Promise<ErrorOutput | SuccessOutput> => {
  await connectToDB();
  console.log("🔄️  Registering in");
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
  });
  console.log(values)
  return await newUser.save()
    .then(() => (
      { res: { type: '200', message: 'Success' } }
    ))
    .catch((err) => (
      { error: { type: '500', message: JSON.stringify(err) } }
    ));
}