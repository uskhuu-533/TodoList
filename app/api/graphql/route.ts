import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { NextRequest } from 'next/server';
import { typeDefs } from '@/graphql/typeDefs';
import { resolvers } from '@/graphql/resolvers';
import { connectDB } from '@/lib/mongodb';

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create the base handler
const createHandler = startServerAndCreateNextHandler(server, {
  context: async () => {
    await connectDB();
    return {};
  },
});

// Export properly typed GET and POST handlers
export async function GET(request: NextRequest) {
  return createHandler(request);
}

export async function POST(request: NextRequest) {
  return createHandler(request);
}

// Set dynamic rendering to ensure our GraphQL API is not statically optimized
export const dynamic = 'force-dynamic';