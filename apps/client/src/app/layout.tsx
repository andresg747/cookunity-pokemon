import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import App from "./app";

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
        <App>{children}</App>
      </body>
    </html>
  );
}
