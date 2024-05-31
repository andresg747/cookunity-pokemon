import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Pokemon Battle Simulator - CookUnity",
  description: "Pokemon Battle Simulator - CookUnity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        id="root"
        style={{
          position: "relative",
        }}
        className={cn(
          "bg-background font-sans antialiased max-w-7xl m-auto mt-8",
          fontSans.variable
        )}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
