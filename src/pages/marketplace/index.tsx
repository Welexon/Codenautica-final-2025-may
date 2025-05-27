import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMarketplaceStore } from '../../store/marketplaceStore';
import { useAuthStore } from '../../store/authStore';
import SolutionGrid from '../../components/marketplace/SolutionGrid';
import SolutionFilters from '../../components/marketplace/SolutionFilters';
import FeaturedSolutions from '../../components/marketplace/FeaturedSolutions';
import TrendingSolutions from '../../components/marketplace/TrendingSolutions';
import CategoryNav from '../../components/marketplace/CategoryNav';
import { Solution } from '../../types/marketplace';
import { categories } from '../../data/mockData';

const Marketplace = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { solutions, loading, error, fetchSolutions } = useMarketplaceStore();
  const [filteredSolutions, setFilteredSolutions] = useState<Solution[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'price-low' | 'price-high'>('popular');

  // Fetch solutions on component mount
  useEffect(() => {
    console.log('Marketplace component mounted, fetching solutions');
    fetchSolutions();
  }, [fetchSolutions]);

  // Update selected category from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  // Filter and sort solutions based on user selections
  useEffect(() => {
    console.log('Filtering solutions', solutions.length);
    if (!solutions || !Array.isArray(solutions) || solutions.length === 0) {
      setFilteredSolutions([]);
      return;
    }
    
    // Create a copy of the array to avoid mutation issues
    let filtered = [...solutions];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (solution) =>
          solution.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          solution.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          solution.technologies.some(tech => 
            tech.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((solution) => solution.category === selectedCategory);
    }

    // Apply price filter
    filtered = filtered.filter((solution) => solution.price <= maxPrice);

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'popular':
        default:
          return b.downloads - a.downloads;
      }
    });

    setFilteredSolutions(filtered);
    console.log('Filtered solutions count:', filtered.length);
  }, [solutions, searchTerm, selectedCategory, maxPrice, sortBy]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Featured Solutions */}
      <section className="mb-12">
        <FeaturedSolutions solutions={solutions.filter(s => s.verified)} />
      </section>

      {/* Category Navigation */}
      <section className="mb-8">
        <CategoryNav
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </section>

      {/* Trending Solutions */}
      <section className="mb-12">
        <TrendingSolutions solutions={[...solutions].sort((a, b) => b.downloads - a.downloads).slice(0, 4)} />
      </section>

      {/* Error message if any */}
      {error && (
        <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-700">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <SolutionFilters
            onSearch={setSearchTerm}
            onCategoryChange={handleCategoryChange}
            onPriceChange={setMaxPrice}
            categories={categories}
            selectedCategory={selectedCategory}
          />
        </div>

        {/* Solutions Grid */}
        <div className="lg:col-span-3">
          <SolutionGrid 
            solutions={filteredSolutions}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Marketplace;