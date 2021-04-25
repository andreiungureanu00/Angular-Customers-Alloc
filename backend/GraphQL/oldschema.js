// const Project = new graphql.GraphQLObjectType({
//   name: "Project",
//   sqlTable: "projects",
//   uniqueKey: "id",
//   fields: () => ({
//     id: { type: graphql.GraphQLInt },
//     project_name: { type: graphql.GraphQLString },
//     description: { type: graphql.GraphQLString },
//   }),
// });

// const QueryRoot = new graphql.GraphQLObjectType({
//   name: "Query",
//   args: {
//     limit: {
//       type: graphql.GraphQLInt,
//     },
//   },
//   fields: {
//     hello: {
//       type: graphql.GraphQLString,
//       resolve: (args) => "Hello World " + args,
//     },
//     projects: {
//       type: new graphql.GraphQLList(Project),
//       resolve: async() => {
//         const [rows, fields] = await connection.query("select * from projects");
//         return rows;
//       },
//     },
//     project: {
//       type: Project,
//       args: { id: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) } },
//       where: (projects, args, context) => `${projects}.id = ${args.id}`,
//       resolve: async() => {
//         const [rows, fields] = await connection.query("select * from projects");
//         return rows;
//       },
//     },
//   },
// });

// const schema = new graphql.GraphQLSchema({ query: QueryRoot });
