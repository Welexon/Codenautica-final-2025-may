import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Filter, 
  Calendar,
  BarChart2,
  Users,
  DollarSign,
  Package,
  Printer,
  Mail
} from 'lucide-react';

const AdminReports = () => {
  const [reportType, setReportType] = useState('revenue');
  const [dateRange, setDateRange] = useState('30d');
  const [format, setFormat] = useState('pdf');

  const reports = [
    {
      id: 'revenue',
      name: 'Revenue Report',
      icon: DollarSign,
      description: 'Detailed revenue analysis and trends',
      lastGenerated: '2024-03-21T14:30:00Z'
    },
    {
      id: 'users',
      name: 'User Activity Report',
      icon: Users,
      description: 'User engagement and growth metrics',
      lastGenerated: '2024-03-21T12:15:00Z'
    },
    {
      id: 'solutions',
      name: 'Solutions Performance',
      icon: Package,
      description: 'Solution usage and ratings analysis',
      lastGenerated: '2024-03-20T16:45:00Z'
    },
    {
      id: 'transactions',
      name: 'Transaction Report',
      icon: BarChart2,
      description: 'Detailed transaction history and analysis',
      lastGenerated: '2024-03-20T10:30:00Z'
    }
  ];

  const handleGenerateReport = () => {
    // Handle report generation
    console.log('Generating report:', { reportType, dateRange, format });
  };

  const handleScheduleReport = () => {
    // Handle report scheduling
    console.log('Scheduling report:', { reportType, dateRange, format });
  };

  const handleEmailReport = () => {
    // Handle report emailing
    console.log('Emailing report:', { reportType, dateRange, format });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-600">Generate and manage platform reports</p>
      </div>

      {/* Report Generation Form */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-center mb-6">
          <FileText className="h-6 w-6 text-blue-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Generate Report</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Type
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="revenue">Revenue Report</option>
              <option value="users">User Activity Report</option>
              <option value="solutions">Solutions Performance</option>
              <option value="transactions">Transaction Report</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Format
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
              <option value="csv">CSV</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={handleEmailReport}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Mail className="h-4 w-4 mr-2" />
            Email Report
          </button>
          <button
            onClick={handleScheduleReport}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Report
          </button>
          <button
            onClick={handleGenerateReport}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Download className="h-4 w-4 mr-2" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Recent Reports</h2>
          <button className="text-sm text-blue-600 hover:text-blue-700">
            View All Reports
          </button>
        </div>

        <div className="space-y-6">
          {reports.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center">
                <report.icon className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-900">{report.name}</h3>
                  <p className="text-sm text-gray-500">{report.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  Generated: {new Date(report.lastGenerated).toLocaleString()}
                </span>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-500">
                    <Printer className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-500">
                    <Mail className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-500">
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminReports;