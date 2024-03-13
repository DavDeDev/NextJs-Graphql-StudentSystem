"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/data-table-col-header";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { gql, useMutation } from "@apollo/client";
import { ColumnDef } from "@tanstack/react-table";
import { Cagliostro } from "next/font/google";

// TODO: find a wayt to infer the same IUser and ICourse type from mongoose model


export type Course = {
  _id: string;
  course_name: string;
  course_code: string;
  course_description: string;
  capacity: number;
  section: number;
}
interface AvailableCourseTablePropsCols {
  onDrop: (course_id: string) => void;
  onSectionChange: (courseId: string, section: number) => void;
}


export const enrolledCourseTableColumns: ({ onDrop, onSectionChange }: AvailableCourseTablePropsCols) => ColumnDef<Course>[] = ({ onDrop, onSectionChange }) => [
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
    id: "edit",
    header: "Section",
    cell: ({ row }) => {
      //TODO: Improve this design
      console.log("🎵🎵🎵🎵🎵🎵🎵");
      console.log(row.original);
      return (
        // onValueChange=
        <Select onValueChange={(value: string) => onSectionChange(row.original._id, +value)} >
          <SelectTrigger>
            <SelectValue placeholder={`${row.original.section}`} />
          </SelectTrigger>
          <SelectContent>
            {/* Show options from 1 to 5
             */}
            {/* {() => {
              for (let i = 0; i < 5; i++) (
                <SelectItem value={i}>{i}</SelectItem>
              )
            }
            } */}
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4</SelectItem>
            <SelectItem value="5">5</SelectItem>
          </SelectContent>
        </Select>
      )
    }
  },
  {
    id: "drop",
    header: "Drop",
    cell: ({ row }) => {
      console.log("CHECK COURSE ID");
      console.log(row.original);
      return (
        <Button variant="destructive" onClick={() => onDrop(row.original._id)}>
          Drop
        </Button>
      );
    },
  },
]