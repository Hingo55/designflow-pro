-- Add planning_notes column to projects table
-- Run this in Supabase SQL Editor

-- Add the planning_notes column to the projects table
ALTER TABLE public.projects
ADD COLUMN planning_notes TEXT;

-- Set a default value for existing projects
UPDATE public.projects
SET planning_notes = 'No planning notes yet.'
WHERE planning_notes IS NULL;

-- Verify the changes
SELECT id, name, planning_notes
FROM public.projects
LIMIT 5;