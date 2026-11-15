-- ============================================================================
-- NORTHERN STAR SMART CAMPUS - ALL-IN-ONE SUPABASE DATABASE SETUP SCRIPT
-- Institution: Northern Star School & College
-- Tagline: Learn • Grow • Excel
-- Instructions: Paste this ENTIRE file into your Supabase Dashboard SQL Editor and click 'RUN'.
-- It will:
--   1. Create all core tables, constraints, functions, and indexes (50+ tables)
--   2. Enable Row Level Security (RLS) policies on all tables
--   3. Seed official institutional records (Classes, Sections, Students, Staff, Buses, Library)
-- ============================================================================

-- PART 1: SCHEMA
-- ==============================================================================
-- NORTHERN STAR SMART CAMPUS - ENTERPRISE DATABASE SCHEMA
-- Migration: 20261115000001_initial_schema.sql
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. INSTITUTION & CONFIGURATION
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS institutions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    slogan VARCHAR(255) DEFAULT 'Learn â€¢ Grow â€¢ Excel',
    address TEXT,
    phone VARCHAR(50),
    email VARCHAR(100),
    website VARCHAR(100),
    logo_url TEXT,
    established_year INT DEFAULT 2010,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS institution_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    setting_key VARCHAR(100) NOT NULL,
    setting_value JSONB NOT NULL DEFAULT '{}'::jsonb,
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(institution_id, setting_key)
);

CREATE TABLE IF NOT EXISTS app_configurations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    app_name VARCHAR(100) NOT NULL DEFAULT 'Northern Star Smart Campus',
    logo_url TEXT,
    primary_color VARCHAR(20) DEFAULT '#0B1E38',
    secondary_color VARCHAR(20) DEFAULT '#2563EB',
    accent_color VARCHAR(20) DEFAULT '#F59E0B',
    welcome_banner_title VARCHAR(255) DEFAULT 'Welcome to Northern Star School & College',
    welcome_banner_subtitle TEXT DEFAULT 'Building a Smart Campus for a Brighter Future',
    welcome_banner_image_url TEXT,
    contact_email VARCHAR(100) DEFAULT 'info@northernstar.edu.bd',
    contact_phone VARCHAR(50) DEFAULT '+880 1800-000000',
    contact_address TEXT DEFAULT 'Main Campus, Northern Star Avenue',
    about_text TEXT DEFAULT 'Northern Star School & College is committed to academic excellence, discipline, and modern holistic education.',
    android_version VARCHAR(20) DEFAULT '1.0.0',
    ios_version VARCHAR(20) DEFAULT '1.0.0',
    maintenance_mode BOOLEAN DEFAULT false,
    maintenance_message TEXT DEFAULT 'The system is undergoing scheduled maintenance. Please check back shortly.',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS app_modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    module_key VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50) NOT NULL,
    is_enabled BOOLEAN DEFAULT true,
    min_app_version VARCHAR(20) DEFAULT '1.0.0',
    allowed_roles TEXT[] DEFAULT ARRAY['student', 'parent', 'teacher', 'staff', 'admin', 'super_admin'],
    display_order INT DEFAULT 0,
    settings JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(institution_id, module_key)
);

CREATE TABLE IF NOT EXISTS app_navigation (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL,
    nav_type VARCHAR(30) DEFAULT 'bottom_nav', -- 'bottom_nav', 'quick_action', 'drawer'
    label VARCHAR(100) NOT NULL,
    icon VARCHAR(50) NOT NULL,
    route VARCHAR(100) NOT NULL,
    display_order INT DEFAULT 0,
    is_visible BOOLEAN DEFAULT true,
    badge_key VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS app_banners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    subtitle TEXT,
    image_url TEXT,
    action_url TEXT,
    target_roles TEXT[] DEFAULT ARRAY['student', 'parent', 'teacher', 'staff'],
    is_active BOOLEAN DEFAULT true,
    display_order INT DEFAULT 0,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS app_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    platform VARCHAR(20) NOT NULL, -- 'android', 'ios'
    version_name VARCHAR(20) NOT NULL,
    version_code INT NOT NULL,
    min_version_code INT NOT NULL,
    download_url TEXT,
    release_notes TEXT,
    is_force_update BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 2. AUTHENTICATION & PROFILES
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY, -- maps to auth.users.id
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('super_admin', 'admin', 'teacher', 'student', 'parent', 'staff')),
    phone VARCHAR(50),
    avatar_url TEXT,
    national_id VARCHAR(50),
    date_of_birth DATE,
    gender VARCHAR(20) CHECK (gender IN ('male', 'female', 'other')),
    blood_group VARCHAR(10),
    address TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL,
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(profile_id, role, institution_id)
);

CREATE TABLE IF NOT EXISTS role_permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL,
    permission VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(institution_id, role, permission)
);

CREATE TABLE IF NOT EXISTS user_permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    permission VARCHAR(100) NOT NULL,
    is_granted BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(profile_id, permission)
);

-- ------------------------------------------------------------------------------
-- 3. ACADEMIC STRUCTURE
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS academic_years (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL, -- '2025-2026'
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_current BOOLEAN DEFAULT false,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'upcoming', 'archived')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS classes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL, -- 'Class 9', 'Class 10', 'HSC 1st Year'
    numeric_level INT NOT NULL, -- 1 through 12
    category VARCHAR(50) DEFAULT 'school' CHECK (category IN ('primary', 'school', 'college')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL, -- 'A', 'B', 'Morning', 'Day'
    room_number VARCHAR(50),
    capacity INT DEFAULT 45,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(class_id, name)
);

CREATE TABLE IF NOT EXISTS groups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL, -- 'Science', 'Business Studies', 'Humanities'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS subjects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(30) NOT NULL,
    subject_type VARCHAR(30) DEFAULT 'theory' CHECK (subject_type IN ('theory', 'practical', 'both')),
    is_optional BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(institution_id, code)
);

CREATE TABLE IF NOT EXISTS class_subjects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    full_marks NUMERIC(5,2) DEFAULT 100.0,
    pass_marks NUMERIC(5,2) DEFAULT 33.0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(class_id, subject_id)
);

-- ------------------------------------------------------------------------------
-- 4. DEPARTMENTS, DESIGNATIONS, TEACHERS & STAFF
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(30),
    head_profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS designations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    title VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS teachers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    employee_id_code VARCHAR(50) UNIQUE NOT NULL,
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    designation_id UUID REFERENCES designations(id) ON DELETE SET NULL,
    qualification TEXT,
    specialization VARCHAR(100),
    joining_date DATE,
    salary NUMERIC(10,2) DEFAULT 0.0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS staff (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    employee_id_code VARCHAR(50) UNIQUE NOT NULL,
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    designation_id UUID REFERENCES designations(id) ON DELETE SET NULL,
    joining_date DATE,
    salary NUMERIC(10,2) DEFAULT 0.0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS staff_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    document_type VARCHAR(50) NOT NULL,
    title VARCHAR(150) NOT NULL,
    file_url TEXT NOT NULL,
    verified BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS teacher_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    teacher_id UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    section_id UUID NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    academic_year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
    is_class_teacher BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(teacher_id, class_id, section_id, subject_id, academic_year_id)
);

CREATE TABLE IF NOT EXISTS class_routines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    academic_year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    section_id UUID NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    teacher_id UUID REFERENCES teachers(id) ON DELETE SET NULL,
    day_of_week VARCHAR(20) NOT NULL CHECK (day_of_week IN ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday')),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    room_number VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 5. STUDENTS & PARENTS
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    student_id_code VARCHAR(50) UNIQUE NOT NULL, -- e.g. 'NSC2025001'
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE RESTRICT,
    section_id UUID NOT NULL REFERENCES sections(id) ON DELETE RESTRICT,
    group_id UUID REFERENCES groups(id) ON DELETE SET NULL,
    roll_number INT NOT NULL,
    admission_date DATE DEFAULT CURRENT_DATE,
    academic_year_id UUID REFERENCES academic_years(id) ON DELETE SET NULL,
    status VARCHAR(30) DEFAULT 'active' CHECK (status IN ('active', 'graduated', 'transferred', 'suspended', 'withdrawn')),
    qr_code_token TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS parents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    father_name VARCHAR(150),
    father_occupation VARCHAR(100),
    father_phone VARCHAR(50),
    mother_name VARCHAR(150),
    mother_occupation VARCHAR(100),
    mother_phone VARCHAR(50),
    emergency_contact VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS parent_student_relationships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_id UUID NOT NULL REFERENCES parents(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    relationship_type VARCHAR(50) DEFAULT 'parent' CHECK (relationship_type IN ('father', 'mother', 'guardian')),
    is_primary_contact BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(parent_id, student_id)
);

CREATE TABLE IF NOT EXISTS admissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    applicant_name VARCHAR(150) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(20) NOT NULL,
    applied_class_id UUID NOT NULL REFERENCES classes(id) ON DELETE RESTRICT,
    previous_school VARCHAR(200),
    guardian_name VARCHAR(150) NOT NULL,
    guardian_phone VARCHAR(50) NOT NULL,
    guardian_email VARCHAR(100),
    status VARCHAR(30) DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected')),
    application_date DATE DEFAULT CURRENT_DATE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS student_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    document_type VARCHAR(50) NOT NULL,
    title VARCHAR(150) NOT NULL,
    file_url TEXT NOT NULL,
    verified BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 6. ATTENDANCE MANAGEMENT
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS student_attendance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    section_id UUID NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('present', 'absent', 'late', 'excused')),
    check_in_time TIME,
    remarks TEXT,
    marked_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id, date)
);

CREATE TABLE IF NOT EXISTS staff_attendance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('present', 'absent', 'late', 'excused')),
    check_in_time TIME,
    check_out_time TIME,
    remarks TEXT,
    marked_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(profile_id, date)
);

CREATE TABLE IF NOT EXISTS attendance_correction_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    attendance_id UUID NOT NULL REFERENCES student_attendance(id) ON DELETE CASCADE,
    requester_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    requested_status VARCHAR(20) NOT NULL CHECK (requested_status IN ('present', 'absent', 'late', 'excused')),
    reason TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    reviewed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    review_remarks TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 7. EXAMINATIONS & RESULTS
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS examinations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    academic_year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL, -- 'Term Final Exam 2025'
    exam_type VARCHAR(50) DEFAULT 'term_final',
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS examination_subjects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    examination_id UUID NOT NULL REFERENCES examinations(id) ON DELETE CASCADE,
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    exam_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    full_marks NUMERIC(5,2) DEFAULT 100.0,
    pass_marks NUMERIC(5,2) DEFAULT 33.0,
    room_number VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(examination_id, class_id, subject_id)
);

CREATE TABLE IF NOT EXISTS grading_systems (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL DEFAULT 'Standard GPA 5.0',
    grade_letter VARCHAR(10) NOT NULL, -- 'A+', 'A', 'A-', 'B', 'C', 'D', 'F'
    min_percentage NUMERIC(5,2) NOT NULL,
    max_percentage NUMERIC(5,2) NOT NULL,
    grade_point NUMERIC(3,2) NOT NULL,
    remarks VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS marks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    examination_id UUID NOT NULL REFERENCES examinations(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    marks_obtained NUMERIC(5,2) NOT NULL,
    highest_marks NUMERIC(5,2) DEFAULT 100.0,
    submitted_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(examination_id, subject_id, student_id)
);

CREATE TABLE IF NOT EXISTS results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    examination_id UUID NOT NULL REFERENCES examinations(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    total_marks NUMERIC(7,2) NOT NULL,
    gpa NUMERIC(3,2) NOT NULL,
    grade VARCHAR(10) NOT NULL,
    position_in_class INT,
    remarks TEXT,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(examination_id, student_id)
);

CREATE TABLE IF NOT EXISTS report_cards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    result_id UUID NOT NULL REFERENCES results(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    card_data JSONB NOT NULL,
    generated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 8. FEE & FINANCIAL MANAGEMENT
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS fee_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL, -- 'Monthly Tuition', 'Admission Fee', 'Examination Fee', etc.
    description TEXT,
    is_recurring BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS fee_structures (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    fee_category_id UUID NOT NULL REFERENCES fee_categories(id) ON DELETE CASCADE,
    academic_year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
    amount NUMERIC(10,2) NOT NULL,
    due_day_of_month INT DEFAULT 10,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(class_id, fee_category_id, academic_year_id)
);

CREATE TABLE IF NOT EXISTS student_fees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    fee_category_id UUID NOT NULL REFERENCES fee_categories(id) ON DELETE RESTRICT,
    title VARCHAR(150) NOT NULL,
    amount NUMERIC(10,2) NOT NULL,
    discount_amount NUMERIC(10,2) DEFAULT 0.0,
    net_amount NUMERIC(10,2) NOT NULL,
    due_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'unpaid' CHECK (status IN ('unpaid', 'partially_paid', 'paid')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    student_fee_id UUID REFERENCES student_fees(id) ON DELETE SET NULL,
    amount_paid NUMERIC(10,2) NOT NULL,
    payment_method VARCHAR(30) DEFAULT 'cash' CHECK (payment_method IN ('cash', 'bank_transfer', 'card', 'bkash', 'nagad', 'rocket', 'online')),
    transaction_id VARCHAR(100),
    payment_date DATE DEFAULT CURRENT_DATE,
    collected_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    status VARCHAR(20) DEFAULT 'successful' CHECK (status IN ('successful', 'pending', 'failed')),
    receipt_number VARCHAR(50) UNIQUE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payment_receipts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    payment_id UUID NOT NULL REFERENCES payments(id) ON DELETE CASCADE,
    receipt_number VARCHAR(50) NOT NULL,
    receipt_data JSONB NOT NULL,
    generated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS scholarships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    discount_percentage NUMERIC(5,2) DEFAULT 0.0,
    fixed_amount NUMERIC(10,2) DEFAULT 0.0,
    reason VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    category VARCHAR(100) NOT NULL,
    title VARCHAR(200) NOT NULL,
    amount NUMERIC(10,2) NOT NULL,
    expense_date DATE DEFAULT CURRENT_DATE,
    paid_to VARCHAR(150),
    receipt_url TEXT,
    approved_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 9. COMMUNICATION & NOTIFICATIONS
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    target_type VARCHAR(30) DEFAULT 'all' CHECK (target_type IN ('all', 'role', 'class')),
    target_role VARCHAR(50),
    target_class_id UUID REFERENCES classes(id) ON DELETE SET NULL,
    attachment_url TEXT,
    is_emergency BOOLEAN DEFAULT false,
    publish_date TIMESTAMPTZ DEFAULT NOW(),
    expiry_date TIMESTAMPTZ,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    title VARCHAR(150),
    conversation_type VARCHAR(20) DEFAULT 'direct' CHECK (conversation_type IN ('direct', 'group')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS conversation_members (
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY(conversation_id, profile_id)
);

CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    message_text TEXT NOT NULL,
    attachment_url TEXT,
    sent_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    notification_type VARCHAR(50) DEFAULT 'general' CHECK (notification_type IN ('attendance', 'fee', 'exam', 'announcement', 'general', 'emergency')),
    link_url TEXT,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notification_preferences (
    user_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    email_enabled BOOLEAN DEFAULT true,
    push_enabled BOOLEAN DEFAULT true,
    sms_enabled BOOLEAN DEFAULT true,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 10. LIBRARY MANAGEMENT
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS book_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS books (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    category_id UUID REFERENCES book_categories(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(200) NOT NULL,
    isbn VARCHAR(50),
    publisher VARCHAR(150),
    edition VARCHAR(50),
    total_copies INT DEFAULT 1,
    available_copies INT DEFAULT 1,
    cover_image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS book_copies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    book_id UUID NOT NULL REFERENCES books(id) ON DELETE CASCADE,
    barcode_or_rfid VARCHAR(100) UNIQUE NOT NULL,
    status VARCHAR(30) DEFAULT 'available' CHECK (status IN ('available', 'borrowed', 'damaged', 'lost')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS book_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    book_id UUID NOT NULL REFERENCES books(id) ON DELETE CASCADE,
    copy_id UUID REFERENCES book_copies(id) ON DELETE SET NULL,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    issue_date DATE DEFAULT CURRENT_DATE,
    due_date DATE NOT NULL,
    return_date DATE,
    fine_amount NUMERIC(8,2) DEFAULT 0.0,
    status VARCHAR(20) DEFAULT 'borrowed' CHECK (status IN ('borrowed', 'returned', 'overdue')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 11. TRANSPORT MANAGEMENT
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS vehicles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    vehicle_number VARCHAR(50) NOT NULL, -- e.g. 'Bus #03'
    vehicle_type VARCHAR(50) DEFAULT 'School Bus',
    capacity INT DEFAULT 40,
    driver_name VARCHAR(100),
    driver_phone VARCHAR(50),
    license_number VARCHAR(100),
    status VARCHAR(30) DEFAULT 'active' CHECK (status IN ('active', 'maintenance', 'inactive')),
    last_service_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS transport_routes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    route_name VARCHAR(150) NOT NULL,
    starting_point VARCHAR(150) NOT NULL,
    ending_point VARCHAR(150) NOT NULL,
    stops JSONB DEFAULT '[]'::jsonb,
    fee_amount NUMERIC(10,2) DEFAULT 0.0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS student_transport_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE RESTRICT,
    route_id UUID NOT NULL REFERENCES transport_routes(id) ON DELETE RESTRICT,
    pickup_point VARCHAR(150),
    dropoff_point VARCHAR(150),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id)
);

-- ------------------------------------------------------------------------------
-- 12. CAMPUS OPERATIONS & ASSETS
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS visitors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    nid_passport VARCHAR(50),
    purpose VARCHAR(255) NOT NULL,
    person_to_meet VARCHAR(150) NOT NULL,
    check_in_time TIMESTAMPTZ DEFAULT NOW(),
    check_out_time TIMESTAMPTZ,
    pass_code_qr VARCHAR(100) UNIQUE,
    status VARCHAR(20) DEFAULT 'inside' CHECK (status IN ('inside', 'checked_out', 'denied')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS visitor_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    visitor_id UUID NOT NULL REFERENCES visitors(id) ON DELETE CASCADE,
    gate_number VARCHAR(50) DEFAULT 'Main Gate',
    logged_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS inventory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    item_name VARCHAR(150) NOT NULL,
    category VARCHAR(100) NOT NULL,
    quantity INT DEFAULT 0,
    unit VARCHAR(30) DEFAULT 'pcs',
    location VARCHAR(100),
    min_threshold INT DEFAULT 5,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    asset_tag VARCHAR(50) UNIQUE NOT NULL,
    asset_name VARCHAR(150) NOT NULL,
    serial_number VARCHAR(100),
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    purchase_date DATE,
    cost NUMERIC(12,2) DEFAULT 0.0,
    condition VARCHAR(50) DEFAULT 'good',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS maintenance_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    location VARCHAR(150) NOT NULL,
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'emergency')),
    reported_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    assigned_to UUID REFERENCES profiles(id) ON DELETE SET NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS incidents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    severity VARCHAR(20) DEFAULT 'low' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    reported_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action_taken TEXT,
    incident_date TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 13. DIGITAL LEARNING, EVENTS & AUDIT LOGS
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS leave_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    leave_type VARCHAR(50) NOT NULL, -- 'sick', 'casual', 'maternity', 'emergency'
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    approved_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    review_remarks TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    event_type VARCHAR(50) DEFAULT 'event' CHECK (event_type IN ('examination', 'meeting', 'event', 'holiday', 'sports')),
    start_datetime TIMESTAMPTZ NOT NULL,
    end_datetime TIMESTAMPTZ NOT NULL,
    location VARCHAR(150),
    target_roles TEXT[] DEFAULT ARRAY['student', 'parent', 'teacher', 'staff'],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    section_id UUID NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    teacher_id UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    file_url TEXT,
    due_date TIMESTAMPTZ NOT NULL,
    total_marks NUMERIC(5,2) DEFAULT 20.0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS assignment_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assignment_id UUID NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    submission_file_url TEXT,
    submission_text TEXT,
    marks_obtained NUMERIC(5,2),
    feedback TEXT,
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(assignment_id, student_id)
);

CREATE TABLE IF NOT EXISTS learning_resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    resource_type VARCHAR(30) DEFAULT 'pdf' CHECK (resource_type IN ('pdf', 'video', 'link', 'document')),
    file_url TEXT NOT NULL,
    uploaded_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID REFERENCES institutions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100) NOT NULL,
    entity_id VARCHAR(100),
    old_values JSONB,
    new_values JSONB,
    ip_address VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- PERFORMANCE INDEXES
-- ------------------------------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_institution ON profiles(institution_id);
CREATE INDEX IF NOT EXISTS idx_students_class_section ON students(class_id, section_id);
CREATE INDEX IF NOT EXISTS idx_student_attendance_date ON student_attendance(date, class_id, section_id);
CREATE INDEX IF NOT EXISTS idx_student_attendance_student ON student_attendance(student_id);
CREATE INDEX IF NOT EXISTS idx_marks_exam_student ON marks(examination_id, student_id);
CREATE INDEX IF NOT EXISTS idx_results_exam_student ON results(examination_id, student_id);
CREATE INDEX IF NOT EXISTS idx_student_fees_student ON student_fees(student_id, status);
CREATE INDEX IF NOT EXISTS idx_payments_student ON payments(student_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_announcements_inst ON announcements(institution_id, publish_date);
CREATE INDEX IF NOT EXISTS idx_app_modules_inst ON app_modules(institution_id, is_enabled);
CREATE INDEX IF NOT EXISTS idx_app_navigation_role ON app_navigation(institution_id, role, nav_type);


-- PART 2: ROW LEVEL SECURITY POLICIES
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


-- PART 3: SEED DATA
-- ==============================================================================
-- NORTHERN STAR SMART CAMPUS - PRODUCTION-READY SEED DATA
-- Matches Official Design References Exactly
-- ==============================================================================

-- 1. INSTITUTION
INSERT INTO institutions (id, name, code, slogan, address, phone, email, website, logo_url, established_year)
VALUES (
    'a0000000-0000-0000-0000-000000000001',
    'Northern Star School & College',
    'NSSC',
    'Learn â€¢ Grow â€¢ Excel',
    'Campus Road, Sector 7, Uttara, Dhaka-1230, Bangladesh',
    '+880 1800-000000',
    'info@northernstar.edu.bd',
    'https://northernstar.edu.bd',
    '/logo.png',
    2010
) ON CONFLICT (id) DO NOTHING;

-- 2. APP CONFIGURATION (Central Mobile Remote Config)
INSERT INTO app_configurations (
    id, institution_id, app_name, logo_url, primary_color, secondary_color, accent_color,
    welcome_banner_title, welcome_banner_subtitle, welcome_banner_image_url,
    contact_email, contact_phone, contact_address, about_text,
    android_version, ios_version, maintenance_mode, is_active
) VALUES (
    'c0000000-0000-0000-0000-000000000001',
    'a0000000-0000-0000-0000-000000000001',
    'Northern Star Smart Campus',
    '/logo.png',
    '#0B1E38',
    '#2563EB',
    '#F59E0B',
    'Welcome to Northern Star School & College',
    'Building a Smart Campus for a Brighter Future',
    '/campus-hero.jpg',
    'info@northernstar.edu.bd',
    '+880 1800-000000',
    'Main Campus, Northern Star Avenue',
    'Northern Star School & College is committed to academic excellence, discipline, and modern holistic education with smart digital integration.',
    '1.2.0',
    '1.2.0',
    false,
    true
) ON CONFLICT (id) DO NOTHING;

-- 3. APP MODULES (Centrally Remotely Managed)
INSERT INTO app_modules (institution_id, module_key, name, description, icon, is_enabled, min_app_version, allowed_roles, display_order)
VALUES
    ('a0000000-0000-0000-0000-000000000001', 'attendance', 'Attendance Tracker', 'Real-time daily class and staff attendance', 'CalendarCheck', true, '1.0.0', ARRAY['student', 'parent', 'teacher', 'staff', 'admin'], 1),
    ('a0000000-0000-0000-0000-000000000001', 'homework', 'Homework & Assignments', 'Digital homework distribution and submission', 'BookOpen', true, '1.0.0', ARRAY['student', 'parent', 'teacher', 'admin'], 2),
    ('a0000000-0000-0000-0000-000000000001', 'results', 'Examinations & Results', 'Term report cards, GPA transcripts and subject marks', 'Award', true, '1.0.0', ARRAY['student', 'parent', 'teacher', 'admin'], 3),
    ('a0000000-0000-0000-0000-000000000001', 'fees', 'Fee & Financial Management', 'Monthly tuition invoices, payment receipts and online portal', 'CreditCard', true, '1.0.0', ARRAY['student', 'parent', 'admin'], 4),
    ('a0000000-0000-0000-0000-000000000001', 'library', 'Digital Library', 'Online book catalogue, inventory and borrowing history', 'Book', true, '1.0.0', ARRAY['student', 'parent', 'teacher', 'staff', 'admin'], 5),
    ('a0000000-0000-0000-0000-000000000001', 'transport', 'Campus Transport', 'Fleet management, bus routes and transport allocations', 'Bus', true, '1.0.0', ARRAY['student', 'parent', 'staff', 'admin'], 6),
    ('a0000000-0000-0000-0000-000000000001', 'digital_id', 'Digital Student ID', 'Encrypted QR student identification pass', 'QrCode', true, '1.0.0', ARRAY['student', 'parent', 'staff', 'admin'], 7),
    ('a0000000-0000-0000-0000-000000000001', 'routine', 'Class Routine & Schedule', 'Weekly class timetables and room allocations', 'Clock', true, '1.0.0', ARRAY['student', 'parent', 'teacher', 'admin'], 8),
    ('a0000000-0000-0000-0000-000000000001', 'communication', 'Notices & Announcements', 'Push announcements, circulars and direct messaging', 'Bell', true, '1.0.0', ARRAY['student', 'parent', 'teacher', 'staff', 'admin'], 9),
    ('a0000000-0000-0000-0000-000000000001', 'events', 'Academic Events', 'Institutional calendar, sports day and meetings', 'Calendar', true, '1.0.0', ARRAY['student', 'parent', 'teacher', 'staff', 'admin'], 10),
    ('a0000000-0000-0000-0000-000000000001', 'resources', 'Learning Resources', 'PDF notes, recorded lectures and study materials', 'FolderOpen', true, '1.0.0', ARRAY['student', 'teacher', 'admin'], 11)
ON CONFLICT (institution_id, module_key) DO UPDATE 
SET is_enabled = EXCLUDED.is_enabled, display_order = EXCLUDED.display_order;

-- 4. NAVIGATION DEFINITION PER ROLE
INSERT INTO app_navigation (institution_id, role, nav_type, label, icon, route, display_order, is_visible)
VALUES
    -- Student Portal Bottom Navigation
    ('a0000000-0000-0000-0000-000000000001', 'student', 'bottom_nav', 'Home', 'Home', '/student/home', 1, true),
    ('a0000000-0000-0000-0000-000000000001', 'student', 'bottom_nav', 'Notices', 'Bell', '/student/notices', 2, true),
    ('a0000000-0000-0000-0000-000000000001', 'student', 'bottom_nav', 'Profile', 'User', '/student/profile', 3, true),
    ('a0000000-0000-0000-0000-000000000001', 'student', 'bottom_nav', 'More', 'Grid', '/student/more', 4, true),

    -- Parent Portal Bottom Navigation
    ('a0000000-0000-0000-0000-000000000001', 'parent', 'bottom_nav', 'Home', 'Home', '/parent/home', 1, true),
    ('a0000000-0000-0000-0000-000000000001', 'parent', 'bottom_nav', 'Children', 'Users', '/parent/children', 2, true),
    ('a0000000-0000-0000-0000-000000000001', 'parent', 'bottom_nav', 'Messages', 'MessageSquare', '/parent/messages', 3, true),
    ('a0000000-0000-0000-0000-000000000001', 'parent', 'bottom_nav', 'More', 'Grid', '/parent/more', 4, true),

    -- Teacher Portal Bottom Navigation
    ('a0000000-0000-0000-0000-000000000001', 'teacher', 'bottom_nav', 'Home', 'Home', '/teacher/home', 1, true),
    ('a0000000-0000-0000-0000-000000000001', 'teacher', 'bottom_nav', 'Classes', 'BookOpen', '/teacher/classes', 2, true),
    ('a0000000-0000-0000-0000-000000000001', 'teacher', 'bottom_nav', 'Messages', 'MessageSquare', '/teacher/messages', 3, true),
    ('a0000000-0000-0000-0000-000000000001', 'teacher', 'bottom_nav', 'More', 'Grid', '/teacher/more', 4, true),

    -- Staff Portal Bottom Navigation
    ('a0000000-0000-0000-0000-000000000001', 'staff', 'bottom_nav', 'Home', 'Home', '/staff/home', 1, true),
    ('a0000000-0000-0000-0000-000000000001', 'staff', 'bottom_nav', 'Tasks', 'CheckSquare', '/staff/tasks', 2, true),
    ('a0000000-0000-0000-0000-000000000001', 'staff', 'bottom_nav', 'Profile', 'User', '/staff/profile', 3, true),
    ('a0000000-0000-0000-0000-000000000001', 'staff', 'bottom_nav', 'More', 'Grid', '/staff/more', 4, true);

-- 5. ACADEMIC STRUCTURE
INSERT INTO academic_years (id, institution_id, name, start_date, end_date, is_current, status)
VALUES ('d0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', '2025-2026', '2025-01-01', '2025-12-31', true, 'active')
ON CONFLICT (id) DO NOTHING;

INSERT INTO classes (id, institution_id, name, numeric_level, category) VALUES
    ('e0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Class 1', 1, 'primary'),
    ('e0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000001', 'Class 5', 5, 'primary'),
    ('e0000000-0000-0000-0000-000000000009', 'a0000000-0000-0000-0000-000000000001', 'Class 9', 9, 'school'),
    ('e0000000-0000-0000-0000-000000000010', 'a0000000-0000-0000-0000-000000000001', 'Class 10', 10, 'school'),
    ('e0000000-0000-0000-0000-000000000011', 'a0000000-0000-0000-0000-000000000001', 'HSC 1st Year (Class 11)', 11, 'college'),
    ('e0000000-0000-0000-0000-000000000012', 'a0000000-0000-0000-0000-000000000001', 'HSC 2nd Year (Class 12)', 12, 'college')
ON CONFLICT (id) DO NOTHING;

INSERT INTO sections (id, institution_id, class_id, name, room_number, capacity) VALUES
    ('f0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000009', 'A', 'Room 101', 45),
    ('f0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000009', 'B', 'Room 102', 45),
    ('f0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000010', 'A', 'Room 201', 45)
ON CONFLICT (id) DO NOTHING;

INSERT INTO subjects (id, institution_id, name, code, subject_type) VALUES
    ('s0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Mathematics', 'MATH101', 'theory'),
    ('s0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'Physics', 'PHY101', 'both'),
    ('s0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'English', 'ENG101', 'theory'),
    ('s0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000001', 'Chemistry', 'CHEM101', 'both'),
    ('s0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000001', 'Biology', 'BIO101', 'both')
ON CONFLICT (id) DO NOTHING;

-- 6. DEPARTMENTS & DESIGNATIONS
INSERT INTO departments (id, institution_id, name, code) VALUES
    ('d1000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Mathematics & Natural Science', 'MNS'),
    ('d1000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'Administration & HR', 'ADMIN'),
    ('d1000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'Transport Fleet', 'TRANS')
ON CONFLICT (id) DO NOTHING;

INSERT INTO designations (id, institution_id, department_id, title) VALUES
    ('d2000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'd1000000-0000-0000-0000-000000000001', 'Senior Lecturer'),
    ('d2000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'd1000000-0000-0000-0000-000000000002', 'Administrative Officer')
ON CONFLICT (id) DO NOTHING;

-- 7. PROFILES & ROLES (Matching UI Showcase EXACTLY)
-- Super Admin
INSERT INTO profiles (id, institution_id, email, full_name, role, phone, avatar_url, gender)
VALUES (
    'b0000000-0000-0000-0000-000000000001',
    'a0000000-0000-0000-0000-000000000001',
    'admin@northernstar.edu.bd',
    'Super Admin',
    'super_admin',
    '+880 1711-000000',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    'male'
) ON CONFLICT (id) DO NOTHING;

-- Teacher: Mr. Tanvir Hasan (Mathematics)
INSERT INTO profiles (id, institution_id, email, full_name, role, phone, avatar_url, gender)
VALUES (
    'b0000000-0000-0000-0000-000000000002',
    'a0000000-0000-0000-0000-000000000001',
    'tanvir.hasan@northernstar.edu.bd',
    'Mr. Tanvir Hasan',
    'teacher',
    '+880 1712-345678',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    'male'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO teachers (id, profile_id, institution_id, employee_id_code, department_id, designation_id, qualification, specialization, joining_date, salary)
VALUES (
    't0000000-0000-0000-0000-000000000001',
    'b0000000-0000-0000-0000-000000000002',
    'a0000000-0000-0000-0000-000000000001',
    'NST202501',
    'd1000000-0000-0000-0000-000000000001',
    'd2000000-0000-0000-0000-000000000001',
    'M.Sc. in Pure Mathematics, University of Dhaka',
    'Higher Mathematics & Calculus',
    '2021-02-01',
    65000.00
) ON CONFLICT (id) DO NOTHING;

-- Student: Rahim Ahmed (Class: 9-A, ID: NSC2025001)
INSERT INTO profiles (id, institution_id, email, full_name, role, phone, avatar_url, gender, date_of_birth, blood_group)
VALUES (
    'b0000000-0000-0000-0000-000000000003',
    'a0000000-0000-0000-0000-000000000001',
    'rahim.ahmed@northernstar.edu.bd',
    'Rahim Ahmed',
    'student',
    '+880 1799-887766',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
    'male',
    '2010-05-14',
    'B+'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO students (id, profile_id, institution_id, student_id_code, class_id, section_id, roll_number, admission_date, status, qr_code_token)
VALUES (
    'st000000-0000-0000-0000-000000000001',
    'b0000000-0000-0000-0000-000000000003',
    'a0000000-0000-0000-0000-000000000001',
    'NSC2025001',
    'e0000000-0000-0000-0000-000000000009',
    'f0000000-0000-0000-0000-000000000001',
    1,
    '2024-01-10',
    'active',
    'NSSC_QR_TOKEN_SECURE_RAHIM_AHMED_NSC2025001'
) ON CONFLICT (id) DO NOTHING;

-- Parent: Mrs. Fatema Akter (Parent of Rahim Ahmed)
INSERT INTO profiles (id, institution_id, email, full_name, role, phone, avatar_url, gender)
VALUES (
    'b0000000-0000-0000-0000-000000000004',
    'a0000000-0000-0000-0000-000000000001',
    'fatema.akter@northernstar.edu.bd',
    'Mrs. Fatema Akter',
    'parent',
    '+880 1788-112233',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    'female'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO parents (id, profile_id, institution_id, mother_name, mother_occupation, mother_phone, emergency_contact)
VALUES (
    'p0000000-0000-0000-0000-000000000001',
    'b0000000-0000-0000-0000-000000000004',
    'a0000000-0000-0000-0000-000000000001',
    'Mrs. Fatema Akter',
    'Education Consultant',
    '+880 1788-112233',
    '+880 1788-112233'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO parent_student_relationships (parent_id, student_id, relationship_type, is_primary_contact)
VALUES (
    'p0000000-0000-0000-0000-000000000001',
    'st000000-0000-0000-0000-000000000001',
    'mother',
    true
) ON CONFLICT (parent_id, student_id) DO NOTHING;

-- Staff: Ms. Nusrat Jahan (Administration)
INSERT INTO profiles (id, institution_id, email, full_name, role, phone, avatar_url, gender)
VALUES (
    'b0000000-0000-0000-0000-000000000005',
    'a0000000-0000-0000-0000-000000000001',
    'nusrat.jahan@northernstar.edu.bd',
    'Ms. Nusrat Jahan',
    'staff',
    '+880 1777-654321',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    'female'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO staff (id, profile_id, institution_id, employee_id_code, department_id, designation_id, joining_date, salary)
VALUES (
    'stf00000-0000-0000-0000-000000000001',
    'b0000000-0000-0000-0000-000000000005',
    'a0000000-0000-0000-0000-000000000001',
    'NSS202501',
    'd1000000-0000-0000-0000-000000000002',
    'd2000000-0000-0000-0000-000000000002',
    '2022-06-15',
    42000.00
) ON CONFLICT (id) DO NOTHING;

-- 8. CLASS ROUTINE FOR TODAY (Class 9-A)
INSERT INTO class_routines (institution_id, academic_year_id, class_id, section_id, subject_id, teacher_id, day_of_week, start_time, end_time, room_number)
VALUES
    ('a0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000009', 'f0000000-0000-0000-0000-000000000001', 's0000000-0000-0000-0000-000000000001', 't0000000-0000-0000-0000-000000000001', 'monday', '09:00:00', '10:00:00', 'Room 101'),
    ('a0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000009', 'f0000000-0000-0000-0000-000000000001', 's0000000-0000-0000-0000-000000000002', 't0000000-0000-0000-0000-000000000001', 'monday', '10:00:00', '11:00:00', 'Room 102'),
    ('a0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000009', 'f0000000-0000-0000-0000-000000000001', 's0000000-0000-0000-0000-000000000003', 't0000000-0000-0000-0000-000000000001', 'monday', '11:00:00', '12:00:00', 'Room 103');

-- 9. TODAY'S ATTENDANCE (Rahim Ahmed marked Present at 9:00 AM)
INSERT INTO student_attendance (institution_id, student_id, class_id, section_id, date, status, check_in_time, remarks)
VALUES (
    'a0000000-0000-0000-0000-000000000001',
    'st000000-0000-0000-0000-000000000001',
    'e0000000-0000-0000-0000-000000000009',
    'f0000000-0000-0000-0000-000000000001',
    CURRENT_DATE,
    'present',
    '09:00:00',
    'On time for Mathematics'
) ON CONFLICT (student_id, date) DO NOTHING;

-- 10. EXAMINATION, RESULTS & MARKS (Matches UI: Term Final Exam, GPA 4.95, A+, 1st Position)
INSERT INTO examinations (id, institution_id, academic_year_id, name, exam_type, start_date, end_date, is_published)
VALUES (
    'ex000000-0000-0000-0000-000000000001',
    'a0000000-0000-0000-0000-000000000001',
    'd0000000-0000-0000-0000-000000000001',
    'Term Final Exam 2025',
    'term_final',
    '2025-10-15',
    '2025-10-30',
    true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO results (id, examination_id, student_id, total_marks, gpa, grade, position_in_class, remarks, published_at)
VALUES (
    'res00000-0000-0000-0000-000000000001',
    'ex000000-0000-0000-0000-000000000001',
    'st000000-0000-0000-0000-000000000001',
    294.00,
    4.95,
    'A+',
    1,
    'Outstanding academic performance. Ranked 1st in Class 9-A.',
    NOW()
) ON CONFLICT (examination_id, student_id) DO NOTHING;

INSERT INTO marks (examination_id, subject_id, student_id, marks_obtained, highest_marks, is_verified)
VALUES
    ('ex000000-0000-0000-0000-000000000001', 's0000000-0000-0000-0000-000000000001', 'st000000-0000-0000-0000-000000000001', 99.00, 99.00, true),
    ('ex000000-0000-0000-0000-000000000001', 's0000000-0000-0000-0000-000000000002', 'st000000-0000-0000-0000-000000000001', 98.00, 98.00, true),
    ('ex000000-0000-0000-0000-000000000001', 's0000000-0000-0000-0000-000000000003', 'st000000-0000-0000-0000-000000000001', 97.00, 97.00, true)
ON CONFLICT (examination_id, subject_id, student_id) DO NOTHING;

-- 11. FEES & PAYMENTS (Paid in Full - à§³ 5,000)
INSERT INTO fee_categories (id, institution_id, name, description, is_recurring)
VALUES ('fc000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Monthly Tuition Fee', 'Regular monthly instructional fee', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO student_fees (id, student_id, fee_category_id, title, amount, net_amount, due_date, status)
VALUES (
    'fee00000-0000-0000-0000-000000000001',
    'st000000-0000-0000-0000-000000000001',
    'fc000000-0000-0000-0000-000000000001',
    'Monthly Tuition - November 2025',
    5000.00,
    5000.00,
    '2025-11-10',
    'paid'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO payments (institution_id, student_id, student_fee_id, amount_paid, payment_method, receipt_number, status, payment_date)
VALUES
    ('a0000000-0000-0000-0000-000000000001', 'st000000-0000-0000-0000-000000000001', 'fee00000-0000-0000-0000-000000000001', 5000.00, 'online', 'REC-2025-11001', 'successful', '2025-11-05'),
    ('a0000000-0000-0000-0000-000000000001', 'st000000-0000-0000-0000-000000000001', NULL, 5000.00, 'online', 'REC-2025-10045', 'successful', '2025-10-06'),
    ('a0000000-0000-0000-0000-000000000001', 'st000000-0000-0000-0000-000000000001', NULL, 5000.00, 'online', 'REC-2025-09022', 'successful', '2025-09-04');

-- 12. LIBRARY BOOKS (Matches UI showcase)
INSERT INTO book_categories (id, institution_id, name)
VALUES ('bc000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Educational')
ON CONFLICT (id) DO NOTHING;

INSERT INTO books (id, institution_id, category_id, title, author, isbn, available_copies, total_copies)
VALUES
    ('bk000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'bc000000-0000-0000-0000-000000000001', 'Science Today', 'Dr. Farhad Hossain', '978-0123456789', 5, 5),
    ('bk000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'bc000000-0000-0000-0000-000000000001', 'Mathematics Guide', 'Prof. Nazmul Haque', '978-0987654321', 8, 10),
    ('bk000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'bc000000-0000-0000-0000-000000000001', 'English Grammar in Use', 'Raymond Murphy', '978-1108457651', 4, 6)
ON CONFLICT (id) DO NOTHING;

-- 13. VEHICLES & FLEET (12 Registered Buses, Bus #03)
INSERT INTO vehicles (institution_id, vehicle_number, vehicle_type, capacity, driver_name, driver_phone, status)
VALUES
    ('a0000000-0000-0000-0000-000000000001', 'Bus #03', 'AC Campus Shuttle', 40, 'Md. Moklesur Rahman', '+880 1711-223344', 'active'),
    ('a0000000-0000-0000-0000-000000000001', 'Bus #01', 'Standard School Bus', 50, 'Abdul Karim', '+880 1711-223345', 'active'),
    ('a0000000-0000-0000-0000-000000000001', 'Bus #02', 'Standard School Bus', 50, 'Jahangir Alam', '+880 1711-223346', 'active');

-- 14. UPCOMING EVENTS (Matches Dashboard)
INSERT INTO events (institution_id, title, description, event_type, start_datetime, end_datetime, location)
VALUES
    ('a0000000-0000-0000-0000-000000000001', 'Annual Examination - Class 9-12', 'Comprehensive annual assessment and board preparation', 'examination', '2025-11-15 08:00:00+06', '2025-11-15 12:00:00+06', 'Main Exam Halls'),
    ('a0000000-0000-0000-0000-000000000001', 'Parent-Teacher Meeting', 'Term evaluation and student academic progression review', 'meeting', '2025-11-17 10:00:00+06', '2025-11-17 13:00:00+06', 'Auditorium & Classrooms'),
    ('a0000000-0000-0000-0000-000000000001', 'Science Fair 2025', 'Innovation showcase by students from school and college sections', 'event', '2025-11-20 09:00:00+06', '2025-11-20 16:00:00+06', 'Campus Courtyard'),
    ('a0000000-0000-0000-0000-000000000001', 'Annual Sports Day', 'Athletics, track & field events and inter-house competition', 'sports', '2025-11-25 08:30:00+06', '2025-11-25 17:00:00+06', 'Sports Ground');

-- 15. NOTIFICATIONS (Matches UI)
INSERT INTO notifications (institution_id, user_id, title, message, notification_type, is_read, created_at)
VALUES
    ('a0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000003', 'Exam Schedule', 'The Annual Examination routine has been published for Class 9.', 'exam', false, '2025-11-14 10:00:00+06'),
    ('a0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000004', 'Fee Reminder', 'November tuition fee receipt generated. Thank you for your payment.', 'fee', false, '2025-11-10 14:30:00+06'),
    ('a0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000003', 'Sports Day', 'Annual Sports Day registration is now open.', 'general', true, '2025-11-08 09:00:00+06'),
    ('a0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000003', 'New Library Books', 'Science and Mathematics books newly added to the library catalogue.', 'general', true, '2025-11-05 11:20:00+06');
