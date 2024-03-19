"use client";
import { useCurrentRole } from "@/hooks/useCurrentRole";
import CoursesTable from "./CoursesTable";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const role = useCurrentRole();
  const route = useRouter();
  if (role !== "student") {
    useEffect(() => {
      console.log("component mounted")
      console.log("redirecting");
      route.push("/student");
    }, []);
    // Redirect to /student if it's not an admin
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
