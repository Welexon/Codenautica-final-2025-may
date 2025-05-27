import React, { useState, useEffect } from 'react';
import { useMarketplaceStore } from '../store/marketplaceStore';
import SolutionCard from '../components/marketplace/SolutionCard';
import SolutionFilters from '../components/marketplace/SolutionFilters';
import { Solution } from '../types/marketplace';

const Marketplace = () => {
  const { solutions, fetchSolutions } = useMarketplaceStore();
  const [filteredSolutions, setFilteredSolutions] = useState<Solution[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(1000);

  const categories = ['Operations', 'Analytics', 'HR', 'Finance', 'Marketing'];

  useEffect(() => {
    fetchSolutions();
  }, [fetchSolutions]);

  useEffect(() => {
    if (!solutions) return;

    let filtered = [...solutions];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (solution) =>
          solution.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          solution.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((solution) => solution.category === selectedCategory);
    }

    // Apply price filter
    filtered = filtered.filter((solution) => solution.price <= maxPrice);

    setFilteredSolutions(filtered);
  }, [solutions, searchTerm, selectedCategory, maxPrice]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handlePriceChange = (price: number) => {
    setMaxPrice(price);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <SolutionFilters
            onSearch={handleSearch}
            onCategoryChange={handleCategoryChange}
            onPriceChange={handlePriceChange}
            categories={categories}
          />
        </div>

        {/* Solutions Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSolutions.map((solution) => (
              <SolutionCard key={solution.id} solution={solution} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;