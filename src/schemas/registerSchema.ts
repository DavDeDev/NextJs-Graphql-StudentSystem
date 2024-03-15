import z from 'zod';

export const RegisterSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1),
  isAdmin: z.boolean(),
})