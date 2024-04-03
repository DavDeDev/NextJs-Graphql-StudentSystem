import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import { Toaster } from "@/components/ui/sonner"

import { ApolloProviders } from "@/providers/apollo";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Student Service 2",
  description: "Manage your students and courses with ease.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <ApolloProviders>
      <SessionProvider session={session}>
        <html lang="en">

          <body className={`${inter.className} max-h-full min-h-screen flex flex-col items-center justify-between`}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <SiteHeader

              />
              <main className="relative h-full w-full grow flex justify-center">
                {children}
              </main>
              <SiteFooter className="border-t-2  w-full" />
              <TailwindIndicator />
              <Toaster richColors  />
            </ThemeProvider>
          </body>
        </html>
      </SessionProvider>
    </ApolloProviders>
  );
}
