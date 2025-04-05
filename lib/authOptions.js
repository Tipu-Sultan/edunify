import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import EdunifyUsers from '@/models/EdunifyUsers';
import connectDB from '@/lib/connectDB';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectDB();

        const user = await EdunifyUsers.findOne({ email: credentials.email });
        if (!user || !user.password) {
          throw new Error('No user found or invalid login method');
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error('Invalid password');
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          userType: user.userType,
          isAdmin: user.isAdmin,
          permissions: user.permissions,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.userType = user.userType;
        token.isAdmin = user.isAdmin;
        token.permissions = user.permissions;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.userType = token.userType;
      session.user.isAdmin = token.isAdmin;
      session.user.permissions = token.permissions;
      return session;
    },
    async signIn({ user, account }) {
      await connectDB();
      if (account.provider === 'google') {
        const existingUser = await EdunifyUsers.findOne({ email: user.email });
        if (!existingUser) {
          await EdunifyUsers.create({
            email: user.email,
            name: user.name,
            image: user.image,
            userType: 'NORMAL', // Default for Google users
            permissions: ['view_schools', 'apply'],
          });
        }
      }
      return true;
    },
  },
  pages: {
    signIn: '/login',
  },
};
