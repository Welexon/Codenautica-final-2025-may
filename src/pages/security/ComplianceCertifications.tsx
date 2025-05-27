import React from 'react';
import { Shield, FileCheck, CheckCircle2, Calendar, Download, ExternalLink } from 'lucide-react';

const ComplianceCertifications = () => {
  const certifications = [
    {
      name: 'ISO 27001',
      description: 'Information Security Management System',
      status: 'Certified',
      validUntil: '2025-06-30',
      icon: Shield,
      details: 'Our ISO 27001 certification demonstrates our commitment to information security management. The certification covers all aspects of our platform, including data centers, development processes, and operational procedures.',
      downloadUrl: '#',
      verifyUrl: 'https://www.iso.org/isoiec-27001-information-security.html'
    },
    {
      name: 'GDPR Compliance',
      description: 'General Data Protection Regulation',
      status: 'Compliant',
      validUntil: 'Ongoing',
      icon: FileCheck,
      details: 'We maintain full compliance with the EU General Data Protection Regulation. Our practices have been audited by independent data protection experts, and we regularly review and update our processes to ensure continued compliance.',
      downloadUrl: '#',
      verifyUrl: 'https://gdpr.eu/compliance/'
    },
    {
      name: 'SOC 2 Type II',
      description: 'Service Organization Control',
      status: 'Certified',
      validUntil: '2025-03-15',
      icon: Shield,
      details: 'Our SOC 2 Type II certification verifies that we have established and follow strict information security policies and procedures. The audit examines our controls related to security, availability, processing integrity, confidentiality, and privacy.',
      downloadUrl: '#',
      verifyUrl: 'https://www.aicpa.org/interestareas/frc/assuranceadvisoryservices/serviceorganization-smanagement.html'
    },
    {
      name: 'PCI DSS',
      description: 'Payment Card Industry Data Security Standard',
      status: 'Compliant',
      validUntil: '2024-12-31',
      icon: Shield,
      details: 'We maintain PCI DSS compliance for all payment processing activities. This certification ensures that we follow strict security standards when handling credit card information and other payment data.',
      downloadUrl: '#',
      verifyUrl: 'https://www.pcisecuritystandards.org/'
    },
    {
      name: 'DPIA',
      description: 'Data Protection Impact Assessment',
      status: 'Completed',
      validUntil: '2024-09-30',
      icon: FileCheck,
      details: "We have conducted a comprehensive Data Protection Impact Assessment as required by GDPR Article 35. This assessment evaluates the risks to individuals' rights and freedoms when processing their personal data and implements measures to address those risks.",
      downloadUrl: '#',
      verifyUrl: '#'
    },
    {
      name: 'Nordic Cloud Security Certification',
      description: 'Regional Security Standard',
      status: 'Certified',
      validUntil: '2025-01-15',
      icon: Shield,
      details: 'This certification is specific to cloud service providers operating in the Nordic region. It verifies compliance with regional security requirements and best practices for data protection in cloud environments.',
      downloadUrl: '#',
      verifyUrl: '#'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Compliance & Certifications</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Our commitment to security and compliance is validated through rigorous third-party audits and certifications
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {certifications.map((cert) => (
          <div key={cert.name} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
                    <cert.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-gray-900">{cert.name}</h2>
                  <p className="text-sm text-gray-500">{cert.description}</p>
                </div>
                <div className="ml-auto">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    {cert.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="px-6 py-4">
              <p className="text-gray-600 mb-4">{cert.details}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  Valid until: {cert.validUntil}
                </div>
                <div className="flex space-x-3">
                  <a
                    href={cert.downloadUrl}
                    className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Certificate
                  </a>
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Verify
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Compliance Process */}
      <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Compliance Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Assessment</h3>
            <p className="text-gray-600">
              Regular security assessments and gap analysis against relevant standards and regulations.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileCheck className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Implementation</h3>
            <p className="text-gray-600">
              Development and implementation of security controls and processes to meet compliance requirements.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Verification</h3>
            <p className="text-gray-600">
              Independent third-party audits and continuous monitoring to verify compliance.
            </p>
          </div>
        </div>
      </div>

      {/* Compliance Documentation */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Compliance Documentation</h2>
        <p className="text-gray-600 mb-6">
          We provide comprehensive documentation to help our customers understand our security practices and demonstrate compliance to their stakeholders.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: 'Security Whitepaper', description: 'Detailed overview of our security architecture and practices' },
            { title: 'Data Processing Agreement (DPA)', description: 'GDPR-compliant agreement for data processing activities' },
            { title: 'Penetration Test Reports', description: 'Results of our regular security testing by third-party experts' },
            { title: 'Compliance Attestations', description: 'Official documentation of our compliance with various standards' }
          ].map((doc, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-100 text-blue-600">
                  <FileCheck className="h-5 w-5" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-md font-medium text-gray-900">{doc.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{doc.description}</p>
                <a
                  href="#"
                  className="inline-flex items-center mt-2 text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComplianceCertifications;