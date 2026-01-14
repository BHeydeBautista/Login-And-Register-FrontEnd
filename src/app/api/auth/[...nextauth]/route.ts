import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const UserFound = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        if (!UserFound) {
          return null;
        }

        const matchPassword = bcrypt.compare(
          credentials.password,
          UserFound.password
        );

        if(!matchPassword){
            return null;
        }

        return {
            id: UserFound.id,
            name: UserFound.name,
            email: UserFound.email,
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
