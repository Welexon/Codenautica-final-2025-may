import React from 'react';
import { FileText } from 'lucide-react';

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
        <p className="text-xl text-gray-600">
          Last updated: March 15, 2024
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <section className="mb-12">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using CodeNautica's platform, you agree to be bound by these Terms of
            Service and all applicable laws and regulations.
          </p>
        </section>

        <section className="mb-12">
          <h2>2. Use License</h2>
          <p>
            We grant you a limited, non-exclusive, non-transferable license to use our platform
            subject to these terms and conditions.
          </p>
          <ul>
            <li>You must not modify or copy our software</li>
            <li>You must not use the service for illegal purposes</li>
            <li>You must not transmit harmful code or malware</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2>3. Account Terms</h2>
          <p>You are responsible for:</p>
          <ul>
            <li>Maintaining the security of your account</li>
            <li>All activities that occur under your account</li>
            <li>Keeping your password secure</li>
            <li>Notifying us of any unauthorized use</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2>4. Payment Terms</h2>
          <p>
            Payment terms for our services are as follows:
          </p>
          <ul>
            <li>All fees are exclusive of taxes</li>
            <li>Payments are non-refundable</li>
            <li>Subscription fees are billed in advance</li>
            <li>Late payments may result in service suspension</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2>5. Termination</h2>
          <p>
            We may terminate or suspend your account and access to our services immediately,
            without prior notice or liability, for any reason.
          </p>
        </section>

        <section className="mb-12">
          <h2>6. Contact Information</h2>
          <p>
            Questions about the Terms of Service should be sent to:
            <br />
            <a href="mailto:legal@codenautica.com" className="text-blue-600">
              legal@codenautica.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;