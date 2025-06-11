import React from 'react';
import { Solution } from '../../types/marketplace';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SolutionCard from './SolutionCard';

interface TrendingSolutionsProps {
  solutions: Solution[];
}

const TrendingSolutions: React.FC<TrendingSolutionsProps> = ({ solutions }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <TrendingUp className="h-6 w-6 text-blue-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">Trending Solutions</h2>
        </div>
        <Link
          to="/marketplace/trending"
          className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
        >
          View All
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>

        {solutions && Array.isArray(solutions) && solutions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-fr">
          {solutions.map((solution) => (
            <SolutionCard
              key={solution.id}
              solution={solution}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <p className="text-gray-600">Loading trending solutions...</p>
        </div>
      )}
    </div>
  );
};

export default TrendingSolutions;