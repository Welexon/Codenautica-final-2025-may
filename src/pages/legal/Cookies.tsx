import React from 'react';
import { Cookie } from 'lucide-react';

const Cookies = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <Cookie className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
        <p className="text-xl text-gray-600">
          Last updated: March 15, 2024
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <section className="mb-12">
          <h2>What Are Cookies</h2>
          <p>
            Cookies are small text files that are placed on your computer or mobile device when
            you visit our website. They help us make your experience better.
          </p>
        </section>

        <section className="mb-12">
          <h2>How We Use Cookies</h2>
          <p>We use cookies for the following purposes:</p>
          <ul>
            <li>Authentication and security</li>
            <li>Preferences and settings</li>
            <li>Analytics and performance</li>
            <li>Marketing and advertising</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2>Types of Cookies We Use</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Essential Cookies</h3>
              <p>Required for basic website functionality</p>
            </div>
            <div>
              <h3 className="font-semibold">Preference Cookies</h3>
              <p>Remember your settings and preferences</p>
            </div>
            <div>
              <h3 className="font-semibold">Analytics Cookies</h3>
              <p>Help us understand how visitors use our website</p>
            </div>
            <div>
              <h3 className="font-semibold">Marketing Cookies</h3>
              <p>Track visitors across websites for marketing purposes</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2>Managing Cookies</h2>
          <p>
            You can control and manage cookies in various ways:
          </p>
          <ul>
            <li>Browser settings</li>
            <li>Third-party tools</li>
            <li>Our cookie preferences center</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2>Cookie Preferences</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-4">Manage Your Cookie Preferences</h3>
            <div className="space-y-4">
              {[
                { name: 'Essential Cookies', required: true },
                { name: 'Preference Cookies', required: false },
                { name: 'Analytics Cookies', required: false },
                { name: 'Marketing Cookies', required: false },
              ].map((cookie) => (
                <div key={cookie.name} className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">{cookie.name}</span>
                    {cookie.required && (
                      <span className="ml-2 text-sm text-gray-500">(Required)</span>
                    )}
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked={cookie.required}
                      disabled={cookie.required}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
            <button className="mt-6 w-full bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors">
              Save Preferences
            </button>
          </div>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>
            If you have any questions about our Cookie Policy, please contact us at:
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

export default Cookies;