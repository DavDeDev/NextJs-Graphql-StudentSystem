import { connectToDB } from '@/lib/database';
import { Course, ICourse } from '@/models/course.model';
import { IEnrollment } from '@/models/enrollment.model';
import { IUser, User } from '@/models/user.model';
import { Resolver, Resolvers } from "@apollo/client";
import { ContextValue } from '../apolloServer';

const course: Resolver = async ({ course_id }: IEnrollment, args: any, context: ContextValue): Promise<ICourse> => {
  await connectToDB();
  const course = await Course.findOne({ _id: course_id });
  if (!course) throw new Error("Course not found");
  return course
};

const student : Resolver = async ({ student_id }: IEnrollment, args: any, context: ContextValue): Promise<IUser> => {
  await connectToDB();
  const student = await User.findOne({ _id: student_id });
  if (!student) throw new Error("Student not found");
  return student
}


export const courseResolvers: Resolvers = {
  Enrollment: {
    course,
    student
  }
};