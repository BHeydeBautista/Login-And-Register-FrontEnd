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
      async authorize(credentials) {
        const UserFound = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        if (!UserFound) {
          throw new Error(
            JSON.stringify({
              message: " User not found",
            })
          );
        }

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const matchPassword = bcrypt.compare(
          credentials.password,
          UserFound.password
        );

        if (!matchPassword) {
          throw new Error("Wrong password");
        }

        return {
          id: UserFound.id,
          name: UserFound.name,
          email: UserFound.email,
        };
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
