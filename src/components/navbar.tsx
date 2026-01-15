import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

async function navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="flex justify-between items-center bg-gray-950, text-white px-24 py-3">
      <h1 className="text-xl font-bold">nextauth</h1>

      <ul className="flex gap-x-2">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/auth/login">login</Link>
        </li>
        <li>
          <Link href="/auth/register">Register</Link>
        </li>
      </ul>
    </nav>
  );
}

export default navbar;
