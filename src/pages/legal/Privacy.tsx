import React from 'react';
import { Shield } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-xl text-gray-600">
          Last updated: March 15, 2024
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <section className="mb-12">
          <h2>Introduction</h2>
          <p>
            At CodeNautica, we take your privacy seriously. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you use our platform.
          </p>
        </section>

        <section className="mb-12">
          <h2>Information We Collect</h2>
          <p>We collect information that you provide directly to us, including:</p>
          <ul>
            <li>Name and contact information</li>
            <li>Account credentials</li>
            <li>Payment information</li>
            <li>Communication preferences</li>
            <li>Usage data and analytics</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide and maintain our services</li>
            <li>Process your transactions</li>
            <li>Send you important updates</li>
            <li>Improve our platform</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2>Information Sharing</h2>
          <p>
            We do not sell your personal information. We may share your information with:
          </p>
          <ul>
            <li>Service providers</li>
            <li>Business partners</li>
            <li>Legal authorities when required</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of marketing communications</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
            <br />
            <a href="mailto:privacy@codenautica.com" className="text-blue-600">
              privacy@codenautica.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;