import React from 'react';
import { Shield, Lock, FileCheck, Server, Key, Users, Database, AlertTriangle } from 'lucide-react';

const SecurityFAQ = () => {
  const faqs = [
    {
      question: 'How is my data protected on CodeNautica?',
      answer: 'All data on CodeNautica is encrypted both in transit and at rest using industry-standard encryption protocols. We use TLS 1.3 for all data in transit and AES-256 encryption for data at rest. Additionally, we implement strict access controls, regular security audits, and follow the principle of least privilege to ensure your data remains secure.',
      icon: Shield
    },
    {
      question: 'What security certifications does CodeNautica have?',
      answer: 'CodeNautica maintains ISO 27001 certification for information security management systems. We are also GDPR compliant and undergo regular third-party security audits. Our platform is designed to meet the security requirements of enterprise customers, including SOC 2 Type II compliance.',
      icon: FileCheck
    },
    {
      question: 'How does CodeNautica handle user authentication?',
      answer: 'We implement multi-factor authentication (MFA) and support integration with national electronic identification systems like Swedish BankID, Norwegian BankID, and Finnish Bank ID. Our password policies enforce strong passwords, and we use secure, salted hashing algorithms to store credentials. We also support single sign-on (SSO) for enterprise customers.',
      icon: Key
    },
    {
      question: 'What measures are in place to prevent unauthorized access?',
      answer: 'CodeNautica employs a defense-in-depth approach including IP-based access controls, rate limiting, anomaly detection, and continuous monitoring. We implement role-based access control (RBAC) to ensure users can only access the resources they need. All access attempts are logged and monitored for suspicious activity.',
      icon: Lock
    },
    {
      question: 'How does CodeNautica ensure GDPR compliance?',
      answer: 'Our platform is built with privacy by design principles. We maintain detailed records of processing activities, implement data minimization practices, and provide tools for data subject access requests. Our data processing agreements (DPAs) are GDPR-compliant, and we have appointed a Data Protection Officer to oversee our compliance efforts.',
      icon: Users
    },
    {
      question: 'Where is my data stored?',
      answer: 'All data is stored in EU-based data centers, specifically in the Nordic region. We use cloud providers with data centers in Sweden and Finland that meet strict security and compliance requirements. This ensures data sovereignty and compliance with EU data protection regulations.',
      icon: Database
    },
    {
      question: 'How does CodeNautica secure its infrastructure?',
      answer: 'Our infrastructure is hosted on enterprise-grade cloud platforms with ISO 27001 and SOC 2 certifications. We implement network segmentation, firewalls, intrusion detection systems, and regular vulnerability scanning. All systems are hardened according to industry best practices and regularly patched to address security vulnerabilities.',
      icon: Server
    },
    {
      question: 'What is your incident response process?',
      answer: 'We have a comprehensive incident response plan that includes detection, analysis, containment, eradication, and recovery phases. Our security team is available 24/7 to respond to incidents. In the event of a data breach, we will notify affected users within 72 hours as required by GDPR and provide transparent information about the impact and remediation steps.',
      icon: AlertTriangle
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Security FAQ</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Answers to common questions about how we protect your data and ensure platform security
        </p>
      </div>

      <div className="space-y-8">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
                    <faq.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                  <p className="mt-2 text-base text-gray-600">{faq.answer}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-blue-50 rounded-lg p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
              <Shield className="h-6 w-6" />
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">Still have questions about security?</h3>
            <p className="mt-2 text-base text-gray-600">
              Our security team is available to address any specific concerns you may have about our security practices or compliance status.
            </p>
            <div className="mt-4">
              <a
                href="/contact"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Contact Security Team
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityFAQ;