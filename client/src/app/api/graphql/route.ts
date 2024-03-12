import { startServerAndCreateNextHandler } from '@as-integrations/next';


import { ContextValue, apolloServer } from '@/graphql/apolloServer';
import { connectToDB } from '@/lib/database';






const handler = startServerAndCreateNextHandler(apolloServer, {
  context: async (req): Promise<ContextValue> => {
    console.log('🚀 Apollo SERVER starts')
    const token = "token";
    return {
      token,
      dataSources: {
        mongoose: await connectToDB(),
      },
    };
  },

});

export { handler as GET, handler as POST };
