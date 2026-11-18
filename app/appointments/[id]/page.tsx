import Link from "next/link";
import { ArrowLeft, CalendarDays, CheckCircle2, Clock3, MapPin, MoreHorizontal, Phone, UserRound } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eyebrow, PageDescription, PageTitle } from "@/components/ui/typography";

export default function AppointmentDetailPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-[980px]">
        <Link href="/bookings" className="mb-7 inline-flex items-center gap-2 text-[13px] font-medium text-muted-foreground hover:text-primary"><ArrowLeft size={16} /> Back to bookings</Link>
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div><Eyebrow>Appointment details</Eyebrow><PageTitle className="mt-2">Routine check-up</PageTitle><PageDescription>Monday, February 24, 2025 · 10:30 AM</PageDescription></div>
          <span className="flex w-fit items-center gap-1.5 rounded-full bg-[#edf8f2] px-3 py-1.5 text-xs font-bold text-[#2b9a60]"><CheckCircle2 size={14} /> Confirmed</span>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
          <Card>
            <CardHeader className="border-b border-border"><CardTitle>Appointment overview</CardTitle></CardHeader>
            <CardContent className="space-y-5 pt-6">
              <DetailRow icon={<CalendarDays size={17} />} label="Date and time" value="Monday, February 24, 2025 at 10:30 AM" />
              <DetailRow icon={<Clock3 size={17} />} label="Duration" value="30 minutes" />
              <DetailRow icon={<UserRound size={17} />} label="Provider" value="Dr. Emily Carter · Primary care" />
              <DetailRow icon={<MapPin size={17} />} label="Location" value="Downtown Medical Center, 1248 Oak Street" />
              <DetailRow icon={<Phone size={17} />} label="Clinic phone" value="+1 (555) 019-2000" />
            </CardContent>
          </Card>
          <Card className="h-fit">
            <CardHeader><CardTitle>Before you arrive</CardTitle><p className="mt-1 text-xs text-muted-foreground">A few helpful reminders.</p></CardHeader>
            <CardContent className="pt-0"><ul className="space-y-3 text-xs leading-5 text-muted-foreground"><li>Bring a photo ID and insurance card.</li><li>Arrive 10 minutes early for check-in.</li><li>Bring a list of current medications if relevant.</li></ul></CardContent>
          </Card>
        </div>
        <Card className="mt-5">
          <CardContent className="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div><p className="text-sm font-bold text-foreground">Need to make a change?</p><p className="mt-1 text-xs text-muted-foreground">You can reschedule or cancel before the clinic&apos;s cutoff time.</p></div>
            <div className="flex gap-2"><ButtonLink href="/schedule" variant="outline" size="sm">Reschedule</ButtonLink><button className="rounded-xl px-3 py-2 text-xs font-semibold text-muted-foreground hover:bg-muted">Cancel appointment</button><button className="rounded-xl p-2 text-muted-foreground hover:bg-muted" aria-label="More appointment actions"><MoreHorizontal size={17} /></button></div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

function DetailRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className="flex gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">{icon}</span><div><p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</p><p className="mt-1 text-sm font-semibold text-foreground">{value}</p></div></div>;
}
