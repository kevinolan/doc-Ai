export type CareSession = {
  id: string;
  type: "feedback" | "assistant" | "booking";
  title: string;
  summary: string;
  createdAt: string;
  metadata?: Record<string, string>;
};

const STORAGE_KEY = "carely-sessions";

export function readCareSessions(): CareSession[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as CareSession[]) : [];
  } catch {
    return [];
  }
}

export function saveCareSession(session: Omit<CareSession, "id" | "createdAt">) {
  if (typeof window === "undefined") return;
  const nextSession: CareSession = {
    ...session,
    id: `session-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  const sessions = [nextSession, ...readCareSessions()].slice(0, 50);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  window.dispatchEvent(new Event("carely-sessions-updated"));
}
