"use client";
import { useCurrentRole } from "@/hooks/useCurrentRole";
import CoursesTable from "./CoursesTable";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function Home() {
  const role = useCurrentRole();

  if (role !== "student") {
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
    <CoursesTable />
  );
}
