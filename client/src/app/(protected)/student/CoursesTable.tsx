"use client"
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { gql, useQuery } from "@apollo/client";
import AddCourseForm from "../admin/AddCourseForm";
import { columns as availableCourses } from "./_availableCoursesTable/columns";
import { columns as enrolledCourseCols } from "./_courseTable/columns";

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
    }
  }
}`;


export default function CoursesTable() {

  const student = useCurrentUser();
  const { loading, error, data } = useQuery(GET_COURSES, {
    variables: { student: { _id: student?.id } }
  });
  console.log("🎥🎥🎥🎥🎥🎥🎥");
  console.log(data)
  //TODO: return a skeleton
  if (loading) return <p>Loading...</p>
  return (

    <Tabs defaultValue="students">
      <TabsList className="w-full">
        <TabsTrigger value="students">Enrolled in</TabsTrigger>
        <TabsTrigger value="courses">Courses Available</TabsTrigger>
      </TabsList>
      <TabsContent value="students" className="h-full"><DataTable columns={enrolledCourseCols(data.student._id)} data={data.student.courses} /></TabsContent>

      <TabsContent value="courses" className="h-full">   <DataTable columns={availableCourses(data.student._id)} data={data.student.availableCourses} /></TabsContent>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="absolute bottom-5 right-5 rounded-full">+</Button>
        </DialogTrigger>
        <AddCourseForm />
      </Dialog>
    </Tabs>


  )

}
