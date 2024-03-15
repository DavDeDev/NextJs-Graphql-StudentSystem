"use client"
import { DataTable } from "@/components/ui/data-table";
import { gql, useMutation } from "@apollo/client";
import { ColumnDef } from "@tanstack/react-table";
import { useCallback, useMemo } from "react";
import { Course } from "../admin/studentTableColumns";
import { availableCourseTableColumns } from "./_availableCoursesTable/columns";

const ENROLL_COURSE = gql`
mutation EnrollCourse($student: StudentInput, $course: CourseInput) {

  enrollStudent (student: $student, course: $course) {
    _id
  }
}
`;

export default function AvailableCoursesTable({ data, refetchCourses }: { data: any, refetchCourses: any }) {

  const [enrollCourse] = useMutation(ENROLL_COURSE, {
    onCompleted: () => {
      refetchCourses();
    }
  });

  const onEnroll = useCallback((courseId: string, studentId = data.student._id) => {
    enrollCourse({
      variables: {
        course: { _id: courseId },
        student: { _id: studentId },
      }
    });
  }, [])


  const columns: ColumnDef<any>[] = useMemo(() => availableCourseTableColumns({ onEnroll }), [onEnroll]);


  return (
    <DataTable columns={columns} data={data.student.availableCourses}
    />
  )
}
