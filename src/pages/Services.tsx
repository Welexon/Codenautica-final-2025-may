import React from 'react';
import { Shield, Zap, Users, BarChart3, Code, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      icon: Shield,
      title: 'Verified Solutions',
      description: 'All software solutions undergo rigorous verification for quality and security.',
    },
    {
      icon: Zap,
      title: 'Quick Integration',
      description: 'Seamlessly integrate solutions into your existing business workflow.',
    },
    {
      icon: Users,
      title: 'Developer Network',
      description: 'Access a network of skilled Nordic developers for custom solutions.',
    },
    {
      icon: BarChart3,
      title: 'Analytics & Insights',
      description: 'Track performance and ROI with detailed analytics dashboards.',
    },
    {
      icon: Code,
      title: 'Custom Development',
      description: 'Get tailored solutions built specifically for your business needs.',
    },
    {
      icon: HeartHandshake,
      title: 'Ongoing Support',
      description: '24/7 support and maintenance for all implemented solutions.',
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Our Services</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Comprehensive software solutions to power your business growth
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <service.icon className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link
                  to="/contact"
                  className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
                >
                  Learn more
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to get started?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of Nordic businesses already using our solutions
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/marketplace"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Browse Solutions
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border border-blue-600 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;