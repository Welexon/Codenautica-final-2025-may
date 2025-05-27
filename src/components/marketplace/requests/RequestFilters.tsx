import React from 'react';
import { Tag, Calendar, DollarSign } from 'lucide-react';
import { Slider } from '../../ui/Slider';

interface RequestFiltersProps {
  selectedSkills: string[];
  onSkillsChange: (skills: string[]) => void;
  budgetRange: [number, number];
  onBudgetChange: (range: [number, number]) => void;
  statusFilter: string;
  onStatusChange: (status: string) => void;
}

const RequestFilters: React.FC<RequestFiltersProps> = ({
  selectedSkills,
  onSkillsChange,
  budgetRange,
  onBudgetChange,
  statusFilter,
  onStatusChange
}) => {
  const skills = [
    'React',
    'Node.js',
    'TypeScript',
    'Python',
    'Django',
    'AWS',
    'Vue.js',
    'Laravel',
    'Docker',
    'Angular',
    'Java',
    'Spring Boot'
  ];

  const statuses = [
    { value: 'all', label: 'All Requests' },
    { value: 'open', label: 'Open' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
  ];

  return (
    <div className="space-y-6">
      {/* Status Filter */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Status</h3>
        <div className="space-y-2">
          {statuses.map((status) => (
            <label key={status.value} className="flex items-center">
              <input
                type="radio"
                name="status"
                value={status.value}
                checked={statusFilter === status.value}
                onChange={(e) => onStatusChange(e.target.value)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-gray-700">{status.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Budget Range */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Range</h3>
        <Slider
          min={0}
          max={100000}
          value={budgetRange[1]}
          onChange={(value) => onBudgetChange([budgetRange[0], value])}
          step={1000}
        />
        <div className="mt-2 text-sm text-gray-600">
          €{budgetRange[0]} - €{budgetRange[1]}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
        <div className="space-y-2">
          {skills.map((skill) => (
            <label key={skill} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedSkills.includes(skill)}
                onChange={(e) => {
                  if (e.target.checked) {
                    onSkillsChange([...selectedSkills, skill]);
                  } else {
                    onSkillsChange(selectedSkills.filter(s => s !== skill));
                  }
                }}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-gray-700">{skill}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={() => {
          onSkillsChange([]);
          onBudgetChange([0, 100000]);
          onStatusChange('all');
        }}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default RequestFilters;