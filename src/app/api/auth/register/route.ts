import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function POST(request: any) {
  const data = await request.json();
  console.log(data);

  const { email, username, password } = data;

  const userFound = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  const usernameFound = await prisma.user.findUnique({
    where: {
      email: data.username,
    },
  });

  if (userFound) {
    return NextResponse.json(
      {
        message: "Email already exists",
      },
      {
        status: 400,
      }
    );
  }

  if (usernameFound) {
    return NextResponse.json(
      {
        message: "User already exists",
      },
      {
        status: 400,
      }
    );
  }

  const newUser = await prisma.user.create({
    data: {
      email,
      name: username,
      password,
    },
  });

  return NextResponse.json("registering...");
}
