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
    ('c0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Mathematics', 'MATH101', 'theory'),
    ('c0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'Physics', 'PHY101', 'both'),
    ('c0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'English', 'ENG101', 'theory'),
    ('c0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000001', 'Chemistry', 'CHEM101', 'both'),
    ('c0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000001', 'Biology', 'BIO101', 'both')
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
    '10000000-0000-0000-0000-000000000001',
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
    '20000000-0000-0000-0000-000000000001',
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
    '30000000-0000-0000-0000-000000000001',
    'b0000000-0000-0000-0000-000000000004',
    'a0000000-0000-0000-0000-000000000001',
    'Mrs. Fatema Akter',
    'Education Consultant',
    '+880 1788-112233',
    '+880 1788-112233'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO parent_student_relationships (parent_id, student_id, relationship_type, is_primary_contact)
VALUES (
    '30000000-0000-0000-0000-000000000001',
    '20000000-0000-0000-0000-000000000001',
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
    '40000000-0000-0000-0000-000000000001',
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
    ('a0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000009', 'f0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'monday', '09:00:00', '10:00:00', 'Room 101'),
    ('a0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000009', 'f0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', 'monday', '10:00:00', '11:00:00', 'Room 102'),
    ('a0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000009', 'f0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000001', 'monday', '11:00:00', '12:00:00', 'Room 103');

-- 9. TODAY'S ATTENDANCE (Rahim Ahmed marked Present at 9:00 AM)
INSERT INTO student_attendance (institution_id, student_id, class_id, section_id, date, status, check_in_time, remarks)
VALUES (
    'a0000000-0000-0000-0000-000000000001',
    '20000000-0000-0000-0000-000000000001',
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
    '50000000-0000-0000-0000-000000000001',
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
    '60000000-0000-0000-0000-000000000001',
    '50000000-0000-0000-0000-000000000001',
    '20000000-0000-0000-0000-000000000001',
    294.00,
    4.95,
    'A+',
    1,
    'Outstanding academic performance. Ranked 1st in Class 9-A.',
    NOW()
) ON CONFLICT (examination_id, student_id) DO NOTHING;

INSERT INTO marks (examination_id, subject_id, student_id, marks_obtained, highest_marks, is_verified)
VALUES
    ('50000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 99.00, 99.00, true),
    ('50000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000001', 98.00, 98.00, true),
    ('50000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000001', 97.00, 97.00, true)
ON CONFLICT (examination_id, subject_id, student_id) DO NOTHING;

-- 11. FEES & PAYMENTS (Paid in Full - à§³ 5,000)
INSERT INTO fee_categories (id, institution_id, name, description, is_recurring)
VALUES ('fc000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Monthly Tuition Fee', 'Regular monthly instructional fee', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO student_fees (id, student_id, fee_category_id, title, amount, net_amount, due_date, status)
VALUES (
    'fee00000-0000-0000-0000-000000000001',
    '20000000-0000-0000-0000-000000000001',
    'fc000000-0000-0000-0000-000000000001',
    'Monthly Tuition - November 2025',
    5000.00,
    5000.00,
    '2025-11-10',
    'paid'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO payments (institution_id, student_id, student_fee_id, amount_paid, payment_method, receipt_number, status, payment_date)
VALUES
    ('a0000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'fee00000-0000-0000-0000-000000000001', 5000.00, 'online', 'REC-2025-11001', 'successful', '2025-11-05'),
    ('a0000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', NULL, 5000.00, 'online', 'REC-2025-10045', 'successful', '2025-10-06'),
    ('a0000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', NULL, 5000.00, 'online', 'REC-2025-09022', 'successful', '2025-09-04');

-- 12. LIBRARY BOOKS (Matches UI showcase)
INSERT INTO book_categories (id, institution_id, name)
VALUES ('bc000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Educational')
ON CONFLICT (id) DO NOTHING;

INSERT INTO books (id, institution_id, category_id, title, author, isbn, available_copies, total_copies)
VALUES
    ('80000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'bc000000-0000-0000-0000-000000000001', 'Science Today', 'Dr. Farhad Hossain', '978-0123456789', 5, 5),
    ('80000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'bc000000-0000-0000-0000-000000000001', 'Mathematics Guide', 'Prof. Nazmul Haque', '978-0987654321', 8, 10),
    ('80000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'bc000000-0000-0000-0000-000000000001', 'English Grammar in Use', 'Raymond Murphy', '978-1108457651', 4, 6)
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
