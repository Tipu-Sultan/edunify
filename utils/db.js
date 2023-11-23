// import mysql from 'mysql2/promise';

// let cachedPool = null;

// export async function connectToDatabase() {
//   if (cachedPool) {
//     return { pool: cachedPool };
//   }

//   const pool = mysql.createPool({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
//   });
  

//   cachedPool = pool;

//   return { pool };
// }

import mongoose from "mongoose";

export const connectDB = async () => {
  const { connection } = await mongoose.connect(process.env.MONGO_URI, {
    dbName: "Todo13",
  });
  console.log(`Database Connected on ${connection.host}`);
};