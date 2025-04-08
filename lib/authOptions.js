// app/api/auth/[...nextauth]/route.js (or wherever your NextAuth config is)
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
    async jwt({ token, user, account }) {
      // Initial sign-in: `user` is available
      if (user) {
        token.id = user.id;
        token.userType = user.userType;
        token.isAdmin = user.isAdmin;
        token.permissions = user.permissions;
      }

      // For Google sign-in or subsequent token refreshes, fetch from DB if needed
      if (!token.userType || !token.permissions) {
        await connectDB();
        const dbUser = await EdunifyUsers.findById(token.id);
        if (dbUser) {
          token.userType = dbUser.userType;
          token.isAdmin = dbUser.isAdmin;
          token.permissions = dbUser.permissions;
        }
      }

      return token;
    },
    async session({ session, token }) {
      // Always populate session.user with token data
      session.user.id = token.id;
      session.user.userType = token.userType;
      session.user.isAdmin = token.isAdmin;
      session.user.permissions = token.permissions;
      return session;
    },
    async signIn({ user, account }) {
      await connectDB();
      if (account.provider === 'google') {
        let existingUser = await EdunifyUsers.findOne({ email: user.email });
        if (!existingUser) {
          existingUser = await EdunifyUsers.create({
            email: user.email,
            name: user.name,
            image: user.image,
            userType: 'NORMAL', // Default for Google users
            isAdmin: false,
            permissions: ['view_schools', 'apply'],
          });
        }
        // Update the user object with DB data for the jwt callback
        user.id = existingUser._id.toString();
        user.userType = existingUser.userType;
        user.isAdmin = existingUser.isAdmin;
        user.permissions = existingUser.permissions;
      }
      return true;
    },
  },
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };