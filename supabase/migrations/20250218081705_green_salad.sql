/*
  # Auth and Initial Data Setup

  1. Initial Data
    - Create admin user profile
    - Set up initial permissions
*/

-- Create admin user profile
INSERT INTO public.users (
  id,
  email,
  name,
  role,
  status,
  permissions,
  created_at,
  last_login
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'admin@codenautica.com',
  'Admin User',
  'admin',
  'active',
  jsonb_build_object(
    'canManageUsers', true,
    'canManageSolutions', true,
    'canManageContent', true,
    'canViewAnalytics', true,
    'canManageBilling', true,
    'canManageSettings', true
  ),
  now(),
  now()
)
ON CONFLICT (id) DO NOTHING;

-- Note: The actual auth user will be created through the Supabase dashboard
-- or using the Supabase Management API, as the auth schema is managed by Supabase