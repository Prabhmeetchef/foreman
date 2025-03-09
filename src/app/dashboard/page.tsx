"use client";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type React from "react";
import { Send, Search, EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import ReactMarkdown from "react-markdown"; // Import react-markdown
import MobileTopbar from "../../components/ui/mobile-topbar";
export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<
    { text: string; sender: "user" | "ai" }[]
  >([]);
  const [threadId, setThreadId] = useState<string | null>(null); // Add threadId state

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
        body: JSON.stringify({ message: query, threadId }), // Include threadId in the request
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setMessages((prev) => [...prev, { text: data.response, sender: "ai" }]);
      setThreadId(data.threadId); // Update threadId with the new value
    } catch (err) {
      console.error("Error fetching response:", err);
      setMessages((prev) => [
        ...prev,
        { text: "Error retrieving response", sender: "ai" },
      ]);
    }

    setIsLoading(false);
  };

  const handleNewSession = () => {
    setMessages([]); // Clear messages
    setThreadId(null); // Reset threadId
    window.location.reload(); 
  };
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin"); // Redirect to sign-in if not logged in
    }
  }, [status, router]);

  if (status === "loading")
    return (
      <div className="flex items-center justify-center w-full h-[100vh]">
        <span id="loader2"></span>
      </div>
    );

  return (
    <div className="flex h-screen bg-background justify-between">
      <MobileTopbar />
      {/* Sidebar */}
      <div className="w-60 border-r bg-[#ede9e4] flex-col border-[#c6bdab] min-w-60 hidden sm:flex">
        <div className="p-4 border-[#c6bdab] border-b">
          <Image src="/logo@1x.png" alt="logo" width={120} height={60} />
        </div>

        <nav className="flex-1 space-y-1 border-[#c6bdab] border-b">
          <div className="flex flex-col w-full gap-2 p-4 border-[#c6bdab] border-b">
            <button
              onClick={handleNewSession} // Use handleNewSession
              className="flex w-full justify-start gap-2 font-normal p-[10px] hover:bg-[#e1d9cf] rounded-[6px]"
            >
              <Search className="text-amber-950" />
              New Session
            </button>
          </div>
          <div className="px-6 py-2">
            <h2 className="text-sm font-medium opacity-60 text-amber-950">
              Previously
            </h2>
          </div>
        </nav>

        <div className="p-4 my-auto flex items-center gap-2 justify-between">
          {session?.user?.image ? (
            <Image
              src={`${session?.user?.image}`}
              alt="avatar"
              width={60}
              height={60}
              className="h-10 w-10 bg-amber-800 rounded-full"
              onError={(e) => {
                e.currentTarget.onerror = null; // Prevent infinite loop
                e.currentTarget.src = ""; // Remove the broken image
                e.currentTarget.style.display = "none"; // Hide the image element
                (e.currentTarget.nextElementSibling as HTMLElement).style.display = "flex"; // Show the initial div
              }}
            />
          ) : (
            <div className="h-10 w-10 bg-amber-50 text-amber-900 rounded-full flex items-center justify-center">
              {session?.user?.name?.charAt(0)}
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-sm font-medium text-amber-950">
              {session?.user?.name}
            </span>
            <span className="text-xs w-[120px] truncate text-amber-900 opacity-60">
              {session?.user?.email}
            </span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="focus:outline-none pl-2">
              <button>
                <EllipsisVertical className="size-[20px] text-amber-900" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 bg-white border border-[#c6bdab]">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Billing
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuItem className="hover:bg-amber-50">
                <a
                  href="https://github.com/Prabhmeetchef/foreman"
                  className="w-full h-full"
                >
                  GitHub
                </a>
              </DropdownMenuItem>
              <Link href="/contact">
                <DropdownMenuItem className="hover:bg-amber-50 hover:cursor-pointer">
                  Support
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem disabled>API</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => signOut({ callbackUrl: "/" })}
                className="hover:bg-red-400 hover:text-white"
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Content - Chat Interface */}
      <div className="flex flex-col flex-grow p-6 justify-between items-center gap-2">
        <div className="flex-1 overflow-auto space-y-4 rounded-md w-full max-w-240 p-2 scrollbar-thin scrollbar-thumb-amber-950 scrollbar-track-amber-50">
          <span className="flex w-full h-10 sm:hidden"></span>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex min-w-16 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                key={index}
                className={`p-2 max-w-7/12 rounded-lg min-w-16 sm:p-4 ${
                  msg.sender === "user"
                    ? "bg-amber-950 text-white self-end"
                    : "bg-amber-50 text-amber-950 self-start"
                }`}
              >
                {msg.sender === "ai" ? (
                  <ReactMarkdown>{msg.text}</ReactMarkdown> // Use ReactMarkdown for AI responses
                ) : (
                  msg.text // Render user messages as plain text
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex min-w-16">
              <span className="p-4 max-w-7/12 rounded-lg min-w-16 text-amber-950 bg-amber-50">
                processing<span className="dot-animation">.</span>
              </span>
            </div>
          )}

          <style jsx>{`
            @keyframes blink {
              0% {
                opacity: 1;
              }
              50% {
                opacity: 0;
              }
              100% {
                opacity: 1;
              }
            }
            .dot-animation::after {
              content: ".";
              animation: blink 1.5s infinite steps(1);
            }
          `}</style>
        </div>

        <form
          onSubmit={handleSubmit}
          className="my-4 flex gap-2 w-full max-w-240"
        >
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
