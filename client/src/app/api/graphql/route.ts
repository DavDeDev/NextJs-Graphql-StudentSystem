import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { gql } from 'graphql-tag';
import { NextRequest } from 'next/server';

import typeDefs from '@/graphql/schemas';
import resolvers from '@/graphql/resolvers';

import { connectToDB } from '@/lib/database';



interface ContextValue {
  token: string;
  dataSources: {
    mongodb: Awaited<ReturnType<typeof connectToDB>>;
  };
}

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
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