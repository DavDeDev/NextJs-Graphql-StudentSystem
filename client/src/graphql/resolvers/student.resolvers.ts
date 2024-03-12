import { connectToDB } from '@/lib/database';
import { Course, ICourse } from '@/models/course.model';
import { Enrollment, IEnrollment } from '@/models/enrollment.model';
import { IUser, User } from '@/models/user.model';
import { Resolver, Resolvers } from '@apollo/client';
import { ObjectId } from 'mongoose';
import { ContextValue } from '../apolloServer';


const courses: Resolver = async (parent: IUser & { role: 'student' }, args: any, context: ContextValue): Promise<ICourse[]> => {
  await connectToDB();
  console.log(args);
  console.log(parent);
  const enrollments = await Enrollment.find({ student_id: parent._id, status: "enrolled" }, { course_id: 1, _id: 0 });
  console.log(enrollments);
  // const courseIds = enrollments.map((enrollment) => enrollment.course_id);
  const courseIds: ObjectId[] = Array.from(enrollments, (enrollment) => enrollment.course_id);
  console.log("course Ids", courseIds);
  const courses = await Course.find({ _id: { $in: courseIds } });
  console.log(courses);
  return courses
};

const availableCourses: Resolver = async (parent: IUser, args: any, context: ContextValue): Promise<ICourse[]> => {
  console.log("AVAILABLE COURSES")
  await connectToDB();
  const enrollments = await Enrollment.find({ student_id: parent._id, status: "enrolled" }, { course_id: 1, _id: 0 });
  const courseIds: ObjectId[] = Array.from(enrollments, (enrollment) => enrollment.course_id);
  const courses = await Course.find({ _id: { $nin: courseIds } });
  return courses
}

const studentResolvers: Resolvers = {
  Student: {
    courses,
    availableCourses
  },



};

export default studentResolvers;