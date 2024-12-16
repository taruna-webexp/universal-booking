"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function UserInfo() {
  const { status, data: session } = useSession();
  console.log("first", session);
  if (status === "authenticated") {
    return (
      <div className="shadow-xl p-8 rounded-md flex flex-col gap-3 bg-yellow-200">
        <div>
          <span className="font-bold">{session?.user?.email}</span>
        </div>
      </div>
    );
  }
}
