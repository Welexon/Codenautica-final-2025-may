/*
  # Sample Developer Data Migration

  1. New Data
    - Add sample developer data for demonstration purposes
    - Add sample solution data linked to developers
    
  2. Features
    - Creates mock data for testing and demonstration
    - Uses existing admin user for developer ownership
    - Maintains proper foreign key relationships
*/

-- First, get the admin user ID (which we know exists)
DO $$
DECLARE
  admin_id UUID;
BEGIN
  -- Get the admin user ID
  SELECT id INTO admin_id FROM auth.users WHERE email = 'admin@codenautica.com';
  
  -- If admin user exists, use it to create sample data
  IF admin_id IS NOT NULL THEN
    -- Create developer profiles using the admin ID
    -- In a real app, these would be separate users, but for demo purposes
    -- we'll use the admin ID as the foreign key reference
    
    -- Insert sample solutions
    INSERT INTO solutions (
      title,
      description,
      price,
      category,
      image,
      rating,
      downloads,
      active_users,
      verified,
      subscription,
      developer_id,
      features,
      technologies,
      requirements,
      screenshots,
      demo_url,
      documentation_url,
      version,
      supported_languages,
      industries,
      release_date,
      created_at,
      updated_at
    )
    VALUES
      (
        'Advanced Inventory Management',
        'Complete inventory management solution with real-time tracking and analytics.',
        299,
        'Operations',
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
        4.8,
        1200,
        850,
        true,
        true,
        admin_id,
        '["Real-time tracking", "Automated reordering", "Analytics dashboard", "Multi-location support"]',
        '["React", "Node.js", "MongoDB", "WebSocket"]',
        '["Modern web browser", "Internet connection", "Minimum 2GB RAM"]',
        '["https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1586528116493-da5c4ed5bc72?auto=format&fit=crop&w=800&q=80"]',
        'https://demo.example.com',
        'https://docs.example.com',
        '2.1.0',
        '["English", "Norwegian", "Swedish"]',
        '["Retail", "Manufacturing", "Wholesale"]',
        '2023-12-15T00:00:00Z',
        now(),
        now()
      ),
      (
        'Customer Analytics Dashboard',
        'Powerful analytics platform for tracking customer behavior and engagement.',
        199,
        'Analytics',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        4.6,
        850,
        620,
        true,
        true,
        admin_id,
        '["Real-time analytics", "Custom dashboards", "User behavior tracking", "Conversion funnels"]',
        '["Vue.js", "Python", "PostgreSQL", "Redis"]',
        '["Modern web browser", "Internet connection", "API key for integration"]',
        '["https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1551288049-a22ae1ddba32?auto=format&fit=crop&w=800&q=80"]',
        'https://demo.dataviz.com',
        'https://docs.dataviz.com',
        '1.8.0',
        '["English", "Swedish"]',
        '["E-commerce", "SaaS", "Retail"]',
        '2023-11-20T00:00:00Z',
        now(),
        now()
      ),
      (
        'HR Management Suite Pro',
        'Comprehensive HR management system with advanced features for Nordic businesses.',
        449,
        'HR',
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
        4.7,
        320,
        280,
        true,
        true,
        admin_id,
        '["Employee management", "Time tracking", "Performance reviews", "Leave management"]',
        '["React", "Node.js", "PostgreSQL", "Redis"]',
        '["Modern web browser", "Internet connection", "Company email domain"]',
        '["https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1573496359610-54d5d1173114?auto=format&fit=crop&w=800&q=80"]',
        'https://demo.hrpro.com',
        'https://docs.hrpro.com',
        '2.1.0',
        '["English", "Swedish", "Norwegian", "Danish"]',
        '["Technology", "Manufacturing", "Services"]',
        '2024-01-15T00:00:00Z',
        now(),
        now()
      ),
      (
        'Mobile App Development Kit',
        'Complete toolkit for developing cross-platform mobile applications with Nordic design principles.',
        599,
        'Development',
        'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=800&q=80',
        4.9,
        450,
        380,
        true,
        true,
        admin_id,
        '["Cross-platform development", "Nordic design templates", "Payment integration", "Push notifications"]',
        '["React Native", "TypeScript", "GraphQL", "Firebase"]',
        '["Node.js 14+", "macOS/Windows/Linux", "Git", "Android Studio / Xcode"]',
        '["https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1555774698-eb2d683a49b6?auto=format&fit=crop&w=800&q=80"]',
        'https://demo.mobilekit.dev',
        'https://docs.mobilekit.dev',
        '1.2.0',
        '["English", "Finnish", "Swedish"]',
        '["Technology", "E-commerce", "Services"]',
        '2024-02-01T00:00:00Z',
        now(),
        now()
      ),
      (
        'AI-Powered Customer Support Chatbot',
        'An intelligent chatbot solution that provides instant customer support using AI and machine learning.',
        399,
        'Customer Support',
        'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800&q=80',
        4.8,
        600,
        550,
        true,
        true,
        admin_id,
        '["Natural language processing", "24/7 customer support", "Multi-language support", "Seamless integration"]',
        '["Python", "TensorFlow", "Flask", "Docker"]',
        '["Server with Python 3.8+", "Internet connection", "API keys for integrations"]',
        '["https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1531746790731-6c087fecd65b?auto=format&fit=crop&w=800&q=80"]',
        'https://demo.chatbotai.com',
        'https://docs.chatbotai.com',
        '1.0.0',
        '["English", "Finnish", "Swedish", "Norwegian", "Danish"]',
        '["E-commerce", "Finance", "Healthcare"]',
        '2024-02-20T00:00:00Z',
        now(),
        now()
      );
      
    -- Update admin profile to look like a developer
    UPDATE profiles
    SET 
      name = 'John Developer',
      avatar = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      bio = 'Full-stack developer specializing in scalable web applications',
      company = 'Nordic Tech Solutions',
      location = 'Oslo, Norway',
      website = 'https://johndeveloper.com',
      skills = '["React", "Node.js", "TypeScript", "AWS"]',
      languages = '["English", "Norwegian"]',
      certifications = '["AWS Certified Developer", "MongoDB Certified"]',
      hourly_rate = 95,
      availability = 'Available',
      github_url = 'https://github.com/johndeveloper',
      linkedin_url = 'https://linkedin.com/in/johndeveloper',
      completed_projects = 45,
      active_projects = 3
    WHERE id = admin_id;
    
  END IF;
END $$;

-- Create additional developer profiles using the auth.users.id of the admin
DO $$
DECLARE
  admin_id UUID;
  dev_names TEXT[] := ARRAY[
    'Sarah Engineer',
    'Marcus Jensen',
    'Emma Virtanen',
    'Lars Andersen',
    'Olivia Svensson',
    'Erik Nilsson',
    'Anna Korhonen',
    'Björn Hansen',
    'Kaisa Lehtinen'
  ];
  dev_avatars TEXT[] := ARRAY[
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1524503033411-c9566986fc8f?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  ];
  i INTEGER;
BEGIN
  -- Get the admin user ID
  SELECT id INTO admin_id FROM auth.users WHERE email = 'admin@codenautica.com';
  
  -- If admin user exists, create fake developer entries in the profiles table
  -- These won't be real users, but they'll show up in the UI for demonstration
  IF admin_id IS NOT NULL THEN
    -- Create fake developer entries in the profiles table
    FOR i IN 1..9 LOOP
      INSERT INTO profiles (
        id,
        email,
        name,
        avatar,
        role,
        bio,
        company,
        location,
        website,
        skills,
        languages,
        certifications,
        hourly_rate,
        availability,
        github_url,
        linkedin_url,
        completed_projects,
        active_projects,
        created_at,
        updated_at
      )
      VALUES (
        admin_id, -- Use the same admin_id for all profiles (this is just for display)
        'dev' || i || '@example.com',
        dev_names[i],
        dev_avatars[i],
        'developer',
        'Professional developer with expertise in various technologies',
        'Nordic Tech Company ' || i,
        'Nordic Region',
        'https://developer' || i || '.example.com',
        '["JavaScript", "TypeScript", "React", "Node.js"]',
        '["English", "Swedish", "Norwegian"]',
        '["AWS Certified", "Full Stack Developer"]',
        85 + i * 5,
        'Available',
        'https://github.com/dev' || i,
        'https://linkedin.com/in/dev' || i,
        30 + i * 3,
        i,
        now(),
        now()
      )
      ON CONFLICT (id) DO NOTHING; -- Skip if already exists
    END LOOP;
  END IF;
END $$;