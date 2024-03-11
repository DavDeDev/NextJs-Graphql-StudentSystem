import CoursesTable from "./CoursesTable";
import StudentsTable from "./StudentsTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default async function Home() {

  return (
    <Tabs defaultValue="students">
      <TabsList className="w-full">
        <TabsTrigger value="students">Students</TabsTrigger>
        <TabsTrigger value="courses">Courses</TabsTrigger>
      </TabsList>
      <TabsContent value="students"> <StudentsTable /></TabsContent>
      <TabsContent value="courses"><CoursesTable /></TabsContent>
    </Tabs>
  );
}
