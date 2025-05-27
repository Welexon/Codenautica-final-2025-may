import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Mail, 
  Bell, 
  Globe2, 
  Shield,
  Save,
  Database
} from 'lucide-react';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    // Email Settings
    smtpServer: 'smtp.codenautica.com',
    smtpPort: '587',
    smtpUsername: 'notifications@codenautica.com',
    emailFromName: 'CodeNautica',

    // Notification Settings
    enableEmailNotifications: true,
    enablePushNotifications: true,
    notifyOnNewUsers: true,
    notifyOnNewSolutions: true,

    // Platform Settings
    platformName: 'CodeNautica',
    platformDescription: 'Nordic Software Solutions Marketplace',
    maintenanceMode: false,
    allowNewRegistrations: true,

    // Security Settings
    requireEmailVerification: true,
    twoFactorAuthRequired: false,
    passwordMinLength: 8,
    sessionTimeout: 24,

    // Storage Settings
    maxFileSize: 10,
    allowedFileTypes: '.pdf,.doc,.docx,.jpg,.png',
    storageProvider: 'aws',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle settings update
    console.log('Updating settings:', settings);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Platform Settings</h1>
        <p className="text-gray-600">Configure global platform settings</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Mail className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Email Settings</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">SMTP Server</label>
              <input
                type="text"
                value={settings.smtpServer}
                onChange={(e) => setSettings({ ...settings, smtpServer: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">SMTP Port</label>
              <input
                type="text"
                value={settings.smtpPort}
                onChange={(e) => setSettings({ ...settings, smtpPort: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">SMTP Username</label>
              <input
                type="text"
                value={settings.smtpUsername}
                onChange={(e) => setSettings({ ...settings, smtpUsername: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">From Name</label>
              <input
                type="text"
                value={settings.emailFromName}
                onChange={(e) => setSettings({ ...settings, emailFromName: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Bell className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Notification Settings</h2>
          </div>
          
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.enableEmailNotifications}
                onChange={(e) => setSettings({ ...settings, enableEmailNotifications: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">Enable Email Notifications</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.enablePushNotifications}
                onChange={(e) => setSettings({ ...settings, enablePushNotifications: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">Enable Push Notifications</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.notifyOnNewUsers}
                onChange={(e) => setSettings({ ...settings, notifyOnNewUsers: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">Notify on New User Registrations</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.notifyOnNewSolutions}
                onChange={(e) => setSettings({ ...settings, notifyOnNewSolutions: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">Notify on New Solution Submissions</span>
            </label>
          </div>
        </div>

        {/* Platform Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Globe2 className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Platform Settings</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Platform Name</label>
              <input
                type="text"
                value={settings.platformName}
                onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Platform Description</label>
              <input
                type="text"
                value={settings.platformDescription}
                onChange={(e) => setSettings({ ...settings, platformDescription: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-4 space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">Maintenance Mode</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.allowNewRegistrations}
                onChange={(e) => setSettings({ ...settings, allowNewRegistrations: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">Allow New Registrations</span>
            </label>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Shield className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Security Settings</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Minimum Password Length</label>
              <input
                type="number"
                value={settings.passwordMinLength}
                onChange={(e) => setSettings({ ...settings, passwordMinLength: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Session Timeout (hours)</label>
              <input
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => setSettings({ ...settings, sessionTimeout: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-4 space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.requireEmailVerification}
                onChange={(e) => setSettings({ ...settings, requireEmailVerification: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">Require Email Verification</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.twoFactorAuthRequired}
                onChange={(e) => setSettings({ ...settings, twoFactorAuthRequired: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">Require Two-Factor Authentication</span>
            </label>
          </div>
        </div>

        {/* Storage Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Database className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Storage Settings</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Max File Size (MB)</label>
              <input
                type="number"
                value={settings.maxFileSize}
                onChange={(e) => setSettings({ ...settings, maxFileSize: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Allowed File Types</label>
              <input
                type="text"
                value={settings.allowedFileTypes}
                onChange={(e) => setSettings({ ...settings, allowedFileTypes: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Storage Provider</label>
              <select
                value={settings.storageProvider}
                onChange={(e) => setSettings({ ...settings, storageProvider: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="aws">Amazon S3</option>
                <option value="gcp">Google Cloud Storage</option>
                <option value="azure">Azure Blob Storage</option>
                <option value="local">Local Storage</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;