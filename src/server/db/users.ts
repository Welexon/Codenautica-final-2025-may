import { randomUUID } from 'crypto';
import { statements } from './index';
import { hashPassword, verifyPassword } from '../utils/auth';
import type { User, RegisterData } from '../../types/auth';

export class UserService {
  static async createUser(data: RegisterData): Promise<User> {
    const { email, password, name, role, plan } = data;

    // Check if user exists
    const existingUser = statements.getUserByEmail.get(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Generate user ID
    const id = randomUUID();

    // Default settings
    const settings = JSON.stringify({
      notifications: true,
      emailUpdates: true,
      twoFactorEnabled: false
    });

    // Default billing info
    const billing = JSON.stringify({
      plan: plan || 'starter',
      nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    });

    // Default permissions
    const permissions = JSON.stringify({
      canManageUsers: false,
      canManageSolutions: role === 'developer',
      canManageContent: false,
      canViewAnalytics: true,
      canManageBilling: true,
      canManageSettings: true
    });

    // Create user
    statements.createUser.run(
      id,
      email,
      passwordHash,
      name,
      role,
      null, // avatar
      null, // bio
      null, // company
      null, // location
      null, // website
      plan || 'starter',
      settings,
      billing,
      permissions
    );

    // Return created user
    return statements.getUserById.get(id);
  }

  static async getUserById(id: string): Promise<User | null> {
    const user = statements.getUserById.get(id);
    if (!user) return null;

    // Get related data
    const skills = statements.getUserSkills.all(id).map(row => row.skill);
    const languages = statements.getUserLanguages.all(id).map(row => row.language);
    const certifications = statements.getUserCertifications.all(id).map(row => row.certification);
    const subscriptions = statements.getUserSubscriptions.all(id).map(row => row.solution_id);

    return {
      ...user,
      settings: JSON.parse(user.settings || '{}'),
      billing: JSON.parse(user.billing || '{}'),
      permissions: JSON.parse(user.permissions || '{}'),
      skills,
      languages,
      certifications,
      subscriptions
    };
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    const user = statements.getUserByEmail.get(email);
    if (!user) return null;
    return this.getUserById(user.id);
  }

  static async updateUser(id: string, data: Partial<User>): Promise<User> {
    const user = await this.getUserById(id);
    if (!user) throw new Error('User not found');

    statements.updateUser.run(
      data.name || null,
      data.email || null,
      data.avatar || null,
      data.bio || null,
      data.company || null,
      data.location || null,
      data.website || null,
      data.plan || null,
      data.settings ? JSON.stringify(data.settings) : null,
      data.billing ? JSON.stringify(data.billing) : null,
      data.permissions ? JSON.stringify(data.permissions) : null,
      data.lastLogin || null,
      id
    );

    // Update skills if provided
    if (data.skills) {
      statements.removeUserSkill.run(id);
      data.skills.forEach(skill => {
        statements.addUserSkill.run(id, skill);
      });
    }

    // Update languages if provided
    if (data.languages) {
      statements.removeUserLanguage.run(id);
      data.languages.forEach(language => {
        statements.addUserLanguage.run(id, language);
      });
    }

    // Update certifications if provided
    if (data.certifications) {
      statements.removeUserCertification.run(id);
      data.certifications.forEach(cert => {
        statements.addUserCertification.run(id, cert);
      });
    }

    return this.getUserById(id);
  }

  static async deleteUser(id: string): Promise<void> {
    const result = statements.deleteUser.run(id);
    if (result.changes === 0) {
      throw new Error('User not found');
    }
  }

  static async verifyCredentials(email: string, password: string): Promise<User | null> {
    const user = statements.getUserByEmail.get(email);
    if (!user) return null;

    const isValid = await verifyPassword(password, user.password_hash);
    if (!isValid) return null;

    // Update last login
    statements.updateUser.run(
      null, null, null, null, null, null, null, null, null, null, null,
      new Date().toISOString(),
      user.id
    );

    return this.getUserById(user.id);
  }

  static async addSubscription(userId: string, solutionId: string): Promise<void> {
    statements.addSubscription.run(userId, solutionId);
  }

  static async removeSubscription(userId: string, solutionId: string): Promise<void> {
    statements.removeSubscription.run(userId, solutionId);
  }

  static async suspendUser(id: string): Promise<void> {
    statements.updateUserStatus.run('suspended', id);
  }

  static async activateUser(id: string): Promise<void> {
    statements.updateUserStatus.run('active', id);
  }
}

export default UserService;