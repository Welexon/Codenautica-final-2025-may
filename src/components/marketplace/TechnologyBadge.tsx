import React from 'react';

interface TechnologyBadgeProps {
  technology: string;
}

const TechnologyBadge: React.FC<TechnologyBadgeProps> = ({ technology }) => {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
      {technology}
    </span>
  );
};

export default TechnologyBadge;