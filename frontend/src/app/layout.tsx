import "./globals.css";
import "katex/dist/katex.min.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Calculus Tools",
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html className="scroll-smooth" lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "flex flex-col min-h-screen")}>
        <header className="border-b">
          <nav className="p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Calculus Tools</h1>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t">
          <nav className="p-4 flex justify-between items-center">
            <p className="text-sm">Made with ❤️ by William Pettit</p>
          </nav>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
