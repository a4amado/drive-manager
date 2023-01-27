import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import client from "../../../DB";
const millseconds_in_a_day = 1000 * 60 * 60 * 24;

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope:
            "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/drive.metadata https://www.googleapis.com/auth/drive.photos.readonly",
          prompt: "consent",
          access_type: "offline",
          type: "offline",
        },
      },
    }),
  ],
  adapter: PrismaAdapter(client),
  session: {
    strategy: "database",
    maxAge: millseconds_in_a_day,
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true
};

export default NextAuth(authOptions);
