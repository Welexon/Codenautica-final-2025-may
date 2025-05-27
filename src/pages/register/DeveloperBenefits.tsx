import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Store, 
  Users, 
  TrendingUp, 
  Shield, 
  MessageSquare,
  Zap,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const DeveloperBenefits = () => {
  const benefits = [
    {
      icon: Store,
      title: 'Access Nordic Market',
      description: 'Reach businesses across the Nordic region looking for specialized software solutions.'
    },
    {
      icon: Users,
      title: 'Growing Customer Base',
      description: 'Connect with verified businesses actively seeking software solutions.'
    },
    {
      icon: TrendingUp,
      title: 'Recurring Revenue',
      description: 'Build sustainable income through subscription-based solutions and maintenance.'
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Reliable payment processing and contract protection for your work.'
    },
    {
      icon: MessageSquare,
      title: 'Direct Client Access',
      description: 'Communicate directly with clients through our platform.'
    },
    {
      icon: Zap,
      title: 'Quick Deployment',
      description: 'Deploy and manage your solutions with our streamlined tools.'
    }
  ];

  const pricingPlans = [
    {
      name: 'Basic',
      price: '€29',
      period: '/month',
      description: 'Perfect for individual developers',
      features: [
        'List up to 2 solutions',
        'Basic analytics',
        'Community support',
        'Standard commission rate',
        'Basic developer profile'
      ]
    },
    {
      name: 'Professional',
      price: '€89',
      period: '/month',
      description: 'For professional developers',
      popular: true,
      features: [
        'Unlimited solutions',
        'Advanced analytics',
        'Priority support',
        'Reduced commission rate',
        'Featured developer profile',
        'Custom solution pages',
        'API access'
      ]
    },
    {
      name: 'Agency',
      price: '€249',
      period: '/month',
      description: 'For development teams',
      features: [
        'Everything in Professional',
        'Team management',
        'Lowest commission rate',
        'Premium placement',
        'Custom contracts',
        'Dedicated account manager',
        'White-label options'
      ]
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-purple-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Grow Your Development Business in the Nordic Market
          </h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-8">
            Join our community of top Nordic developers and reach businesses looking for your expertise
          </p>
          <Link
            to="/register?type=developer"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50"
          >
            Register as Developer
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Develop for CodeNautica?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join a thriving marketplace of Nordic software solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all">
                <benefit.icon className="h-12 w-12 text-indigo-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Developer Plans
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan to grow your development business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`bg-white rounded-lg ${
                  plan.popular
                    ? 'ring-2 ring-indigo-600 shadow-lg scale-105'
                    : 'border border-gray-200'
                } p-8`}
              >
                {plan.popular && (
                  <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold text-indigo-600 bg-indigo-50 mb-4">
                    Most Popular
                  </span>
                )}
                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                <div className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-5xl font-extrabold tracking-tight">{plan.price}</span>
                  <span className="ml-1 text-xl font-semibold">{plan.period}</span>
                </div>
                <p className="mt-4 text-gray-500">{plan.description}</p>

                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex">
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                      <span className="ml-3 text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/register?type=developer"
                  className={`mt-8 block w-full text-center px-6 py-3 rounded-lg text-sm font-semibold ${
                    plan.popular
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'text-indigo-600 border border-indigo-600 hover:bg-indigo-50'
                  } transition-colors`}
                >
                  Get Started
                  <ArrowRight className="inline-block ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperBenefits;