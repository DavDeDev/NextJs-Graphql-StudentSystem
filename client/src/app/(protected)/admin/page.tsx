import Image from "next/image";
import Link from "next/link";


// Mutation to retrieve all the students, mutation to retrieve all the sections and number of students

// Course model will ahve an array of sections and each section will have an array of students

// TODO: Student model is in the users schema but always have a student role
// TODO: 

// Course -> Sections -> Students
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      Admin Page
      TODO: Two tabs to load all the students and tab to load all the courses and add courses
    </main>
  );
}
