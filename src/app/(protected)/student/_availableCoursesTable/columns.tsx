"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/data-table-col-header";
import { gql, useMutation } from "@apollo/client";
import { ColumnDef } from "@tanstack/react-table";

// TODO: find a wayt to infer the same IUser and ICourse type from mongoose model


export type Course = {
  _id: string;
  course_name: string;
  course_code: string;
  course_description: string;
  capacity: number;
}
interface AvailableCourseTablePropsCols {
  onEnroll: (course_id: string) => void;
}


export const availableCourseTableColumns: ({onEnroll}: AvailableCourseTablePropsCols) => ColumnDef<Course>[] = ({onEnroll}) => [
  {
    accessorKey: "_id",
    header: "Course ID",
    enableHiding: true,
  },
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
    id: "enroll",
    header: "Enroll",
    cell: ({ row }) => {
      
      return (
        <Button onClick={() => onEnroll(row.original._id)}>
          Enroll
        </Button>
      );
    },
  },
]