import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AssistantFlow } from "@/components/assistant-flow";
import { Eyebrow, PageDescription, PageTitle } from "@/components/ui/typography";

export default function AssistantPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-[1080px]">
        <Link href="/" className="mb-7 inline-flex items-center gap-2 text-[13px] font-medium text-muted-foreground hover:text-primary"><ArrowLeft size={16} /> Back to dashboard</Link>
        <div className="mb-8"><Eyebrow><MessageCircle size={13} className="mr-1 inline" /> Care assistant</Eyebrow><PageTitle className="mt-2">Find the right appointment</PageTitle><PageDescription>Describe what you need and get a safe starting point for scheduling.</PageDescription></div>
        <AssistantFlow />
      </div>
    </AppShell>
  );
}
