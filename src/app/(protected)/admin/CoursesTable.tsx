"use client"
import { DataTable } from "@/components/ui/data-table";
import { MutationFunctionOptions, gql, useMutation, useQuery } from "@apollo/client";
import { ColumnDef } from "@tanstack/react-table";
import { useCallback, useMemo } from "react";
import LoadingSkeleton from "./LoadingSkeleton";
import { Course, getCoursesTableColumns } from "./courseTableColumns";
import AddCourseForm from "./AddCourseForm";
import { toast } from "sonner";

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

const ADD_COURSE = gql`
mutation Mutation($course: CourseInput) {
  createCourse(course: $course) {
    _id
    course_name
    course_code 
    course_description
    capacity
  }
}
`;

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

// in this  table we should be able to add, retrieve and delete courses

export default function CoursesTable() {

  const { loading, error, data } = useQuery(GET_COURSES);

  const [deleteCourse] = useMutation(DELETE_COURSE, {
    refetchQueries: [{ query: GET_COURSES }]
  });

  const onDelete = useCallback((id: string) => {
    deleteCourse({ variables: { course: { _id: id } } });
    toast.success("Course has been deleted", {
      description: "Course has been removed from the course list",
    });
  }
    , []);

    const [addCourse, state] = useMutation<Course>(ADD_COURSE, {
      refetchQueries: [{ query: GET_COURSES }]
    });

  const columns: ColumnDef<Course>[] = useMemo(() => getCoursesTableColumns({ onDelete }), [onDelete]);

  if (loading) return (<LoadingSkeleton />);

  if (error) return `Error! ${error}`;
  return (
    <>
      <DataTable columns={columns} data={data.courses} />
      <AddCourseForm addCourse={addCourse} state={state}/>
    </>
  )

}
