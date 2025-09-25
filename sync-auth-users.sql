-- Sync existing auth.users to public.users table
-- Run this in Supabase SQL Editor

-- First, let's see what users exist in auth but not in public.users
SELECT
    au.id,
    au.email,
    au.created_at,
    COALESCE(au.raw_user_meta_data->>'name', au.email) as name
FROM auth.users au
LEFT JOIN public.users pu ON au.id = pu.id
WHERE pu.id IS NULL;

-- Insert missing users from auth.users into public.users
INSERT INTO public.users (id, email, name, created_at)
SELECT
    au.id,
    au.email,
    COALESCE(au.raw_user_meta_data->>'name', au.email) as name,
    au.created_at
FROM auth.users au
LEFT JOIN public.users pu ON au.id = pu.id
WHERE pu.id IS NULL;

-- Verify the sync worked
SELECT COUNT(*) as auth_users FROM auth.users;
SELECT COUNT(*) as public_users FROM public.users;