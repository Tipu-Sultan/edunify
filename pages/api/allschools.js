import { connectDB } from '../../utils/db';
import { School } from '../../models/school';

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
  } else if (req.method === 'DELETE') {
    try {
      // Connect to the database
      await connectDB();

      // Extract school ID from the request parameters
      const { id } = req.query;

      // Check if the school exists
      const school = await School.findById(id);
      if (!school) {
        return res.status(404).json({ message: 'School not found' });
      }

      // Delete the school
      await school.remove();

      return res.status(200).json({ message: 'School deleted successfully' });
    } catch (error) {
      console.error('Error deleting school:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
