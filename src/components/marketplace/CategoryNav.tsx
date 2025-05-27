import React from 'react';
import { Package } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface CategoryNavProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryNav: React.FC<CategoryNavProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    onCategoryChange(category);
    navigate(`/marketplace?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center space-x-4 overflow-x-auto">
        <button
          onClick={() => handleCategoryClick('All')}
          className={`flex items-center px-4 py-2 rounded-lg whitespace-nowrap ${
            selectedCategory === 'All'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Package className="h-5 w-5 mr-2" />
          All Categories
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`flex items-center px-4 py-2 rounded-lg whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryNav;