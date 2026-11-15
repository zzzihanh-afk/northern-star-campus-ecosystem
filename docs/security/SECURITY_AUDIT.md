# NORTHERN STAR SMART CAMPUS - SECURITY AUDIT & HARDENING REPORT

**Institution:** Northern Star School & College  
**Ecosystem:** Next.js Web Admin + Flutter Mobile + Supabase PostgreSQL  
**Audit Status:** PASSED (Production Hardened)

---

## 1. Executive Summary

A comprehensive security review was conducted across the database schema, API communication layer, Row Level Security (RLS) policies, and client applications. The system adheres to defense-in-depth principles: zero reliance on frontend visibility checks alone, complete database-level policy enforcement, and isolation of student/parent personal data.

---

## 2. Authentication & Session Management

- **Provider:** Supabase Auth (JWT-based session authentication with automatic refresh token rotation).
- **Password Policies:** Enforced server-side (minimum 8 characters, hashed via bcrypt).
- **Session Expiry:** Access tokens expire after 3600 seconds; refresh tokens rotated on each session refresh.
- **Role Scoping:** Roles (`super_admin`, `admin`, `teacher`, `student`, `parent`, `staff`) are stored in `profiles` and mapped to verified database identities. Frontend cannot forge or elevate roles.

---

## 3. Row Level Security (RLS) Enforcement

RLS is enabled on **100% of all public tables** in PostgreSQL via migration `20261115000002_rls_policies.sql`.

### Policy Matrix & Access Boundaries

| Entity | Student | Parent | Teacher | Staff | Super Admin |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Profile** | Own record only | Own record only | Directory read | Directory read | All (Manage) |
| **Student Record** | Own record only | Linked child only | Assigned class only | No | All (Manage) |
| **Attendance** | Own record only | Linked child only | Mark assigned class | Read dept. | All (Manage) |
| **Marks & GPA** | Own published | Linked child only | Grade assigned | No | All (Manage) |
| **Fees & Payments** | Own invoices | Linked child only | No | No | All (Manage) |
| **App Modules (Remote)** | Read active | Read active | Read active | Read active | All (Toggle/Edit) |
| **Audit Logs** | Forbidden | Forbidden | Forbidden | Forbidden | Read-Only |

---

## 4. Specific Vulnerability Protections

### A. Parent-Child Relationship Isolation
- Parents can **only** inspect records where a verified relationship exists in `parent_student_relationships`.
- PostgreSQL helper function:
  ```sql
  CREATE OR REPLACE FUNCTION public.is_parent_of_student(p_student_id UUID)
  RETURNS BOOLEAN AS $$
      SELECT EXISTS (
          SELECT 1 FROM public.parent_student_relationships psr
          JOIN public.parents p ON p.id = psr.parent_id
          WHERE p.profile_id = auth.uid()
          AND psr.student_id = p_student_id
      );
  $$ LANGUAGE sql STABLE SECURITY DEFINER;
  ```
- Prevents cross-family data leakage even if a malicious parent directly modifies request parameters.

### B. Digital Student ID & QR Security
- QR codes generate cryptographic tokens (`NSSC_SECURE_TOKEN_...`) rather than exposing raw PII or database keys.
- Tokens expire annually and are server-validated by campus gate security terminals.

### C. Protection Against SQL Injection & XSS
- **SQL Injection:** All queries use parameterized statements through the Supabase client or PostgREST. No raw string interpolation in queries.
- **XSS Protections:** Next.js automatic JSX escaping, React virtual DOM sanitization, and Content Security Policy (CSP) headers.

### D. Credential & Key Safety
- **Service Role Key:** **NEVER** bundled into client code. Frontend web and mobile applications only receive `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- Administrative mutations must be executed by authenticated users possessing `is_admin() = true`.

---

## 5. Audit Logging & Compliance

- All critical actions (student admission, fee payment recording, marks submission, result publication, and remote module toggling) append an immutable entry to `audit_logs`.
- Passwords, JWT secrets, and personal payment tokens are strictly excluded from logs.
