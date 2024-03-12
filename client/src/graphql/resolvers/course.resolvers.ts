import { Resolver } from "@apollo/client";
import { connectToDB } from '@/lib/database';
import { Course, ICourse } from '@/models/course.model';
import { Enrollment, IEnrollment } from '@/models/enrollment.model';
import { IUser, User } from '@/models/user.model';
import { Resolvers } from '@apollo/client';
import { ObjectId } from 'mongoose';
import { ContextValue } from '../apolloServer';


const students: Resolver = async (parent, args: any, context: ContextValue): Promise<IUser[]> => {
  console.log("ciaoooooooooooooo");
  console.log(parent);
  await connectToDB();
  const enrollments = await Enrollment.find({ course_id: parent._id }, { student_id: 1, _id: 0 });
  const studentIds: ObjectId[] = Array.from(enrollments, (enrollment) => enrollment.student_id);
  const students = await User.find({ _id: { $in: studentIds } });
  return students
}


export const courseResolvers: Resolvers = {
  Course: {
    students
  }
};

export default courseResolvers;

