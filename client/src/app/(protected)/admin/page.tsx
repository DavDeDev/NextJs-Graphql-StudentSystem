import { Button } from "@/components/ui/button";
import CoursesTable from "./CoursesTable";
import StudentsTable from "./StudentsTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AddCourseForm from "./AddCourseForm";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";


export default async function Home() {

  return (
    <Tabs defaultValue="students">
      <TabsList className="w-full">
        <TabsTrigger value="students">Students</TabsTrigger>
        <TabsTrigger value="courses">Courses</TabsTrigger>
      </TabsList>
      <TabsContent value="students" className="h-full"> <StudentsTable /></TabsContent>

      <TabsContent value="courses" className="h-full"><CoursesTable /></TabsContent>
      <Dialog>
      <DialogTrigger asChild>
        <Button className="absolute bottom-5 right-5 rounded-full">+</Button>
      </DialogTrigger>
      <AddCourseForm />
    </Dialog>
    </Tabs>
  );
}
