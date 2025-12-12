import "./globals.css";
import type { Metadata } from "next";
import { QueryProvider } from "@/providers/QueryProvider";

export const metadata: Metadata = {
  title: "Server-Driven UI Demo",
  description: "Type-safe server-driven UI with React Query",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
