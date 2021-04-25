const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const rootResolver = require("./GraphQL/resolvers").rootResolver;
const schema = require("./GraphQL/schema").schema;
const app = express();

app.use(
  "/api",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
    rootValue: rootResolver,
  })
);
app.listen(5000);
