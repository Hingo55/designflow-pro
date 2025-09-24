-- SQL to run in Supabase SQL Editor to sync auth.users with public.users

-- Create trigger function to automatically create public.users when auth.users is created
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, name, created_at)
  VALUES (new.id, new.email, COALESCE(new.raw_user_meta_data->>'name', ''), new.created_at);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Backfill existing auth.users into public.users (run this once)
INSERT INTO public.users (id, email, name, created_at)
SELECT
  id,
  email,
  COALESCE(raw_user_meta_data->>'name', email),
  created_at
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.users);