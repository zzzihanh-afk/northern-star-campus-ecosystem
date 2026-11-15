-- ==============================================================================
-- NORTHERN STAR SMART CAMPUS - ALLOW ANON / PUBLIC READ POLICIES
-- Run this in your Supabase SQL Editor to allow the web portal and mobile app
-- to fetch institutional metadata, remote module toggles, classes, books, and profiles!
-- ==============================================================================

-- 1. Public Institutional & Configuration Access
DROP POLICY IF EXISTS "Institutions readable by anon" ON institutions;
CREATE POLICY "Institutions readable by anon" ON institutions FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "App configurations readable by anon" ON app_configurations;
CREATE POLICY "App configurations readable by anon" ON app_configurations FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "App modules readable by anon" ON app_modules;
CREATE POLICY "App modules readable by anon" ON app_modules FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "App navigation readable by anon" ON app_navigation;
CREATE POLICY "App navigation readable by anon" ON app_navigation FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "App banners readable by anon" ON app_banners;
CREATE POLICY "App banners readable by anon" ON app_banners FOR SELECT TO anon USING (true);

-- 2. Academic Catalog & Routine Access
DROP POLICY IF EXISTS "Classes readable by anon" ON classes;
CREATE POLICY "Classes readable by anon" ON classes FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "Sections readable by anon" ON sections;
CREATE POLICY "Sections readable by anon" ON sections FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "Subjects readable by anon" ON subjects;
CREATE POLICY "Subjects readable by anon" ON subjects FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "Class routines readable by anon" ON class_routines;
CREATE POLICY "Class routines readable by anon" ON class_routines FOR SELECT TO anon USING (true);

-- 3. Profiles, Students & Teachers
DROP POLICY IF EXISTS "Profiles readable by anon" ON profiles;
CREATE POLICY "Profiles readable by anon" ON profiles FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "Students readable by anon" ON students;
CREATE POLICY "Students readable by anon" ON students FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "Teachers readable by anon" ON teachers;
CREATE POLICY "Teachers readable by anon" ON teachers FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "Staff readable by anon" ON staff;
CREATE POLICY "Staff readable by anon" ON staff FOR SELECT TO anon USING (true);

-- 4. Operations (Library, Vehicles, Events, Notifications)
DROP POLICY IF EXISTS "Books readable by anon" ON books;
CREATE POLICY "Books readable by anon" ON books FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "Book categories readable by anon" ON book_categories;
CREATE POLICY "Book categories readable by anon" ON book_categories FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "Vehicles readable by anon" ON vehicles;
CREATE POLICY "Vehicles readable by anon" ON vehicles FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "Events readable by anon" ON events;
CREATE POLICY "Events readable by anon" ON events FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "Examinations readable by anon" ON examinations;
CREATE POLICY "Examinations readable by anon" ON examinations FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "Results readable by anon" ON results;
CREATE POLICY "Results readable by anon" ON results FOR SELECT TO anon USING (true);
