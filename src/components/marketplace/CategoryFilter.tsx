import React from 'react';
import { Tag } from 'lucide-react';

interface CategoryFilterProps {
  categories: string[];
  onCategoryChange: (category: string) => void;
  selectedCategory: string;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categories,
  onCategoryChange,
  selectedCategory
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange('All')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === 'All'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Tag className="w-4 h-4 mr-2" />
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;