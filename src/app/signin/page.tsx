"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard"); // Redirect to dashboard if logged in
    }
  }, [session, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Sign in to Foreman</h1>
      <button
        className="bg-blue-500 text-white px-6 py-2 rounded-md mb-4"
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      >
        Sign in with Google
      </button>
      <button
        className="bg-gray-800 text-white px-6 py-2 rounded-md"
        onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
      >
        Sign in with GitHub
      </button>
    </div>
  );
}