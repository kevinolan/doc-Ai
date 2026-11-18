"use client";

import Link from "next/link";
import {
  BarChart3,
  CalendarDays,
  CircleHelp,
  Home,
  LogOut,
  Menu,
  Building2,
  Search,
  Stethoscope,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { BottomNav } from "@/components/bottom-nav";

const navItems = [
  { label: "Overview", href: "/", icon: Home },
  { label: "Appointments", href: "/bookings", icon: CalendarDays },
  { label: "Patients", href: "/profile", icon: Users },
  { label: "Doctors", href: "/schedule", icon: Stethoscope },
  { label: "AI Assistant", href: "/assistant", icon: CircleHelp },
  { label: "Reports", href: "/progress", icon: BarChart3 },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[245px] flex-col border-r border-border bg-white px-[15px] py-6 transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-5 flex items-center justify-between px-2">
          <Link href="/" className="flex items-center gap-2.5" onClick={() => setSidebarOpen(false)}>
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#e0f4ef] text-xl font-bold text-primary">
              +
            </span>
            <span><span className="block text-[17px] font-bold tracking-[-0.04em] text-foreground">MediCare <b className="text-primary">AI</b></span><span className="mt-0.5 block text-[8px] font-bold tracking-[0.12em] text-muted-foreground">HEALTHCARE PLATFORM</span></span>
          </Link>
          <button
            className="rounded-lg p-2 text-[#8792a6] hover:bg-[#f4f6fa] lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close navigation"
          >
            <X size={19} />
          </button>
        </div>

        <div className="mb-6 rounded-xl border border-border bg-[#f6f9f9] p-3 text-xs text-foreground">
          <div className="flex items-center gap-2"><Building2 size={14} className="text-primary" /><b>CityCare Hospital</b></div>
          <p className="mt-1 pl-[22px] text-[9px] text-muted-foreground">Hospital workspace · Demo</p>
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
                  ? "bg-accent text-accent-foreground"
                  : "text-[#718187] hover:bg-[#f6f9f9] hover:text-foreground"
                }`}
              >
                <Icon size={17} strokeWidth={pathname === item.href ? 2.4 : 2} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto space-y-1">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#a2adbd]">Account</p>
          <Link href="/profile" className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[14px] font-medium text-[#718187] hover:bg-[#f6f9f9]">
            <UserRound size={18} />
            Nolan M.
          </Link>
          <div className="mt-4 flex items-center gap-3 border-t border-[#edf0f4] px-2 pt-5">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-accent text-xs font-bold text-accent-foreground">NM</div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-foreground">Nolan M.</p>
              <p className="truncate text-[11px] text-muted-foreground">Hospital workspace</p>
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

      <div className="lg:pl-[245px]">
        <header className="flex h-[67px] items-center justify-between border-b border-border bg-white px-5 sm:px-7 lg:px-[30px]">
          <button
            className="rounded-lg p-2 text-[#66748b] hover:bg-[#f4f6fa] lg:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={21} />
          </button>
          <div className="hidden text-[11px] text-muted-foreground sm:block">CityCare Hospital <span className="mx-2">›</span> <b className="text-foreground">{pathname === "/" ? "Overview" : pathname.slice(1).replaceAll("-", " ").replace(/^\w/, (c) => c.toUpperCase())}</b></div>
          <div className="ml-auto flex items-center gap-3">
            <label className="relative hidden sm:block"><Search size={14} className="absolute left-3 top-2.5 text-muted-foreground" /><input placeholder="Search appointments…" className="h-9 w-[210px] rounded-lg border border-border pl-8 pr-3 text-[11px] outline-none focus:border-primary" /></label>
            <Link href="/profile" aria-label="Open profile" className="grid h-8 w-8 place-items-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">NM</Link>
          </div>
        </header>
        <main className="px-5 py-8 pb-24 sm:px-8 lg:px-11 lg:pb-8">{children}</main>
      </div>
      <BottomNav />
    </div>
  );
}
