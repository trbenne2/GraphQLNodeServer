const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');
/**
 * Defines GraphQL schema. Simple query type with 1 field info with
 * Type String that is required
 */
/* const typeDefs = `
type Query {
    info: String!,
    feed: [Link!]!,
}

type Mutation {
    post(url: String!, description: String!): Link!
}

type Link {
    id: ID!,
    description: String!,
    url: String!,
}
`; */

// storing this link at runtime

/**
 * The actual implementation of the GraphQL schema.
 * Structure is identical to the structure of the type def
 */
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    // root field for feed
    feed: (root, args, context, info) => {
      return context.prisma.links();
    },
  },
  Mutation: {
    post: (root, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description,
      });
    },
  },
};

/**
 * schema and resolvers bundled and passed to GraphQLServer imported from yoga
 * Tells server what API operations are accepted and how they should be resolved
 */
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma },
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
