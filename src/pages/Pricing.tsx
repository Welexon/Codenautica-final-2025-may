import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const Pricing = () => {
  const { user } = useAuthStore();
  const location = useLocation();
  const [userType, setUserType] = useState(user?.role || 'business');

  const businessPlans = [
    {
      name: 'Starter',
      price: '€49',
      period: '/month',
      description: 'Perfect for small businesses just getting started',
      features: [
        'Access to verified solutions marketplace',
        'Up to 5 active solution subscriptions',
        'Basic solution analytics',
        'Email support',
        'Community forum access',
        'Standard API limits',
        'Single team dashboard',
        'Basic integration support'
      ]
    },
    {
      name: 'Professional',
      price: '€149',
      period: '/month',
      description: 'Ideal for growing businesses with more demands',
      popular: true,
      features: [
        'Everything in Starter, plus:',
        'Unlimited solution subscriptions',
        'Advanced usage analytics',
        'Priority support',
        'Custom solution requests',
        'Direct developer messaging',
        'Solution customization options',
        'Advanced API access',
        'Team collaboration tools',
        'Multiple team dashboards',
        'Premium integration support'
      ]
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large organizations with specific requirements',
      features: [
        'Everything in Professional, plus:',
        'Dedicated account manager',
        'Custom solution development',
        'On-premise deployment options',
        'Custom SLA agreement',
        'Security audit reports',
        'Unlimited API access',
        'Enterprise SSO',
        'Custom contracts',
        'Priority feature requests',
        'Quarterly business reviews'
      ]
    }
  ];

  const developerPlans = [
    {
      name: 'Basic',
      price: '€29',
      period: '/month',
      description: 'Perfect for individual developers',
      features: [
        'List up to 2 solutions',
        'Basic solution analytics',
        'Standard commission rate (20%)',
        'Basic developer profile',
        'Community forum access',
        'Email support',
        'Access to custom requests board',
        'Basic API access',
        'Standard search ranking',
        'Monthly payouts'
      ]
    },
    {
      name: 'Professional',
      price: '€89',
      period: '/month',
      description: 'For professional developers',
      popular: true,
      features: [
        'Everything in Basic, plus:',
        'Unlimited solution listings',
        'Advanced sales analytics',
        'Reduced commission rate (15%)',
        'Featured developer profile',
        'Priority support',
        'Custom solution pages',
        'Enhanced API access',
        'Higher search ranking',
        'Weekly payouts',
        'Early access to features',
        'Custom integration options'
      ]
    },
    {
      name: 'Agency',
      price: '€249',
      period: '/month',
      description: 'For development teams',
      features: [
        'Everything in Professional, plus:',
        'Lowest commission rate (10%)',
        'Team management dashboard',
        'Premium marketplace placement',
        'Dedicated account manager',
        'Custom contracts',
        'White-label options',
        'Unlimited API access',
        'Top search ranking',
        'Daily payouts',
        'Custom analytics',
        'Priority feature requests'
      ]
    }
  ];

  const plans = userType === 'developer' ? developerPlans : businessPlans;

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {userType === 'developer' 
              ? 'Choose the perfect plan to grow your development business'
              : 'Choose the perfect plan for your business needs'}
          </p>
          {!user && (
            <div className="mt-8 flex justify-center">
              <div className="bg-gray-100 p-1 rounded-full flex items-center">
                <button
                  onClick={() => setUserType('business')}
                  className={`px-6 py-2 rounded-full transition-colors ${
                    userType === 'business'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Business
                </button>
                <button
                  onClick={() => setUserType('developer')}
                  className={`px-6 py-2 rounded-full transition-colors ${
                    userType === 'developer'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Developer
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg ${
                plan.popular
                  ? 'ring-2 ring-blue-600 shadow-lg scale-105'
                  : 'border border-gray-200'
              } p-8`}
            >
              {plan.popular && (
                <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold text-blue-600 bg-blue-50 mb-4">
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
                    <Check className="h-5 w-5 text-green-500 shrink-0" />
                    <span className="ml-3 text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={plan.price === 'Custom' ? '/contact' : `/register?type=${userType}&plan=${plan.name.toLowerCase()}`}
                className={`mt-8 block w-full text-center px-6 py-3 rounded-lg text-sm font-semibold ${
                  plan.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'text-blue-600 border border-blue-600 hover:bg-blue-50'
                } transition-colors`}
              >
                {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                <ArrowRight className="inline-block ml-2 h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: 'Can I change plans later?',
                answer:
                  'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.',
              },
              {
                question: 'What payment methods do you accept?',
                answer:
                  'We accept all major credit cards, PayPal, and bank transfers for enterprise customers.',
              },
              {
                question: 'Is there a free trial?',
                answer:
                  'Yes, all plans come with a 14-day free trial. No credit card required.',
              },
              {
                question: userType === 'developer' 
                  ? 'How do commissions work?'
                  : 'What kind of support do you offer?',
                answer: userType === 'developer'
                  ? 'Commissions are automatically calculated and deducted from each sale. Rates vary by plan level, with higher tiers offering lower commission rates.'
                  : 'We offer email support for all plans, with priority support and dedicated account managers for higher tiers.',
              },
            ].map((faq) => (
              <div key={faq.question} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;