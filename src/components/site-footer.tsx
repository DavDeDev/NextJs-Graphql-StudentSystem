import * as React from "react"

// import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { Button } from "./ui/button"
import Link from "next/link"

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4  md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Icons.logo />
          <p className="text-center text-sm leading-loose md:text-left">
            Built by DavDeDev
          </p>
        </div>
        <ModeToggle />
        {process.env.NODE_ENV === "production" ? null : (
          <Button variant="secondary">
            <Link href='/api/graphql'>Apollo Server</Link>
          </Button>
        )}
      </div>
    </footer>
  )
}
