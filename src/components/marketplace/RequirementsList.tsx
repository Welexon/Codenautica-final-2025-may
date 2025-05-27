import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface RequirementsListProps {
  requirements: string[];
}

const RequirementsList: React.FC<RequirementsListProps> = ({ requirements }) => {
  return (
    <div className="space-y-4">
      {requirements.map((requirement, index) => (
        <div key={index} className="flex items-start">
          <CheckCircle2 className="h-5 w-5 text-blue-700 mt-0.5 mr-3 flex-shrink-0" />
          <span className="text-gray-700">{requirement}</span>
        </div>
      ))}
    </div>
  );
};

export default RequirementsList;