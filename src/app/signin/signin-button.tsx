"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function SignInButton({ provider }: { provider: string }) {
  return (
    <button
      className="flex gap-2 bg-white text-black px-8 py-[10px] rounded-[6px] mb-4 border-amber-950 border-2 hover:border-amber-700 hover:bg-amber-50 hover:cursor-pointer"
      onClick={() => signIn(provider, { callbackUrl: "/dashboard" })}
    >
      Sign in with {provider.charAt(0).toUpperCase() + provider.slice(1)}{" "}
      <Image src={`/${provider}.svg`} alt={provider} width={29} height={29} className="w-[29px] h-[29px]"/>
    </button>
  );
}