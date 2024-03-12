import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { gql } from 'graphql-tag';
import { NextRequest } from 'next/server';

import typeDefs from '@/graphql/typedefs/user.typedefs';
import studentResolvers from '@/graphql/resolvers/student.resolvers';
import courseResolvers from '@/graphql/resolvers/course.resolvers';
import mutationResolvers from './resolvers/mutation.resolvers';
import queryResolvers from './resolvers/query.resolvers';

import { connectToDB } from '@/lib/database';

export interface ContextValue {
  token: string;
  dataSources: {
    mongoose: Awaited<ReturnType<typeof connectToDB>>;
  };
}

export const apolloServer = new ApolloServer<ContextValue>({
  resolvers: [studentResolvers, courseResolvers, mutationResolvers, queryResolvers],
  typeDefs,
});