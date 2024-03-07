import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { gql } from 'graphql-tag';
import { NextRequest } from 'next/server';

import typeDefs from '@/graphql/typedefs/user.typedefs';
import resolvers from '@/graphql/resolvers/user.resolvers';

import { connectToDB } from '@/lib/database';
import { ContextValue, apolloServer } from '@/graphql/apolloServer';






const handler = startServerAndCreateNextHandler(apolloServer, {
  context: async (req): Promise<ContextValue> => {
    console.log('🚀 Apollo SERVER starts')
    const token = "token";
    return {
      token,
      dataSources: {
        mongodb: await connectToDB(),
      },
    };
  },

});

export { handler as GET, handler as POST };