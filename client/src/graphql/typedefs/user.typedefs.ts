import gql from "graphql-tag";

const typeDefs = gql`
  type Query {
    hello: String
    users(user: UserInput): [User]
    user(user: UserInput): User
    courses(course: CourseInput): [Course]
    course(course: CourseInput): Course
    studentEnrollments(studentId: ID): [Enrollment]
    courseEnrollments(courseId: ID): [Enrollment]
  }

  type Mutation {
    register(user: UserInput): User
    login(email: String, password: String): User

    createCourse(course: CourseInput): Course
    enrollStudent(studentId: ID, courseId: ID): Enrollment
  }

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
    course_id: ID
    student_id: ID
    status: String
  }
`;
export default typeDefs;