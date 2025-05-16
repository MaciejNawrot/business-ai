import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { MainNavigation } from "@/components/MainNavigation";
import { TopBar } from "@/components/TopBar";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quattro",
  description: "Package management system.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="flex h-screen">
            <MainNavigation />
            <div className="flex-1 flex flex-col">
              <TopBar />
              <main className="flex-1 overflow-y-auto">
                <div className="mx-auto max-w-[1380px] p-8">
                  {children}
                </div>
              </main>
            </div>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
