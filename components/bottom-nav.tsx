"use client";

import Link from "next/link";
import { Activity, CalendarDays, Home, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";

const items = [
  { label: "Dashboard", href: "/", icon: Home },
  { label: "Schedule", href: "/schedule", icon: CalendarDays },
  { label: "Bookings", href: "/bookings", icon: CalendarDays },
  { label: "Progress", href: "/progress", icon: Activity },
  { label: "Profile", href: "/profile", icon: UserRound },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_24px_rgba(23,32,51,0.06)] backdrop-blur lg:hidden" aria-label="Mobile navigation">
      <div className="mx-auto flex max-w-md items-center gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className={clsxNav(active)}>
              <Icon size={19} strokeWidth={active ? 2.4 : 1.9} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function clsxNav(active: boolean) {
  return `flex min-w-0 flex-1 flex-col items-center gap-1 rounded-xl px-1 py-1.5 text-[10px] font-semibold transition ${
    active ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted"
  }`;
}
