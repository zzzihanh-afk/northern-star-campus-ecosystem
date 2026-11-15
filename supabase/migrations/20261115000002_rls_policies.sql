-- ==============================================================================
-- NORTHERN STAR SMART CAMPUS - ROW LEVEL SECURITY (RLS) POLICIES
-- Migration: 20261115000002_rls_policies.sql
-- ==============================================================================

-- 1. HELPER SECURITY FUNCTIONS
CREATE OR REPLACE FUNCTION public.current_user_profile()
RETURNS profiles AS $$
    SELECT * FROM public.profiles WHERE id = auth.uid() LIMIT 1;
$$ LANGUAGE sql STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS VARCHAR AS $$
    SELECT role FROM public.profiles WHERE id = auth.uid() LIMIT 1;
$$ LANGUAGE sql STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.current_user_institution()
RETURNS UUID AS $$
    SELECT institution_id FROM public.profiles WHERE id = auth.uid() LIMIT 1;
$$ LANGUAGE sql STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() 
        AND role IN ('super_admin', 'admin')
    );
$$ LANGUAGE sql STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_parent_of_student(p_student_id UUID)
RETURNS BOOLEAN AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.parent_student_relationships psr
        JOIN public.parents p ON p.id = psr.parent_id
        WHERE p.profile_id = auth.uid()
        AND psr.student_id = p_student_id
    );
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- 2. ENABLE ROW LEVEL SECURITY ACROSS ALL TABLES
ALTER TABLE institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE institution_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_navigation ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_versions ENABLE ROW LEVEL SECURITY;

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_permissions ENABLE ROW LEVEL SECURITY;

ALTER TABLE academic_years ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_routines ENABLE ROW LEVEL SECURITY;

ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE designations ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_documents ENABLE ROW LEVEL SECURITY;

ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE parents ENABLE ROW LEVEL SECURITY;
ALTER TABLE parent_student_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE admissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_documents ENABLE ROW LEVEL SECURITY;

ALTER TABLE student_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_correction_requests ENABLE ROW LEVEL SECURITY;

ALTER TABLE examinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE examination_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE grading_systems ENABLE ROW LEVEL SECURITY;
ALTER TABLE marks ENABLE ROW LEVEL SECURITY;
ALTER TABLE results ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_cards ENABLE ROW LEVEL SECURITY;

ALTER TABLE fee_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_structures ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_fees ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE scholarships ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;

ALTER TABLE book_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE book_copies ENABLE ROW LEVEL SECURITY;
ALTER TABLE book_transactions ENABLE ROW LEVEL SECURITY;

ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE transport_routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_transport_assignments ENABLE ROW LEVEL SECURITY;

ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitor_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;

ALTER TABLE leave_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- 3. CORE POLICIES

-- INSTITUTIONS & CONFIGURATION
CREATE POLICY "Institutions visible to all authenticated" ON institutions
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Institutions manageable by super admin" ON institutions
    FOR ALL TO authenticated USING (public.is_admin());

CREATE POLICY "App configurations visible to all authenticated" ON app_configurations
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "App configurations manageable by admin" ON app_configurations
    FOR ALL TO authenticated USING (public.is_admin());

CREATE POLICY "App modules readable by all authenticated" ON app_modules
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "App modules manageable by admin" ON app_modules
    FOR ALL TO authenticated USING (public.is_admin());

CREATE POLICY "App navigation readable by all authenticated" ON app_navigation
    FOR SELECT TO authenticated USING (is_visible = true OR public.is_admin());

CREATE POLICY "App navigation manageable by admin" ON app_navigation
    FOR ALL TO authenticated USING (public.is_admin());

CREATE POLICY "App banners readable by all authenticated" ON app_banners
    FOR SELECT TO authenticated USING (is_active = true OR public.is_admin());

CREATE POLICY "App banners manageable by admin" ON app_banners
    FOR ALL TO authenticated USING (public.is_admin());

-- PROFILES
CREATE POLICY "Profiles readable by self or admin" ON profiles
    FOR SELECT TO authenticated 
    USING (id = auth.uid() OR public.is_admin() OR role IN ('teacher', 'staff'));

CREATE POLICY "Profiles editable by self or admin" ON profiles
    FOR UPDATE TO authenticated 
    USING (id = auth.uid() OR public.is_admin());

CREATE POLICY "Profiles insertable by admin" ON profiles
    FOR INSERT TO authenticated 
    WITH CHECK (public.is_admin());

-- ACADEMIC STRUCTURE (Classes, Sections, Subjects, Routines)
CREATE POLICY "Academic structure readable by all authenticated" ON classes
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Classes manageable by admin" ON classes
    FOR ALL TO authenticated USING (public.is_admin());

CREATE POLICY "Sections readable by all authenticated" ON sections
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Sections manageable by admin" ON sections
    FOR ALL TO authenticated USING (public.is_admin());

CREATE POLICY "Subjects readable by all authenticated" ON subjects
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Subjects manageable by admin" ON subjects
    FOR ALL TO authenticated USING (public.is_admin());

CREATE POLICY "Class routines readable by all authenticated" ON class_routines
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Class routines manageable by admin" ON class_routines
    FOR ALL TO authenticated USING (public.is_admin());

-- STUDENTS & PARENTS
CREATE POLICY "Students readable by self, parent, teacher or admin" ON students
    FOR SELECT TO authenticated 
    USING (
        profile_id = auth.uid() 
        OR public.is_parent_of_student(id)
        OR public.current_user_role() = 'teacher'
        OR public.is_admin()
    );

CREATE POLICY "Students manageable by admin" ON students
    FOR ALL TO authenticated USING (public.is_admin());

CREATE POLICY "Parents readable by self or admin" ON parents
    FOR SELECT TO authenticated 
    USING (profile_id = auth.uid() OR public.is_admin());

CREATE POLICY "Parents manageable by admin" ON parents
    FOR ALL TO authenticated USING (public.is_admin());

CREATE POLICY "Parent student relationships readable by involved parties" ON parent_student_relationships
    FOR SELECT TO authenticated 
    USING (
        parent_id IN (SELECT id FROM parents WHERE profile_id = auth.uid())
        OR student_id IN (SELECT id FROM students WHERE profile_id = auth.uid())
        OR public.is_admin()
    );

-- ATTENDANCE
CREATE POLICY "Student attendance readable by self, parent, teacher, admin" ON student_attendance
    FOR SELECT TO authenticated 
    USING (
        student_id IN (SELECT id FROM students WHERE profile_id = auth.uid())
        OR public.is_parent_of_student(student_id)
        OR public.current_user_role() = 'teacher'
        OR public.is_admin()
    );

CREATE POLICY "Student attendance insertable by teacher or admin" ON student_attendance
    FOR INSERT TO authenticated 
    WITH CHECK (public.current_user_role() = 'teacher' OR public.is_admin());

CREATE POLICY "Student attendance updatable by teacher or admin" ON student_attendance
    FOR UPDATE TO authenticated 
    USING (public.current_user_role() = 'teacher' OR public.is_admin());

-- EXAMINATIONS & RESULTS
CREATE POLICY "Examinations readable by all authenticated" ON examinations
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Examinations manageable by admin" ON examinations
    FOR ALL TO authenticated USING (public.is_admin());

CREATE POLICY "Marks readable by verified student, parent, teacher, admin" ON marks
    FOR SELECT TO authenticated 
    USING (
        (is_verified = true AND student_id IN (SELECT id FROM students WHERE profile_id = auth.uid()))
        OR (is_verified = true AND public.is_parent_of_student(student_id))
        OR public.current_user_role() = 'teacher'
        OR public.is_admin()
    );

CREATE POLICY "Marks manageable by teacher and admin" ON marks
    FOR ALL TO authenticated 
    USING (public.current_user_role() = 'teacher' OR public.is_admin());

CREATE POLICY "Results readable when published" ON results
    FOR SELECT TO authenticated 
    USING (
        (published_at IS NOT NULL AND student_id IN (SELECT id FROM students WHERE profile_id = auth.uid()))
        OR (published_at IS NOT NULL AND public.is_parent_of_student(student_id))
        OR public.is_admin()
    );

CREATE POLICY "Results manageable by admin" ON results
    FOR ALL TO authenticated USING (public.is_admin());

-- FEES & FINANCIALS
CREATE POLICY "Student fees readable by self, parent, admin" ON student_fees
    FOR SELECT TO authenticated 
    USING (
        student_id IN (SELECT id FROM students WHERE profile_id = auth.uid())
        OR public.is_parent_of_student(student_id)
        OR public.is_admin()
    );

CREATE POLICY "Student fees manageable by admin" ON student_fees
    FOR ALL TO authenticated USING (public.is_admin());

CREATE POLICY "Payments readable by payer or admin" ON payments
    FOR SELECT TO authenticated 
    USING (
        student_id IN (SELECT id FROM students WHERE profile_id = auth.uid())
        OR public.is_parent_of_student(student_id)
        OR public.is_admin()
    );

CREATE POLICY "Payments manageable by admin" ON payments
    FOR ALL TO authenticated USING (public.is_admin());

-- ANNOUNCEMENTS & NOTIFICATIONS
CREATE POLICY "Announcements readable by target audience" ON announcements
    FOR SELECT TO authenticated 
    USING (
        target_type = 'all' 
        OR target_role = public.current_user_role()
        OR public.is_admin()
    );

CREATE POLICY "Announcements manageable by admin" ON announcements
    FOR ALL TO authenticated USING (public.is_admin());

CREATE POLICY "Notifications readable by recipient" ON notifications
    FOR SELECT TO authenticated 
    USING (user_id = auth.uid());

CREATE POLICY "Notifications updatable by recipient" ON notifications
    FOR UPDATE TO authenticated 
    USING (user_id = auth.uid());

CREATE POLICY "Notifications insertable by admin or system" ON notifications
    FOR INSERT TO authenticated 
    WITH CHECK (true);

-- LIBRARY
CREATE POLICY "Books readable by all authenticated" ON books
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Books manageable by admin" ON books
    FOR ALL TO authenticated USING (public.is_admin());

CREATE POLICY "Book transactions readable by borrower or admin" ON book_transactions
    FOR SELECT TO authenticated 
    USING (user_id = auth.uid() OR public.is_admin());

-- AUDIT LOGS
CREATE POLICY "Audit logs readable by admin only" ON audit_logs
    FOR SELECT TO authenticated 
    USING (public.is_admin());

CREATE POLICY "Audit logs insertable by system" ON audit_logs
    FOR INSERT TO authenticated 
    WITH CHECK (true);
