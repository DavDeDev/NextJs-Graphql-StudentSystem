import gql from "graphql-tag";

const typeDefs = gql`
  type Query {
    users(user: UserInput): [User]
    user(user: UserInput): User
    courses(course: CourseInput): [Course]
    course(course: CourseInput): Course
    studentEnrollments(student: UserInput): [Enrollment]
    courseEnrollments(course: CourseInput): [Enrollment]
  }

  type Mutation {
    createCourse(course: CourseInput): Course
    deleteCourse(course: CourseInput): Course
    enrollStudent(student: UserInput, course: CourseInput): Enrollment
  }
# TODO: Find a way to distinguish between student user and admin user
  type User {
    _id: ID
    name: String
    email: String
    role: String
    courses: [Course]
  }

  input UserInput {
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
    students: [User]
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
    student: User
    status: String
  }
`;
export default typeDefs;