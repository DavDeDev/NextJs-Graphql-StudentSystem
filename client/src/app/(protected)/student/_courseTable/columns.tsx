"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/data-table-col-header";
import { gql, useMutation } from "@apollo/client";
import { ColumnDef } from "@tanstack/react-table";

// TODO: find a wayt to infer the same IUser and ICourse type from mongoose model

const DROP_COURSE = gql`
mutation DropCourse($student: StudentInput, $course: CourseInput) {
  dropCourse(student: $student, course: $course) {
    _id
  }
}
`;
export type Course = {
  _id: string;
  course_name: string;
  course_code: string;
  course_description: string;
  capacity: number;
}



export const columns: (studentId: string | undefined) => ColumnDef<Course>[] = (studentId: string | undefined) => [
  // {
  //   accessorKey: "_id",
  //   header: "Course ID"
  // },
  {
    accessorKey: "course_code",
    header: "Course Code",
    cell: ({ row }) => (<Badge>{row.original.course_code}</Badge>)
  },
  {
    accessorKey: "course_name",
    // header: "Course Name"
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Course Name" />
    ),
  },
  {
    accessorKey: "course_description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Course Description" />
    ),
  },
  {
    id: "drop",
    header: "Drop",
    cell: ({ row }) => {

      const [dropCourse, { data, loading, error }] = useMutation(DROP_COURSE, {
        variables: {
          student: {
            _id: studentId
          },
          course: {
            _id: row.original._id
          }
        },
      });
      console.log(row.original._id)
      return (
        <Button variant="destructive" disabled={loading} onClick={() => dropCourse()}>
          Drop
        </Button>
      );
    },
  },
]