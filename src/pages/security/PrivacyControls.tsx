import React, { useState } from 'react';
import { Shield, Lock, Eye, EyeOff, UserCheck, Database, FileText, Settings } from 'lucide-react';

const PrivacyControls = () => {
  const [dataCollection, setDataCollection] = useState({
    essentialData: true,
    analyticsData: true,
    marketingData: false,
    thirdPartyData: false
  });

  const [communicationPreferences, setCommunicationPreferences] = useState({
    productUpdates: true,
    securityAlerts: true,
    marketingEmails: false,
    eventInvitations: true
  });

  const [visibilitySettings, setVisibilitySettings] = useState({
    profile: 'public',
    contactInfo: 'authenticated',
    solutions: 'public',
    activity: 'private'
  });

  const handleDataCollectionChange = (key: keyof typeof dataCollection) => {
    setDataCollection(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleCommunicationChange = (key: keyof typeof communicationPreferences) => {
    setCommunicationPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleVisibilityChange = (key: keyof typeof visibilitySettings, value: string) => {
    setVisibilitySettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Controls</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Manage your privacy settings and control how your data is used
        </p>
      </div>

      {/* Data Collection Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-center mb-6">
          <Database className="h-6 w-6 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Data Collection</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-md font-medium text-gray-900">Essential Service Data</h3>
              <p className="text-sm text-gray-500">Data required for the platform to function properly</p>
            </div>
            <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer">
              <input
                type="checkbox"
                id="essentialData"
                checked={dataCollection.essentialData}
                onChange={() => {}}
                className="sr-only"
                disabled
              />
              <span className={`absolute inset-0 rounded-full transition duration-200 ease-in-out bg-blue-600`}></span>
              <span className={`absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full transition duration-200 ease-in-out transform translate-x-6 shadow-md`}></span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-md font-medium text-gray-900">Analytics Data</h3>
              <p className="text-sm text-gray-500">Data used to improve our services and user experience</p>
            </div>
            <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer">
              <input
                type="checkbox"
                id="analyticsData"
                checked={dataCollection.analyticsData}
                onChange={() => handleDataCollectionChange('analyticsData')}
                className="sr-only"
              />
              <span className={`absolute inset-0 rounded-full transition duration-200 ease-in-out ${dataCollection.analyticsData ? 'bg-blue-600' : 'bg-gray-200'}`}></span>
              <span className={`absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full transition duration-200 ease-in-out transform ${dataCollection.analyticsData ? 'translate-x-6' : 'translate-x-0'} shadow-md`}></span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-md font-medium text-gray-900">Marketing Data</h3>
              <p className="text-sm text-gray-500">Data used for personalized marketing and recommendations</p>
            </div>
            <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer">
              <input
                type="checkbox"
                id="marketingData"
                checked={dataCollection.marketingData}
                onChange={() => handleDataCollectionChange('marketingData')}
                className="sr-only"
              />
              <span className={`absolute inset-0 rounded-full transition duration-200 ease-in-out ${dataCollection.marketingData ? 'bg-blue-600' : 'bg-gray-200'}`}></span>
              <span className={`absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full transition duration-200 ease-in-out transform ${dataCollection.marketingData ? 'translate-x-6' : 'translate-x-0'} shadow-md`}></span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-md font-medium text-gray-900">Third-Party Data Sharing</h3>
              <p className="text-sm text-gray-500">Sharing data with trusted partners for enhanced services</p>
            </div>
            <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer">
              <input
                type="checkbox"
                id="thirdPartyData"
                checked={dataCollection.thirdPartyData}
                onChange={() => handleDataCollectionChange('thirdPartyData')}
                className="sr-only"
              />
              <span className={`absolute inset-0 rounded-full transition duration-200 ease-in-out ${dataCollection.thirdPartyData ? 'bg-blue-600' : 'bg-gray-200'}`}></span>
              <span className={`absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full transition duration-200 ease-in-out transform ${dataCollection.thirdPartyData ? 'translate-x-6' : 'translate-x-0'} shadow-md`}></span>
            </div>
          </div>
        </div>
      </div>

      {/* Communication Preferences */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-center mb-6">
          <FileText className="h-6 w-6 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Communication Preferences</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-md font-medium text-gray-900">Product Updates</h3>
              <p className="text-sm text-gray-500">Notifications about new features and improvements</p>
            </div>
            <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer">
              <input
                type="checkbox"
                id="productUpdates"
                checked={communicationPreferences.productUpdates}
                onChange={() => handleCommunicationChange('productUpdates')}
                className="sr-only"
              />
              <span className={`absolute inset-0 rounded-full transition duration-200 ease-in-out ${communicationPreferences.productUpdates ? 'bg-blue-600' : 'bg-gray-200'}`}></span>
              <span className={`absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full transition duration-200 ease-in-out transform ${communicationPreferences.productUpdates ? 'translate-x-6' : 'translate-x-0'} shadow-md`}></span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-md font-medium text-gray-900">Security Alerts</h3>
              <p className="text-sm text-gray-500">Important notifications about security issues</p>
            </div>
            <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer">
              <input
                type="checkbox"
                id="securityAlerts"
                checked={communicationPreferences.securityAlerts}
                onChange={() => handleCommunicationChange('securityAlerts')}
                className="sr-only"
              />
              <span className={`absolute inset-0 rounded-full transition duration-200 ease-in-out ${communicationPreferences.securityAlerts ? 'bg-blue-600' : 'bg-gray-200'}`}></span>
              <span className={`absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full transition duration-200 ease-in-out transform ${communicationPreferences.securityAlerts ? 'translate-x-6' : 'translate-x-0'} shadow-md`}></span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-md font-medium text-gray-900">Marketing Emails</h3>
              <p className="text-sm text-gray-500">Promotional content and special offers</p>
            </div>
            <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer">
              <input
                type="checkbox"
                id="marketingEmails"
                checked={communicationPreferences.marketingEmails}
                onChange={() => handleCommunicationChange('marketingEmails')}
                className="sr-only"
              />
              <span className={`absolute inset-0 rounded-full transition duration-200 ease-in-out ${communicationPreferences.marketingEmails ? 'bg-blue-600' : 'bg-gray-200'}`}></span>
              <span className={`absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full transition duration-200 ease-in-out transform ${communicationPreferences.marketingEmails ? 'translate-x-6' : 'translate-x-0'} shadow-md`}></span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-md font-medium text-gray-900">Event Invitations</h3>
              <p className="text-sm text-gray-500">Invitations to webinars, conferences, and other events</p>
            </div>
            <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer">
              <input
                type="checkbox"
                id="eventInvitations"
                checked={communicationPreferences.eventInvitations}
                onChange={() => handleCommunicationChange('eventInvitations')}
                className="sr-only"
              />
              <span className={`absolute inset-0 rounded-full transition duration-200 ease-in-out ${communicationPreferences.eventInvitations ? 'bg-blue-600' : 'bg-gray-200'}`}></span>
              <span className={`absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full transition duration-200 ease-in-out transform ${communicationPreferences.eventInvitations ? 'translate-x-6' : 'translate-x-0'} shadow-md`}></span>
            </div>
          </div>
        </div>
      </div>

      {/* Visibility Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-center mb-6">
          <Eye className="h-6 w-6 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Visibility Settings</h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-md font-medium text-gray-900">Profile Visibility</h3>
              <span className="text-sm text-gray-500">Who can see your profile information</span>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => handleVisibilityChange('profile', 'public')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  visibilitySettings.profile === 'public'
                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                Public
              </button>
              <button
                onClick={() => handleVisibilityChange('profile', 'authenticated')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  visibilitySettings.profile === 'authenticated'
                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                Registered Users
              </button>
              <button
                onClick={() => handleVisibilityChange('profile', 'private')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  visibilitySettings.profile === 'private'
                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                Private
              </button>
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-md font-medium text-gray-900">Contact Information</h3>
              <span className="text-sm text-gray-500">Who can see your contact details</span>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => handleVisibilityChange('contactInfo', 'public')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  visibilitySettings.contactInfo === 'public'
                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                Public
              </button>
              <button
                onClick={() => handleVisibilityChange('contactInfo', 'authenticated')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  visibilitySettings.contactInfo === 'authenticated'
                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                Registered Users
              </button>
              <button
                onClick={() => handleVisibilityChange('contactInfo', 'private')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  visibilitySettings.contactInfo === 'private'
                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                Private
              </button>
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-md font-medium text-gray-900">Solutions & Projects</h3>
              <span className="text-sm text-gray-500">Who can see your solutions and projects</span>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => handleVisibilityChange('solutions', 'public')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  visibilitySettings.solutions === 'public'
                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                Public
              </button>
              <button
                onClick={() => handleVisibilityChange('solutions', 'authenticated')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  visibilitySettings.solutions === 'authenticated'
                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                Registered Users
              </button>
              <button
                onClick={() => handleVisibilityChange('solutions', 'private')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  visibilitySettings.solutions === 'private'
                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                Private
              </button>
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-md font-medium text-gray-900">Activity History</h3>
              <span className="text-sm text-gray-500">Who can see your activity on the platform</span>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => handleVisibilityChange('activity', 'public')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  visibilitySettings.activity === 'public'
                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                Public
              </button>
              <button
                onClick={() => handleVisibilityChange('activity', 'authenticated')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  visibilitySettings.activity === 'authenticated'
                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                Registered Users
              </button>
              <button
                onClick={() => handleVisibilityChange('activity', 'private')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  visibilitySettings.activity === 'private'
                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                Private
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-center mb-6">
          <Settings className="h-6 w-6 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Data Management</h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-md font-medium text-gray-900 mb-2">Download Your Data</h3>
            <p className="text-sm text-gray-600 mb-4">
              You can download a copy of all the personal data we have stored about you. This includes your profile information, activity history, and preferences.
            </p>
            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Request Data Export
            </button>
          </div>
          
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-md font-medium text-gray-900 mb-2">Delete Your Account</h3>
            <p className="text-sm text-gray-600 mb-4">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <button className="inline-flex items-center px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50">
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Save Changes */}
      <div className="flex justify-end">
        <button className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700">
          Save Privacy Settings
        </button>
      </div>
    </div>
  );
};

export default PrivacyControls;