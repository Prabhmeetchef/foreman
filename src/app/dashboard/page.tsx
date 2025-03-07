"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type React from "react";
import { Send, Search, Settings } from "lucide-react";
export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "ai" }[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
  
    setMessages((prev) => [...prev, { text: query, sender: "user" }]);
    setQuery("");
    setIsLoading(true);
  
    try {
      const response = await fetch("/api/langbase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });
  
      const data = await response.json();
      if (data.error) throw new Error(data.error);
  
      setMessages((prev) => [...prev, { text: data.response, sender: "ai" }]);
    } catch (err) {
      console.error("Error fetching response:", err);
      setMessages((prev) => [...prev, { text: "Error retrieving response", sender: "ai" }]);
    }
  
    setIsLoading(false);
  };
    

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin"); // Redirect to sign-in if not logged in
    }
  }, [status, router]);

  if (status === "loading") return <div className="flex items-center justify-center w-full h-[100vh]"><span id="loader2"></span></div>;

  return (
    <div className="flex h-screen bg-background justify-between">
      {/* Sidebar */}
      <div className="w-60 border-r bg-[#ede9e4] flex flex-col border-[#c6bdab]">
        <div className="p-4 border-[#c6bdab] border-b">
          <Image src="/logo@1x.png" alt="logo" width={120} height={60} />
        </div>

        <nav className="flex-1 space-y-1 border-[#c6bdab] border-b">
          <div className="flex flex-col w-full gap-2 p-4 border-[#c6bdab] border-b">
            <button onClick={() => window.location.reload()} className="flex w-full justify-start gap-2 font-normal p-[10px] hover:bg-[#e1d9cf] rounded-[6px]">
              <Search className="text-amber-950" />
              New Session
            </button>
            <button className="flex w-full justify-start gap-2 font-normal p-[10px] hover:bg-[#e1d9cf] rounded-[6px]">
              <Settings className="text-amber-950" />
              Research Settings
            </button>
          </div>
          <div className="px-6 py-2">
            <h2 className="text-sm font-medium text-muted-foreground opacity-60 text-amber-950">
              Previously
            </h2>
          </div>
        </nav>

        <div className="p-4 my-auto flex items-center gap-2">
          <Image
            src={`${session?.user?.image}`}
            alt="avatar"
            width={60}
            height={60}
            className="h-10 w-10 bg-amber-800 rounded-full"
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-amber-950">{session?.user?.name}</span>
            <span className="text-xs text-muted-foreground w-40 truncate text-amber-900 opacity-60">
              {session?.user?.email}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content - Chat Interface */}
      <div className="flex flex-col flex-grow p-6 justify-between items-center gap-2">
        <div className="flex-1 overflow-auto space-y-4 rounded-md w-full max-w-240 p-2 scrollbar-thin scrollbar-thumb-amber-950 scrollbar-track-amber-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex min-w-16 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
              key={index}
              className={`p-4 max-w-7/12 rounded-lg min-w-16 ${
                msg.sender === "user" ? "bg-amber-950 text-white self-end" : "bg-amber-50 text-amber-950 self-start"
              }`}
            >
              {msg.text}
            </div>
            </div>
          ))}
          {isLoading && (
          <div
            className="flex min-w-16"
          >
          <span
            className="p-4 max-w-7/12 rounded-lg min-w-16 text-amber-950 bg-amber-50"
          >
            processing..
          </span>
          </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="my-4 flex gap-2 w-full max-w-240">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter symptoms or research topic..."
            className="flex-1 p-2 text-base resize-none border rounded-[12px] min-h-[100px] border-[#c6bdab] max-w-240"
          />
          <button
            type="submit"
            className="flex bg-amber-800 hover:bg-amber-900 text-white p-[10px] rounded-lg gap-2 max-h-12"
            disabled={isLoading || !query.trim()}
          >
            <Send />
          </button>
        </form>
      </div>
    </div>
  );
}
