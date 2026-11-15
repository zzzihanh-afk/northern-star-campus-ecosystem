-- ==============================================================================
-- NORTHERN STAR SMART CAMPUS - ADD PASSWORD SUPPORT
-- Optional migration: Adds custom login_password column to profiles table
-- ==============================================================================

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS login_password TEXT DEFAULT 'NSSC@2025';
