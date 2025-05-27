import React from 'react';
import { Package, Star, Users, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'archived';
  rating: number;
  users: number;
  lastUpdated: string;
}

const ProjectList = () => {
  const projects: Project[] = [
    {
      id: '1',
      title: 'Inventory Management System',
      description: 'Complete inventory tracking solution with real-time updates',
      status: 'active',
      rating: 4.8,
      users: 234,
      lastUpdated: '2024-03-14',
    },
    // Add more mock projects
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Projects</h2>
        <Link
          to="/marketplace/new"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          New Project
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {projects.map((project) => (
            <li key={project.id}>
              <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Package className="h-5 w-5 text-blue-500 mr-3" />
                    <p className="text-sm font-medium text-blue-600 truncate">
                      {project.title}
                    </p>
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        project.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : project.status === 'completed'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      <Star className="flex-shrink-0 mr-1.5 h-5 w-5 text-yellow-400" />
                      {project.rating} rating
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      <Users className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      {project.users} users
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>Updated {new Date(project.lastUpdated).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="mt-2 flex justify-end">
                  <Link
                    to={`/marketplace/${project.id}`}
                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500"
                  >
                    View Details
                    <ArrowUpRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectList;