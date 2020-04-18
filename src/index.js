const { GraphQLServer } = require('graphql-yoga');

/**
 * Defines GraphQL schema. Simple query type with 1 field info with
 * Type String that is required
 */
const typeDefs = `
type Query {
    info: String!,
}`;

/**
 * The actual implementation of the GraphQL schema.
 * Structure is identical to the structure of the type def
 */
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
  },
};

/**
 * schema and resolvers bundled and passed to GraphQLServer imported from yoga
 * Tells server what API operations are accepted and how they should be resolved
 */
const server = new GraphQLServer({
  typeDefs,
  resolvers,
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
