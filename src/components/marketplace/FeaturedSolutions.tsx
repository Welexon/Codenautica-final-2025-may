import React, { useState, useEffect } from 'react';
import { Solution } from '../../types/marketplace';
import { Star, Download, Users, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeaturedSolutionsProps {
  solutions: Solution[];
}

const FeaturedSolutions: React.FC<FeaturedSolutionsProps> = ({ solutions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredSolutions = solutions && solutions.length > 0 ? solutions.slice(0, 5) : [];

  useEffect(() => {
    if (featuredSolutions.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((current) => 
        current === featuredSolutions.length - 1 ? 0 : current + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredSolutions.length]);

  // Navigation functions
  const nextSlide = () => {
    if (featuredSolutions.length === 0) return;
    setCurrentIndex((current) => 
      current === featuredSolutions.length - 1 ? 0 : current + 1
    );
  };

  const prevSlide = () => {
    if (featuredSolutions.length === 0) return;
    setCurrentIndex((current) => 
      current === 0 ? featuredSolutions.length - 1 : current - 1
    );
  };

  // If no solutions, don't render anything
  if (featuredSolutions.length === 0) {
    return (
      <div className="relative h-[400px] rounded-xl overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center">
        <div className="text-center text-white p-8">
          <h2 className="text-3xl font-bold mb-4">Featured Solutions</h2>
          <p className="text-xl mb-6">Discover top-rated software solutions for your business needs</p>
          <p>Check back soon for featured solutions!</p>
        </div>
      </div>
    );
  }

  const solution = featuredSolutions[currentIndex];

  return (
    <div className="relative">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Solutions</h2>
      <div className="relative h-[400px] rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700">
          <img
            src={solution.image}
            alt={solution.title}
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="flex items-center space-x-2 mb-4">
                <span className="px-3 py-1 bg-blue-500/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  {solution.category}
                </span>
                {solution.verified && (
                  <span className="inline-flex items-center px-3 py-1 bg-green-500/20 backdrop-blur-sm rounded-full text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                    Verified
                  </span>
                )}
              </div>
              <h3 className="text-3xl font-bold mb-2">{solution.title}</h3>
              <p className="text-lg text-gray-200 mb-4 line-clamp-2">
                {solution.description}
              </p>
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                  <span>{solution.rating}</span>
                </div>
                <div className="flex items-center">
                  <Download className="h-5 w-5 mr-1" />
                  <span>{solution.downloads}+ downloads</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-1" />
                  <span>{solution.activeUsers}+ users</span>
                </div>
              </div>
              <Link
                to={`/marketplace/solutions/${solution.id}`}
                className="inline-flex items-center px-6 py-3 bg-white text-blue-700 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
        >
          <ArrowRight className="h-6 w-6" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {featuredSolutions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedSolutions;