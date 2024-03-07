"use server"

import { LoginSchema } from "@/schemas/loginSchema";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  console.log("🔄️  Logging in");
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: { type: '403', message: 'Invalid fields' } }
  }
  return { error: { type: '403', message: 'Invalid fields' } }
  return { type: '403', message: 'Invalid fields' }
}