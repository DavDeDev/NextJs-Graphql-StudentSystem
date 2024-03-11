"use client"

import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CourseSchema } from "@/schemas/courseSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogContent, DialogTitle, DialogDescription, Dialog } from "@/components/ui/dialog";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function AddCourseForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CourseSchema>>(
    {
      resolver: zodResolver(CourseSchema),
      defaultValues: {
        course_code: "",
        course_name: "",
        course_description: "",
        capacity: 1,
      },
    }
  );

  async function onSubmit(values: z.infer<typeof CourseSchema>) {
    form.clearErrors();
    console.log("🔄️ Adding course");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Course</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <FormField
            control={form.control}
            name="course_code"
            render={({ field }) => (
              <FormItem>

                <FormLabel>Course Code</FormLabel>
                <FormControl>
                  <Input disabled={isPending} placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="course_name"
            render={({ field }) => (
              <FormItem>

                <FormLabel>Course Name</FormLabel>
                <FormControl>
                  <Input disabled={isPending} placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="course_description"
            render={({ field }) => (
              <FormItem>

                <FormLabel>Course Description</FormLabel>
                <FormControl>
                  <Input disabled={isPending} placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>

                <FormLabel>Capacity</FormLabel>
                <FormControl>
                  <Input type="number" disabled={isPending} placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter className="flex justify-between h-fit">
            <Button type="button" variant="outline" onClick={() => form.reset()}>Reset</Button>
            <Button disabled={isPending} type="submit">Add Course</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Form>
  )
}