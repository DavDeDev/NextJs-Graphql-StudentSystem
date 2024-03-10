import { User, IUser } from '@/models/user.model';
import { Resolvers } from '@apollo/client';
import { Document, HydratedDocument, Model, ObjectId } from 'mongoose';
import { ContextValue } from '../apolloServer';
import { Course, ICourse } from '@/models/course.model';
import { Enrollment } from '@/models/enrollment.model';
import { Cagliostro } from 'next/font/google';
import { connectToDB } from '@/lib/database';


interface RegisterInput {
  user: {
    email: string;
    name: string;
    password: string;
  }
}

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
      console.log(courseIds);
      const courses = await Course.find({ _id: { $in: courseIds } });
      console.log(courses);
      return courses
    }
  },
  Query: {
    hello: () => 'world',
    user: async (_, { user }) => await User.findOne(user),
    // users: async (_, { user }) => await User.find(user),
    users: async (_, args,context,info) => {
      ;
      console.log(JSON.stringify(info));
      console.log("args",args);
      console.log("context",context);
      console.log(await User.find(args.user));
      return await User.find(args.user);
    },
    courses: async (_, args) => await Course.find(args.course),
    studentEnrollments: async (_, { studentId }) => await Enrollment.find({ student_id: studentId }),
    courseEnrollments: async (_, { courseId }) => await Enrollment.find({ course_id: courseId }),

  },
  Mutation: {

    register: async function (parent: any, args: RegisterInput, context: ContextValue): Promise<IUser> {
      console.log(args)
      const userModel = new User(args.user);

      const newUser = await userModel.save();
      if (!newUser) {
        throw new Error('Error');
      }

      return newUser;
    },
    login: async function (parent: any, args: any, context: ContextValue) {
      const user = await User.findOne(args.email);

      if (!user) {
        throw new Error('User not found');
      }

      const isMatch = await user.comparePassword(args.password); // Cast 'user' to 'User' type
      console.log(isMatch)
      return user;
    },
    createCourse: async function (parent: any, args: any, context: ContextValue) {
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


    enrollStudent: async (_, { studentId, courseId }) => {
      const enrollmentModel = new Enrollment({ student_id: studentId, course_id: courseId, status: "enrolled" });
      const newEnrollment = await enrollmentModel.save();
      return newEnrollment;
    },

  },
};

export default resolvers;