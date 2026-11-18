"use client";

import Link from "next/link";
import { ArrowLeft, Check, MessageSquare, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eyebrow, PageDescription, PageTitle } from "@/components/ui/typography";
import { buildFeedbackAnalysisPrompt } from "@/lib/ai-prompts";
import { saveCareSession } from "@/lib/session-storage";

const ratingLabels = ["Very poor", "Poor", "Okay", "Good", "Excellent"];

type FeedbackAnalysis = {
  sentiment: "positive" | "mixed" | "negative";
  themes: string[];
  summary: string;
  actions: string[];
};

function analyzeFeedback(rating: number, comment: string): FeedbackAnalysis {
  const lowerComment = comment.toLowerCase();
  const themes = [];
  if (lowerComment.includes("book") || lowerComment.includes("appointment")) themes.push("Booking experience");
  if (lowerComment.includes("schedule") || lowerComment.includes("time")) themes.push("Schedule clarity");
  if (lowerComment.includes("mobile") || lowerComment.includes("phone")) themes.push("Mobile usability");
  if (lowerComment.includes("help") || lowerComment.includes("assistant")) themes.push("Care guidance");
  if (!themes.length) themes.push(rating >= 4 ? "Overall experience" : "User friction");

  const sentiment = rating >= 4 ? "positive" : rating === 3 ? "mixed" : "negative";
  return {
    sentiment,
    themes: themes.slice(0, 3),
    summary: rating >= 4
      ? "The patient reported a positive experience with the care journey."
      : rating === 3
        ? "The patient found parts of the care journey useful but identified room for improvement."
        : "The patient reported friction that may require follow-up from the product team.",
    actions: rating >= 4
      ? ["Preserve the current flow", "Reuse the clearest labels in new scheduling screens"]
      : ["Review the reported friction with the product team", "Add a follow-up question to identify the exact step affected"],
  };
}

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [analysis, setAnalysis] = useState<FeedbackAnalysis | null>(null);

  const prompt = useMemo(
    () => rating > 0 ? buildFeedbackAnalysisPrompt({ rating, comment }) : "",
    [rating, comment],
  );

  function submitFeedback() {
    if (!rating) return;
    setAnalysis(analyzeFeedback(rating, comment));
    saveCareSession({
      type: "feedback",
      title: `${ratingLabels[rating - 1]} feedback`,
      summary: comment || "Submitted a rating without a written comment.",
      metadata: { rating: String(rating) },
    });
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-[920px]">
        <Link href="/" className="mb-7 inline-flex items-center gap-2 text-[13px] font-medium text-muted-foreground hover:text-primary"><ArrowLeft size={16} /> Back to dashboard</Link>
        <div className="mb-8"><Eyebrow><MessageSquare size={13} className="mr-1 inline" /> Feedback</Eyebrow><PageTitle className="mt-2">How was your experience?</PageTitle><PageDescription>Share feedback about your booking or appointment journey.</PageDescription></div>
        <div className="grid gap-5 lg:grid-cols-[1fr_0.85fr]">
          <Card>
            <CardHeader><CardTitle>Rate your experience</CardTitle><p className="mt-1 text-xs text-muted-foreground">Your response is private and used to improve Carely.</p></CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-2">{ratingLabels.map((label, index) => { const value = index + 1; return <button key={label} onClick={() => setRating(value)} aria-label={`${value} out of 5: ${label}`} className={`grid h-12 w-12 place-items-center rounded-xl border text-sm font-bold transition ${rating === value ? "border-primary bg-primary text-white" : "border-border text-muted-foreground hover:border-primary/40"}`}>{value}</button>; })}</div>
              {rating > 0 && <p className="mt-3 text-xs font-semibold text-primary">{ratingLabels[rating - 1]}</p>}
              <label className="mt-7 block text-sm font-semibold text-foreground" htmlFor="feedback">Anything else you&apos;d like to share?</label>
              <textarea id="feedback" value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Tell us what worked well or what we could improve..." className="mt-3 h-32 w-full resize-none rounded-xl border border-border p-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10" />
              <Button disabled={!rating} onClick={submitFeedback} className="mt-6"><Sparkles size={16} /> Analyze feedback</Button>
              <p className="mt-4 text-[11px] leading-5 text-muted-foreground">AI analysis is for product improvement only. Do not include medical records, diagnoses, or urgent health concerns.</p>
            </CardContent>
          </Card>
          <Card className="h-fit">
            <CardHeader><CardTitle>AI feedback assistant</CardTitle><p className="mt-1 text-xs text-muted-foreground">Turns feedback into product themes and next steps.</p></CardHeader>
            <CardContent className="pt-0">
              {analysis ? <div className="space-y-5">
                <div><p className="type-eyebrow">Sentiment</p><p className={`mt-2 text-sm font-bold capitalize ${analysis.sentiment === "positive" ? "text-[#2b9a60]" : analysis.sentiment === "negative" ? "text-[#c34b55]" : "text-[#b27a20]"}`}>{analysis.sentiment}</p></div>
                <div><p className="type-eyebrow">Summary</p><p className="mt-2 text-sm leading-6 text-foreground">{analysis.summary}</p></div>
                <div><p className="type-eyebrow">Themes</p><div className="mt-2 flex flex-wrap gap-2">{analysis.themes.map((theme) => <span key={theme} className="rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-foreground">{theme}</span>)}</div></div>
                <div><p className="type-eyebrow">Suggested actions</p><ul className="mt-2 space-y-2 text-xs leading-5 text-muted-foreground">{analysis.actions.map((action) => <li key={action} className="flex gap-2"><Check size={14} className="mt-0.5 shrink-0 text-[#2b9a60]" />{action}</li>)}</ul></div>
              </div> : <div className="rounded-xl bg-muted p-4 text-xs leading-5 text-muted-foreground">Submit a rating and optional comment to see a structured product-feedback result.</div>}
            </CardContent>
          </Card>
        </div>
        {analysis && <details className="mt-5 rounded-xl border border-border bg-card p-4"><summary className="cursor-pointer text-xs font-semibold text-muted-foreground">View feedback analysis prompt</summary><pre className="mt-3 overflow-x-auto whitespace-pre-wrap text-[11px] leading-5 text-muted-foreground">{prompt}</pre></details>}
      </div>
    </AppShell>
  );
}
