"use client";

import { usePathname } from "next/navigation";

function getPageTitle(pathname: string): string {
  if (pathname === "/") return "Dashboard";
  if (pathname === "/projects") return "Projects";
  if (pathname.startsWith("/projects/")) return "Project";
  if (pathname === "/personal") return "Personal Finance";
  if (pathname === "/personal/budgets") return "Personal Budgets";
  if (pathname === "/personal/expenses") return "Business Expenses";
  if (pathname === "/settings") return "Settings";
  return "Kagent";
}

export function Header() {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card-bg/80 px-6 backdrop-blur-sm">
      <h1 className="text-xl font-semibold">{title}</h1>
      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="h-9 w-64 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-accent"
          />
        </div>
      </div>
    </header>
  );
}
