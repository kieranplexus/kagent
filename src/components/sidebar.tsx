"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigation = [
  {
    label: "Dashboard",
    href: "/",
    icon: "⬡",
  },
  {
    label: "Timeline",
    href: "/projects/oracle-health/timeline",
    icon: "◫",
  },
  {
    label: "Settings",
    href: "/settings",
    icon: "⚙",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-60 flex-col bg-sidebar-bg text-sidebar-fg">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-white/10 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent font-bold text-white text-sm">
          K
        </div>
        <span className="text-lg font-semibold tracking-tight">Kagent</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-active/20 text-white"
                  : "text-sidebar-fg/70 hover:bg-white/5 hover:text-sidebar-fg"
              )}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-xs font-medium text-accent">
            U
          </div>
          <div className="flex-1 truncate">
            <p className="text-sm font-medium">User</p>
            <p className="text-xs text-sidebar-fg/50">Owner</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
