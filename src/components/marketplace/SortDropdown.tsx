import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SortDropdownProps {
  value: 'popular' | 'newest' | 'price-low' | 'price-high';
  onChange: (value: 'popular' | 'newest' | 'price-low' | 'price-high') => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ value, onChange }) => {
  const options = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' }
  ];

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as typeof value)}
        className="appearance-none w-full bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
    </div>
  );
};

export default SortDropdown;