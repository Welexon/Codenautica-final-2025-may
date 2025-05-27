import React from 'react';
import { BookOpen, Video, FileText, Users } from 'lucide-react';

const Guides = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Guides & Tutorials</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Learn how to make the most of our solutions with step-by-step guides
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            title: 'Getting Started Guide',
            description: 'Learn the basics and set up your first project',
            type: 'Article',
            duration: '10 min read',
            icon: BookOpen,
          },
          {
            title: 'Integration Tutorial',
            description: 'Step-by-step guide to integrate our API',
            type: 'Video',
            duration: '15 min watch',
            icon: Video,
          },
          {
            title: 'Best Practices',
            description: 'Tips and tricks for optimal usage',
            type: 'Article',
            duration: '8 min read',
            icon: FileText,
          },
        ].map((guide) => (
          <div key={guide.title} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6">
              <guide.icon className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{guide.title}</h3>
              <p className="text-gray-600 mb-4">{guide.description}</p>
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-4">{guide.type}</span>
                <span>{guide.duration}</span>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 rounded-b-lg">
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                Read More →
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Topics</h2>
            <div className="space-y-4">
              {[
                'Getting Started',
                'API Integration',
                'Security Best Practices',
                'Data Management',
                'User Authentication',
                'Performance Optimization',
              ].map((topic) => (
                <a
                  key={topic}
                  href="#"
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {topic}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Community Resources</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <Users className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Join Our Community</h3>
              <p className="text-gray-600 mb-4">
                Connect with other developers, share knowledge, and get help from the community.
              </p>
              <button className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors">
                Join Community
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guides;