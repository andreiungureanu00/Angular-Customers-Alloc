const graphql = require("graphql");

const schema = graphql.buildSchema(`
  scalar DateTime,
  type Query {
    getProjects: [Project],
    getProjectInfo(id: Int!) : Project
  },
  type Project {
    id: Int!,
    project_name: String,
    start_date: DateTime,
    planned_end_date: DateTime,
    description: String,
    project_code: String
  },
  type Mutation {
		updateProject(id: Int, project_name: String, start_date: DateTime, planned_end_date: DateTime, description: String, project_code: String): Project,
		deleteProject(id: Int): String,
		addProject(project_name: String, start_date: DateTime, planned_end_date: DateTime, description: String, project_code: String): Project
  }
`);

module.exports = { schema };
