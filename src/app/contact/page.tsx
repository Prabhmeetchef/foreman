"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // You can add an API call here later
  };

  return (
    <div className="flex flex-col justify-between min-h-screen bg-white">
        <nav className="flex items-center justify-center py-4 px-20 gap-80">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold">
            <Image src="/logo@1x.png" alt="Logo" width={120} height={40} />
          </Link>
        </div>

        <div className="flex items-center space-x-12">
          <Link href="/about" className="text-gray-800 hover:text-amber-700 transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-gray-800 hover:text-amber-700 transition-colors">
            Contact
          </Link>
        </div>
        <div>
          <Link
            href="/signin"
            className="text-[18px] bg-amber-100 hover:bg-amber-200 text-amber-900 px-[30px] py-[11px] rounded-full transition-colors font-medium hover:font-semibold"
          >
            Signin
          </Link>
        </div>
      </nav>
      <div className="flex flex-grow flex-col items-center justify-center">
        <h1 className="text-[30px] mb-10 text-amber-950 font-semibold">Contact Us</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="border-2 border-amber-950 rounded-[6px] px-4 py-2"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="phone"
            name="phone"
            placeholder="Your phone number"
            className="border-2 border-amber-950 rounded-[6px] px-4 py-2"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={4}
            className="border-2 border-amber-950 rounded-[6px] px-4 py-2"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="bg-amber-950 text-white px-6 py-2 rounded-[6px] hover:bg-amber-900 hover:cursor-pointer"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}