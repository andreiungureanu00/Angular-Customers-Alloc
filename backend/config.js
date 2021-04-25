const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "customers_alloc",
  password: "password",
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 0,
});

const connection = pool.promise();

if (connection) {
  console.log("Database is connected");
} else {
  console.log("Eroare la conectare");
}

module.exports = { connection };
