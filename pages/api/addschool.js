// pages/api/addschool.js
import multer from 'multer';
import { Storage } from '@google-cloud/storage';
import { connectDB } from '../../utils/db';
import {School} from '../../models/school';
const storage = new Storage({
  projectId: process.env.PROJECT_KEY_ID,
  credentials: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

const bucket = storage.bucket('edunify');

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  try {
    await connectDB();

    // Handle file upload
    upload.single('file')(req, res, async (err) => {
      if (err) {
        console.error('Error uploading file:', err);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
      }

      try {
        if (!req.file) {
          throw "Error with image";
        }

        const school = new School({
          name: req.body.name,
          address: req.body.address,
          city: req.body.city,
          state: req.body.state,
          contact: req.body.contact,
          email: req.body.email,
          image: req.file.originalname,
          url:''
        });

        const savedSchool = await school.save();

        const blob = bucket.file(req.file.originalname);
        const blobStream = blob.createWriteStream();

        blobStream.on('error', (err) => {
          console.error('Error uploading file to Google Cloud Storage:', err);
          res.status(500).json({ success: false, error: 'Internal Server Error' });
        });

        blobStream.on('finish', () => {
          res.status(201).json({
            success: true,
            data: { id: savedSchool._id, ...req.body, picture: req.file.originalname, message: 'School added successfully' },
          });
        });

        blobStream.end(req.file.buffer);
      } catch (error) {
        console.error('Error handling file and saving to MongoDB:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
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
