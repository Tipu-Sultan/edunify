import mysql from "mysql2/promise";

const dbUri = process.env.AIVEN_URI;

// Create a connection pool using URI
const db = mysql.createPool(dbUri);


export default db;
