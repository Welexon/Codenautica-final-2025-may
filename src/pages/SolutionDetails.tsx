import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Download, Users, CheckCircle2, ArrowUpRight, Code2, Globe2 } from 'lucide-react';
import { useMarketplaceStore } from '../store/marketplaceStore';
import TechnologyBadge from '../components/marketplace/TechnologyBadge';
import FeatureList from '../components/marketplace/FeatureList';
import RequirementsList from '../components/marketplace/RequirementsList';
import PricingCard from '../components/marketplace/PricingCard';
import DeveloperCard from '../components/marketplace/DeveloperCard';
import ImageGallery from '../components/marketplace/ImageGallery';

const SolutionDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { solutions, loading, fetchSolutions } = useMarketplaceStore();
  const solution = solutions.find(s => s.id === id);

  useEffect(() => {
    if (solutions.length === 0) {
      fetchSolutions();
    }
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4" />
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="h-96 bg-gray-200 rounded-lg mb-8" />
            </div>
            <div className="h-64 bg-gray-200 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (!solution) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Solution not found</h2>
          <p className="text-gray-600 mb-8">The solution you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/marketplace')}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800"
          >
            Back to Marketplace
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-8">
        <div>
          <div className="flex items-center space-x-4 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              {solution.category}
            </span>
            {solution.verified && (
              <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                <CheckCircle2 className="w-4 h-4 mr-1" />
                Verified
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{solution.title}</h1>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl">{solution.description}</p>
          <div className="flex items-center space-x-6 text-gray-500">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
              <span className="font-medium">{solution.rating}</span>
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
        </div>

        <PricingCard solution={solution} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Screenshots */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Screenshots</h2>
            <ImageGallery images={solution.screenshots} />
          </section>

          {/* Features */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Features</h2>
            <FeatureList features={solution.features} />
          </section>

          {/* Technologies */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Technologies</h2>
            <div className="flex flex-wrap gap-2">
              {solution.technologies.map((tech) => (
                <TechnologyBadge key={tech} technology={tech} />
              ))}
            </div>
          </section>

          {/* Requirements */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Requirements</h2>
            <RequirementsList requirements={solution.requirements} />
          </section>

          {/* Demo & Documentation */}
          {(solution.demo || solution.documentation) && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {solution.demo && (
                  <a
                    href={solution.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors group"
                  >
                    <div className="flex items-center">
                      <Globe2 className="h-5 w-5 text-blue-700 mr-3" />
                      <span className="font-medium">Live Demo</span>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-gray-400 group-hover:text-blue-700 transition-colors" />
                  </a>
                )}
                {solution.documentation && (
                  <a
                    href={solution.documentation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors group"
                  >
                    <div className="flex items-center">
                      <Code2 className="h-5 w-5 text-blue-700 mr-3" />
                      <span className="font-medium">Documentation</span>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-gray-400 group-hover:text-blue-700 transition-colors" />
                  </a>
                )}
              </div>
            </section>
          )}
        </div>

        <div>
          {/* Developer Info */}
          <div className="sticky top-8">
            <DeveloperCard developer={solution.developer} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionDetails;