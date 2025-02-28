"use client"; // ✅ Required for actions inside server component
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function SignInButton({ provider }: { provider: string }) {
  return (
    <button
      className="flex gap-2 bg-white text-black px-6 py-2 rounded-[6px] mb-4 border-amber-950 border-2 hover:border-amber-900 hover:border-[3.2px] hover:cursor-pointer"
      onClick={() => signIn(provider, { callbackUrl: "/dashboard" })}
    >
      Sign in with {provider.charAt(0).toUpperCase() + provider.slice(1)}{" "}
      <Image src={`/${provider}.svg`} alt={provider} width={29} height={29} />
    </button>
  );
}