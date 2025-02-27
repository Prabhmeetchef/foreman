import Link from "next/link"
import Image from "next/image"
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Navigation */}
      <div className="flex items-center justify-between py-4 px-20 mb-20">
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
            className="bg-amber-100 hover:bg-amber-200 text-amber-900 px-6 py-2 rounded-full transition-colors font-medium hover:font-semibold"
          >
            Signin
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-20 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            Your AI-Powered Medical Research Assistant
          </h1>
          <p className="text-xl md:text-2xl text-amber-700 leading-relaxed">
            Instantly find evidence-based answers, clinical studies,<br /> and case reports without the noise.
          </p>
        </div>
      </section>

      {/* Decorative Bottom Pattern */}
      <div className="flex justify-between">
        <Image src="/Pattern-1.svg" alt="Pattern" width={208} height={303} />
        <span className="flex object-bottom"><Image src="/pattern-2 (8).svg" alt="Pattern" width={312} height={202} /></span>
      </div>
    </main>
  )
}
