"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin"); // Redirect to sign-in if not logged in
    }
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Welcome, {session?.user?.name}</h1>
      <button
        className="bg-red-500 text-white px-6 py-2 rounded-md"
        onClick={() => signOut({ callbackUrl: "/signin" })}
      >
        Sign Out
      </button>
    </div>
  );
}