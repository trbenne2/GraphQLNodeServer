const { GraphQLServer } = require('graphql-yoga');

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
let links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL',
  },
];
let idCount = links.length;
/**
 * The actual implementation of the GraphQL schema.
 * Structure is identical to the structure of the type def
 */
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    // root field for feed
    feed: () => links,
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
    updateLink: (parent, args) => {
      const link = links.map((item) => (item.id = args.id));
      link.url = args.url;
      link.description = args.description;
      return link;
    },
    deleteLink: (parent, args) => {
      const link = links.map((item) => (item.id = args.id));
      links.splice(link, 1);
      return link;
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
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
