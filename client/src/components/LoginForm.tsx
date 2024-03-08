"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoginSchema } from "@/schemas/loginSchema"
import { useState, useTransition } from "react"
import { login } from "@/actions/login"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card"
import { SocialButtons } from "./ui/social-buttons"



export default function LoginForm() {

  const [isPending, startTransition] = useTransition();


  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "david@gmail.com",
      password: "password"
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    form.clearErrors();
    console.log("🔄️ Logging in");
    startTransition(() => {
      login(values)
        .then((data) => {
          if (data && data.error) {
            console.log("❌ Error in Form!");
            form.setError("root.serverError", {
              ...data.error
            });
          }
          console.log("🔄️ [Client] Finished Transition");

        }).catch(() => {
          form.setError("root.serverError", {
            type: "500",
            message: "Server error. Please try again later."
          });
        });
    })
  }
  return (
    <Form {...form}>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Decide how to login.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">

            <SocialButtons />

            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} placeholder="*@gmail.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /><FormField

              control={form.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input disabled={isPending} type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your password.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            {form.formState.errors.root && <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error {form.formState.errors.root.serverError.type}</AlertTitle>
              <AlertDescription>
                {form.formState.errors.root.serverError.message}
              </AlertDescription>
            </Alert>}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => form.reset()}>Reset</Button>
            <Button disabled={isPending} type="submit">Submit</Button>

          </CardFooter>
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mb-4 h-[1px] w-full" />
          <Button variant="link" className="w-full min-h-12 flex justify-center mb-4">
            <Link href="/auth/register">Need to register?</Link>
          </Button>
        </Card>
      </form>
    </Form >
  )
}
