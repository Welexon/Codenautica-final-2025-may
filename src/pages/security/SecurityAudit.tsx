import React from 'react';
import { Shield, CheckCircle2, AlertTriangle, XCircle, Clock, FileText, Download } from 'lucide-react';

const SecurityAudit = () => {
  // Mock audit data
  const auditSummary = {
    score: 92,
    date: '2024-03-15',
    nextAudit: '2024-06-15',
    criticalIssues: 0,
    highIssues: 1,
    mediumIssues: 3,
    lowIssues: 5,
    passedChecks: 87,
    totalChecks: 96
  };

  const auditCategories = [
    {
      name: 'Infrastructure Security',
      score: 95,
      status: 'passed',
      issues: [
        { severity: 'low', title: 'TLS configuration could be strengthened', description: 'Current TLS configuration meets standards but could be further optimized.' }
      ]
    },
    {
      name: 'Application Security',
      score: 88,
      status: 'warning',
      issues: [
        { severity: 'high', title: 'Potential XSS vulnerability in search function', description: 'Input sanitization could be bypassed in certain edge cases.' },
        { severity: 'medium', title: 'CSRF protection not implemented on all forms', description: 'Some forms are missing CSRF tokens.' }
      ]
    },
    {
      name: 'Authentication & Access Control',
      score: 94,
      status: 'passed',
      issues: [
        { severity: 'low', title: 'Password policy could be strengthened', description: 'Current policy meets standards but could be more robust.' },
        { severity: 'low', title: 'Session timeout period is longer than recommended', description: 'Current timeout is 24 hours, recommended is 12 hours.' }
      ]
    },
    {
      name: 'Data Protection',
      score: 96,
      status: 'passed',
      issues: [
        { severity: 'medium', title: 'Some PII not encrypted at rest', description: 'Non-critical user preferences stored without encryption.' }
      ]
    },
    {
      name: 'API Security',
      score: 90,
      status: 'warning',
      issues: [
        { severity: 'medium', title: 'Rate limiting could be strengthened', description: 'Current rate limits could be bypassed with distributed requests.' },
        { severity: 'low', title: 'API documentation exposes internal endpoint details', description: 'Some internal implementation details visible in documentation.' }
      ]
    },
    {
      name: 'Compliance',
      score: 98,
      status: 'passed',
      issues: [
        { severity: 'low', title: 'Privacy policy needs minor updates', description: 'Recent regulatory changes require small updates to privacy policy language.' }
      ]
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-600 bg-red-100';
      case 'high':
        return 'text-orange-600 bg-orange-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Security Audit Report</h1>
        <p className="text-gray-600">Comprehensive security assessment of the CodeNautica platform</p>
      </div>

      {/* Audit Summary */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Audit Summary</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              <Clock className="inline-block h-4 w-4 mr-1" />
              {auditSummary.date}
            </span>
            <button className="inline-flex items-center px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Download className="h-4 w-4 mr-1" />
              Download PDF
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center">
            <div className="relative">
              <svg className="w-32 h-32" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="3"
                  strokeDasharray="100, 100"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={auditSummary.score >= 90 ? "#10B981" : auditSummary.score >= 70 ? "#FBBF24" : "#EF4444"}
                  strokeWidth="3"
                  strokeDasharray={`${auditSummary.score}, 100`}
                />
                <text x="18" y="20.5" className="text-3xl font-bold" textAnchor="middle" fill="#111827">
                  {auditSummary.score}
                </text>
              </svg>
            </div>
            <div className="ml-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Security Score</h3>
              <p className="text-gray-600 mb-2">
                {auditSummary.score >= 90 
                  ? 'Excellent security posture' 
                  : auditSummary.score >= 70 
                  ? 'Good security with some improvements needed' 
                  : 'Significant security issues to address'}
              </p>
              <p className="text-sm text-gray-500">
                Next audit scheduled: {auditSummary.nextAudit}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Issues Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-red-50 rounded-lg p-4 flex items-center">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Critical</p>
                  <p className="text-xl font-semibold text-gray-900">{auditSummary.criticalIssues}</p>
                </div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 flex items-center">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">High</p>
                  <p className="text-xl font-semibold text-gray-900">{auditSummary.highIssues}</p>
                </div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 flex items-center">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Medium</p>
                  <p className="text-xl font-semibold text-gray-900">{auditSummary.mediumIssues}</p>
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <AlertTriangle className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Low</p>
                  <p className="text-xl font-semibold text-gray-900">{auditSummary.lowIssues}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Categories */}
      <div className="space-y-6">
        {auditCategories.map((category) => (
          <div key={category.name} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {getStatusIcon(category.status)}
                  <h3 className="text-lg font-semibold text-gray-900 ml-2">{category.name}</h3>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                    <span className={`text-lg font-semibold ${
                      category.score >= 90 ? 'text-green-600' : 
                      category.score >= 70 ? 'text-yellow-600' : 
                      'text-red-600'
                    }`}>
                      {category.score}
                    </span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-500">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="px-6 py-4">
              <h4 className="text-sm font-medium text-gray-500 mb-3">Issues ({category.issues.length})</h4>
              <div className="space-y-3">
                {category.issues.map((issue, index) => (
                  <div key={index} className="flex items-start">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(issue.severity)} mr-3`}>
                      {issue.severity}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{issue.title}</p>
                      <p className="text-sm text-gray-500">{issue.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Recommendations</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-md font-medium text-gray-900">Address XSS vulnerability in search function</h3>
              <p className="text-gray-600 mt-1">Implement proper input sanitization and output encoding to prevent cross-site scripting attacks.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-md font-medium text-gray-900">Implement CSRF protection on all forms</h3>
              <p className="text-gray-600 mt-1">Add CSRF tokens to all forms to prevent cross-site request forgery attacks.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-md font-medium text-gray-900">Strengthen API rate limiting</h3>
              <p className="text-gray-600 mt-1">Implement more sophisticated rate limiting that considers IP diversity and account relationships.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-md font-medium text-gray-900">Update TLS configuration</h3>
              <p className="text-gray-600 mt-1">Upgrade to the latest TLS configuration best practices and disable older cipher suites.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Status */}
      <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Compliance Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
              <h3 className="text-md font-medium text-gray-900">GDPR</h3>
            </div>
            <p className="text-sm text-gray-600">Compliant with all General Data Protection Regulation requirements.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
              <h3 className="text-md font-medium text-gray-900">ISO 27001</h3>
            </div>
            <p className="text-sm text-gray-600">Meets all Information Security Management System standards.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
              <h3 className="text-md font-medium text-gray-900">PCI DSS</h3>
            </div>
            <p className="text-sm text-gray-600">Compliant with Payment Card Industry Data Security Standard.</p>
          </div>
        </div>
      </div>

      {/* Audit Methodology */}
      <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Audit Methodology</h2>
        <div className="prose prose-blue max-w-none">
          <p>This security audit was conducted using a comprehensive methodology that includes:</p>
          <ul>
            <li>Automated vulnerability scanning using industry-standard tools</li>
            <li>Manual penetration testing by certified security professionals</li>
            <li>Code review focusing on security-critical components</li>
            <li>Configuration analysis of all infrastructure components</li>
            <li>Review of security policies and procedures</li>
            <li>Compliance checking against relevant standards and regulations</li>
          </ul>
          <p>The audit was performed by an independent third-party security firm with extensive experience in assessing software platforms for the Nordic market.</p>
        </div>
      </div>

      {/* Action Plan */}
      <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Remediation Plan</h2>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            <FileText className="h-4 w-4 mr-2" />
            Export Plan
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">XSS vulnerability in search function</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">High</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Security Team</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-04-01</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">In Progress</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CSRF protection implementation</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Medium</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Backend Team</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-04-15</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Planned</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">API rate limiting improvements</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Medium</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">API Team</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-04-30</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Planned</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">TLS configuration update</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Low</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">DevOps Team</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-05-15</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Planned</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SecurityAudit;