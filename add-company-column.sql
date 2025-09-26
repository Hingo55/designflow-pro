-- Add company column to projects table
-- Run this in Supabase SQL Editor

-- Check if company column exists
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'projects' AND column_name = 'company';

-- Add the company column to the projects table (if it doesn't exist)
ALTER TABLE public.projects
ADD COLUMN IF NOT EXISTS company TEXT;

-- Set a default value for existing projects
UPDATE public.projects
SET company = 'Not specified'
WHERE company IS NULL;

-- Verify the changes
SELECT id, name, company, planning_notes
FROM public.projects
LIMIT 5;