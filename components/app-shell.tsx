"use client";

import Link from "next/link";
import {
  Bell,
  Activity,
  CalendarDays,
  ChevronDown,
  CircleHelp,
  Home,
  LogOut,
  Menu,
  Settings,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { BottomNav } from "@/components/bottom-nav";

const navItems = [
  { label: "Dashboard", href: "/", icon: Home },
  { label: "Schedule", href: "/schedule", icon: CalendarDays },
  { label: "Bookings", href: "/bookings", icon: CalendarDays },
  { label: "Progress", href: "/progress", icon: Activity },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[248px] flex-col border-r border-[#e5eaf1] bg-white px-5 py-6 transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-12 flex items-center justify-between px-2">
          <Link href="/" className="flex items-center gap-2.5" onClick={() => setSidebarOpen(false)}>
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#3268e9] text-lg font-bold text-white">
              +
            </span>
            <span className="text-[20px] font-bold tracking-[-0.03em] text-[#172033]">carely</span>
          </Link>
          <button
            className="rounded-lg p-2 text-[#8792a6] hover:bg-[#f4f6fa] lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close navigation"
          >
            <X size={19} />
          </button>
        </div>

        <nav className="space-y-1">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#a2adbd]">
            Main menu
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-[14px] font-medium transition ${
                  pathname === item.href
                    ? "bg-[#edf3ff] text-[#2e64df]"
                    : "text-[#748096] hover:bg-[#f6f8fb] hover:text-[#172033]"
                }`}
              >
                <Icon size={18} strokeWidth=                {item.label === "Dashboard" ? 2.4 : 2} />
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/profile"
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 rounded-xl px-3 py-3 text-[14px] font-medium transition hover:bg-[#f6f8fb] hover:text-[#172033] ${pathname === "/profile" ? "bg-[#edf3ff] text-[#2e64df]" : "text-[#748096]"}`}
          >
            <UserRound size={18} />
            My profile
          </Link>
        </nav>

        <div className="mt-auto space-y-1">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#a2adbd]">Support</p>
          <Link href="/assistant" className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[14px] font-medium text-[#748096] hover:bg-[#f6f8fb]">
            <CircleHelp size={18} />
            Help center
          </Link>
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[14px] font-medium text-[#748096] hover:bg-[#f6f8fb]">
            <Settings size={18} />
            Settings
          </button>
          <div className="mt-4 flex items-center gap-3 border-t border-[#edf0f4] px-2 pt-5">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-[#dce8ff] text-xs font-bold text-[#3268e9]">JD</div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-[#273249]">Jordan Davis</p>
              <p className="truncate text-[11px] text-[#98a3b4]">Patient account</p>
            </div>
            <button aria-label="Sign out" className="text-[#9ca7b8] hover:text-[#536178]">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <button
          className="fixed inset-0 z-30 bg-[#172033]/30 lg:hidden"
          aria-label="Close navigation overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="lg:pl-[248px]">
        <header className="flex h-[76px] items-center justify-between border-b border-[#e5eaf1] bg-white px-5 sm:px-8 lg:px-11">
          <button
            className="rounded-lg p-2 text-[#66748b] hover:bg-[#f4f6fa] lg:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={21} />
          </button>
          <div className="hidden text-sm font-medium text-[#8b96a8] lg:block">Thursday, February 20, 2025</div>
          <div className="ml-auto flex items-center gap-4">
            <button className="relative rounded-xl p-2.5 text-[#718096] hover:bg-[#f4f6fa]" aria-label="Notifications">
              <Bell size={19} />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#3268e9]" />
            </button>
            <Link href="/profile" className="flex items-center gap-2.5 rounded-xl py-1.5 pl-1.5 pr-2 hover:bg-[#f5f7fa]">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#dce8ff] text-[10px] font-bold text-[#3268e9]">JD</span>
              <span className="hidden text-[13px] font-semibold text-[#374258] sm:block">Jordan Davis</span>
              <ChevronDown size={15} className="hidden text-[#94a0b1] sm:block" />
            </Link>
          </div>
        </header>
        <main className="px-5 py-8 pb-24 sm:px-8 lg:px-11 lg:pb-8">{children}</main>
      </div>
      <BottomNav />
    </div>
  );
}
