# MediFlow AI

MediFlow AI is an AI-assisted hospital appointment scheduling and booking platform. This repository is the Next.js 15 / React 19 application foundation.

## Current MVP slice

- Responsive hospital operations dashboard.
- Appointment schedule with patient/doctor search.
- Demo appointment creation flow.
- Doctor and department directory views.
- AI assistant interface in clearly marked preview mode.
- Supabase/PostgreSQL schema with role-based row-level security and a database-level guard against overlapping appointments for the same doctor.

> **Important:** The current UI uses illustrative demo data. It is not connected to a live hospital, patient records, authentication, real doctor availability, notifications, or a live AI model. Do not enter real patient information. This is a software prototype, not a medical advice or emergency-triage service.

## Tech stack

- Next.js 15 App Router, React 19, TypeScript
- Tailwind CSS and Lucide icons
- Supabase Auth + PostgreSQL (schema migration included)
- Planned AI integration: server-side Vercel AI Gateway / AI SDK with controlled scheduling tools

## Run locally

Requirements: Node.js 20+ and npm 9+.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

The dashboard preview can be explored without credentials. Supabase and AI features remain disabled until their environment variables and server-side integrations are configured.

## Environment variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
AI_GATEWAY_API_KEY=your_server_side_ai_gateway_key
```

Never commit real credentials. The AI Gateway key must remain server-side and must never use a `NEXT_PUBLIC_` prefix.

## Supabase setup

1. Create a Supabase project for the intended development environment.
2. Configure the variables above in your local environment.
3. Apply the SQL files in `supabase/migrations/` in filename order (or use the Supabase CLI after linking the project).
4. Create an initial administrator through a controlled server-side process; do not let a public sign-up form choose its own role.
5. Configure email confirmation, password policy, backups, and production access controls before real use.

The schema includes profiles, departments, doctors, doctor availability, and appointments. Row-level security is enabled. A PostgreSQL exclusion constraint prevents overlapping non-cancelled appointments for the same doctor, including concurrent booking attempts.

## Build checks

```bash
npm run typecheck
npm run lint
npm run build
```

Run these checks locally after installing dependencies. The GitHub connector can commit repository files but does not execute the Next.js build.

## Next implementation milestones

1. Supabase SSR authentication and role-aware route protection.
2. Persisted patient, doctor, department, availability, and appointment workflows.
3. Atomic server-side booking validation and cancellation/rescheduling.
4. AI assistant using tool calls to search departments/doctors/available slots; the AI may suggest but must never invent availability or write bookings outside validated backend functions.
5. Notifications, waitlist, audit trail, and operational analytics.
6. Automated tests, accessibility review, security review, and deployment verification.
