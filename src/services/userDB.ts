import { get, set, del, keys } from 'idb-keyval';
import { User } from '../types/auth';

const USER_PREFIX = 'user_';

export class UserDB {
  static async createUser(user: User): Promise<void> {
    try {
      await set(`${USER_PREFIX}${user.email}`, user);
    } catch (error) {
      console.error('Failed to create user:', error);
      throw new Error('Failed to create user account');
    }
  }

  static async getUser(email: string): Promise<User | null> {
    try {
      const user = await get(`${USER_PREFIX}${email}`);
      return user || null;
    } catch (error) {
      console.error('Failed to get user:', error);
      return null;
    }
  }

  static async updateUser(email: string, updates: Partial<User>): Promise<void> {
    try {
      const user = await this.getUser(email);
      if (!user) {
        throw new Error('User not found');
      }
      const updatedUser = { ...user, ...updates };
      await set(`${USER_PREFIX}${email}`, updatedUser);
    } catch (error) {
      console.error('Failed to update user:', error);
      throw new Error('Failed to update user account');
    }
  }

  static async deleteUser(email: string): Promise<void> {
    try {
      await del(`${USER_PREFIX}${email}`);
    } catch (error) {
      console.error('Failed to delete user:', error);
      throw new Error('Failed to delete user account');
    }
  }

  static async getAllUsers(): Promise<User[]> {
    try {
      const allKeys = await keys();
      const userKeys = allKeys.filter(key => 
        typeof key === 'string' && key.startsWith(USER_PREFIX)
      );
      
      const users = await Promise.all(
        userKeys.map(async key => {
          const user = await get(key);
          return user;
        })
      );

      return users.filter((user): user is User => user !== null);
    } catch (error) {
      console.error('Failed to get users:', error);
      return [];
    }
  }

  static async userExists(email: string): Promise<boolean> {
    const user = await this.getUser(email);
    return user !== null;
  }
}