import React from 'react';
import { Shield, Lock, FileCheck, Server, Key, Users, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Security = () => {
  const securityFeatures = [
    {
      icon: Shield,
      title: 'Platform Security',
      description: 'Enterprise-grade security measures protecting your data and applications.',
      details: [
        'End-to-end encryption',
        'Regular security audits',
        'DDoS protection',
        'Real-time threat monitoring'
      ]
    },
    {
      icon: Lock,
      title: 'Data Protection',
      description: 'Comprehensive data protection measures ensuring your information stays secure.',
      details: [
        'GDPR compliance',
        'Data encryption at rest',
        'Secure data backups',
        'Access control policies'
      ]
    },
    {
      icon: FileCheck,
      title: 'Compliance',
      description: 'Meeting and exceeding Nordic and international compliance standards.',
      details: [
        'ISO 27001 certified',
        'GDPR compliant',
        'Regular compliance audits',
        'Industry-specific standards'
      ]
    },
    {
      icon: Server,
      title: 'Infrastructure Security',
      description: 'Secure infrastructure designed for reliability and protection.',
      details: [
        'Cloud security measures',
        'Network monitoring',
        'Vulnerability scanning',
        'Incident response'
      ]
    },
    {
      icon: Key,
      title: 'Access Control',
      description: 'Advanced access management and authentication systems.',
      details: [
        'Multi-factor authentication',
        'Role-based access control',
        'Single sign-on (SSO)',
        'Session management'
      ]
    },
    {
      icon: Users,
      title: 'User Privacy',
      description: 'Protecting user privacy through comprehensive security measures.',
      details: [
        'Privacy by design',
        'Data minimization',
        'Consent management',
        'Privacy controls'
      ]
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Security & Compliance</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Enterprise-grade security measures protecting your software solutions and data
          </p>
        </div>
      </div>

      {/* Security Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {securityFeatures.map((feature) => (
            <div key={feature.title} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.details.map((detail, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Security Resources</h2>
            <p className="text-xl text-gray-600">
              Learn more about our security practices and controls
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                name: 'Security Audit', 
                description: 'View our latest security audit report and remediation plan',
                link: '/security/audit',
                icon: FileCheck
              },
              { 
                name: 'Security FAQ', 
                description: 'Answers to common questions about our security practices',
                link: '/security/faq',
                icon: Lock
              },
              { 
                name: 'Compliance & Certifications', 
                description: 'Details about our security certifications and compliance status',
                link: '/security/compliance',
                icon: Shield
              },
              { 
                name: 'Privacy Controls', 
                description: 'Manage your privacy settings and data preferences',
                link: '/security/privacy-controls',
                icon: Users
              },
            ].map((cert) => (
              <Link 
                key={cert.name} 
                to={cert.link}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all group"
              >
                <cert.icon className="h-12 w-12 text-blue-600 mb-4 group-hover:text-blue-700 transition-colors" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">{cert.name}</h3>
                <p className="text-gray-600 mb-4">{cert.description}</p>
                <span className="text-blue-600 group-hover:text-blue-700 transition-colors inline-flex items-center text-sm font-medium">
                  Learn more
                  <ExternalLink className="ml-1 h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Security Practices */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Security Practices</h2>
            <p className="text-xl text-gray-600">
              Our comprehensive approach to security
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Regular Security Audits',
                description: 'We conduct regular security audits and penetration testing to identify and address potential vulnerabilities.',
              },
              {
                title: 'Incident Response',
                description: 'Our dedicated security team is available 24/7 to respond to and address any security incidents.',
              },
              {
                title: 'Data Encryption',
                description: 'All data is encrypted both in transit and at rest using industry-standard encryption protocols.',
              },
              {
                title: 'Access Controls',
                description: 'Strict access controls and authentication measures ensure only authorized access to resources.',
              },
            ].map((practice) => (
              <div key={practice.title} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{practice.title}</h3>
                <p className="text-gray-600">{practice.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;