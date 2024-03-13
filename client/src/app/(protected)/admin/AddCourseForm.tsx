"use client"

import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CourseSchema } from "@/schemas/courseSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogContent, DialogTitle, DialogDescription, Dialog } from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FetchResult, MutationResult, OperationVariables, gql, useMutation } from "@apollo/client";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Course } from "./studentTableColumns";


interface addCourseFormProps {
  addCourse: ({variables}:OperationVariables) => Promise<FetchResult<Course>>;
  state: MutationResult<any>;

}

export default function AddCourseForm({ addCourse, state }: addCourseFormProps) {

  const [open, setOpen] = useState(false)
  // const [ state.loading, startTransition] = useTransition();
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
  2
  async function onSubmit(values: z.infer<typeof CourseSchema>) {
    addCourse({ variables: { course: values } })
      .then(() => {
        setOpen(false)
      }
      )
      .catch((error) => {
        form.setError("root.serverError", {
          ...error
        });
      })


  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="absolute bottom-5 right-5 rounded-full">+</Button>
      </DialogTrigger>
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
                    <Input disabled={state.loading} placeholder="John" {...field} />
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
                    <Input disabled={state.loading} placeholder="John" {...field} />
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
                    <Input disabled={state.loading} placeholder="John" {...field} />
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
                    <Input type="number" disabled={state.loading} placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.formState.errors.root && <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error {form.formState.errors.root.serverError.type}</AlertTitle>
              <AlertDescription>
                {form.formState.errors.root.serverError.message}
              </AlertDescription>
            </Alert>}

            <DialogFooter className="flex flex-row justify-center h-fit">
              <Button type="button" variant="outline" onClick={() => form.reset()}>Reset</Button>
              <Button disabled={state.loading} onClick={form.handleSubmit(onSubmit)}>Add Course</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>

  )
}