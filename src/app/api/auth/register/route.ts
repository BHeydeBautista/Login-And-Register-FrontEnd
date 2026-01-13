import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function POST(request: any) {
  const data = await request.json();
  console.log(data);

  const { email, username, password } = data;

  const newUser = await prisma.user.create({
    data: {
      email,
      name: username,
      password,
    },
  });

  return NextResponse.json("registering...");
}
