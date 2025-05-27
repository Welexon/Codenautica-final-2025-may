import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface FeatureListProps {
  features: string[];
}

const FeatureList: React.FC<FeatureListProps> = ({ features }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {features.map((feature, index) => (
        <div key={index} className="flex items-start">
          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
          <span className="text-gray-700">{feature}</span>
        </div>
      ))}
    </div>
  );
};

export default FeatureList;