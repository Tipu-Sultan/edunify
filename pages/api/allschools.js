import { connectDB } from '../../utils/db';
import { School } from '../../models/school';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.MY_CLOUD_NAME,
  api_key: process.env.MY_API_KEY,
  api_secret: process.env.MY_API_SECRET,
});


export default async function handler(req, res) {

  if (req.method === 'GET') {
    try {
      await connectDB();

      // Fetch all schools from the database
      const schools = await School.find();

      // Send the retrieved schools as a JSON response
      res.status(200).json(schools);
    } catch (error) {
      console.error('Error fetching schools:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await connectDB();

      // Extract school ID from the request parameters
      const { id } = req.query;
      console.log(id)
      // Check if the school exists
      const school = await School.findById(id);
      if (!school) {
        return res.status(404).json({ message: 'School not found' });
      }

      // Delete the image from Cloudinary
      const publicUrl = school.publicUrl;
      if (publicUrl) {
        // Extract public ID from the URL
        const publicId = publicUrl.split('/').slice(-1)[0].split('.')[0];


        // Delete the image from Cloudinary
        await cloudinary.uploader.destroy(publicId);
      }

      // Delete the school from MongoDB
      await school.deleteOne(); // Use deleteOne() to delete the document

      return res.status(200).json({ message: 'School deleted successfully' });
    } catch (error) {
      console.error('Error deleting school:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
