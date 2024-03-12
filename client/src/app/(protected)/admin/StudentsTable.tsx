"use client"
import { DataTable } from "@/components/ui/data-table";
import { useCurrentRole } from "@/hooks/useCurrentRole";
import { gql, useQuery } from "@apollo/client";
import { columns } from "./_studentTable/columns";
// Mutation to retrieve all the students, mutation to retrieve all the sections and number of students

// Course model will ahve an array of sections and each section will have an array of students

// TODO: Student model is in the students schema but always have a student role
// TODO: 

// Course -> Sections -> Students

const GET_STUDENTS = gql`
query Students($student: StudentInput) {
  students(student: $student) {
    _id
    name
    email
      courses {
        _id
        course_name
        course_code
        course_description
        capacity
      }
  }
}
`;
export default function StudentsTable() {
  const { loading, error, data } = useQuery(GET_STUDENTS, {

    variables: { student: { role: "student" } },

  });
  if (loading) return null;

  if (error) return `Error! ${error}`;
  return (
    <DataTable columns={columns} data={data.students} />
  )
}
