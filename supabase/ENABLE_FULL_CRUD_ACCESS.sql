-- ==============================================================================
-- NORTHERN STAR SMART CAMPUS - FULL CRUD ACCESS POLICIES FOR SUPABASE
-- Run this in your Supabase SQL Editor (SQL Editor -> New Query -> Run)
-- This grants SELECT, INSERT, UPDATE, and DELETE to anon and authenticated roles
-- so that Web Admin Portal and Mobile App can seamlessly read & write data!
-- ==============================================================================

DO $$ 
DECLARE 
    tbl_name text;
    tables_list text[] := ARRAY[
        'institutions',
        'institution_settings',
        'app_configurations',
        'app_modules',
        'app_navigation',
        'app_banners',
        'app_versions',
        'profiles',
        'user_roles',
        'academic_years',
        'classes',
        'sections',
        'groups',
        'subjects',
        'class_subjects',
        'departments',
        'designations',
        'teachers',
        'staff',
        'teacher_assignments',
        'class_routines',
        'students',
        'parents',
        'parent_student_relationships',
        'admissions',
        'student_attendance',
        'staff_attendance',
        'examinations',
        'examination_subjects',
        'grading_systems',
        'marks',
        'results',
        'report_cards',
        'fee_categories',
        'fee_structures',
        'student_fees',
        'payments',
        'payment_receipts',
        'announcements',
        'conversations',
        'conversation_members',
        'messages',
        'notifications',
        'book_categories',
        'books',
        'book_copies',
        'book_transactions',
        'vehicles',
        'transport_routes',
        'student_transport_assignments',
        'visitors',
        'visitor_logs',
        'events',
        'assignments',
        'assignment_submissions',
        'learning_resources'
    ];
BEGIN
    FOREACH tbl_name IN ARRAY tables_list
    LOOP
        -- Enable RLS
        EXECUTE format('ALTER TABLE IF EXISTS %I ENABLE ROW LEVEL SECURITY;', tbl_name);
        
        -- Drop existing policies with same name
        EXECUTE format('DROP POLICY IF EXISTS "Public full access policy" ON %I;', tbl_name);
        EXECUTE format('DROP POLICY IF EXISTS "Public read policy" ON %I;', tbl_name);
        
        -- Create permissive policy allowing ALL operations (SELECT, INSERT, UPDATE, DELETE) for anon and authenticated
        EXECUTE format('CREATE POLICY "Public full access policy" ON %I FOR ALL TO public USING (true) WITH CHECK (true);', tbl_name);
    END LOOP;
END $$;
