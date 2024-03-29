"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Switch } from "@/components/ui/switch"
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
import { useState, useTransition } from "react"
import { login } from "@/actions/login"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, BellRing, ShieldEllipsis } from "lucide-react"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../../components/ui/card"
import { RegisterSchema } from "@/schemas/registerSchema"
import { register } from "@/actions/register"
import { Label } from "../../../components/ui/label"
import {
  IconBrandGithub,
  IconBrandGoogleFilled,
} from "@tabler/icons-react";
import { SocialButtons } from "../../../components/ui/social-buttons"



export default function RegisterForm() {

  const [isPending, startTransition] = useTransition();


  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: (Math.random() + 1).toString(36).substring(5),
      lastName: (Math.random() + 1).toString(36).substring(10),
      email: (Math.random() + 1).toString(36).substring(4) + "@gmail.com",
      password: "password",
      isAdmin: false
    },
  })

  async function onSubmit(values: z.infer<typeof RegisterSchema>) {
    form.clearErrors();
    console.log("🔄️ Logging in");

    startTransition(() => {
      register(values)
        .then((data) => {
          if ("error" in data) {
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

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>Choose how to register.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">

            <SocialButtons />

            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 ">

              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input disabled={isPending} placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input disabled={isPending} placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
            {/* TODO: Add a confirm password field
            <FormField

              control={form.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Confirm</FormLabel>
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
            /> */}
            <Label htmlFor="isAdmin" className=" flex items-center space-x-4 rounded-md border p-4">
              <ShieldEllipsis />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Admin account
                </p>
                <p className="text-sm text-muted-foreground">
                  Access additional resources and features.
                </p>
              </div>
              <FormField

                control={form.control}
                name="isAdmin"
                render={({ field }) => {
                  return (
                    <FormControl>
                      <Switch id="isAdmin" checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  )
                }}
              />
            </Label>
            {form.formState.errors.root && <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error {form.formState.errors.root.serverError.type}</AlertTitle>
              <AlertDescription>
                {form.formState.errors.root.serverError.message}
              </AlertDescription>
            </Alert>}
          </CardContent>
          <CardFooter className="flex justify-between h-fit">
            <Button type="button" variant="outline" onClick={() => form.reset()}>Reset</Button>
            <Button disabled={isPending} type="submit">Submit</Button>

          </CardFooter>
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mb-4 h-[1px] w-full" />



          <Button variant="link" type="button" className="w-full min-h-12 flex justify-center mb-4">
            <Link href="/auth/login">Already registered?</Link>
          </Button>
        </Card>
      </form>
    </Form >
  )
}
