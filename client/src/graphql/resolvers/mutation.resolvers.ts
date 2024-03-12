import { Course, ICourse } from '@/models/course.model';
import { Enrollment } from '@/models/enrollment.model';
import { Resolver, Resolvers } from "@apollo/client";
import { ContextValue } from '../apolloServer';


const createCourse: Resolver = async (parent: any, args: any, context: ContextValue): Promise<ICourse> => {
  console.log(args);
  const courseModel = new Course(args.course);
  console.log("model", courseModel);
  const newCourse = await courseModel.save();
  console.log("doc", newCourse);
  if (!newCourse) {
    throw new Error('Error');
  }
  return newCourse;
};

const deleteCourse: Resolver = async (parent: any, { course }, context: ContextValue) => {
  console.log("DELETING❌❌❌❌")
  // Delete all the enrollments that reference the course
  const deletedEnrollments = await Enrollment.deleteMany({ course_id: course._id });
  console.log(deletedEnrollments);
  const deletedCourse = await Course.findOneAndDelete(course);
  console.log("doc", deletedCourse);
  if (!deletedCourse) {
    throw new Error('Error');
  }
  return deletedCourse;
};

const enrollStudent: Resolver = async (_, { student, course }) => {
  console.log("ENROLLING📚📚📚📚")
  console.log(student);
  console.log(course);
  const enrollment = await Enrollment.findOneAndUpdate({ student_id: student._id, course_id: course._id }, { status: "enrolled" }, { returnOriginal: false, upsert: true });
  console.log(enrollment);
  return enrollment;
};


const dropCourse: Resolver = async (_, { student, course }) => {
  const updatedEnrollment = await Enrollment.findOneAndUpdate({ student_id: student._id, course_id: course._id }, { status: "dropped" }, { returnOriginal: false, upsert: true });
  // return the course that has been just dropped
  console.log("DROPPING COURSEEE")
  const droppedCourse = await Course.findOne({ _id: updatedEnrollment.course_id });
  if (!droppedCourse) {
    throw new Error('Error');
  }
  return droppedCourse;
};


export const mutationResolvers: Resolvers = {

  Mutation: {
    createCourse,
    deleteCourse,
    enrollStudent,
    dropCourse
  }

};

export default mutationResolvers;
