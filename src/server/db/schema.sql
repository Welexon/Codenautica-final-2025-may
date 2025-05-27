-- Users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('developer', 'business', 'admin')),
  avatar TEXT,
  bio TEXT,
  company TEXT,
  location TEXT,
  website TEXT,
  plan TEXT,
  status TEXT DEFAULT 'active',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_login DATETIME,
  settings TEXT,
  billing TEXT,
  permissions TEXT
);

-- User skills
CREATE TABLE IF NOT EXISTS user_skills (
  user_id TEXT NOT NULL,
  skill TEXT NOT NULL,
  PRIMARY KEY (user_id, skill),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- User languages
CREATE TABLE IF NOT EXISTS user_languages (
  user_id TEXT NOT NULL,
  language TEXT NOT NULL,
  PRIMARY KEY (user_id, language),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- User certifications
CREATE TABLE IF NOT EXISTS user_certifications (
  user_id TEXT NOT NULL,
  certification TEXT NOT NULL,
  PRIMARY KEY (user_id, certification),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Solutions
CREATE TABLE IF NOT EXISTS solutions (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  rating DECIMAL(3,2),
  downloads INTEGER DEFAULT 0,
  active_users INTEGER DEFAULT 0,
  verified BOOLEAN DEFAULT FALSE,
  subscription BOOLEAN DEFAULT FALSE,
  developer_id TEXT NOT NULL,
  features TEXT NOT NULL,
  technologies TEXT NOT NULL,
  requirements TEXT NOT NULL,
  screenshots TEXT NOT NULL,
  demo_url TEXT,
  documentation_url TEXT,
  release_date DATETIME NOT NULL,
  last_update DATETIME NOT NULL,
  version TEXT NOT NULL,
  supported_languages TEXT NOT NULL,
  industries TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (developer_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Solution reviews
CREATE TABLE IF NOT EXISTS solution_reviews (
  id TEXT PRIMARY KEY,
  solution_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK(rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (solution_id) REFERENCES solutions(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- User subscriptions
CREATE TABLE IF NOT EXISTS user_subscriptions (
  user_id TEXT NOT NULL,
  solution_id TEXT NOT NULL,
  started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'active',
  PRIMARY KEY (user_id, solution_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (solution_id) REFERENCES solutions(id) ON DELETE CASCADE
);

-- Messages
CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  sender_id TEXT NOT NULL,
  receiver_id TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  read BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Activity logs
CREATE TABLE IF NOT EXISTS activity_logs (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  type TEXT NOT NULL,
  details TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  action_label TEXT,
  action_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Custom requests
CREATE TABLE IF NOT EXISTS custom_requests (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  budget TEXT NOT NULL,
  deadline DATETIME NOT NULL,
  status TEXT DEFAULT 'open',
  posted_by TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (posted_by) REFERENCES users(id) ON DELETE CASCADE
);

-- Request skills
CREATE TABLE IF NOT EXISTS request_skills (
  request_id TEXT NOT NULL,
  skill TEXT NOT NULL,
  PRIMARY KEY (request_id, skill),
  FOREIGN KEY (request_id) REFERENCES custom_requests(id) ON DELETE CASCADE
);

-- Request proposals
CREATE TABLE IF NOT EXISTS request_proposals (
  id TEXT PRIMARY KEY,
  request_id TEXT NOT NULL,
  developer_id TEXT NOT NULL,
  budget DECIMAL(10,2) NOT NULL,
  duration TEXT NOT NULL,
  cover_letter TEXT NOT NULL,
  solution TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (request_id) REFERENCES custom_requests(id) ON DELETE CASCADE,
  FOREIGN KEY (developer_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Meetings
CREATE TABLE IF NOT EXISTS meetings (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  duration INTEGER NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('video', 'in-person')),
  organizer_id TEXT NOT NULL,
  status TEXT DEFAULT 'scheduled',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (organizer_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Meeting attendees
CREATE TABLE IF NOT EXISTS meeting_attendees (
  meeting_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  PRIMARY KEY (meeting_id, user_id),
  FOREIGN KEY (meeting_id) REFERENCES meetings(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);