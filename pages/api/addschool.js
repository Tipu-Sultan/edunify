// pages/api/addschool.js
import { connectDB } from '../../utils/db';
import {School} from '../../models/school'; // Assuming School is the default export
import multer from 'multer';
import {createRouter} from 'next-connect';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images"); // Uploads folder where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});

const upload = multer({ storage });

const router = createRouter();

router.use(upload.single('file'));

router.post(async (req, res) => {
  try {
    // Connect to the database
    await connectDB();

    // Assuming you have req.file and req.body available after multer middleware
    const { name, address, city, state, contact, email } = req.body;

    // Create a new school instance
    const school = new School({
      name,
      address,
      city,
      state,
      contact,
      email,
      image: req.files.filename,
    });

    // Save the school to the database
    const savedSchool = await school.save();

    // Send response
    res.status(201).json({
      success: true,
      data: {
        message: "School added successfully",
      },
    });
  } catch (error) {
    console.error('Error adding school:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

export default router.handler();





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
