# NORTHERN STAR SMART CAMPUS - PRODUCTION DEPLOYMENT GUIDE

This guide details steps to deploy the complete **Northern Star Smart Campus** ecosystem across Supabase, Next.js Web Application, and Flutter Mobile Application.

---

## 1. Supabase Backend Setup (Free Tier)

### Step 1: Create Supabase Project
1. Log in to [Supabase Dashboard](https://supabase.com).
2. Create a new project:
   - **Name:** `Northern Star Smart Campus`
   - **Database Password:** Store securely.
   - **Region:** Select the closest region (e.g., Southeast Asia / Singapore).

### Step 2: Apply Database Schema & Migrations
In the Supabase SQL Editor, run the provided migrations in sequence:
1. `supabase/migrations/20261115000001_initial_schema.sql` (Creates all 50+ tables, indexes, constraints)
2. `supabase/migrations/20261115000002_rls_policies.sql` (Enables Row Level Security on all tables)
3. `supabase/seed.sql` (Seeds official Northern Star School & College data matching the UI showcase)

Alternatively, using the Supabase CLI:
```bash
npx supabase link --project-ref your-project-ref
npx supabase db push
```

### Step 3: Configure Storage Buckets
Create public/authenticated storage buckets in the Supabase Dashboard:
- `student-photos` (Public read, Authenticated write)
- `student-documents` (Private, RLS restricted)
- `campus-assets` (Public read)
- `report-cards` (Private, Parent/Student/Admin read)

---

## 2. Web Application Deployment (Next.js 15)

### Local Development:
```bash
cd apps/web
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the Super Admin Dashboard and Mobile Simulator.

### Environment Variables (`apps/web/.env.local`):
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1Ni...
NEXT_PUBLIC_DEFAULT_INSTITUTION_ID=a0000000-0000-0000-0000-000000000001
```

### Production Build:
```bash
cd apps/web
npm run build
npm run start
```
The application compiles cleanly into an optimized static/SSR deployment ready for Vercel, AWS Amplify, Docker, or any Node.js hosting platform.

---

## 3. Mobile Application Deployment (Flutter + Dart)

### Prerequisites:
- Flutter SDK (>= 3.0.0)
- Android Studio / Xcode

### Running Mobile Application:
```bash
cd apps/mobile
flutter pub get
flutter run
```

### Building Android Release APK:
```bash
cd apps/mobile
flutter build apk --release
```
The output APK is generated at `build/app/outputs/flutter-apk/app-release.apk`.

---

## 4. Supabase Free-Tier Optimization & Backup Procedures

> [!NOTE]
> Supabase Free-Tier projects do not include automated daily backups. Follow this manual backup workflow regularly:

### Manual Database Backup:
```bash
# Export full PostgreSQL schema and data
npx supabase db dump --project-ref your-project-ref -f northern_star_backup.sql
```

### Inactivity Guard:
Supabase Free-Tier projects may pause after 7 days of inactivity. To prevent pausing, ensure regular usage or configure an automated health ping to `https://your-project-ref.supabase.co/rest/v1/` with your anon key.
