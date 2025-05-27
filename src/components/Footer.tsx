import React from 'react';
import { Link } from 'react-router-dom';
import { Ship, Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Solutions',
      links: [
        { label: 'Marketplace', href: '/marketplace' },
        { label: 'Categories', href: '/marketplace/categories' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Custom Requests', href: '/custom-requests' },
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Documentation', href: '/documentation' },
        { label: 'Guides', href: '/guides' },
        { label: 'API Reference', href: '/documentation/api' },
        { label: 'Contact', href: '/contact' },
      ]
    },
    {
      title: 'Community',
      links: [
        { label: 'Forum', href: '/community' },
        { label: 'Developer Directory', href: '/developers/directory' },
        { label: 'Blog', href: '/blog' },
        { label: 'Events', href: '/events' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
        { label: 'Security', href: '/security' },
      ]
    }
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/codenautica', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/company/codenautica', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/codenautica', label: 'Twitter' },
  ];

  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="col-span-1">
              <Link to="/" className="flex items-center space-x-2">
                <Ship className="h-8 w-8 text-blue-600" strokeWidth={1.5} />
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-gray-900">CodeNautica</span>
                  <span className="text-xs text-blue-600 font-medium -mt-1">Nordic Software Solutions</span>
                </div>
              </Link>
              <p className="mt-4 text-gray-600">
                Connecting Nordic businesses with specialized software solutions.
              </p>
              <div className="flex space-x-4 mt-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-600 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Sections */}
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  {section.title}
                </h3>
                <ul className="mt-4 space-y-4">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-base text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-base text-gray-600">
              © {currentYear} CodeNautica. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link to="/terms" className="text-sm text-gray-600 hover:text-blue-600">
                Terms
              </Link>
              <Link to="/privacy" className="text-sm text-gray-600 hover:text-blue-600">
                Privacy
              </Link>
              <Link to="/cookies" className="text-sm text-gray-600 hover:text-blue-600">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;