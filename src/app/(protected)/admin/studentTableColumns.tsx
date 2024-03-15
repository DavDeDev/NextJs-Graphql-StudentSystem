"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CollapsibleTrigger } from "@/components/ui/collapsible";
import { ColumnDef } from "@tanstack/react-table"
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// TODO: find a wayt to infer the same IUser and ICourse type from mongoose model

export type Course = {
  _id: string;
  course_name: string;
  course_code: string;
  course_description: string;
  capacity: number;
  section: number;
}

export type Student = {
  _id: string;
  name: string;
  email: string;
  courses: Course[];
}


export const columns: ColumnDef<Student>[] = [

]

export const getStudentTableColumns = (): ColumnDef<Student>[] => [
  {
    accessorKey: "_id",
    header: "Student ID",
    enableHiding: false,
    // Trim id to the last 8 characters so it looks nicer
    cell: ({ row }) => {
      const student = row.original
      return <Badge>{student._id.slice(-10)}</Badge>
    }

  },
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "email",
    header: "Email"
  },
  {
    accessorKey: "courses",
    header: "Courses",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center items-center">
          {row.original.courses.length > 0 ? (

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button className="flex justify-between gap-3">
                  {row.original.courses.length}
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Enrolled in...</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {row.original.courses.map((course) => (
                  <DropdownMenuItem key={course._id} className="flex gap-3">
                    <Badge variant="secondary">{course.course_code} - {course.section}</Badge>{course.course_name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

          ) : (<p className="text-bold">N/A</p>)}
        </div>
      );
    },
  },
]