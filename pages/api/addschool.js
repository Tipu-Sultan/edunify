// pages/api/addschool.js

import { connectDB } from '../../utils/db';
import { School } from '../../models/school';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.MY_CLOUD_NAME,
  api_key: process.env.MY_API_KEY,
  api_secret: process.env.MY_API_SECRET
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed."), false);
  }
};

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage, fileFilter });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  try {
    await connectDB();

    upload.single('file')(req, res, async (err) => {
      if (err) {
        console.error('Error uploading file:', err);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
      }

      try {
        if (!req.file) {
          throw new Error("Error with image");
        }

        // Upload file buffer to Cloudinary
        cloudinary.uploader.upload_stream({ resource_type: "image" }, async (error, result) => {
          if (error) {
            console.error('Error uploading file to Cloudinary:', error);
            return res.status(500).json({ success: false, error: 'Error uploading file to Cloudinary.' });
          }

          const school = new School({
            name: req.body.name,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            contact: req.body.contact,
            email: req.body.email,
            image: req.file.originalname,
            publicUrl: result.secure_url
          });

          const savedSchool = await school.save();
          if (savedSchool) {
            return res.status(201).json({
              success: true,
              message: 'File & Details added successfully',
            });
          }
        }).end(req.file.buffer);

      } catch (error) {
        console.error('Error handling file and saving to MongoDB:', error);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
    });

  } catch (error) {
    console.error('Error connecting to the database:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}
