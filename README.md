# AskList

AskList helps students who hesitate to interrupt lectures save their questions so they remember to ask them later.

Next.js (App Router) + Supabase Auth and Postgres with Row Level Security.

## Setup

1. Install Node.js 20 LTS or newer.
2. Copy `.env.example` to `.env.local` and fill in your Supabase URL and publishable (anon) key.
3. In Supabase → **SQL Editor** → **New query**, paste `supabase/schema.sql` and click **Run**.
4. In Supabase → **Authentication** → **Sign In / Providers** → **Email**, turn **off** "Confirm email".
5. Run:

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy (Vercel)

Import the repo in Vercel and add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` under Project → Settings → Environment Variables.
