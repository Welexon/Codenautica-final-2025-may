import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Ship, Code2, Users, Zap, CheckCircle2, ArrowUpRight, BarChart3, Building2 } from 'lucide-react';
import Newsletter from '../components/Newsletter';

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium mb-6">
                <Ship className="w-4 h-4 mr-2" />
                Trusted by 500+ Nordic Companies
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Discover Nordic <span className="text-blue-200">Software Solutions</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed max-w-2xl">
                Connect with top Nordic developers and find specialized software solutions for your business needs.
              </p>
              <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/marketplace"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-lg text-blue-900 bg-white font-semibold hover:bg-blue-50 transition-colors"
                >
                  Browse Solutions
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-lg text-white border-2 border-white/20 backdrop-blur-sm font-semibold hover:bg-white/10 transition-colors"
                >
                  Start Free Trial
                  <ArrowUpRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="flex-1 relative">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-700/20 rounded-3xl backdrop-blur-3xl"></div>
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80"
                  alt="Nordic Software Solutions"
                  className="relative rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose CodeNautica?</h2>
            <p className="text-xl text-gray-600">
              We connect Nordic businesses with specialized software solutions and expert developers.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Building2,
                title: 'Nordic Focus',
                description: 'Specialized solutions built by Nordic developers for Nordic businesses.',
              },
              {
                icon: Code2,
                title: 'Verified Solutions',
                description: 'All solutions undergo rigorous quality and security verification.',
              },
              {
                icon: Users,
                title: 'Expert Community',
                description: 'Connect with a community of skilled Nordic developers.',
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-blue-100"
              >
                <div className="text-blue-600 mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">
              Get started with CodeNautica in three simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Browse Solutions',
                description: 'Explore our marketplace of verified Nordic software solutions.',
              },
              {
                step: '02',
                title: 'Choose & Connect',
                description: 'Select the perfect solution and connect with the developer.',
              },
              {
                step: '03',
                title: 'Implement & Scale',
                description: 'Quickly implement the solution and scale your business.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="inline-block mb-4">
                  <span className="text-4xl font-bold text-blue-600">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of Nordic businesses already using CodeNautica to find their perfect software solutions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/marketplace"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-white text-blue-700 font-semibold hover:bg-blue-50 transition-colors"
            >
              Browse Solutions
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg border-2 border-white/20 backdrop-blur-sm font-semibold hover:bg-white/10 transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
};

export default Home;