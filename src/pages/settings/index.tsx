import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Shield, Bell, CreditCard } from 'lucide-react';

const SettingsPage = () => {
  const navigate = useNavigate();

  const settingsSections = [
    {
      id: 'profile',
      title: 'Profile Settings',
      icon: Settings,
      description: 'Update your personal information and preferences',
      path: '/settings/profile'
    },
    {
      id: 'security',
      title: 'Security Settings',
      icon: Shield,
      description: 'Manage your account security and authentication',
      path: '/settings/security'
    },
    {
      id: 'notifications',
      title: 'Notification Preferences',
      icon: Bell,
      description: 'Configure your notification settings',
      path: '/settings/notifications'
    },
    {
      id: 'billing',
      title: 'Billing Information',
      icon: CreditCard,
      description: 'Manage your payment methods and billing details',
      path: '/settings/billing'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settingsSections.map((section) => (
          <button
            key={section.id}
            onClick={() => navigate(section.path)}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all text-left"
          >
            <div className="flex items-center mb-4">
              <section.icon className="h-6 w-6 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900 ml-3">{section.title}</h2>
            </div>
            <p className="text-gray-600">{section.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;