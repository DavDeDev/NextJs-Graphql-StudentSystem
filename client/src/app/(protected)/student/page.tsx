"use client";
import { useCurrentRole } from "@/hooks/useCurrentRole";
import CoursesTable from "./CoursesTable";

export default function Home() {
  const role = useCurrentRole();

  // if (role !== "student") {
  //   return (<p>You are not allowed!</p>)
  // }
  return (
    <CoursesTable />
  );
}
