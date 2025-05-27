import { get, set } from 'idb-keyval';

export const persistentStorage = {
  async getItem(key: string): Promise<any> {
    try {
      const value = await get(key);
      return value || null;
    } catch (error) {
      console.error('Error retrieving data:', error);
      return null;
    }
  },

  async setItem(key: string, value: any): Promise<void> {
    try {
      await set(key, value);
    } catch (error) {
      console.error('Error storing data:', error);
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await set(key, null);
    } catch (error) {
      console.error('Error removing data:', error);
    }
  }
};