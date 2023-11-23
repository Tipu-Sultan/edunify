// pages/api/addschool.js
import { connectDB } from '../../utils/db';
import School from '../../models/school';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images"); // Uploads folder where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});

const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false,
  },
};
let check  = ''
export default async function handler(req, res) {
  if (req.method === 'POST') {
    check = req.body.name
    try {
      // Connect to the database
      await connectDB();

      // Handle file upload
      upload.single('picture')(req, res, async (err) => {
        if (err) {
          console.error('Error uploading file:', err);
          return res.status(500).json({ success: false, error: 'Internal Server Error' });
        }

        // Create a new school instance
        const school = new School({
          name: req.body.name,
          address: req.body.address,
          city: req.body.city,
          state: req.body.state,
          contact: req.body.contact,
          email: req.body.email,
          image: req.file.filename,
        });

        // Save the school to the database
        const savedSchool = await school.save();

        // Send response
        res.status(201).json({
          success: true,
          data: { id: savedSchool._id, ...req.body, picture: req.file.filename, message: 'School added successfully' },
        });
      });
    } catch (error) {
      console.error('Error adding school:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error',value:`${check}` });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}



// // pages/api/addschool.js
// import { connectToDatabase } from '../../utils/db';
// import multer from 'multer';
// import fs from 'fs/promises'; // Import the fs module

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images"); // Uploads folder where files will be stored
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname); // Unique filename
//   },
// });

// const upload = multer({ storage });


// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     try {
//       const { pool } = await connectToDatabase();
//       const connection = await pool.getConnection();

//       upload.single('picture')(req, res, async (err) => {
//         if (err) {
//           console.error('Error uploading file:', err);
//           return res.status(500).json({ success: false, error: 'Internal Server Error' });
//         }

//         const [result] = await connection.execute(
//           'INSERT INTO school(name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
//           [
//             req.body.name,
//             req.body.address,
//             req.body.city,
//             req.body.state,
//             req.body.contact,
//             req.body.email,
//             req.file.filename,
//           ]
//         );

//         connection.release();

//         res.status(201).json({
//           success: true,
//           data: { id: result.insertId, ...req.body, picture: req.file.filename,message:'School added successfully' },
//         });
//       });
//     } catch (error) {
//       console.error('Error adding school:', error);
//       res.status(500).json({ success: false, error: 'Internal Server Error' });
//     }
//   } else {
//     res.status(405).json({ message: 'Method Not Allowed' });
//   }
// }
