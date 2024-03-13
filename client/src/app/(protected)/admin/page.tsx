
import { Button } from "@/components/ui/button";
import CoursesTable from "./CoursesTable";
import StudentsTable from "./StudentsTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AddCourseForm from "./AddCourseForm";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useSession } from "next-auth/react";
import { useCurrentRole } from "@/hooks/useCurrentRole";


export default function Home() {
// const role = useCurrentRole();


// if (role !== "admin") {
//   return (<p>You are not allowed!</p>)
// }
  return (
    <Tabs defaultValue="students">
      <TabsList className="w-full">
        <TabsTrigger value="students">Students</TabsTrigger>
        <TabsTrigger value="courses">Courses</TabsTrigger>
      </TabsList>
      <TabsContent value="students" className="h-full"> <StudentsTable /></TabsContent>

      <TabsContent value="courses" className="h-full"><CoursesTable /></TabsContent>

      
    </Tabs>
  );
}
