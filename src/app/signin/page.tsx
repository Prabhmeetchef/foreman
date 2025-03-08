import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import { authOptions } from "@/lib/auth"; // ✅ Correct import
import SignInButton from "./signin-button"; // ✅ New server-action-based signin

export default async function SignIn() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard"); // ✅ Redirect if already logged in
  }

  return (
    <div className="flex justify-between min-h-screen">
      <Image src="/Pattern-1 (1).svg" alt="pattern" width={208} height={200} className="hidden sm:block"/>

      <div className="flex flex-grow flex-col items-center justify-center">
        <h1 className="text-[30px] mb-10 text-amber-950 font-semibold">
          Sign in to Foreman
        </h1>
        {/* ✅ Server-Action-Based Sign-In Buttons */}
        <SignInButton provider="google" />
        <SignInButton provider="github" />
      </div>
      <Image src="/pattern-2 (10).svg" alt="pattern2" width={208} height={100} className="hidden sm:block"/>
    </div>
  );
}