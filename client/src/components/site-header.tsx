"use client"

import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { UserAvatar } from "./ui/user-avatar";
import { Badge } from "./ui/badge";


export function SiteHeader({ className }: React.HTMLAttributes<HTMLElement>) {
  const user = useCurrentUser()
  const session = useSession();

  // create a function to handle the logout as server action
  const handleLogout = async () => {
    logout();
  }

  return (
    <header className={cn("flex justify-between px-10 h-16 sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/70", className)}>
      <Link href="/" className="flex items-center gap-2">Student System</Link>
      {user && (<DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex gap-4 items-center">
            <p className="text-muted-foreground">Hello, {user.name}</p>
            <UserAvatar
              user={{ name: user.name || undefined, image: user.image || undefined }}
              className="h-8 w-8" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-1 leading-none">
              {/* {session.data && <p className="font-medium">{JSON.stringify(session.data.user)}</p>} */}
              <p className="font-medium">{user.name}</p>
              {user.id}
              <p><Badge>{user.role}</Badge></p>

              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>

            </div>
          </div>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onSelect={handleLogout}
          >
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>)}

    </header>
  );
}