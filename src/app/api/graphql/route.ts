import { connectDB } from '@/lib/database';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { NextRequest } from 'next/server';
import resolvers from './resolvers';
import assessmentTypeDefs from './typeDefs/assessment.graphql';

const typeDefs = mergeTypeDefs([assessmentTypeDefs]);

connectDB();

const server = new ApolloServer<object>({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

export { handler as GET, handler as POST };
