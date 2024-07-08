// // pages/api/schools.js
// import { connectToDatabase } from '../../utils/db';

// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     try {
//       const { pool } = await connectToDatabase();
//       const connection = await pool.getConnection();
//       const [results] = await connection.query('SELECT * FROM school');
//       connection.release();

//       res.status(200).json(results);
//     } catch (error) {
//       console.error('Error fetching schools:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   } else {
//     res.status(405).json({ message: 'Method Not Allowed' });
//   }
// }

// pages/api/schools.js
import { connectDB } from '../../utils/db';
import {School} from '../../models/schoolsModel';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Connect to the database
      await connectDB();

      // Fetch all schools from the database
      const schools = await School.find();

      // Send the retrieved schools as a JSON response
      res.status(200).json(schools);
    } catch (error) {
      console.error('Error fetching schools:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

