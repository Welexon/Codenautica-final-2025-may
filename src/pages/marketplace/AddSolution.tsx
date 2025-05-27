import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Upload, Plus, X, Image as ImageIcon, FileText, Link as LinkIcon, Loader, CheckCircle, XCircle } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useMarketplaceStore } from '../../store/marketplaceStore';
import { supabase } from '../../lib/supabase';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

interface Feature {
  id: string;
  title: string;
  description: string;
}

interface Screenshot {
  id: string;
  url: string;
  caption: string;
}

const AddSolution = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const { addSolution } = useMarketplaceStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    category: '',
    price: '',
    subscription: false,
    features: [] as Feature[],
    technologies: [] as string[],
    requirements: [] as string[],
    screenshots: [] as Screenshot[],
    demoUrl: '',
    documentationUrl: '',
    videoUrl: '',
  });

  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);

  // Redirect if not logged in or not a developer
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ returnTo: '/solutions/add' }} />;
  }

  if (user && user.role !== 'developer') {
    return <Navigate to="/unauthorized" state={{ message: 'Only developers can add solutions.' }} />;
  }

  const handleFeatureAdd = () => {
    setFormData({
      ...formData,
      features: [
        ...formData.features,
        { id: Date.now().toString(), title: '', description: '' }
      ]
    });
  };

  const handleFeatureRemove = (id: string) => {
    setFormData({
      ...formData,
      features: formData.features.filter(feature => feature.id !== id)
    });
  };

  const handleScreenshotAdd = () => {
    setFormData({
      ...formData,
      screenshots: [
        ...formData.screenshots,
        { id: Date.now().toString(), url: '', caption: '' }
      ]
    });
  };

  const handleScreenshotRemove = (id: string) => {
    setFormData({
      ...formData,
      screenshots: formData.screenshots.filter(screenshot => screenshot.id !== id)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    if (!user) {
      setError('You must be logged in to add a solution');
      setSubmitting(false);
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      console.log('Submitting solution form...');
      // Validate required fields
      if (!formData.title || !formData.description || !formData.category || !formData.price) {
        throw new Error('Please fill in all required fields');
      }
      
      // Validate price is a number
      const price = parseFloat(formData.price);
      if (isNaN(price) || price <= 0) {
        throw new Error('Please enter a valid price');
      }
      
      // Ensure at least one feature
      if (formData.features.length === 0) {
        throw new Error('Please add at least one feature');
      }
      
      // Ensure at least one screenshot
      if (formData.screenshots.length === 0) {
        throw new Error('Please add at least one screenshot');
      }
      
      // Format data for submission
      console.log('Preparing solution data for submission');
      const solutionData = {
        title: formData.title,
        description: formData.description,
        price: price,
        category: formData.category,
        image: formData.screenshots[0]?.url || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80', // Use first screenshot as main image
        subscription: formData.subscription,
        features: formData.features.map(f => f.title).filter(Boolean),
        technologies: formData.technologies,
        requirements: formData.requirements,
        screenshots: formData.screenshots.map(s => s.url),
        demo: formData.demoUrl,
        documentation: formData.documentationUrl,
        version: '1.0.0',
        supportedLanguages: ['English'],
        industries: []
      };
      
      setLoading(true);
      console.log('Adding solution with data:', solutionData);
      
      // Add solution to database
      await addSolution(solutionData);
      
      // Redirect to solutions page
      navigate('/solutions');
    } catch (error) {
      console.error('Error adding solution:', error);
      setError(error instanceof Error ? error.message : 'Failed to add solution');
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Adding solution..." />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Add New Solution</h1>
        <p className="text-gray-600">Share your software solution with businesses across the Nordic region</p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative flex items-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Solution Title
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700">
                Short Description
              </label>
              <input
                type="text"
                id="shortDescription"
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Full Description
              </label>
              <textarea
                id="description"
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="operations">Operations</option>
                  <option value="analytics">Analytics</option>
                  <option value="hr">HR</option>
                  <option value="finance">Finance</option>
                  <option value="marketing">Marketing</option>
                </select>
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price (€)
                </label>
                <input
                  type="number"
                  id="price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="subscription"
                checked={formData.subscription}
                onChange={(e) => setFormData({ ...formData, subscription: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="subscription" className="ml-2 block text-sm text-gray-700">
                This is a subscription-based solution
              </label>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Features</h2>
            <button
              type="button"
              onClick={handleFeatureAdd}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-blue-600 bg-blue-100 hover:bg-blue-200"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Feature
            </button>
          </div>
          
          <div className="space-y-4">
            {formData.features.map((feature) => (
              <div key={feature.id} className="flex gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Feature title"
                    value={feature.title}
                    onChange={(e) => {
                      const updatedFeatures = formData.features.map(f =>
                        f.id === feature.id ? { ...f, title: e.target.value } : f
                      );
                      setFormData({ ...formData, features: updatedFeatures });
                    }}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Feature description"
                    value={feature.description}
                    onChange={(e) => {
                      const updatedFeatures = formData.features.map(f =>
                        f.id === feature.id ? { ...f, description: e.target.value } : f
                      );
                      setFormData({ ...formData, features: updatedFeatures });
                    }}
                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleFeatureRemove(feature.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies & Requirements */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technologies Used
              </label>
              <input
                type="text"
                placeholder="Add technologies (comma-separated)"
                value={formData.technologies.join(', ')}
                onChange={(e) => setFormData({
                  ...formData,
                  technologies: e.target.value.split(',').map(t => t.trim())
                })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                System Requirements
              </label>
              <input
                type="text"
                placeholder="Add requirements (comma-separated)"
                value={formData.requirements.join(', ')}
                onChange={(e) => setFormData({
                  ...formData,
                  requirements: e.target.value.split(',').map(r => r.trim())
                })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Media</h2>
          
          <div className="space-y-6">
            {/* Screenshots */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Screenshots
                </label>
                <button
                  type="button"
                  onClick={handleScreenshotAdd}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-blue-600 bg-blue-100 hover:bg-blue-200"
                >
                  <ImageIcon className="h-4 w-4 mr-1" />
                  Add Screenshot
                </button>
              </div>
              
              <div className="space-y-4">
                {formData.screenshots.map((screenshot) => (
                  <div key={screenshot.id} className="flex gap-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Image URL"
                        value={screenshot.url}
                        onChange={(e) => {
                          const updatedScreenshots = formData.screenshots.map(s =>
                            s.id === screenshot.id ? { ...s, url: e.target.value } : s
                          );
                          setFormData({ ...formData, screenshots: updatedScreenshots });
                        }}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Caption"
                        value={screenshot.caption}
                        onChange={(e) => {
                          const updatedScreenshots = formData.screenshots.map(s =>
                            s.id === screenshot.id ? { ...s, caption: e.target.value } : s
                          );
                          setFormData({ ...formData, screenshots: updatedScreenshots });
                        }}
                        className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleScreenshotRemove(screenshot.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* URLs */}
            <div className="space-y-4">
              <div>
                <label htmlFor="demoUrl" className="block text-sm font-medium text-gray-700">
                  Demo URL
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                    <LinkIcon className="h-4 w-4" />
                  </span>
                  <input
                    type="url"
                    id="demoUrl"
                    value={formData.demoUrl}
                    onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                    className="flex-1 rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="https://demo.example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="documentationUrl" className="block text-sm font-medium text-gray-700">
                  Documentation URL
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                    <FileText className="h-4 w-4" />
                  </span>
                  <input
                    type="url"
                    id="documentationUrl"
                    value={formData.documentationUrl}
                    onChange={(e) => setFormData({ ...formData, documentationUrl: e.target.value })}
                    className="flex-1 rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="https://docs.example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700">
                  Video Demo URL
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                    <LinkIcon className="h-4 w-4" />
                  </span>
                  <input
                    type="url"
                    id="videoUrl"
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    className="flex-1 rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/solutions')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || submitting}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            aria-live="polite"
          >
            {submitting || loading ? (
              <>
                <Loader className="animate-spin h-4 w-4 mr-2 inline" />
                Adding...
              </>
            ) : (
              'Add Solution'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSolution;