// pages/api/auth/verify-email.js
import dbConnect from '../../../utils/db';
import User from '../../../models/userModel';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { id } = req.body;

    try {
      const user = await User.findOne({ isToken: id });

      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token.' });
      }

      user.isToken = " "; // Clear the token after verification
      user.isVerified = true; // Set the user as verified
      await user.save();

      res.status(200).json({ message: 'Email verified successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
