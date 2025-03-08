"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Navigation */}
      <nav className="flex items-center justify-between border-b-1 border-[#E1D9CF] md:mx-20 mx-2">
        {/* Logo */}
        <div className="flex">
          <Link href="/" className="text-2xl font-bold">
            <Image src="/logo@1x.png" alt="Logo" width={120} height={40} className="my-4 h-[40px] w-auto"/>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-12">
          <Link href="/about" className="text-gray-800 hover:text-amber-700 transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-gray-800 hover:text-amber-700 transition-colors">
            Contact
          </Link>
        </div>
        <div className="hidden md:block">
          <Link
            href="/signin"
            className="text-[18px] bg-[#F6F0E5] hover:bg-amber-200 text-amber-900 px-[30px] py-[11px] rounded-full transition-colors font-medium hover:font-semibold"
          >
            Signin
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden flex flex-col items-center space-y-4 py-6 z-50">
          <Link href="/about" className="text-gray-800 hover:text-amber-700 transition-colors" onClick={() => setIsOpen(false)}>
            About
          </Link>
          <Link href="/contact" className="text-gray-800 hover:text-amber-700 transition-colors" onClick={() => setIsOpen(false)}>
            Contact
          </Link>
          <Link
            href="/signin"
            className="text-[18px] bg-[#F6F0E5] hover:bg-amber-200 text-amber-900 px-6 py-2 rounded-full transition-colors font-medium hover:font-semibold"
            onClick={() => setIsOpen(false)}
          >
            Signin
          </Link>
        </div>
      )}

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-10 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-[38px] md:text-5xl lg:text-6xl font-bold mb-[13px] md:mb-8 leading-tight">
            Your <span className="text-amber-800">AI-Powered</span> Medical Research Assistant
          </h1>
          <p className="text-[20px] md:text-2xl text-amber-700 leading-relaxed">
            Instantly find evidence-based answers, clinical studies, and case reports without the noise.
          </p>
        </div>
      </section>

      {/* Decorative Bottom Pattern */}
      <div className="flex justify-between">
        <Image src="/Pattern-1.svg" alt="Pattern" width={208} height={303} className="flex sm:h-[200px] w-auto h-[100px] "/>
        <Image src="/pattern-2 (8).svg" alt="Pattern" width={312} height={202} className="flex sm:h-[200px] w-auto h-[100px]"/>
      </div>
    </main>
  );
}
