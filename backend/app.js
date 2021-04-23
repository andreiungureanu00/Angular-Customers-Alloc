const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql `
  type Query {
    greeting: String
  }
`;

const resolvers = {
  Query: {
    greeting: () => "Hello GraphQL world!👋",
  },
};

const app = new ApolloServer({ typeDefs, resolvers });

app
  .listen({ port: 9000 })
  .then((serverInfo) => console.log(`Server running at ${serverInfo.url}`));