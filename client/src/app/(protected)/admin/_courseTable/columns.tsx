"use client"

import { Button } from "@/components/ui/button";
import { CollapsibleTrigger } from "@/components/ui/collapsible";
import { DataTableColumnHeader } from "@/components/ui/data-table-col-header";
import { gql, useMutation } from "@apollo/client";
import { ColumnDef } from "@tanstack/react-table"
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge"

// TODO: find a wayt to infer the same IUser and ICourse type from mongoose model

const DELETE_COURSE = gql`
mutation DeleteCourse($course: CourseInput) {
  deleteCourse(course: $course) {
    _id
    course_name
    course_code
    course_description
    capacity
  }
}
`;
export type Course = {
  _id: string;
  course_name: string;
  course_code: string;
  course_description: string;
  capacity: number;
  students: Student[];
}

export type Student = {
  _id: string;
  name: string;
  email: string;
}


export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "_id",
    header: "Course ID",
    enableHiding: true,

  },
  {
    accessorKey: "course_code",
    header: "Course Code",
    cell: ({ row }) => (
      <Badge>{row.original.course_code}</Badge>
    )
  },
  {
    accessorKey: "course_name",
    // header: "Course Name"
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Course Name" />
    ),
    enableSorting: true,
  },
  {
    accessorKey: "course_description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Course Description" />
    ),
    enableSorting: true,

  },
  // {
  //   id: "courses",
  //   header: "Courses",
  //   cell: ({ row }) => {
  //     const payment = row.original

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(payment.id)}
  //           >
  //             Copy payment ID
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>View customer</DropdownMenuItem>
  //           <DropdownMenuItem>View payment details</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     )
  //   },
  // },
  {
    accessorKey: "students",
    header: () => <div className="text-center">Students</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-center items-center">

          {/* add a condition that if the length is greater than 1, then show the collapsible trigger
          */}
          {row.original.students.length > 0 ? (
            <CollapsibleTrigger>
              <Button className="flex justify-between gap-3">
                {row.original.students.length}
                <ChevronDown className="h-3 w-3" />
              </Button>

            </CollapsibleTrigger>

          ) : (<p className="text-bold">N/A</p>)}

        </div>
      );
    },
  },
  // Column with a button to delete courses
  {
    id: "delete",
    header: "Delete",
    cell: ({ row }) => {

      const [deleteCourse] = useMutation(DELETE_COURSE, {
        variables: { course: { _id: row.original._id } },
      });
      console.log(row.original._id)
      return (
        <Button variant="destructive" onClick={() => deleteCourse()}>
          Delete
        </Button>
      );
    },
  },
]