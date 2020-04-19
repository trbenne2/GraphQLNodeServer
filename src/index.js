const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Link = require('./resolvers/Link');
const Subscription = require('./resolvers/Subscription');
const Vote = require('./resolvers/Vote');
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
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote,
};

/**
 * schema and resolvers bundled and passed to GraphQLServer imported from yoga
 * Tells server what API operations are accepted and how they should be resolved
 */
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: (request) => {
    return {
      ...request,
      prisma,
    };
  },
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
