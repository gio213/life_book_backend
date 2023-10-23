import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import mysql from "mysql2";

// create the connection to database
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;

// const pool = mysql.createPool({
//   MYSQLHOST: process.env.DB_HOST,
//   MYSQLUSER: process.env.DB_USERNAME,
//   MYSQLPASSWORD: process.env.DB_PASSWORD,
//   MYSQLDATABASE: process.env.DB_DBNAME,
//   MYSQLPORT: process.env.DB_PORT,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });
