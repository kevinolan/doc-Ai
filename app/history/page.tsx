import Link from "next/link";
import { ArrowLeft, History } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { SessionHistory } from "@/components/session-history";
import { Eyebrow, PageDescription, PageTitle } from "@/components/ui/typography";

export default function HistoryPage() {
  return <AppShell><div className="mx-auto max-w-[900px]"><Link href="/" className="mb-7 inline-flex items-center gap-2 text-[13px] font-medium text-muted-foreground hover:text-primary"><ArrowLeft size={16} /> Back to dashboard</Link><div className="mb-8"><Eyebrow><History size={13} className="mr-1 inline" /> Saved sessions</Eyebrow><PageTitle className="mt-2">History</PageTitle><PageDescription>Review your recent assistant, feedback, and booking sessions.</PageDescription></div><SessionHistory /></div></AppShell>;
}
