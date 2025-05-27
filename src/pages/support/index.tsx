import React from 'react';
import { MessageCircle, FileText, Video, HelpCircle } from 'lucide-react';

const Support = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Support Center</h1>
        <p className="text-gray-600">Get help with your solutions and services</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <MessageCircle className="h-8 w-8 text-blue-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Support</h3>
          <p className="text-gray-600 mb-4">Get help from our support team</p>
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            Open Ticket →
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <FileText className="h-8 w-8 text-blue-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Documentation</h3>
          <p className="text-gray-600 mb-4">Browse our documentation</p>
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            View Docs →
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <Video className="h-8 w-8 text-blue-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Video Tutorials</h3>
          <p className="text-gray-600 mb-4">Learn through video guides</p>
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            Watch Now →
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Frequently Asked Questions</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {[
            {
              question: 'How do I get started?',
              answer: 'Follow our quick start guide to begin using your solutions.',
            },
            {
              question: 'What payment methods do you accept?',
              answer: 'We accept all major credit cards and bank transfers.',
            },
            {
              question: 'How do I update my solution?',
              answer: 'Updates are automatically applied to your solutions.',
            },
            {
              question: 'Can I cancel my subscription?',
              answer: 'Yes, you can cancel your subscription at any time.',
            },
          ].map((faq, index) => (
            <div key={index} className="p-6">
              <button className="flex justify-between items-center w-full text-left">
                <span className="text-gray-900 font-medium">{faq.question}</span>
                <HelpCircle className="h-5 w-5 text-gray-400" />
              </button>
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Support;