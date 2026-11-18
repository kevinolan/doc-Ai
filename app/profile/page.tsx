import Link from "next/link";
import { ArrowLeft, Camera, Check, ChevronRight, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/app-shell";

export default function ProfilePage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-[930px]">
        <Link href="/" className="mb-7 inline-flex items-center gap-2 text-[13px] font-medium text-[#7c889b] hover:text-[#3268e9]"><ArrowLeft size={16} /> Back to home</Link>
        <div className="mb-8"><p className="mb-2 text-sm font-medium text-[#8a96a9]">Account settings</p><h1 className="text-[30px] font-bold tracking-[-0.04em] text-[#172033]">My profile</h1><p className="mt-2 text-[15px] text-[#7b879a]">Manage your personal information and preferences.</p></div>

        <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-2xl border border-[#e5eaf1] bg-white p-5">
            <div className="flex flex-col items-center border-b border-[#edf0f4] pb-6 text-center">
              <div className="relative"><div className="grid h-24 w-24 place-items-center rounded-full bg-[#dce8ff] text-2xl font-bold text-[#3268e9]">JD</div><button aria-label="Change profile photo" className="absolute bottom-0 right-0 grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-[#3268e9] text-white shadow-sm"><Camera size={14} /></button></div>
              <h2 className="mt-4 text-[16px] font-bold text-[#263149]">Jordan Davis</h2><p className="mt-1 text-[12px] text-[#8b96a8]">Patient since 2023</p>
            </div>
            <nav className="space-y-1 pt-4"><ProfileNav label="Personal information" active /><ProfileNav label="Notifications" /><ProfileNav label="Security" /><ProfileNav label="Connected services" /></nav>
          </aside>

          <div className="space-y-5">
            <section className="rounded-2xl border border-[#e5eaf1] bg-white p-6 sm:p-7">
              <div className="flex items-start justify-between"><div><h2 className="text-[18px] font-bold tracking-[-0.02em] text-[#172033]">Personal information</h2><p className="mt-1 text-[13px] text-[#8a96a9]">This information helps your care team identify you.</p></div><span className="rounded-full bg-[#edf8f2] px-2.5 py-1 text-[10px] font-bold text-[#2b9a60]">Verified account</span></div>
              <div className="mt-7 grid gap-5 sm:grid-cols-2"><ProfileField label="First name" value="Jordan" /><ProfileField label="Last name" value="Davis" /><ProfileField label="Email address" value="jordan.davis@email.com" icon={<Mail size={15} />} /><ProfileField label="Phone number" value="+1 (555) 019-2847" icon={<Phone size={15} />} /></div>
              <div className="mt-5"><label className="mb-2 block text-[12px] font-semibold text-[#536078]">Address</label><div className="relative"><MapPin size={15} className="absolute left-3 top-3.5 text-[#9ca7b8]" /><input defaultValue="1248 Oak Street, Portland, OR 97205" className="h-11 w-full rounded-xl border border-[#e1e6ee] bg-white pl-9 pr-3 text-[13px] text-[#334058] outline-none transition focus:border-[#3268e9] focus:ring-4 focus:ring-[#3268e9]/10" /></div></div>
              <div className="mt-6 flex justify-end"><button className="inline-flex items-center gap-2 rounded-xl bg-[#3268e9] px-4 py-2.5 text-[12px] font-semibold text-white hover:bg-[#285bd6]"><Check size={15} /> Save changes</button></div>
            </section>
            <section className="rounded-2xl border border-[#e5eaf1] bg-white p-6 sm:p-7"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-[#edf8f2] text-[#2b9a60]"><ShieldCheck size={19} /></div><div><h2 className="text-[16px] font-bold text-[#263149]">Privacy and security</h2><p className="mt-1 text-[12px] text-[#8a96a9]">Your information is protected and only shared with your care team.</p></div><ChevronRight size={17} className="ml-auto text-[#a4adba]" /></div></section>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function ProfileNav({ label, active = false }: { label: string; active?: boolean }) {
  return <button className={`flex w-full items-center rounded-lg px-3 py-2.5 text-left text-[12px] font-medium ${active ? "bg-[#edf3ff] text-[#3268e9]" : "text-[#7c889b] hover:bg-[#f7f9fc] hover:text-[#263149]"}`}>{label}{active && <ChevronRight size={14} className="ml-auto" />}</button>;
}

function ProfileField({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return <div><label className="mb-2 block text-[12px] font-semibold text-[#536078]">{label}</label><div className="relative">{icon && <span className="absolute left-3 top-3.5 text-[#9ca7b8]">{icon}</span>}<input defaultValue={value} className={`h-11 w-full rounded-xl border border-[#e1e6ee] bg-white ${icon ? "pl-9" : "px-3"} pr-3 text-[13px] text-[#334058] outline-none transition focus:border-[#3268e9] focus:ring-4 focus:ring-[#3268e9]/10`} /></div></div>;
}
