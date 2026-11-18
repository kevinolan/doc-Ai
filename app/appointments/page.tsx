import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { BookingFlow } from "@/components/booking-flow";
import { Eyebrow, PageDescription, PageTitle } from "@/components/ui/typography";

export default function AppointmentsPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-[1180px]">
        <Link href="/" className="mb-7 inline-flex items-center gap-2 text-[13px] font-medium text-[#7c889b] hover:text-[#3268e9]">
          <ArrowLeft size={16} /> Back to home
        </Link>
        <div className="mb-8">
          <Eyebrow>Your care</Eyebrow>
          <PageTitle className="mt-2">Book an appointment</PageTitle>
          <PageDescription>Find a time that works for you and your care team.</PageDescription>
        </div>
        <BookingFlow />
      </div>
    </AppShell>
  );
}
