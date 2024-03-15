import gql from "graphql-tag";

const typeDefs = gql`
  type Query {
    students(student: StudentInput): [Student]
    student(student: StudentInput): Student
    courses(course: CourseInput): [Course]
    course(course: CourseInput): Course
    studentEnrollments(student: StudentInput): [Enrollment]
    courseEnrollments(course: CourseInput): [Enrollment]
  }

  type Mutation {
    createCourse(course: CourseInput): Course
    deleteCourse(course: CourseInput): Course
    enrollStudent(student: StudentInput, course: CourseInput): Enrollment
    dropCourse(student: StudentInput, course: CourseInput): Course
    editSection(student: StudentInput, course: CourseInput, section: Int): Enrollment
  }
# TODO: Find a way to distinguish between student student and admin student
  type Student {
    _id: ID
    name: String
    email: String
    role: String
    courses: [Course]
    availableCourses: [Course]
  }

  input StudentInput {
    _id: ID
    name: String
    email: String
    password: String
    role: String
  }

  type Course {
    _id: ID
    course_name: String
    course_code: String
    course_description: String
    capacity: Int
    section: Int
    students: [Student]
  }

  input CourseInput {
    _id: ID
    course_name: String
    course_code: String
    course_description: String
    capacity: Int
  }

  type Enrollment {
    _id: ID
    course: Course
    student: Student
    status: String
  }
`;
export default typeDefs;