import React from 'react';
import { Book, FileText, Code, Terminal } from 'lucide-react';

const Documentation = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Documentation</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Everything you need to know about using and integrating our solutions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {[
          {
            icon: Book,
            title: 'Getting Started',
            description: 'Learn the basics and get up and running quickly',
          },
          {
            icon: Code,
            title: 'API Reference',
            description: 'Detailed API documentation for developers',
          },
          {
            icon: Terminal,
            title: 'Integration Guides',
            description: 'Step-by-step guides for integrating our solutions',
          },
        ].map((section) => (
          <div key={section.title} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <section.icon className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{section.title}</h3>
            <p className="text-gray-600">{section.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Documentation Index</h2>
            <div className="space-y-6">
              {[
                {
                  title: 'Introduction',
                  items: ['Overview', 'Quick Start Guide', 'Core Concepts'],
                },
                {
                  title: 'Integration',
                  items: ['Authentication', 'REST API', 'Webhooks', 'SDKs'],
                },
                {
                  title: 'Features',
                  items: ['User Management', 'Data Storage', 'Analytics', 'Security'],
                },
              ].map((section) => (
                <div key={section.title}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item}>
                        <a href="#" className="text-blue-600 hover:text-blue-700">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
              <p className="text-gray-600 mb-4">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <button className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;