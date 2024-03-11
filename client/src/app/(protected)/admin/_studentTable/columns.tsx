"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CollapsibleTrigger } from "@/components/ui/collapsible";
import { ColumnDef } from "@tanstack/react-table"
import { ChevronDown } from "lucide-react";

// TODO: find a wayt to infer the same IUser and ICourse type from mongoose model

export type Course = {
  _id: string;
  course_name: string;
  course_code: string;
  course_description: string;
  capacity: number;
}

export type Student = {
  _id: string;
  name: string;
  email: string;
  courses: Course[];
}


export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "_id",
    header: "Student ID",
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
    accessorKey: "courses",
    header: "Courses",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center items-center">
          {row.original.courses.length > 0 ? (
            <CollapsibleTrigger>
              <Button className="flex justify-between gap-3">
                {row.original.courses.length}
                <ChevronDown className="h-3 w-3" />
              </Button>

            </CollapsibleTrigger>

          ) : (<p className="text-bold">N/A</p>)}
        </div>
      );
    },
  },
]