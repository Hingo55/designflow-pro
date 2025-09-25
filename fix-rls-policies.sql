-- Fix RLS policies for service role access
-- Run this in Supabase SQL Editor

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can create their own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can update their own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can delete their own projects" ON public.projects;

-- Create new policies that work with both authenticated users and service role
CREATE POLICY "Enable read access for users" ON public.projects
    FOR SELECT USING (
        auth.uid() = user_id OR auth.role() = 'service_role'
    );

CREATE POLICY "Enable insert access for users" ON public.projects
    FOR INSERT WITH CHECK (
        auth.uid() = user_id OR auth.role() = 'service_role'
    );

CREATE POLICY "Enable update access for users" ON public.projects
    FOR UPDATE USING (
        auth.uid() = user_id OR auth.role() = 'service_role'
    );

CREATE POLICY "Enable delete access for users" ON public.projects
    FOR DELETE USING (
        auth.uid() = user_id OR auth.role() = 'service_role'
    );