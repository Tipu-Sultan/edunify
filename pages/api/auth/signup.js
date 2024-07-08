import connectDB from '../../../utils/db';
import User from '../../../models/userModel';
import crypto from 'crypto';
import sendEmail from '../../../services/sendMailService';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'POST') {
    const { name, email, phone, password } = req.body;

    try {
      const userExists = await User.findOne({ $or: [{ email }, { phone }] });

      if (userExists) {
        return res.status(400).json({ message: 'User already exists with provided email or phone' });
      }

      const isToken = crypto.randomBytes(32).toString('hex');

      const user = await User.create({
        name,
        email,
        phone,
        password,
        isToken,
      });

      const verificationUrl = `${process.env.NEXTAUTH_URL}/auth/verify-email/${isToken}`;

      const emailContent = `<p>Please verify your email by clicking on the link below:</p>
                            <a href="${verificationUrl}">Verify Email</a>`;

      await sendEmail(user.email, 'Email Verification', emailContent);

      res.status(201).json({
        message: 'User registered successfully. Please check your email for verification link.',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
      });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
