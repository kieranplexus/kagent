import type { Metadata } from "next";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kagent — Project & Task Management",
  description:
    "Manage tasks, documents, budgets, and collaboration on a timeline.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Sidebar />
        <div className="ml-60">
          <Header />
          <main className="p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
