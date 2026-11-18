import Link from "next/link";
import { ArrowRight, Plus, Stethoscope } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import appointments from "@/data/demo-appointments.json";

const stats = [
  { label: "Total appointments", value: "128", change: "12.8% vs last week", tone: "text-[#169778]" },
  { label: "Registered patients", value: "2,840", change: "8.2% vs last week", tone: "text-[#169778]" },
  { label: "Available doctors", value: "24", change: "3 doctors on leave", tone: "text-[#829197]" },
  { label: "Pending requests", value: "9", change: "Needs review", tone: "text-[#829197]" },
];

const doctors = [
  { initials: "JW", name: "Dr. James Wilson", specialty: "Cardiologist" },
  { initials: "AN", name: "Dr. Amina Nsubuga", specialty: "Dermatologist" },
  { initials: "RK", name: "Dr. Robert Kim", specialty: "Neurologist" },
];

export default function HomePage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-[1400px]">
        <section className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-[9px] font-extrabold uppercase tracking-[1.4px] text-primary">Tuesday, 18 November 2026</p>
            <h1 className="mt-2 text-[25px] font-bold tracking-[-0.8px] text-foreground">Good morning, Nolan</h1>
            <p className="mt-1 text-[11px] text-muted-foreground">Here&apos;s what&apos;s happening at your hospital today.</p>
          </div>
          <Link href="/appointments" className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-3.5 text-[11px] font-bold text-white hover:bg-primary-strong">
            <Plus size={14} /> <span className="hidden sm:inline">New appointment</span>
          </Link>
        </section>

        <section className="relative mb-5 overflow-hidden rounded-[13px] bg-gradient-to-r from-[#0c7169] to-[#159987] p-6 text-white sm:p-7">
          <div className="relative z-10 max-w-[520px]">
            <p className="text-[9px] font-extrabold uppercase tracking-[1.4px] text-[#c8eee7]">Your care operations, simplified</p>
            <h2 className="mt-3 text-[23px] font-bold leading-tight">Better coordination.<br />More time for care.</h2>
            <p className="mt-3 max-w-[450px] text-[11px] leading-5 text-[#d2efeb]">Manage appointments, support your team and keep every patient journey moving.</p>
            <Link href="/assistant" className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-[11px] font-bold text-[#087c70]">
              <Stethoscope size={14} /> Explore AI assistant
            </Link>
          </div>
          <span className="absolute -bottom-10 right-4 rotate-[-12deg] text-[76px] text-white/20 sm:right-12">✚</span>
        </section>

        <section>
          <div className="mb-3"><h2 className="text-[13px] font-bold text-foreground">Hospital overview</h2><p className="mt-1 text-[10px] text-muted-foreground">A snapshot of hospital activity</p></div>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.label} className="shadow-none">
                <CardContent className="pt-4">
                  <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                  <p className="mt-2 text-[24px] font-bold text-foreground">{stat.value}</p>
                  <p className={`mt-1 text-[9px] ${stat.tone}`}>{stat.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-5 grid gap-4 lg:grid-cols-[1.45fr_1fr]">
          <Card className="shadow-none">
            <CardHeader className="flex flex-row items-center justify-between">
              <div><CardTitle>Upcoming appointments</CardTitle><p className="mt-1 text-[10px] text-muted-foreground">Today&apos;s patient visits</p></div>
              <Link href="/bookings" className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-[10px] font-bold text-[#4e6268]">View all <ArrowRight size={12} /></Link>
            </CardHeader>
            <div className="overflow-x-auto px-4 pb-4">
              <table className="w-full border-collapse whitespace-nowrap">
                <thead><tr className="border-b border-border text-left text-[8px] font-bold uppercase tracking-[0.7px] text-muted-foreground"><th className="px-2 py-2">Patient</th><th className="px-2 py-2">Doctor / Dept.</th><th className="px-2 py-2">Date &amp; time</th><th className="px-2 py-2">Status</th></tr></thead>
                <tbody>{appointments.map((appointment) => (
                  <tr key={appointment.id} className="border-b border-[#eff2f3] text-[10px] last:border-0">
                    <td className="px-2 py-3"><div className="flex items-center gap-2 font-bold"><span className="grid h-7 w-7 place-items-center rounded-full bg-[#e7f1ff] text-[9px] text-[#5279ac]">{appointment.initials}</span>{appointment.patient}</div></td>
                    <td className="px-2 py-3">{appointment.detail}<br /><span className="text-muted-foreground">Care department</span></td>
                    <td className="px-2 py-3">{appointment.month} {appointment.date}<br /><span className="text-muted-foreground">{appointment.time}</span></td>
                    <td className="px-2 py-3"><span className="rounded-md bg-[#e4f6ed] px-2 py-1 text-[8px] font-extrabold text-[#258c68]">Confirmed</span></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </Card>

          <Card className="shadow-none">
            <CardHeader><CardTitle>Appointment activity</CardTitle><p className="mt-1 text-[10px] text-muted-foreground">Visits over the last 7 days</p></CardHeader>
            <CardContent className="pt-0">
              <div className="flex h-[145px] items-end gap-3 border-b border-border px-2 pt-3">
                {[48,72,56,88,66,95,75].map((height, index) => <div key={index} className={`flex-1 rounded-t-md ${index % 2 ? "bg-primary" : "bg-[#bfe7df]"}`} style={{ height: `${height}%` }} />)}
              </div>
              <div className="mt-2 flex justify-around text-[9px] text-muted-foreground">{["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((day) => <span key={day}>{day}</span>)}</div>
            </CardContent>
          </Card>
        </section>

        <Card className="mt-4 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between">
            <div><CardTitle>Our specialists</CardTitle><p className="mt-1 text-[10px] text-muted-foreground">Medical team directory</p></div>
            <Link href="/schedule" className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-[10px] font-bold text-[#4e6268]">View doctors <ArrowRight size={12} /></Link>
          </CardHeader>
          <CardContent className="grid gap-3 pt-0 md:grid-cols-3">
            {doctors.map((doctor) => (
              <div key={doctor.name} className="rounded-lg border border-border p-4">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#e7f1ff] text-[9px] font-bold text-[#5279ac]">{doctor.initials}</span>
                <p className="mt-3 text-[11px] font-bold text-foreground">{doctor.name}</p>
                <p className="mt-1 text-[9px] text-muted-foreground">{doctor.specialty}</p>
                <p className="mt-3 text-[9px] text-[#189477]">● Available today</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
