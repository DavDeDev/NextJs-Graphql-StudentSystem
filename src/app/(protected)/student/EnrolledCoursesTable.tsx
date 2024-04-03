"use client"
import { DataTable } from "@/components/ui/data-table";
import { gql, useMutation } from "@apollo/client";
import { ColumnDef } from "@tanstack/react-table";
import { useCallback, useMemo } from "react";
import { Course } from "../admin/studentTableColumns";
import { enrolledCourseTableColumns } from "./_courseTable/columns";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

// Mutation to retrieve all the students, mutation to retrieve all the sections and number of students

// Course model will ahve an array of sections and each section will have an array of students

// TODO: Student model is in the students schema but always have a student role
// TODO: 

// Course -> Sections -> Students


const DROP_COURSE = gql`
mutation DropCourse($student: StudentInput, $course: CourseInput) {
  dropCourse(student: $student, course: $course) {
    _id
  }
}
`;

const CHANGE_SECTION = gql`
mutation Mutation($student: StudentInput, $course: CourseInput, $section: Int) {
  editSection(student: $student, course: $course, section: $section) {
    _id
  }
}
`;

export default function EnrolledCoursesTable({ data, refetchCourses }: { data: any, refetchCourses: any }) {

  const [dropCourse] = useMutation(DROP_COURSE, {
    onCompleted: () => {
      refetchCourses();
    }
  });



  const onDrop = useCallback((courseId: string, studentId = data.student._id) => {
    dropCourse({
      variables: {
        course: { _id: courseId },
        student: { _id: studentId },
      }
    });
    toast.success("Dropped from course", {
      description: "You have been removed from the course list",
    })
  }, [])

  const [changeSection] = useMutation(CHANGE_SECTION, {
    onCompleted: () => {
      refetchCourses();
    }
  });

  const onSectionChange = useCallback((courseId: string, section: number, studentId = data.student._id) => {
    changeSection({
      variables: {
        course: { _id: courseId },
        student: { _id: studentId },
        section
      }
    }).then(() => {
      toast.success("Section changed", {
        description: "You have been moved to a different section",
      })
    });
  }, [])


  const columns: ColumnDef<Course>[] = useMemo(() => enrolledCourseTableColumns({ onDrop, onSectionChange }), [onDrop, onSectionChange]);


  return (
    <DataTable columns={columns} data={data.student.courses}
    />
  )
}
