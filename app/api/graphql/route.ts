import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs } from '@/graphql/typeDefs';
import { resolvers } from '@/graphql/resolvers'
import { connectDB } from '@/lib/mongodb';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async () => {
    await connectDB();
    return {};
  },
});

export { handler as GET, handler as POST };
