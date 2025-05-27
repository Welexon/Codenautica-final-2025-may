import React from 'react';
import { Solution } from '../../types/marketplace';
import SolutionCard from './SolutionCard';

interface SolutionGridProps {
  solutions: Solution[];
  loading?: boolean;
}

const SolutionGrid: React.FC<SolutionGridProps> = ({ solutions, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-48 rounded-t-xl" />
            <div className="bg-white p-6 rounded-b-xl border border-gray-100">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!solutions || solutions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No solutions found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {solutions.map((solution) => (
        <SolutionCard key={solution.id} solution={solution} />
      ))}
    </div>
  );
};

export default SolutionGrid;