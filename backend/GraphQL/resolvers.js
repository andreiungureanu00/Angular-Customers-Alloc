const connection = require("../config").connection;

const rootResolver = {
  user: (args) => {
    return { name: args.id };
  },
  getProjects: async() => {
    const query = "select * from projects";
    const [rows, fields] = await connection.query(query);
    return rows;
  },
  getProjectInfo: async(args) => {
    const query = "select * from projects where id = ?";
    const [rows, fields] = await connection.query(query, [args.id]);
    return rows[0];
  },
  addProject: async(args) => {
    const query = "insert into projects SET ?";
    const [rows, fields] = await connection.query(query, [args]);
    if (rows) {
      const insertId = rows.insertId;
      const [
        x,
        fields,
      ] = await connection.query("select * from projects where id = ?", [
        insertId,
      ]);
      return x[0];
    }
    return null;
  },
  updateProject: async(args) => {
    const query = "update projects SET ? where id = ?";
    const [rows, fields] = await connection.query(query, [args, args.id]);
    if (rows) {
      const [
        rows,
        fields,
      ] = await connection.query("select * from projects where id = ?", [
        args.id,
      ]);
      return rows[0];
    }
    return null;
  },
  deleteProject: async(args) => {
    const query = "delete from projects where id = ?";
    const [rows, fields] = await connection.query(query, [args.id]);
    if (rows) {
      return "Project Deleted";
    }
    return "Error on Project Delete";
  },
};

module.exports = { rootResolver };
