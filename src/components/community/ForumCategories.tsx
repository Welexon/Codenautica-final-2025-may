import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Code, Lightbulb, HelpCircle, Users, Settings, Globe2, Shield, Zap, BookOpen, Briefcase } from 'lucide-react';

const categories = [
  {
    id: 'general',
    name: 'General Discussion',
    description: 'General discussions about Nordic software development',
    icon: MessageSquare,
    topics: 234,
    posts: 1245,
  },
  {
    id: 'technical',
    name: 'Technical Support',
    description: 'Get help with technical issues and implementation',
    icon: Code,
    topics: 567,
    posts: 2890,
  },
  {
    id: 'ideas',
    name: 'Ideas & Feedback',
    description: 'Share your ideas and give feedback to others',
    icon: Lightbulb,
    topics: 123,
    posts: 789,
  },
  {
    id: 'help',
    name: 'Help & Questions',
    description: 'Ask questions and get help from the community',
    icon: HelpCircle,
    topics: 345,
    posts: 1567,
  },
  {
    id: 'networking',
    name: 'Networking',
    description: 'Connect with other developers and businesses',
    icon: Users,
    topics: 89,
    posts: 456,
  },
  {
    id: 'solutions',
    name: 'Solutions',
    description: 'Discuss and share software solutions',
    icon: Settings,
    topics: 432,
    posts: 2134,
  },
  {
    id: 'international',
    name: 'International Markets',
    description: 'Expanding beyond the Nordic region',
    icon: Globe2,
    topics: 156,
    posts: 873,
  },
  {
    id: 'security',
    name: 'Security & Compliance',
    description: 'Discussions about security, GDPR, and compliance',
    icon: Shield,
    topics: 278,
    posts: 1432,
  },
  {
    id: 'innovation',
    name: 'Innovation & Trends',
    description: 'Emerging technologies and industry trends',
    icon: Zap,
    topics: 198,
    posts: 1056,
  },
  {
    id: 'learning',
    name: 'Learning Resources',
    description: 'Share and discover learning materials',
    icon: BookOpen,
    topics: 145,
    posts: 892,
  },
  {
    id: 'business',
    name: 'Business Development',
    description: 'Growing your software business in the Nordic market',
    icon: Briefcase,
    topics: 167,
    posts: 943,
  }
];

const ForumCategories = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/community/categories/${category.id}`}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-left"
          >
            <div className="flex items-start">
              <category.icon className="h-6 w-6 text-blue-600 mt-1" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{category.topics} topics</span>
                  <span>{category.posts} posts</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ForumCategories;