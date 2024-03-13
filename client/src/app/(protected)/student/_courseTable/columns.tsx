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
  onDrop: (course_id: string) => void;
}


export const enrolledCourseTableColumns: ({onDrop}: AvailableCourseTablePropsCols) => ColumnDef<Course>[] = ({onDrop}) => [
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
    id: "drop",
    header: "Drop",
    cell: ({ row }) => {
      
      return (
        <Button variant="destructive" onClick={() => onDrop(row.original._id)}>
          Drop
        </Button>
      );
    },
  },
]