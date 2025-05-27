import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Mail, MessageSquare, AlertTriangle, Loader, CheckCircle, XCircle } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const NotificationSettings = () => {
  const navigate = useNavigate();
  const { user, updateSettings } = useAuthStore();
  const [settings, setSettings] = useState({
    emailNotifications: user?.settings?.emailUpdates ?? true,
    pushNotifications: user?.settings?.pushNotifications ?? true,
    marketingEmails: user?.settings?.marketingEmails ?? false,
    securityAlerts: user?.settings?.securityAlerts ?? true,
    messageNotifications: user?.settings?.messageNotifications ?? true,
    updateNotifications: user?.settings?.updateNotifications ?? true,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    
    try {
      console.log('Updating notification settings:', settings);
      // Update user settings
      await updateSettings({
        emailUpdates: settings.emailNotifications,
        pushNotifications: settings.pushNotifications,
        marketingEmails: settings.marketingEmails,
        securityAlerts: settings.securityAlerts,
        messageNotifications: settings.messageNotifications,
        updateNotifications: settings.updateNotifications
      });
      
      setSuccess(true);
    } catch (err) {
      console.error('Failed to update notification settings:', err);
      setError(err instanceof Error ? err.message : 'Failed to update notification settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Notification Settings</h1>
        <p className="text-gray-600">Manage how you receive notifications</p>
      </div>

      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          Notification settings updated successfully!
        </div>
      )}

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative flex items-center">
          <XCircle className="h-5 w-5 mr-2" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Notifications */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Mail className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Email Notifications</h2>
          </div>
          
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-gray-700">Email Notifications</span>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </label>
            
            <label className="flex items-center justify-between">
              <span className="text-gray-700">Marketing Emails</span>
              <input
                type="checkbox"
                checked={settings.marketingEmails}
                onChange={(e) => setSettings({ ...settings, marketingEmails: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </label>
          </div>
        </div>

        {/* Push Notifications */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Bell className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Push Notifications</h2>
          </div>
          
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-gray-700">Push Notifications</span>
              <input
                type="checkbox"
                checked={settings.pushNotifications}
                onChange={(e) => setSettings({ ...settings, pushNotifications: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </label>
          </div>
        </div>

        {/* Message Notifications */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <MessageSquare className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Message Notifications</h2>
          </div>
          
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-gray-700">Message Notifications</span>
              <input
                type="checkbox"
                checked={settings.messageNotifications}
                onChange={(e) => setSettings({ ...settings, messageNotifications: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </label>
          </div>
        </div>

        {/* Security Alerts */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Security Alerts</h2>
          </div>
          
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-gray-700">Security Alerts</span>
              <input
                type="checkbox"
                checked={settings.securityAlerts}
                onChange={(e) => setSettings({ ...settings, securityAlerts: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            disabled={loading}
            onClick={() => navigate('/settings')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            aria-live="polite"
          >
            {loading ? (
              <>
                <Loader className="animate-spin h-4 w-4 mr-2 inline" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NotificationSettings;