import React from 'react';
import { Link } from 'react-router-dom';
import { Package, BarChart3, Users, Code2, Shield, Zap, Database, Cloud, Bot, Globe2 } from 'lucide-react';

const Categories = () => {
  const categories = [
    {
      icon: Package,
      name: 'Operations',
      description: 'Inventory, supply chain, and business operations solutions',
      count: 45,
    },
    {
      icon: BarChart3,
      name: 'Analytics',
      description: 'Business intelligence and data analytics tools',
      count: 32,
    },
    {
      icon: Users,
      name: 'HR',
      description: 'Human resources and talent management solutions',
      count: 28,
    },
    {
      icon: Shield,
      name: 'Security',
      description: 'Security and compliance solutions',
      count: 24,
    },
    {
      icon: Database,
      name: 'Data Management',
      description: 'Database and data storage solutions',
      count: 35,
    },
    {
      icon: Cloud,
      name: 'Cloud Services',
      description: 'Cloud infrastructure and hosting solutions',
      count: 41,
    },
    {
      icon: Bot,
      name: 'AI & ML',
      description: 'Artificial intelligence and machine learning tools',
      count: 19,
    },
    {
      icon: Globe2,
      name: 'Integration',
      description: 'API and system integration solutions',
      count: 37,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Solution Categories</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Browse our comprehensive collection of business solutions by category
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={`/marketplace?category=${category.name.toLowerCase()}`}
            className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
          >
            <category.icon className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {category.name}
            </h3>
            <p className="text-gray-600 mb-4">{category.description}</p>
            <div className="flex items-center text-sm text-gray-500">
              <Package className="h-4 w-4 mr-2" />
              <span>{category.count} solutions</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;