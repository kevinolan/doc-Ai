import Link from "next/link";
import { ArrowLeft, CalendarDays, CheckCircle2, Clock3, MapPin, Plus, Search, XCircle } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eyebrow, PageDescription, PageTitle } from "@/components/ui/typography";
import appointments from "@/data/demo-appointments.json";

export default function BookingsPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-[1080px]">
        <Link href="/" className="mb-7 inline-flex items-center gap-2 text-[13px] font-medium text-muted-foreground hover:text-primary">
          <ArrowLeft size={16} /> Back to dashboard
        </Link>
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div><Eyebrow>Care history</Eyebrow><PageTitle className="mt-2">Bookings</PageTitle><PageDescription>View and manage your upcoming and past appointments.</PageDescription></div>
          <ButtonLink href="/appointments"><Plus size={16} /> New booking</ButtonLink>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <label className="relative flex-1"><Search size={16} className="absolute left-3 top-3.5 text-muted-foreground" /><input placeholder="Search bookings" className="h-11 w-full rounded-xl border border-border bg-card pl-9 pr-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10" /></label>
          <select className="h-11 rounded-xl border border-border bg-card px-3 text-sm text-muted-foreground outline-none focus:border-primary"><option>All statuses</option><option>Upcoming</option><option>Completed</option><option>Cancelled</option></select>
        </div>

        <div className="mt-7 flex items-center gap-5 border-b border-border text-sm font-semibold">
          <button className="border-b-2 border-primary pb-3 text-primary">Upcoming (2)</button>
          <button className="pb-3 text-muted-foreground hover:text-foreground">Past appointments</button>
        </div>

        <section className="mt-5 space-y-3">
          {appointments.map((appointment) => (
            <BookingRow key={appointment.id} {...appointment} />
          ))}
        </section>
      </div>
    </AppShell>
  );
}

function BookingRow({ id, title, detail, date, month, time }: (typeof appointments)[number] & { id: string }) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
          <CalendarDays size={20} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Link href={`/appointments/${id}`} className="text-sm font-bold text-foreground hover:text-primary">{title}</Link>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#edf8f2] px-2 py-1 text-[10px] font-bold text-[#2b9a60]"><CheckCircle2 size={11} /> Upcoming</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><CalendarDays size={13} />{month} {date}, 2025</span>
            <span className="flex items-center gap-1.5"><Clock3 size={13} />{time}</span>
            <span className="flex items-center gap-1.5"><MapPin size={13} />Downtown Medical Center</span>
          </div>
        </div>
        <button className="flex w-fit items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground"><XCircle size={14} /> Cancel</button>
      </CardContent>
    </Card>
  );
}
