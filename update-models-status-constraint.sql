-- Update models table to support granular status workflow
-- Run this in Supabase SQL Editor

-- First, update any existing records to use the new status values
UPDATE public.models
SET status = 'not_started'
WHERE status = 'draft';

-- Drop the existing constraint
ALTER TABLE public.models DROP CONSTRAINT IF EXISTS models_status_check;

-- Add new constraint with granular status values
ALTER TABLE public.models ADD CONSTRAINT models_status_check
CHECK (status IN ('not_started', 'in_progress', 'draft', 'published'));

-- Verify the changes
SELECT status, COUNT(*) as count
FROM public.models
GROUP BY status;