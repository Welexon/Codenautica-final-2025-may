import React from 'react';
import CategoryFilter from './CategoryFilter';
import PriceFilter from './PriceFilter';
import { Search } from 'lucide-react';

interface SolutionFiltersProps {
  onSearch: (term: string) => void;
  onCategoryChange: (category: string) => void;
  onPriceChange: (price: number) => void;
  categories: string[];
  selectedCategory: string;
}

const SolutionFilters: React.FC<SolutionFiltersProps> = ({
  onSearch,
  onCategoryChange,
  onPriceChange,
  categories,
  selectedCategory
}) => {
  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search solutions..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Category Filter */}
      <CategoryFilter 
        categories={categories} 
        onCategoryChange={onCategoryChange}
        selectedCategory={selectedCategory}
      />

      {/* Price Filter */}
      <PriceFilter onPriceChange={onPriceChange} />
    </div>
  );
};

export default SolutionFilters;