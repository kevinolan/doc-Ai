import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight, Clock3, MapPin, Plus } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eyebrow, PageDescription, PageTitle } from "@/components/ui/typography";

const days = [
  { day: "24", label: "Mon", active: true },
  { day: "25", label: "Tue", active: false },
  { day: "26", label: "Wed", active: false },
  { day: "27", label: "Thu", active: false },
  { day: "28", label: "Fri", active: false },
];

const slots = [
  { time: "9:00 AM", service: "Routine check-up", provider: "Dr. Emily Carter", location: "Downtown Medical Center", available: true },
  { time: "9:30 AM", service: "Routine check-up", provider: "Dr. Emily Carter", location: "Downtown Medical Center", available: true },
  { time: "10:00 AM", service: "Follow-up visit", provider: "Dr. Emily Carter", location: "Downtown Medical Center", available: false },
  { time: "10:30 AM", service: "Routine check-up", provider: "Dr. Michael Lee", location: "Pearl District Clinic", available: true },
  { time: "11:00 AM", service: "Follow-up visit", provider: "Dr. Michael Lee", location: "Pearl District Clinic", available: true },
];

export default function SchedulePage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-[1180px]">
        <Link href="/" className="mb-7 inline-flex items-center gap-2 text-[13px] font-medium text-muted-foreground hover:text-primary">
          <ArrowLeft size={16} /> Back to dashboard
        </Link>
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <Eyebrow>Availability</Eyebrow>
            <PageTitle className="mt-2">Schedule</PageTitle>
            <PageDescription>Browse available times across your care team.</PageDescription>
          </div>
          <ButtonLink href="/appointments" size="md"><Plus size={16} /> Book from schedule</ButtonLink>
        </div>

        <Card className="mt-8">
          <CardHeader className="flex flex-col gap-5 border-b border-border sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>February 2025</CardTitle>
              <p className="mt-1 text-xs text-muted-foreground">Select a day to see available appointment times.</p>
            </div>
            <div className="flex items-center gap-1">
              <button className="rounded-lg p-2 text-muted-foreground hover:bg-muted" aria-label="Previous week"><ChevronLeft size={17} /></button>
              <button className="rounded-lg p-2 text-muted-foreground hover:bg-muted" aria-label="Next week"><ChevronRight size={17} /></button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-5 gap-2">
              {days.map((item) => (
                <button key={item.day} className={`rounded-xl border px-2 py-3 text-center transition ${item.active ? "border-primary bg-primary text-white" : "border-border text-muted-foreground hover:border-primary/40"}`}>
                  <span className="block text-[10px] font-semibold uppercase">{item.label}</span>
                  <span className="mt-1 block text-lg font-bold">{item.day}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <section className="mt-8">
          <div className="mb-4 flex items-end justify-between">
            <div><h2 className="type-section-title">Monday, February 24</h2><p className="mt-1 text-sm text-muted-foreground">5 time slots · 3 available</p></div>
            <span className="rounded-full bg-accent px-3 py-1 text-[11px] font-semibold text-accent-foreground">Your timezone</span>
          </div>
          <div className="space-y-3">
            {slots.map((slot) => <ScheduleSlot key={`${slot.time}-${slot.service}`} {...slot} />)}
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function ScheduleSlot({ time, service, provider, location, available }: (typeof slots)[number]) {
  return (
    <Card className={`flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-6 ${!available ? "opacity-60" : ""}`}>
      <div className="flex items-center gap-3 sm:w-32">
        <Clock3 size={17} className={available ? "text-primary" : "text-muted-foreground"} />
        <span className="text-sm font-bold text-foreground">{time}</span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-foreground">{service}</p>
        <p className="mt-1 text-xs text-muted-foreground">{provider}</p>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin size={13} />{location}</p>
      </div>
      {available ? <ButtonLink href="/appointments" size="sm">Select time</ButtonLink> : <span className="w-fit rounded-full bg-muted px-3 py-1.5 text-[11px] font-semibold text-muted-foreground">Unavailable</span>}
    </Card>
  );
}
