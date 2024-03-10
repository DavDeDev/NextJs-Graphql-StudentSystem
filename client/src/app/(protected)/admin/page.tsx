"use client"
import { useCurrentRole } from "@/hooks/useCurrentRole";
// Mutation to retrieve all the students, mutation to retrieve all the sections and number of students

// Course model will ahve an array of sections and each section will have an array of students

// TODO: Student model is in the users schema but always have a student role
// TODO: 

// Course -> Sections -> Students
export default function Home() {
  const role = useCurrentRole();

  if (role === "admin") {
    return <p>You are an admin, welcome!</p>
  }

  return <p>You are not authorized to view this page!</p>
}
