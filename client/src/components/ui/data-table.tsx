"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Collapsible, CollapsibleContent } from "./collapsible"
import { Student } from "@/app/(protected)/admin/_studentTable/columns"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}


// var CollapsibleRowContent = ({ row }: { row: Student }) => {
//   // for each course in row.courses create a table row with course name and course
//   return (
//     row.courses.map((course) => (
//       <TableRow key={course._id}>
//         <TableCell className="pl-10">
//           {course.course_code}
//         </TableCell>
//         <TableCell>
//           {course.course_name}
//         </TableCell>
//         <TableCell>
//           {course.course_description}
//         </TableCell>
//       </TableRow>
//     )))
// }




export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="text-center">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <Collapsible key={row.id} asChild>
                <>
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="text-center">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                  {/* TODO: create an inner table */}
                  <CollapsibleContent className="px-10" asChild>
                    {/* TODO: create a table with the courses AND students? */}
                    {/* <CollapsibleRowContent row={row.original} /> */}
                  </CollapsibleContent>
                </>

              </Collapsible>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div >
  )
}
