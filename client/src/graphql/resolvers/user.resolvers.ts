import { User, IUser } from '@/models/user.model';
import { Resolvers } from '@apollo/client';
import { Document, HydratedDocument, Model } from 'mongoose';
import { ContextValue } from '../apolloServer';


interface RegisterInput {
  user: {
    email: string;
    name: string;
    password: string;
  }
}

const resolvers: Resolvers = {
  Query: {
    hello: () => 'world',
    user: async (_, args) => await User.findOne(args.user),

    users: async (_, args) => await User.find(args.user),

    // try: (_, __, contextValue) => {
    //   console.log(contextValue);
    //   return 'hello';
    // },
    // users: async (parent: any, args: any, context: ContextValue): Promise<UserDocument[]> => {
    //   try {
    //     const users = await User.find(args);
    //     console.log(users);
    //     return users;
    //   } catch (error) {
    //     throw new Error('Error retrieving users');
    //   }
    // },
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
  },
};

export default resolvers;