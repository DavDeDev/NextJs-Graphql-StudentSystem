import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { gql } from 'graphql-tag';
import { NextRequest } from 'next/server';

import typeDefs from '@/graphql/typedefs/user.typedefs';
import resolvers from '@/graphql/resolvers/user.resolvers';

import { connectToDB } from '@/lib/database';

export interface ContextValue {
  token: string;
  dataSources: {
    mongodb: Awaited<ReturnType<typeof connectToDB>>;
  };
}

export const apolloServer = new ApolloServer<ContextValue>({
  resolvers,
  typeDefs,
});