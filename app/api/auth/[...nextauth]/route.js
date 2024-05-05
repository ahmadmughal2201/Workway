import connectMongoDB from '@/libs/mongodb';
import User from "@/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import cookie from 'cookie';


export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connectMongoDB();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }

          return user;

        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],

  callbacks: {
    jwt(params) {
      if (params.user) {
        params.token.id = params.user.id;
      }
      return params.token;
    },
    session({ session, token }) {
      if (token.id) {
        session.user.id = token.id;       

      }
      return session;
    },
  },


  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
