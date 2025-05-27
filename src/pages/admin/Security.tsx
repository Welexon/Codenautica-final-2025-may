import React, { useState } from 'react';
import { 
  Shield, 
  Key, 
  Lock, 
  AlertTriangle, 
  UserX, 
  RefreshCw,
  Eye,
  Clock,
  Search
} from 'lucide-react';

const AdminSecurity = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [timeRange, setTimeRange] = useState('24h');

  // Mock security logs - in a real app, fetch from API
  const securityLogs = [
    {
      id: '1',
      type: 'login_attempt',
      status: 'failed',
      user: 'john@example.com',
      ip: '192.168.1.1',
      location: 'Oslo, Norway',
      timestamp: '2024-03-21T14:30:00Z',
      details: 'Invalid password attempt'
    },
    {
      id: '2',
      type: 'account_locked',
      status: 'warning',
      user: 'sarah@company.com',
      ip: '192.168.1.2',
      location: 'Stockholm, Sweden',
      timestamp: '2024-03-21T13:45:00Z',
      details: 'Multiple failed login attempts'
    },
    {
      id: '3',
      type: 'password_reset',
      status: 'success',
      user: 'admin@codenautica.com',
      ip: '192.168.1.3',
      location: 'Copenhagen, Denmark',
      timestamp: '2024-03-21T12:15:00Z',
      details: 'Password successfully reset'
    }
  ];

  // Mock active sessions
  const activeSessions = [
    {
      id: 's1',
      user: 'john@example.com',
      device: 'Chrome / Windows',
      ip: '192.168.1.1',
      location: 'Oslo, Norway',
      lastActive: '2024-03-21T14:30:00Z'
    },
    {
      id: 's2',
      user: 'sarah@company.com',
      device: 'Safari / macOS',
      ip: '192.168.1.2',
      location: 'Stockholm, Sweden',
      lastActive: '2024-03-21T14:25:00Z'
    }
  ];

  const handleTerminateSession = (sessionId: string) => {
    // Handle session termination
    console.log('Terminating session:', sessionId);
  };

  const handleClearLogs = () => {
    // Handle clearing security logs
    console.log('Clearing security logs');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Security Management</h1>
        <p className="text-gray-600">Monitor and manage platform security</p>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <Shield className="h-6 w-6 text-green-600" />
            <span className="text-sm text-green-600">Secure</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">98%</h3>
          <p className="text-sm text-gray-600">Security Score</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <AlertTriangle className="h-6 w-6 text-yellow-600" />
            <span className="text-sm text-yellow-600">Medium</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">5</h3>
          <p className="text-sm text-gray-600">Active Threats</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <UserX className="h-6 w-6 text-red-600" />
            <span className="text-sm text-red-600">High</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">12</h3>
          <p className="text-sm text-gray-600">Blocked IPs</p>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Key className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Active Sessions</h2>
          </div>
          <button
            onClick={() => {}}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Device
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {activeSessions.map((session) => (
                <tr key={session.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{session.user}</div>
                    <div className="text-sm text-gray-500">{session.ip}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {session.device}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {session.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(session.lastActive).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleTerminateSession(session.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Terminate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Security Logs */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Lock className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Security Logs</h2>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="rounded-md border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
            </select>
            <button
              onClick={handleClearLogs}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Clear Logs
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search security logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {securityLogs.map((log) => (
                <tr key={log.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      log.status === 'success'
                        ? 'bg-green-100 text-green-800'
                        : log.status === 'failed'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {log.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{log.user}</div>
                    <div className="text-sm text-gray-500">{log.ip}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminSecurity;