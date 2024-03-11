"use client"
import { DataTable } from "@/components/ui/data-table";
import { gql, useQuery } from "@apollo/client";
import { columns } from "./_courseTable/columns";

const GET_COURSES = gql`
query Courses($course: CourseInput) {
  courses(course: $course) {
    _id
    course_name
    course_code
    course_description
    capacity
    students {
      _id
      name
      email
      role
    }
  }
}`;


export default function CoursesTable() {
  const { loading, error, data } = useQuery(GET_COURSES);
  if (loading) return null;

  if (error) return `Error! ${error}`;
  return (
    <DataTable columns={columns} data={data.courses} />
  )

}
