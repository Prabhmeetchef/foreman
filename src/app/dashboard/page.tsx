"use client";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type React from "react";
import { useState } from "react";
import { Send, Search, Settings } from "lucide-react";
export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsLoading(true);
    setResults(null);
    // Simulate AI processing
    setTimeout(() => {
      setResults(
        "AI research results would appear here based on the symptoms or topic provided."
      );
      setIsLoading(false);
    }, 2000);
  };
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin"); // Redirect to sign-in if not logged in
    }
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="flex  h-screen bg-background">
      {/* Sidebar */}
      <div className="w-60 border-r bg-[#ede9e4] flex flex-col border-[#c6bdab]">
        <div className="p-4 border-[#c6bdab] border-b ">
        <Image src="/logo@1x.png" alt="logo" width={120} height={60} />
        </div>

        <nav className="flex-1 space-y-1 border-[#c6bdab] border-b">
          <div className="flex flex-col w-full justify-between gap-2 p-4 border-[#c6bdab] border-b">
          <button
            className="flex w-full justify-start gap-2 font-normal p-[10px] hover:bg-[#e1d9cf] rounded-[6px] object-center"
          >
            <Search className="text-amber-950"/>
            New Session
          </button>
          <button
            className="flex w-full justify-start gap-2 font-normal p-[10px] hover:bg-[#e1d9cf] rounded-[6px] object-center"
          >
            <Settings className="text-amber-950"/>
            Research Settings
          </button>
          </div>
          <div className="px-6 py-2 ">
            <h2 className="text-sm font-medium text-muted-foreground opacity-60 text-amber-950">
              Previously
            </h2>
          </div>
          {/* This would be populated with previous research items */}
        </nav>

        <div className="p-4 my-auto flex items-center gap-2">
          <Image src={`${session?.user?.image}`} alt="avatar" width={60} height={60} className="h-10 w-10 bg-amber-800 rounded-full" />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-amber-950">{session?.user?.name}</span>
            <span className="text-xs text-muted-foreground w-40 truncate text-amber-900 opacity-60">
            {session?.user?.email}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-grow flex-col p-10 object-center justify-center">
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
          <div className="flex flex-col object-center justify-center h-full px-20">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter symptoms or research topic here..."
              className="flex min-h-[400px] p-4 text-base resize-none border rounded-md focus:ring-1 focus:ring-amber-950 border-[#c6bdab]"
            />
            <div className="my-4 flex justify-end">
            <button
              type="submit"
              className="flex bg-amber-800 hover:bg-amber-900 text-white p-2 rounded-[10px] gap-2"
              disabled={isLoading || !query.trim()}
            >
              {isLoading ? (
                <>
                  Processing<span className="ml-2 animate-pulse">...</span>
                </>
              ) : (
                <>
                  <Send />
                </>
              )}
            </button>
          </div>
          </div>
        </form>

        {results && (
          <div className="m-6 p-4 border rounded-md bg-muted/10">
            <h2 className="text-lg font-medium mb-2">Research Results</h2>
            <p>{results}</p>
          </div>
        )}
      </div>
    </div>
  );
}
