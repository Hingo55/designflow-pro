-- Fix existing model records with invalid status values
-- Run this in Supabase SQL Editor

-- Update invalid status values to valid ones
UPDATE public.models
SET status = 'draft'
WHERE status IN ('not_started', 'initial', 'drafted');

UPDATE public.models
SET status = 'published'
WHERE status IN ('review', 'final');

-- Verify the update
SELECT status, COUNT(*) as count
FROM public.models
GROUP BY status;