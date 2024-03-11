import { User, IUser } from '@/models/user.model';
import { Resolvers } from '@apollo/client';
import { Document, HydratedDocument, Model, ObjectId } from 'mongoose';
import { ContextValue } from '../apolloServer';
import { Course, ICourse } from '@/models/course.model';
import { Enrollment, IEnrollment } from '@/models/enrollment.model';
import { Cagliostro } from 'next/font/google';
import { connectToDB } from '@/lib/database';
import graphqlFields from 'graphql-fields';
import { GraphQLResolveInfo } from "graphql";



const resolvers: Resolvers = {
  User: {
    courses: async (parent: IUser, args: any, context: ContextValue): Promise<ICourse[]> => {
      await connectToDB();
      console.log(args);
      console.log(parent);
      const enrollments = await Enrollment.find({ student_id: parent._id }, { course_id: 1, _id: 0 });
      console.log(enrollments);
      // const courseIds = enrollments.map((enrollment) => enrollment.course_id);
      const courseIds: ObjectId[] = Array.from(enrollments, (enrollment) => enrollment.course_id);
      console.log("course Ids", courseIds);
      const courses = await Course.find({ _id: { $in: courseIds } });
      console.log(courses);
      return courses
    }
  },
  Course: {
    students: async (parent: ICourse, args: any, context: ContextValue): Promise<IUser[]> => {
      await connectToDB();
      const enrollments = await Enrollment.find({ course_id: parent._id }, { student_id: 1, _id: 0 });
      const studentIds: ObjectId[] = Array.from(enrollments, (enrollment) => enrollment.student_id);
      const students = await User.find({ _id: { $in: studentIds } });
      return students
    }
  },

  Enrollment: {
    course: async ({ course_id }: IEnrollment, args: any, context: ContextValue): Promise<ICourse> => {
      await connectToDB();
      const course = await Course.findOne({ _id: course_id });
      if (!course) throw new Error("Course not found");
      return course
    },
    student: async ({ student_id }: IEnrollment, args: any, context: ContextValue): Promise<IUser> => {
      await connectToDB();
      const student = await User.findOne({ _id: student_id });
      if (!student) throw new Error("Student not found");
      return student
    }
  },
  Query: {
    user: async (_, { user }) => await User.findOne(user),
    // users: async (_, { user }) => await User.find(user),
    users: async (_, args, context, info) => {
      console.log("===================GIOOOOOOOOO==================");
      console.log(args);
      // console.log(
      //   JSON.stringify(graphqlFields(info as unknown as GraphQLResolveInfo), null, 4)
      // )
      console.log("=====================================");
      return await User.find(args.user);
    },
    courses: async (_, { course }) => await Course.find(course),
    course: async (_, { course }) => await Course.findOne(course),
    studentEnrollments: async (_, { student }) => await Enrollment.find({ student_id: student._id }),
    courseEnrollments: async (_, { courseId }) => await Enrollment.find({ course_id: courseId }),

  },
  Mutation: {
    createCourse: async function (parent: any, args: any, context: ContextValue): Promise<ICourse> {
      console.log(args);
      const courseModel = new Course(args.course);
      console.log("model", courseModel);
      const newCourse = await courseModel.save();
      console.log("doc", newCourse);
      if (!newCourse) {
        throw new Error('Error');
      }
      return newCourse;
    },

    deleteCourse: async function (parent: any, { course }, context: ContextValue) {
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
    },


    enrollStudent: async (_, { student, course }) => {
      const existingEnrollment = await Enrollment.findOneAndUpdate({ student_id: student._id, course_id: course._id }, { status: "enrolled" });
      if (existingEnrollment) return existingEnrollment;
      const enrollmentModel = new Enrollment({ student_id: student._id, course_id: course._id, status: "enrolled" });
      const newEnrollment = await enrollmentModel.save();
      return newEnrollment;
    },
  },
};

export default resolvers;