import { Course } from '@/models/course.model';
import { Enrollment } from '@/models/enrollment.model';
import { Resolver, Resolvers } from "@apollo/client";
import { ContextValue } from '../apolloServer';
import { User } from '@/models/user.model';


const student: Resolver = async (_, { student }) => await User.findOne(student);

const students: Resolver = async (_, { student }) => await User.find(student);

const courses: Resolver = async (_, { course }) => await Course.find(course);

const course: Resolver = async (_, { course }) => await Course.findOne(course);

const studentEnrollments: Resolver = async (_, { student }) => await Enrollment.find({ student_id: student._id });
const courseEnrollments: Resolver = async (_, { courseId }) => await Enrollment.find({ course_id: courseId });


export const queryResolvers: Resolvers = {
  Query: {
    student,
    students,
    courses,
    course,
    studentEnrollments,
    courseEnrollments

  }
};

export default queryResolvers;

