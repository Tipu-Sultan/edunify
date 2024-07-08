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

const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "edunify",
    });

    console.log(`MongoDB connected: ${connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;

