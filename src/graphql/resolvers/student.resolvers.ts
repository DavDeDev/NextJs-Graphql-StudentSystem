import { connectToDB } from '@/lib/database';
import { Course, ICourse } from '@/models/course.model';
import { Enrollment, IEnrollment } from '@/models/enrollment.model';
import { IUser, User } from '@/models/user.model';
import { Resolver, Resolvers } from '@apollo/client';
import { ObjectId } from 'mongoose';
import { ContextValue } from '../apolloServer';


const courses: Resolver = async (parent: IUser & { role: 'student' }, args: any, context: ContextValue): Promise<any> => {
  await connectToDB();
  const enrollments = await Enrollment.find({ student_id: parent._id, status: "enrolled" }, { _id: 0 }).populate<{ course_id: ICourse }>("course_id");
  const courses = enrollments.map(enrollment => ({
    _id: enrollment.course_id._id,
    course_name: enrollment.course_id.course_name,
    course_code: enrollment.course_id.course_code,
    course_description: enrollment.course_id.course_description,
    capacity: enrollment.course_id.capacity,
    section: enrollment.section
  }));
  return courses
};

// FIXME: this returns only the courses where the student was enrolled before and now the Enrollment is = "dropped"
// We need to return all the courses where the student is not enrolled also
// const availableCourses: Resolver = async (parent: IUser, args: any, context: ContextValue): Promise<any> => {
//   await connectToDB();

//   const enrollments = await Enrollment.find({ student_id: parent._id, status: "dropped" }).populate<{ course_id: ICourse }>("course_id");

//   const 
//   const courses = enrollments.map(enrollment => ({
//     _id: enrollment.course_id._id,
//     course_name: enrollment.course_id.course_name,
//     course_code: enrollment.course_id.course_code,
//     course_description: enrollment.course_id.course_description,
//     capacity: enrollment.course_id.capacity,
//     section: enrollment.section
//   }));
//   return courses
// }


//https://stackoverflow.com/a/33511166/18686901
// const courses: Resolver = async (parent: IUser & { role: 'student' }, args: any, context: ContextValue): Promise<ICourse[]> => {
//   await connectToDB();
//   const enrollments = await Enrollment.find({ student_id: parent._id, status: "enrolled" });
//   const courseIds: ObjectId[] = Array.from(enrollments, (enrollment) => enrollment.course_id);
//   const coursesPromises = courseIds.map(async (courseId) => {
//     const course: any = await Course.findById(courseId);
//     const enrollment = enrollments.find(enrollment => enrollment.course_id.toString() === courseId.toString());
//     if (course && enrollment) {
//       course.section = enrollment.section; // Assigning the section from enrollment to course
//     }
//     return course;
//   });
//   const courses = await Promise.all(coursesPromises);
//   return courses.filter(course => course !== null); // Filter out any null courses
// };

const availableCourses: Resolver = async (parent: IUser, args: any, context: ContextValue): Promise<ICourse[]> => {
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