import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  ShieldCheck, 
  Users, 
  Clock, 
  MessageSquare, 
  FileText,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const BusinessBenefits = () => {
  const benefits = [
    {
      icon: Search,
      title: 'Find Specialized Solutions',
      description: 'Access a curated marketplace of Nordic software solutions tailored to your business needs.'
    },
    {
      icon: ShieldCheck,
      title: 'Verified Developers',
      description: 'Connect with pre-vetted, experienced Nordic developers with proven track records.'
    },
    {
      icon: Users,
      title: 'Custom Development',
      description: 'Post custom project requests and receive proposals from qualified developers.'
    },
    {
      icon: Clock,
      title: 'Quick Implementation',
      description: 'Get your solutions up and running quickly with professional support.'
    },
    {
      icon: MessageSquare,
      title: 'Direct Communication',
      description: 'Communicate directly with developers for seamless collaboration.'
    },
    {
      icon: FileText,
      title: 'Detailed Documentation',
      description: 'Access comprehensive documentation and support resources.'
    }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '€49',
      period: '/month',
      description: 'Perfect for small businesses',
      features: [
        'Access to marketplace',
        'Up to 3 active solutions',
        'Basic support',
        '1 custom request per month',
        'Community access'
      ]
    },
    {
      name: 'Business',
      price: '€149',
      period: '/month',
      description: 'Ideal for growing companies',
      popular: true,
      features: [
        'Everything in Starter',
        'Unlimited active solutions',
        'Priority support',
        '5 custom requests per month',
        'Developer direct messaging',
        'Solution customization',
        'API access'
      ]
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large organizations',
      features: [
        'Everything in Business',
        'Dedicated account manager',
        'Custom integration support',
        'Unlimited custom requests',
        'SLA guarantees',
        'On-premise deployment',
        'Custom contracts'
      ]
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Transform Your Business with Nordic Software Solutions
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Access verified solutions and expert developers to accelerate your digital transformation
          </p>
          <Link
            to="/register?type=business"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50"
          >
            Register as Business
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose CodeNautica for Your Business?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join hundreds of Nordic businesses already leveraging our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all">
                <benefit.icon className="h-12 w-12 text-blue-600 mb-4" />
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
              Business Plans
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan for your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`bg-white rounded-lg ${
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
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                      <span className="ml-3 text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={plan.price === 'Custom' ? '/contact' : '/register?type=business'}
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
        </div>
      </div>
    </div>
  );
};

export default BusinessBenefits;