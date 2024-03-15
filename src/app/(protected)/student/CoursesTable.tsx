"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { gql, useQuery } from "@apollo/client";
import AvailableCoursesTable from "./AvailableCoursesTable";
import EnrolledCoursesTable from "./EnrolledCoursesTable";

const GET_COURSES = gql`
query Student($student: StudentInput) {
  student(student: $student) { 
    _id   
    availableCourses {
      _id
      course_name
      course_code
      course_description
      capacity
    }
    courses {
      _id
      course_name
      course_code
      course_description
      capacity
      section
    }
  }
}`;


export default function CoursesTable() {

  const student = useCurrentUser();
  const { loading, error, data, refetch: refetchCourses } = useQuery(GET_COURSES, {
    variables: { student: { _id: student?.id } }
  });
  //TODO: return a skeleton
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  return (

    <Tabs defaultValue="students">
      <TabsList className="w-full">
        <TabsTrigger value="students">Enrolled in</TabsTrigger>
        <TabsTrigger value="courses">Courses Available</TabsTrigger>
      </TabsList>
      <TabsContent value="students" className="h-full">
        {/* <DataTable columns={enrolledCourseTableColumns(data.student._id)} data={data.student.courses} /> */}
        <EnrolledCoursesTable refetchCourses={refetchCourses} data={data} />
      </TabsContent>

      <TabsContent value="courses" className="h-full">
        {/* <DataTable columns={availableCourseTableColumns(data.student._id)} data={data.student.availableCourses} /> */}

        <AvailableCoursesTable refetchCourses={refetchCourses} data={data} />
      </TabsContent>
    </Tabs>


  )

}
