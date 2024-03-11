"use client"

import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { User } from "next-auth"
import { Link } from "lucide-react";
import { UserAvatar } from "./ui/user-avatar";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";
import { logout } from "@/actions/logout";


export function SiteHeader({ className }: React.HTMLAttributes<HTMLElement>) {
  const user = useCurrentUser()

  // create a function to handle the logout as server action
  const handleLogout = async () => {
    logout();
  }

  return (
    <header className={cn("flex items-center justify-between w-full sticky top-0 z-40  bg-background text-black", className)}>
      {user && (<DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar
            user={{ name: user.name || undefined, image: user.image || undefined }}
            className="h-8 w-8"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-1 leading-none">
              {user.name && <p className="font-medium">{user.name}</p>}
              {user.email && (
                <p className="w-[200px] truncate text-sm text-muted-foreground">
                  {user.email}
                </p>
              )}
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