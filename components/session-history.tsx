"use client";

import { useEffect, useState } from "react";
import { Bot, CalendarDays, MessageSquare, Clock3 } from "lucide-react";
import { readCareSessions, type CareSession } from "@/lib/session-storage";
import { Card, CardContent } from "@/components/ui/card";

const icons = {
  assistant: Bot,
  feedback: MessageSquare,
  booking: CalendarDays,
};

export function SessionHistory() {
  const [sessions, setSessions] = useState<CareSession[]>([]);

  useEffect(() => {
    const refresh = () => setSessions(readCareSessions());
    refresh();
    window.addEventListener("carely-sessions-updated", refresh);
    return () => window.removeEventListener("carely-sessions-updated", refresh);
  }, []);

  if (!sessions.length) {
    return <Card><CardContent className="pt-6 text-sm text-muted-foreground">Your saved care sessions will appear here after you use the assistant, submit feedback, or complete a booking.</CardContent></Card>;
  }

  return <div className="space-y-3">{sessions.map((session) => {
    const Icon = icons[session.type];
    return <Card key={session.id}><CardContent className="flex items-start gap-4 pt-6"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground"><Icon size={18} /></span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center justify-between gap-2"><h2 className="text-sm font-bold text-foreground">{session.title}</h2><span className="flex items-center gap-1 text-[11px] text-muted-foreground"><Clock3 size={12} />{new Date(session.createdAt).toLocaleDateString()}</span></div><p className="mt-1 text-xs leading-5 text-muted-foreground">{session.summary}</p></div></CardContent></Card>;
  })}</div>;
}
