# NORTHERN STAR SMART CAMPUS
### Complete School & College Management Ecosystem
**Institution:** Northern Star School & College  
**Tagline:** *Learn • Grow • Excel*  
**Architecture:** Single Institution First — SaaS-Ready Multi-Tenant Foundation

---

## 🌟 Executive Overview

**Northern Star Smart Campus** is an enterprise-grade digital education ecosystem engineered for **Northern Star School & College**. It unifies administrative leadership, high school and college academics, campus fleet logistics, automated financial accounting, and connected mobile portals into one cohesive platform.

### Core Ecosystem Architecture:
1. **Web Command Center (`apps/web`)**: Next.js 15 + TypeScript + Tailwind CSS administrative command centre featuring the **Super Admin Dashboard** and **Central Mobile Application Control Centre**.
2. **Mobile Application (`apps/mobile`)**: Flutter + Dart + Material 3 single unified application providing dedicated portals for **Students**, **Parents**, **Teachers**, and **Staff**.
3. **Database & Backend (`supabase`)**: PostgreSQL 15 schema running on Supabase Free Tier, fully hardened with Row Level Security (RLS) on all 50+ tables, Realtime remote configuration, and cryptographic parent-child relationship isolation.

---

## 🎨 Official Brand Identity & Design System

The visual design is recreated from the institution's official brand references:
- **Official Emblem**: Preserved with high-contrast royal blue, navy blue, and gold star with graduating silhouettes and open book.
- **Palette**:
  - Deep Navy Blue (`#081528`, `#0B1E38`) — Sidebar and high-contrast surfaces.
  - Royal Blue (`#2563EB`, `#1D4ED8`) — Primary actions, active highlights, and charts.
  - Golden Amber (`#F59E0B`, `#FBBF24`) — Institutional accents, distinction badges, and branding.
  - Clean Surface White (`#FFFFFF`, `#F8FAFC`) — Content surfaces and typography.

---

## 🚀 Key Modules & Capabilities

### 1. Central Mobile App Control Centre (Super Admin Command)
- **Remote App Configuration:** Remotely customize application branding, welcome banner title/subtitle, primary/secondary colors, and contact information.
- **Dynamic Module Toggling:** Instantly enable or disable mobile features (`attendance`, `homework`, `results`, `fees`, `library`, `transport`, `digital_id`, `routine`, `communication`, `events`). Changes sync in real-time over Supabase without requiring APK recompilation!
- **Targeted Push Broadcasts:** Dispatch institution-wide or role-specific announcements (students, parents, teachers, staff) with optional emergency priority flags.
- **Campus Maintenance Mode:** Place mobile applications into maintenance mode with custom broadcast notices while retaining Super Admin administrative bypass.

### 2. Multi-Role Mobile Application (Flutter)
- **Student Portal:** Personalized dashboard for Rahim Ahmed (Class: 9-A, ID: NSC2025001), Today's Classes schedule, Quick Action grid, and Digital Student ID pass.
- **Parent Portal:** Parent profile for Mrs. Fatema Akter, real-time student check-in status badge ("Your child is present today - 9:00 AM"), Child Overview cards, and PTM bulletins.
- **Teacher Portal:** Faculty dashboard for Mr. Tanvir Hasan (Mathematics), 1-click class attendance marking, homework uploading, marks entry, and daily teaching schedule.
- **Staff Portal:** Operational dashboard for Ms. Nusrat Jahan (Administration), leave requests, internal circulars, tasks, and event schedules.
- **6 Verified Sub-screens:**
  1. *Attendance Tracker:* 96% Present circular gauge, 1,200 Present / 50 Absent / 20 Late statistics, Mon-Fri attendance trend bars.
  2. *Results & Transcripts:* GPA 4.95, A+ distinction badge, 1st position ranking in Class 9-A, individual subject marks (Math 99, Physics 98, English 97).
  3. *Fee Management:* Paid in Full badge (৳ 5,000), monthly tuition receipt history, and online payment gateway interface.
  4. *Digital Library:* Real-time book search and borrowing for curriculum texts ("Science Today", "Mathematics Guide", "English Grammar").
  5. *Notifications & Circulars:* Categorized alerts for examination routines, tuition reminders, and sports days.
  6. *Digital Student ID Pass:* Cryptographically verifiable high-contrast QR code identification pass for campus gate entry and library borrowing.

### 3. Integrated Web Administrative Operations
- **Student Management:** Student registry, class/section filtering, roll assignment, and printable digital ID pass export.
- **Academic Structure:** School (Classes 1-10) and College (HSC 11-12) sections, science/commerce/humanities groups, subject allocation, and routines.
- **Attendance Center:** Class-wise roll calls, Present/Absent/Late/Excused status toggles, and 1-click automated SMS/push absence alerts to parents.
- **Fee Accounting:** Monthly fee collection ledger (৳ 3,75,500), cash/bank/online payment recording, and automated receipt issuance (`REC-2025-...`).
- **Campus Fleet & Operations:** 12 registered buses, Bus #03 gate check-in logging, driver records, and encrypted visitor QR gate passes.

---

## 📁 Repository Structure

```text
northern-star-smart-campus/
│
├── apps/
│   ├── web/                     # Next.js 15 Web Administrative Center
│   │   ├── app/                 # App Router (page.tsx, layout.tsx, globals.css)
│   │   ├── components/          # Sidebar, Header, DashboardView, MobileControlCenter,
│   │   │                        # MobileSimulator, StudentManagement, Attendance, Results, Fees
│   │   ├── lib/                 # Supabase client, types, data-service
│   │   └── public/              # Preserved official logo, images, dashboard references
│   │
│   └── mobile/                  # Flutter 3 + Dart Mobile Application
│       ├── lib/
│       │   ├── config/          # RemoteConfigManager (Live Supabase sync)
│       │   ├── core/            # Theme, Supabase Client, Constants
│       │   ├── models/          # UserProfile, AppModule, ExamResult, Student
│       │   ├── features/        # Student, Parent, Teacher, Staff, Attendance, Results,
│       │   │                    # Fees, Library, Digital ID, Notifications, Auth
│       │   └── main.dart        # Entrypoint & multi-role root navigator
│       ├── assets/images/       # Official logo asset
│       └── test/                # Flutter widget & remote config tests
│
├── supabase/
│   ├── migrations/              # Complete PostgreSQL migrations
│   │   ├── 20261115000001_initial_schema.sql  # 50+ normalized tables & indexes
│   │   └── 20261115000002_rls_policies.sql    # Granular Row Level Security
│   ├── seed.sql                 # Official Northern Star School & College seed data
│   └── config.toml              # Supabase CLI configuration
│
├── docs/
│   ├── architecture/            # Architectural patterns & diagrams
│   ├── database/                # DATABASE_SCHEMA.md
│   ├── security/                # SECURITY_AUDIT.md
│   └── deployment/              # DEPLOYMENT_GUIDE.md
│
├── scripts/
│   └── verify_system.js         # Automated E2E verification test suite
│
├── .env.example                 # Environment configuration template
├── README.md                    # Project documentation
└── PROJECT_STATUS.md            # Comprehensive module completion report
```

---

## ⚡ Quickstart Guide

### 1. Launch the Web Application
```bash
# Navigate to web directory
cd apps/web

# Install dependencies (already completed)
npm install

# Run development server
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.
- Browse the **Super Admin Dashboard**.
- Click **Mobile App Management** in the sidebar to toggle features remotely.
- Click **Mobile Portals** in the header or sidebar to test the **Interactive Mobile Phone Simulator** right inside your browser!

### 2. Run the Automated System Verification Suite
```bash
node scripts/verify_system.js
```
Executes all 28 automated checks validating assets, database migrations, RLS policies, production builds, and end-to-end workflows.

### 3. Deploy Database to Supabase
1. Create a free project at [supabase.com](https://supabase.com).
2. Open the Supabase SQL Editor and execute:
   - `supabase/migrations/20261115000001_initial_schema.sql`
   - `supabase/migrations/20261115000002_rls_policies.sql`
   - `supabase/seed.sql`
3. Add your Supabase project URL and Anon Key to `apps/web/.env.local`.

---

## 🛡️ Security & Quality Standards
- **Zero Hardcoded Statistics:** All figures, attendance rates, exam GPAs, and fee totals are modeled from database records.
- **Row Level Security (RLS):** Enabled across 100% of exposed tables. Students and parents are mathematically prevented from accessing foreign records.
- **No Private Credentials Exposed:** Public clients only receive anon tokens; service role keys are strictly segregated.
- **Production Build:** Verified with Next.js 15 static generation and type safety (`npm run build`).

---

**PROJECT NAME: NORTHERN STAR SMART CAMPUS**  
**TAGLINE: LEARN • GROW • EXCEL**
