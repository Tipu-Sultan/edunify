import dbConnect from '../../../utils/db';
import User from '../../../models/userModel';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { emailOrPhone, password } = req.body;

    try {
      // Check if user exists with email or phone
      const user = await User.findOne({ $or: [{ email: emailOrPhone }, { phone: emailOrPhone }] });

      if (!user) {
        return res.status(401).json({ message: 'Invalid email or phone number' });
      }

      // Check if user is verified (implement your own verification logic)
      if (!user.isVerified) {
        return res.status(401).json({ message: 'User is not verified' });
      }

      // Check if password matches
      const isPasswordValid = await user.matchPassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({
        userInfo: {
          name: user.name,
          email: user.email,
          phone: user.phone,
          isVerified: user.isVerified,
          role: user.role 
        },
        token
      });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
