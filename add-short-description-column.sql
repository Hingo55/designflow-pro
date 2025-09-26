-- Add short_description column to projects table
-- Run this in Supabase SQL Editor

-- Check if short_description column exists
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'projects' AND column_name = 'short_description';

-- Add the short_description column to the projects table (if it doesn't exist)
ALTER TABLE public.projects
ADD COLUMN IF NOT EXISTS short_description TEXT;

-- Verify the changes
SELECT id, name, short_description, description
FROM public.projects
LIMIT 5;