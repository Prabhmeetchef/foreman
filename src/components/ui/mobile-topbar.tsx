"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { Menu, X, EllipsisVertical } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MobileTopbarProps {
  children?: React.ReactNode; // Add this line to accept children
}

export default function MobileTopbar({ children }: MobileTopbarProps) {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="sm:hidden fixed top-0 left-0 w-full bg-[#ede9e4] p-4 flex justify-between items-center border-b border-[#c6bdab] z-50">
      <Image src="/logo@1x.png" alt="logo" width={100} height={50} />

      <button onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X className="text-amber-950" /> : <Menu className="text-amber-950" />}
      </button>
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#ede9e4] flex flex-col border-b border-[#c6bdab]">
          {/* Session Controls */}

          <div className="border-t border-[#c6bdab] py-2">
            <h2 className="text-sm font-medium opacity-60 text-amber-950 px-2">Previously</h2>
            <div className="p-2 w-full h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-amber-950 scrollbar-track-amber-50">
              {/* Render the children here */}
              {children}
            </div>
          </div>

          {/* User Profile & Options */}
          <div className="p-4 flex items-center gap-2 justify-between border-t border-[#c6bdab]">
            <div className="flex gap-2">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="avatar"
                  width={40}
                  height={40}
                  className="h-10 w-10 bg-amber-800 rounded-full"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "";
                    e.currentTarget.style.display = "none";
                    (e.currentTarget.nextElementSibling as HTMLElement).style.display = "flex";
                  }}
                />
              ) : (
                <div className="h-10 w-10 bg-amber-50 text-amber-900 rounded-full flex items-center justify-center">
                  {session?.user?.name?.charAt(0)}
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-sm font-medium text-amber-950">{session?.user?.name}</span>
                <span className="text-xs w-[120px] truncate text-amber-900 opacity-60">{session?.user?.email}</span>
              </div>
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
                  <a href="https://github.com/Prabhmeetchef/foreman" className="w-full h-full">GitHub</a>
                </DropdownMenuItem>
                <Link href="/contact">
                  <DropdownMenuItem className="hover:bg-amber-50 hover:cursor-pointer">Support</DropdownMenuItem>
                </Link>
                <DropdownMenuItem disabled>API</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })} className="hover:bg-red-400 hover:text-white">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}
    </div>
  );
}