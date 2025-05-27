import Database from 'better-sqlite3';
import { join } from 'path';
import fs from 'fs';

// Initialize database
const db = new Database(join(process.cwd(), 'data.db'), {
  verbose: console.log
});

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Create tables if they don't exist
const schema = fs.readFileSync(join(process.cwd(), 'src/server/db/schema.sql'), 'utf8');
db.exec(schema);

// Prepare statements
const statements = {
  // User queries
  createUser: db.prepare(`
    INSERT INTO users (
      id, email, password_hash, name, role, avatar, bio, company,
      location, website, plan, settings, billing, permissions
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    )
  `),

  getUserById: db.prepare('SELECT * FROM users WHERE id = ?'),
  getUserByEmail: db.prepare('SELECT * FROM users WHERE email = ?'),
  updateUser: db.prepare(`
    UPDATE users SET
      name = COALESCE(?, name),
      email = COALESCE(?, email),
      avatar = COALESCE(?, avatar),
      bio = COALESCE(?, bio),
      company = COALESCE(?, company),
      location = COALESCE(?, location),
      website = COALESCE(?, website),
      plan = COALESCE(?, plan),
      settings = COALESCE(?, settings),
      billing = COALESCE(?, billing),
      permissions = COALESCE(?, permissions),
      last_login = COALESCE(?, last_login)
    WHERE id = ?
  `),
  deleteUser: db.prepare('DELETE FROM users WHERE id = ?'),
  updateUserStatus: db.prepare('UPDATE users SET status = ? WHERE id = ?'),

  // Skills
  addUserSkill: db.prepare('INSERT INTO user_skills (user_id, skill) VALUES (?, ?)'),
  removeUserSkill: db.prepare('DELETE FROM user_skills WHERE user_id = ? AND skill = ?'),
  getUserSkills: db.prepare('SELECT skill FROM user_skills WHERE user_id = ?'),

  // Languages
  addUserLanguage: db.prepare('INSERT INTO user_languages (user_id, language) VALUES (?, ?)'),
  removeUserLanguage: db.prepare('DELETE FROM user_languages WHERE user_id = ? AND language = ?'),
  getUserLanguages: db.prepare('SELECT language FROM user_languages WHERE user_id = ?'),

  // Certifications
  addUserCertification: db.prepare('INSERT INTO user_certifications (user_id, certification) VALUES (?, ?)'),
  removeUserCertification: db.prepare('DELETE FROM user_certifications WHERE user_id = ? AND certification = ?'),
  getUserCertifications: db.prepare('SELECT certification FROM user_certifications WHERE user_id = ?'),

  // Solutions
  createSolution: db.prepare(`
    INSERT INTO solutions (
      id, title, description, price, category, image, rating, downloads,
      active_users, verified, subscription, developer_id, features,
      technologies, requirements, screenshots, demo_url, documentation_url,
      release_date, last_update, version, supported_languages, industries
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    )
  `),
  getSolutionById: db.prepare('SELECT * FROM solutions WHERE id = ?'),
  updateSolution: db.prepare(`
    UPDATE solutions SET
      title = COALESCE(?, title),
      description = COALESCE(?, description),
      price = COALESCE(?, price),
      image = COALESCE(?, image),
      features = COALESCE(?, features),
      technologies = COALESCE(?, technologies),
      requirements = COALESCE(?, requirements),
      screenshots = COALESCE(?, screenshots),
      last_update = COALESCE(?, last_update),
      version = COALESCE(?, version)
    WHERE id = ?
  `),
  deleteSolution: db.prepare('DELETE FROM solutions WHERE id = ?'),
  getDeveloperSolutions: db.prepare('SELECT * FROM solutions WHERE developer_id = ?'),

  // Messages
  createMessage: db.prepare(`
    INSERT INTO messages (id, sender_id, receiver_id, content)
    VALUES (?, ?, ?, ?)
  `),
  getMessagesBetweenUsers: db.prepare(`
    SELECT * FROM messages 
    WHERE (sender_id = ? AND receiver_id = ?) 
    OR (sender_id = ? AND receiver_id = ?)
    ORDER BY created_at ASC
  `),
  markMessageAsRead: db.prepare('UPDATE messages SET read = TRUE WHERE id = ?'),

  // Activities
  logActivity: db.prepare(`
    INSERT INTO activity_logs (id, user_id, type, details)
    VALUES (?, ?, ?, ?)
  `),
  getUserActivities: db.prepare('SELECT * FROM activity_logs WHERE user_id = ? ORDER BY created_at DESC'),

  // Notifications
  createNotification: db.prepare(`
    INSERT INTO notifications (id, user_id, type, title, message, action_label, action_url)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `),
  getUserNotifications: db.prepare('SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC'),
  markNotificationAsRead: db.prepare('UPDATE notifications SET read = TRUE WHERE id = ?'),

  // Subscriptions
  addSubscription: db.prepare(`
    INSERT INTO user_subscriptions (user_id, solution_id)
    VALUES (?, ?)
  `),
  removeSubscription: db.prepare(`
    UPDATE user_subscriptions 
    SET status = 'cancelled'
    WHERE user_id = ? AND solution_id = ?
  `),
  getUserSubscriptions: db.prepare(`
    SELECT solution_id, started_at, status
    FROM user_subscriptions
    WHERE user_id = ? AND status = 'active'
  `),
};

export { db, statements };