import React from 'react';
import { Tag } from 'lucide-react';

const tags = [
  { name: 'React', count: 234 },
  { name: 'TypeScript', count: 189 },
  { name: 'Node.js', count: 167 },
  { name: 'API', count: 145 },
  { name: 'Docker', count: 123 },
  { name: 'AWS', count: 98 },
  { name: 'GraphQL', count: 87 },
  { name: 'Next.js', count: 76 },
  { name: 'GDPR', count: 112 },
  { name: 'Security', count: 95 },
  { name: 'E-commerce', count: 143 },
  { name: 'Payments', count: 89 },
  { name: 'Mobile', count: 132 },
  { name: 'DevOps', count: 78 },
  { name: 'AI', count: 65 },
  { name: 'Machine Learning', count: 54 },
  { name: 'UX/UI', count: 121 },
  { name: 'Performance', count: 67 },
  { name: 'Testing', count: 82 },
  { name: 'Accessibility', count: 43 }
];

const PopularTags = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-4">
        <Tag className="h-5 w-5 text-blue-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">Popular Tags</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag.name}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
          >
            {tag.name}
            <span className="ml-2 text-gray-500">{tag.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PopularTags;