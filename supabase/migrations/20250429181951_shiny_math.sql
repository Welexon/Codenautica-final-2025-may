-- Create admin user in auth.users table
-- Note: In a real production environment, this would be done through the Supabase dashboard
-- or using the admin API with proper password hashing
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_user_meta_data
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'admin@codenautica.com',
  -- This is a hashed version of 'SkySkaper1234'
  crypt('SkySkaper1234', gen_salt('bf')),
  now(),
  now(),
  now(),
  jsonb_build_object(
    'name', 'Admin User',
    'avatar', 'https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff',
    'role', 'admin'
  )
)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  encrypted_password = EXCLUDED.encrypted_password,
  raw_user_meta_data = EXCLUDED.raw_user_meta_data;

-- Create admin profile in profiles table
INSERT INTO profiles (
  id,
  email,
  name,
  avatar,
  role,
  bio,
  status,
  settings,
  created_at,
  updated_at
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'admin@codenautica.com',
  'Admin User',
  'https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff',
  'admin',
  'Platform administrator with full system access',
  'active',
  jsonb_build_object(
    'notifications', true,
    'emailUpdates', true,
    'twoFactorEnabled', false,
    'permissions', jsonb_build_object(
      'canManageUsers', true,
      'canManageSolutions', true,
      'canManageContent', true,
      'canViewAnalytics', true,
      'canManageBilling', true,
      'canManageSettings', true
    )
  ),
  now(),
  now()
)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  name = EXCLUDED.name,
  avatar = EXCLUDED.avatar,
  role = EXCLUDED.role,
  bio = EXCLUDED.bio,
  status = EXCLUDED.status,
  settings = EXCLUDED.settings;