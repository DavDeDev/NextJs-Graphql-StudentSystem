"use client"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCurrentRole } from "@/hooks/useCurrentRole";
import { AlertCircle } from "lucide-react";
import CoursesTable from "./CoursesTable";
import StudentsTable from "./StudentsTable";

export default function Home() {
  const role = useCurrentRole();


  if (role !== "admin") {
    return (
      <div className="flex flex-col justify-center">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>403 Forbidden</AlertTitle>
          <AlertDescription>
            You ned to be an admin to access this page.
          </AlertDescription>
        </Alert>
      </div>
    )
  }
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
