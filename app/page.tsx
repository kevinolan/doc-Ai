import Link from "next/link";
import { ArrowRight, CalendarPlus, CircleHelp, Clock3, MapPin, MoreHorizontal, Stethoscope } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import appointments from "@/data/demo-appointments.json";

export default function HomePage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-[1180px]">
        <section className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-sm font-medium text-[#8a96a9]">Thursday, February 20, 2025</p>
            <h1 className="text-[30px] font-bold tracking-[-0.04em] text-[#172033] sm:text-[34px]">Good morning, Jordan</h1>
            <p className="mt-2 text-[15px] text-[#7b879a]">Here&apos;s what&apos;s happening with your care today.</p>
          </div>
          <Link href="/appointments" className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#3268e9] px-5 py-3 text-[13px] font-semibold text-white shadow-[0_8px_18px_rgba(50,104,233,0.2)] transition hover:bg-[#285bd6]">
            <CalendarPlus size={17} />
            Book an appointment
          </Link>
        </section>

        <section className="mt-9 grid gap-5 lg:grid-cols-[1.55fr_1fr]">
          <div className="relative overflow-hidden rounded-2xl bg-[#3268e9] p-7 text-white sm:p-8">
            <div className="relative z-10 max-w-[390px]">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-[#bfd1ff]">Your next appointment</p>
              <h2 className="text-[25px] font-bold tracking-[-0.03em]">Routine check-up</h2>
              <p className="mt-1 text-[14px] text-[#d9e3ff]">with Dr. Emily Carter</p>
              <div className="mt-7 flex flex-wrap gap-5 text-[13px] text-[#eff3ff]">
                <span className="flex items-center gap-2"><CalendarPlus size={16} /> Feb 24, 2025</span>
                <span className="flex items-center gap-2"><Clock3 size={16} /> 10:30 AM</span>
              </div>
              <div className="mt-3 flex items-center gap-2 text-[13px] text-[#d9e3ff]"><MapPin size={16} /> Downtown Medical Center</div>
              <Link href="/appointments/apt-001" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-white/15 px-4 py-2.5 text-[12px] font-semibold text-white hover:bg-white/25">
                View appointment <ArrowRight size={15} />
              </Link>
            </div>
            <div className="absolute -bottom-20 -right-10 h-64 w-64 rounded-full border-[34px] border-white/10" />
            <div className="absolute -right-24 -top-32 h-72 w-72 rounded-full border-[1px] border-white/10" />
          </div>
          <div className="rounded-2xl border border-[#e5eaf1] bg-white p-7 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#a0aaba]">Care summary</p>
                <h2 className="mt-2 text-[20px] font-bold tracking-[-0.03em] text-[#172033]">Your health at a glance</h2>
              </div>
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#edf3ff] text-[#3268e9]"><Stethoscope size={19} /></div>
            </div>
            <div className="mt-7 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-[#f7f9fc] p-4"><p className="text-[24px] font-bold text-[#172033]">04</p><p className="mt-1 text-[12px] text-[#8792a5]">Appointments</p></div>
              <div className="rounded-xl bg-[#f7f9fc] p-4"><p className="text-[24px] font-bold text-[#172033]">02</p><p className="mt-1 text-[12px] text-[#8792a5]">Care providers</p></div>
            </div>
            <Link href="/profile" className="mt-5 inline-flex items-center gap-1 text-[12px] font-semibold text-[#3268e9] hover:text-[#285bd6]">View health profile <ArrowRight size={14} /></Link>
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-[1.55fr_1fr]">
          <div className="rounded-2xl border border-[#e5eaf1] bg-white p-6 sm:p-7">
            <div className="flex items-center justify-between">
              <div><h2 className="text-[18px] font-bold tracking-[-0.02em] text-[#172033]">Upcoming appointments</h2><p className="mt-1 text-[13px] text-[#8a96a9]">Keep track of your upcoming care.</p></div>
              <Link href="/bookings" className="text-[12px] font-semibold text-[#3268e9] hover:text-[#285bd6]">View all</Link>
            </div>
            <div className="mt-6 divide-y divide-[#edf0f4]">
              {appointments.map((appointment) => (
                <AppointmentRow key={appointment.id} {...appointment} />
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-[#e5eaf1] bg-white p-6 sm:p-7">
            <div className="flex items-center justify-between"><div><h2 className="text-[18px] font-bold tracking-[-0.02em] text-[#172033]">Quick actions</h2><p className="mt-1 text-[13px] text-[#8a96a9]">Manage your care in a few clicks.</p></div></div>
            <div className="mt-6 space-y-2.5">
              <QuickAction icon={<CalendarPlus size={17} />} label="Book an appointment" href="/appointments" />
              <QuickAction icon={<UserRoundIcon />} label="Update your profile" href="/profile" />
              <QuickAction icon={<Clock3 size={17} />} label="View saved history" href="/history" />
              <QuickAction icon={<CircleHelpIcon />} label="Get help with care" href="/assistant" />
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function AppointmentRow({ date, month, title, detail, time, color }: { date: string; month: string; title: string; detail: string; time: string; color: string }) {
  return <div className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"><div className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${color === "blue" ? "bg-[#edf3ff] text-[#3268e9]" : "bg-[#f3edff] text-[#8655d7]"}`}><div className="text-center"><p className="text-[15px] font-bold leading-4">{date}</p><p className="mt-0.5 text-[9px] font-bold tracking-wider">{month}</p></div></div><div className="min-w-0 flex-1"><p className="truncate text-[13px] font-semibold text-[#263149]">{title}</p><p className="mt-1 truncate text-[12px] text-[#8792a5]">{detail}</p></div><div className="hidden text-right sm:block"><p className="text-[12px] font-semibold text-[#526078]">{time}</p><p className="mt-1 text-[11px] text-[#9aa4b4]">Upcoming</p></div><button aria-label={`More options for ${title}`} className="text-[#a0aaba] hover:text-[#536178]"><MoreHorizontal size={18} /></button></div>;
}

function QuickAction({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  return <Link href={href} className="flex items-center gap-3 rounded-xl border border-[#edf0f4] px-3.5 py-3 text-[12px] font-semibold text-[#526078] transition hover:border-[#cbd9fa] hover:bg-[#f8faff] hover:text-[#3268e9]"><span className="text-[#3268e9]">{icon}</span>{label}<ArrowRight size={14} className="ml-auto text-[#abb4c1]" /></Link>;
}

function UserRoundIcon() { return <Stethoscope size={17} />; }
function CircleHelpIcon() { return <CircleHelp size={17} />; }
