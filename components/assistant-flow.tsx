"use client";

import { useState } from "react";
import { ArrowRight, Bot, CheckCircle2, Clock3, ShieldAlert, Sparkles } from "lucide-react";
import { buildAppointmentIntakePrompt } from "@/lib/ai-prompts";
import { saveCareSession } from "@/lib/session-storage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const suggestions = [
  { title: "Routine check-up", detail: "General health and wellness", duration: "30 min" },
  { title: "Follow-up visit", detail: "Review progress with your care team", duration: "20 min" },
  { title: "Dental cleaning", detail: "Routine cleaning and oral exam", duration: "45 min" },
];

export function AssistantFlow() {
  const [message, setMessage] = useState("");
  const [submittedMessage, setSubmittedMessage] = useState("");
  const [promptPreview, setPromptPreview] = useState("");

  function handleSubmit() {
    const trimmed = message.trim();
    if (!trimmed) return;
    setSubmittedMessage(trimmed);
    setPromptPreview(buildAppointmentIntakePrompt(trimmed));
    saveCareSession({
      type: "assistant",
      title: "Appointment assistant session",
      summary: trimmed,
    });
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
      <Card>
        <CardHeader className="border-b border-border">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-accent-foreground"><Bot size={21} /></span>
            <div><CardTitle>Tell us what you need</CardTitle><p className="mt-1 text-xs text-muted-foreground">Carely will suggest a scheduling category, not a diagnosis.</p></div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <label htmlFor="care-message" className="text-sm font-semibold text-foreground">How can we help you book care?</label>
          <textarea id="care-message" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Example: I need a general check-up sometime next week." className="mt-3 h-32 w-full resize-none rounded-xl border border-border bg-card p-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10" />
          <div className="mt-4 flex flex-wrap gap-2">
            {["General check-up", "Follow-up care", "Dental care"].map((item) => <button key={item} onClick={() => setMessage(item)} className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:border-primary/40 hover:text-primary">{item}</button>)}
          </div>
          <Button onClick={handleSubmit} disabled={!message.trim()} className="mt-6"><Sparkles size={16} /> Suggest appointment type</Button>
          <div className="mt-5 flex gap-2 rounded-xl bg-muted p-3 text-xs leading-5 text-muted-foreground"><ShieldAlert size={16} className="mt-0.5 shrink-0 text-primary" />This assistant does not diagnose symptoms or replace urgent medical care.</div>
        </CardContent>
      </Card>

      <Card className="h-fit">
        <CardHeader><CardTitle>Prompt design</CardTitle><p className="mt-1 text-xs text-muted-foreground">Structured for safe scheduling assistance.</p></CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3 text-xs text-muted-foreground">
            <div className="flex gap-2"><CheckCircle2 size={15} className="shrink-0 text-[#2b9a60]" />Returns a structured scheduling intent</div>
            <div className="flex gap-2"><CheckCircle2 size={15} className="shrink-0 text-[#2b9a60]" />Asks one clarifying question when needed</div>
            <div className="flex gap-2"><CheckCircle2 size={15} className="shrink-0 text-[#2b9a60]" />Escalates urgent symptoms instead of booking</div>
          </div>
        </CardContent>
      </Card>

      {submittedMessage && (
        <Card className="lg:col-span-2">
          <CardHeader className="border-b border-border"><p className="type-eyebrow">Results</p><CardTitle className="mt-2">Suggested appointment categories</CardTitle><p className="mt-1 text-xs text-muted-foreground">Based on: &quot;{submittedMessage}&quot;</p></CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-3 md:grid-cols-3">
              {suggestions.map((suggestion) => (
                <div key={suggestion.title} className="rounded-xl border border-border p-4">
                  <div className="flex items-start justify-between gap-3"><h3 className="text-sm font-bold text-foreground">{suggestion.title}</h3><span className="rounded-full bg-accent px-2 py-1 text-[10px] font-semibold text-accent-foreground">Suggested</span></div>
                  <p className="mt-2 text-xs text-muted-foreground">{suggestion.detail}</p>
                  <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground"><Clock3 size={13} />{suggestion.duration}</p>
                  <a href="/schedule" className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-strong">View availability <ArrowRight size={14} /></a>
                </div>
              ))}
            </div>
            <details className="mt-6 rounded-xl border border-border p-4">
              <summary className="cursor-pointer text-xs font-semibold text-muted-foreground">View generated prompt</summary>
              <pre className="mt-3 overflow-x-auto whitespace-pre-wrap text-[11px] leading-5 text-muted-foreground">{promptPreview}</pre>
            </details>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
