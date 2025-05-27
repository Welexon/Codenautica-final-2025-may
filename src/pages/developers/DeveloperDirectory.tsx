import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  Star,
  MapPin,
  Calendar,
  Code2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { mockDevelopers } from '../../data/mockData';

interface Developer {
  id: string;
  name: string;
  avatar: string;
  rating?: number;
  location?: string;
  skills: string[];
  completedProjects?: number;
  joinedDate: string;
  available?: boolean;
  verified?: boolean;
  bio?: string;
}

const DeveloperDirectory = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [developers, setDevelopers] = useState<Developer[]>(mockDevelopers);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const skillsList = [
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
    'Spring Boot',
    'JavaScript',
    'CSS',
    'HTML',
    'WordPress',
    'PHP',
    'MySQL',
    'APIs',
    'C#',
    '.NET Core',
    'Azure',
    'Microservices',
    'Go',
    'Kubernetes',
    'TensorFlow',
    'Machine Learning',
    'Data Science'
  ];

  // Fetch developers from Supabase
  useEffect(() => {
    // Always use mock data for now to ensure developers are displayed
    setDevelopers(mockDevelopers);
    setLoading(false);
  }, []);

  // Filtering developers based on search term and selected skills
  const filteredDevelopers = developers.filter(developer => {
    const matchesSearchTerm =
      !searchTerm ||
      developer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (Array.isArray(developer.skills) && developer.skills.some(skill =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      )) ||
      (developer.location && developer.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (developer.bio && developer.bio.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesSkills =
      selectedSkills.length === 0 ||
      (Array.isArray(developer.skills) && selectedSkills.every(skill =>
        developer.skills.includes(skill)
      ));

    return matchesSearchTerm && matchesSkills;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Nordic Developer Directory
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Connect with skilled developers from across the Nordic region. Each
          developer is verified and specialized in building business solutions.
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center">
          <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
          <p className="text-yellow-700">{error}</p>
        </div>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search developers by name, skills, or location..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex-shrink-0">
          <button className="inline-flex items-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </button>
        </div>
      </div>

      {/* Skills Filter */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Popular Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {skillsList.map(skill => (
            <button
              key={skill}
              onClick={() => {
                setSelectedSkills(prev =>
                  prev.includes(skill)
                    ? prev.filter(s => s !== skill)
                    : [...prev, skill]
                );
              }}
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedSkills.includes(skill)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Code2 className="h-4 w-4 mr-2" />
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Developer Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDevelopers.length > 0 ? (
            filteredDevelopers.map(developer => (
              <div
                key={developer.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={developer.avatar}
                      alt={developer.name}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <div className="flex items-center">
                        <h3 className="text-lg font-medium text-gray-900">
                          {developer.name}
                        </h3>
                        {developer.verified && (
                          <CheckCircle2 className="h-5 w-5 text-blue-600 ml-2" />
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span>{developer.rating || '4.8'} rating</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{developer.bio || 'Developer specializing in creating custom software solutions for businesses.'}</p>

                  <div className="mb-4">
                    {developer.location && (
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <MapPin className="h-4 w-4 mr-2" />
                        {developer.location}
                      </div>
                    )}
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      Member since{' '}
                      {new Date(developer.joinedDate).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {Array.isArray(developer.skills) && developer.skills.slice(0, 3).map(skill => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {skill}
                      </span>
                    ))}
                    {Array.isArray(developer.skills) && developer.skills.length > 3 && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        +{developer.skills.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        developer.available
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {developer.available ? 'Available for hire' : 'Currently busy'}
                    </span>
                    <button
                      onClick={() => navigate(`/developers/${developer.id}`)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-gray-500">
                {searchTerm || selectedSkills.length > 0 
                  ? 'No developers found matching your criteria.' 
                  : 'No developers available at the moment.'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DeveloperDirectory;