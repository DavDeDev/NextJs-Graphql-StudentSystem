import { Course, ICourse } from '@/models/course.model';
import { Enrollment } from '@/models/enrollment.model';
import { Resolver, Resolvers } from "@apollo/client";
import { ContextValue } from '../apolloServer';
import { Cagliostro } from 'next/font/google';


const createCourse: Resolver = async (parent: any, args: any, context: ContextValue): Promise<ICourse> => {
  const courseModel = new Course(args.course);
  const newCourse = await courseModel.save();
  if (!newCourse) {
    throw new Error('Error');
  }
  return newCourse;
};

const deleteCourse: Resolver = async (parent: any, { course }, context: ContextValue) => {
  // Delete all the enrollments that reference the course
  const deletedEnrollments = await Enrollment.deleteMany({ course_id: course._id });
  const deletedCourse = await Course.findOneAndDelete(course);
  if (!deletedCourse) {
    throw new Error('Error');
  }
  return deletedCourse;
};

const enrollStudent: Resolver = async (_, { student, course }) => {
  const enrollment = await Enrollment.findOneAndUpdate({ student_id: student._id, course_id: course._id }, { status: "enrolled" }, { returnOriginal: false, upsert: true });
  return enrollment;
};


const dropCourse: Resolver = async (_, { student, course }) => {
  const updatedEnrollment = await Enrollment.findOneAndUpdate({ student_id: student._id, course_id: course._id }, { status: "dropped" }, { returnOriginal: false, upsert: true });
  // return the course that has been just dropped
  const droppedCourse = await Course.findOne({ _id: updatedEnrollment.course_id });
  // if (!droppedCourse) {
  //   throw new Error('Error');
  // }
  return droppedCourse;
};

const editSection: Resolver = async (_, { student, course, section }) => {
  const updatedEnrollment = await Enrollment.findOneAndUpdate({ student_id: student._id, course_id: course._id }, { section: section }, { returnOriginal: false, upsert: true });
  return updatedEnrollment;
}


export const mutationResolvers: Resolvers = {

  Mutation: {
    createCourse,
    deleteCourse,
    enrollStudent,
    dropCourse,
    editSection
  }

};

export default mutationResolvers;
