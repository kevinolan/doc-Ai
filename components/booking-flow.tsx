"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  MapPin,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { saveCareSession } from "@/lib/session-storage";

type Service = {
  name: string;
  description: string;
  duration: string;
};

const services: Service[] = [
  { name: "Routine check-up", description: "General health and wellness visit", duration: "30 min" },
  { name: "Follow-up visit", description: "Review progress with your care team", duration: "20 min" },
  { name: "Dental cleaning", description: "Routine cleaning and oral exam", duration: "45 min" },
];

const providers = [
  { name: "Any available provider", detail: "Earliest available appointment" },
  { name: "Dr. Emily Carter", detail: "Primary care" },
  { name: "Dr. Michael Lee", detail: "Dentistry" },
];

const dateOptions = [
  { day: "24", weekday: "Mon", month: "Feb" },
  { day: "25", weekday: "Tue", month: "Feb" },
  { day: "26", weekday: "Wed", month: "Feb" },
  { day: "27", weekday: "Thu", month: "Feb" },
  { day: "28", weekday: "Fri", month: "Feb" },
];

const timeOptions = ["9:00 AM", "9:30 AM", "10:30 AM", "11:00 AM", "1:30 PM", "2:00 PM"];

export function BookingFlow() {
  const [step, setStep] = useState(1);
  const [service, setService] = useState(services[0]);
  const [provider, setProvider] = useState(providers[0]);
  const [date, setDate] = useState(dateOptions[0]);
  const [time, setTime] = useState(timeOptions[2]);
  const [location, setLocation] = useState("Downtown Medical Center");
  const [confirmed, setConfirmed] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantMessage, setAssistantMessage] = useState("");

  const appointmentLabel = useMemo(
    () => `${date.weekday}, ${date.month} ${date.day} at ${time}`,
    [date, time],
  );

  if (confirmed) {
    return (
      <div className="mx-auto max-w-[700px] rounded-2xl border border-[#e5eaf1] bg-white p-8 text-center sm:p-12">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#edf8f2] text-[#2b9a60]">
          <Check size={30} />
        </div>
        <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.15em] text-[#2b9a60]">Appointment confirmed</p>
        <h2 className="mt-2 text-[26px] font-bold tracking-[-0.03em] text-[#172033]">You&apos;re all set, Jordan</h2>
        <p className="mx-auto mt-3 max-w-[430px] text-[14px] leading-6 text-[#7b879a]">
          We&apos;ve reserved your appointment and added it to your schedule. A confirmation has been sent to your email.
        </p>
        <div className="mx-auto mt-8 max-w-[430px] rounded-xl bg-[#f7f9fc] p-5 text-left">
          <p className="text-[15px] font-bold text-[#263149]">{service.name}</p>
          <p className="mt-1 text-[13px] text-[#7b879a]">{provider.name}</p>
          <div className="mt-4 space-y-2 text-[12px] text-[#67748a]">
            <p className="flex items-center gap-2"><CalendarDays size={15} className="text-[#3268e9]" />{appointmentLabel}</p>
            <p className="flex items-center gap-2"><MapPin size={15} className="text-[#3268e9]" />{location}</p>
          </div>
        </div>
        <button onClick={() => setConfirmed(false)} className="mt-8 text-[13px] font-semibold text-[#3268e9] hover:text-[#285bd6]">
          Book another appointment
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_290px]">
      <Card className="p-6 sm:p-8">
        <div className="mb-8 flex items-center gap-2">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex flex-1 items-center gap-2">
              <div className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-[11px] font-bold ${step >= item ? "bg-[#3268e9] text-white" : "bg-[#edf0f4] text-[#95a0b0]"}`}>
                {step > item ? <Check size={14} /> : item}
              </div>
              <span className={`hidden text-[11px] font-semibold sm:block ${step >= item ? "text-[#3268e9]" : "text-[#9ca7b8]"}`}>
                {item === 1 ? "Details" : item === 2 ? "Time" : "Confirm"}
              </span>
              {item < 3 && <div className={`h-px flex-1 ${step > item ? "bg-[#3268e9]" : "bg-[#e5eaf1]"}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div>
            <h2 className="text-[21px] font-bold tracking-[-0.03em] text-[#172033]">What kind of care do you need?</h2>
            <p className="mt-2 text-[13px] text-[#8a96a9]">Choose a service and provider preference.</p>
            <div className="mt-6 space-y-2.5">
              {services.map((item) => (
                <button key={item.name} onClick={() => setService(item)} className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${service.name === item.name ? "border-[#3268e9] bg-[#f8faff] ring-2 ring-[#3268e9]/10" : "border-[#e5eaf1] hover:border-[#cbd9fa]"}`}>
                  <span className={`grid h-10 w-10 place-items-center rounded-lg ${service.name === item.name ? "bg-[#edf3ff] text-[#3268e9]" : "bg-[#f5f7fa] text-[#8792a5]"}`}><CalendarDays size={18} /></span>
                  <span className="min-w-0 flex-1"><span className="block text-[13px] font-bold text-[#263149]">{item.name}</span><span className="mt-1 block text-[12px] text-[#8792a5]">{item.description} · {item.duration}</span></span>
                  <span className={`h-4 w-4 rounded-full border-[5px] ${service.name === item.name ? "border-[#3268e9]" : "border-[#dfe4eb]"}`} />
                </button>
              ))}
            </div>
            <label className="mt-7 block text-[12px] font-semibold text-[#536078]">Preferred provider</label>
            <div className="relative mt-2"><select value={provider.name} onChange={(event) => setProvider(providers.find((item) => item.name === event.target.value) ?? providers[0])} className="h-11 w-full appearance-none rounded-xl border border-[#e1e6ee] bg-white px-3 text-[13px] text-[#334058] outline-none focus:border-[#3268e9]"><option>{providers[0].name}</option><option>{providers[1].name}</option><option>{providers[2].name}</option></select><ChevronDown size={16} className="pointer-events-none absolute right-3 top-3.5 text-[#9ca7b8]" /></div>
            <button onClick={() => setStep(2)} className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#3268e9] px-5 py-3 text-[12px] font-semibold text-white hover:bg-[#285bd6]">Choose a time <ArrowRight size={16} /></button>
          </div>
        )}

        {step === 2 && (
          <div>
            <button onClick={() => setStep(1)} className="mb-5 inline-flex items-center gap-2 text-[12px] font-semibold text-[#7c889b] hover:text-[#3268e9]"><ArrowLeft size={15} /> Back</button>
            <h2 className="text-[21px] font-bold tracking-[-0.03em] text-[#172033]">Choose a date and time</h2>
            <p className="mt-2 text-[13px] text-[#8a96a9]">Showing availability for {service.name.toLowerCase()}.</p>
            <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
              {dateOptions.map((item) => (
                <button key={item.day} onClick={() => setDate(item)} className={`min-w-[67px] rounded-xl border px-3 py-3 text-center ${date.day === item.day ? "border-[#3268e9] bg-[#3268e9] text-white" : "border-[#e5eaf1] text-[#657289] hover:border-[#cbd9fa]"}`}><span className="block text-[10px] font-semibold uppercase">{item.weekday}</span><span className="mt-1 block text-[18px] font-bold">{item.day}</span><span className="mt-0.5 block text-[10px]">{item.month}</span></button>
              ))}
            </div>
            <div className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {timeOptions.map((item) => <button key={item} onClick={() => setTime(item)} className={`rounded-xl border px-3 py-3 text-[12px] font-semibold ${time === item ? "border-[#3268e9] bg-[#edf3ff] text-[#3268e9]" : "border-[#e5eaf1] text-[#657289] hover:border-[#cbd9fa]"}`}><Clock3 size={14} className="mr-1.5 inline" />{item}</button>)}
            </div>
            <label className="mt-7 block text-[12px] font-semibold text-[#536078]">Location</label>
            <div className="relative mt-2"><select value={location} onChange={(event) => setLocation(event.target.value)} className="h-11 w-full appearance-none rounded-xl border border-[#e1e6ee] bg-white px-3 text-[13px] text-[#334058] outline-none focus:border-[#3268e9]"><option>Downtown Medical Center</option><option>Pearl District Clinic</option></select><ChevronDown size={16} className="pointer-events-none absolute right-3 top-3.5 text-[#9ca7b8]" /></div>
            <button onClick={() => setStep(3)} className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#3268e9] px-5 py-3 text-[12px] font-semibold text-white hover:bg-[#285bd6]">Review appointment <ArrowRight size={16} /></button>
          </div>
        )}

        {step === 3 && (
          <div>
            <button onClick={() => setStep(2)} className="mb-5 inline-flex items-center gap-2 text-[12px] font-semibold text-[#7c889b] hover:text-[#3268e9]"><ArrowLeft size={15} /> Back</button>
            <h2 className="text-[21px] font-bold tracking-[-0.03em] text-[#172033]">Review your appointment</h2>
            <p className="mt-2 text-[13px] text-[#8a96a9]">Please check the details before confirming.</p>
            <div className="mt-6 divide-y divide-[#edf0f4] rounded-xl border border-[#e5eaf1] px-5">
              <ReviewRow label="Service" value={`${service.name} · ${service.duration}`} />
              <ReviewRow label="Provider" value={provider.name} />
              <ReviewRow label="Date and time" value={appointmentLabel} />
              <ReviewRow label="Location" value={location} />
            </div>
            <div className="mt-5 flex gap-3 rounded-xl bg-[#f7f9fc] p-4 text-[12px] leading-5 text-[#738096]"><ShieldCheck size={17} className="shrink-0 text-[#2b9a60]" />You can cancel or reschedule this appointment from your appointments page, subject to the clinic&apos;s cancellation policy.</div>
            <Button onClick={() => {
              saveCareSession({
                type: "booking",
                title: service.name,
                summary: `${appointmentLabel} · ${provider.name} · ${location}`,
              });
              setConfirmed(true);
            }} className="mt-8"><Check size={16} /> Confirm appointment</Button>
          </div>
        )}
      </Card>

      <aside className="h-fit rounded-2xl border border-[#dfe8ff] bg-[#f4f7ff] p-5">
        <button onClick={() => setAssistantOpen((value) => !value)} className="flex w-full items-center gap-3 text-left">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-[#3268e9] shadow-sm"><Bot size={19} /></span>
          <span className="flex-1"><span className="block text-[13px] font-bold text-[#263149]">Need help choosing?</span><span className="mt-1 block text-[11px] text-[#7c8aa4]">Carely assistant</span></span>
          <MessageCircle size={17} className="text-[#3268e9]" />
        </button>
        {assistantOpen && <div className="mt-5 border-t border-[#dce6fc] pt-5"><p className="text-[12px] leading-5 text-[#6f7d96]">Tell us what you need help scheduling. The assistant can help identify a service category, but it does not diagnose symptoms or provide medical advice.</p><textarea value={assistantMessage} onChange={(event) => setAssistantMessage(event.target.value)} placeholder="Example: I need a routine check-up..." className="mt-4 h-24 w-full resize-none rounded-xl border border-[#dce6fc] bg-white p-3 text-[12px] text-[#334058] outline-none placeholder:text-[#a0aabd] focus:border-[#3268e9]" /><button onClick={() => setAssistantMessage("Thanks — for general preventive care, Routine check-up is a good starting category. Choose a time that works for you.")} className="mt-2 w-full rounded-xl bg-[#3268e9] px-3 py-2.5 text-[11px] font-semibold text-white hover:bg-[#285bd6]">Suggest a category</button>{assistantMessage.startsWith("Thanks") && <p className="mt-3 rounded-lg bg-white p-3 text-[11px] leading-5 text-[#66748b]">{assistantMessage}</p>}</div>}
      </aside>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4"><span className="text-[11px] font-semibold uppercase tracking-wide text-[#9aa4b4]">{label}</span><span className="text-[13px] font-semibold text-[#334058] sm:text-right">{value}</span></div>;
}
