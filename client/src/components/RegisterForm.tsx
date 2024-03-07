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
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card"
import { RegisterSchema } from "@/schemas/registerSchema"
import { register } from "@/actions/register"
import { Label } from "./ui/label"



export default function RegisterForm() {

  const [isPending, startTransition] = useTransition();


  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "david@gmail.com",
      password: "password",
      isAdmin: true
    },
  })

  // 2. Define a submit handler.
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
            <CardDescription>Deploy your new project in one-click.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
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
                <p  className="text-sm font-medium leading-none">
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
                      <Switch id="isAdmin" checked={field.value} onCheckedChange={field.onChange}/>
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
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => form.reset()}>Reset</Button>
            <Button disabled={isPending} type="submit">Submit</Button>

          </CardFooter>
          <div className="w-full min-h-12 flex justify-center">
            <Link href="/auth/login" className="ml-2">Already registered?</Link>
          </div>
        </Card>
      </form>
    </Form >
  )
}
