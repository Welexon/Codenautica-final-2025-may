import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { FileText, Calendar, DollarSign, Users, Loader, CheckCircle, XCircle } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useRequestStore } from '../../store/requestStore';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const PostRequest = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const { addRequest, loading: requestLoading } = useRequestStore();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '5,000 - 10,000',
    deadline: '',
    skills: ['Web Development', 'Mobile Development'] as string[],
    attachments: [] as File[],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if not logged in or not a business user
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ returnTo: '/post-request' }} />;
  }

  if (user && user.role !== 'business') {
    return <Navigate to="/dashboard" />;
  }

  if (requestLoading) {
    return <LoadingSpinner text="Processing your request..." />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      console.log('Submitting request form...');
      if (!user) {
        throw new Error('You must be logged in to post a request');
      }
      
      // Validate form data
      if (!formData.title.trim()) {
        throw new Error('Please enter a title for your request');
      }
      
      if (!formData.description.trim()) {
        throw new Error('Please enter a description for your request');
      }
      
      if (!formData.budget.trim()) {
        throw new Error('Please enter a budget for your request');
      }
      
      if (!formData.deadline) {
        throw new Error('Please select a deadline for your request');
      }
      
      // Create request object
      console.log('Creating request with data:', formData);
      const requestData = {
        title: formData.title,
        description: formData.description,
        budget: formData.budget,
        deadline: new Date(formData.deadline).toISOString(),
        skills: formData.skills,
        attachments: [], // We'll handle file uploads separately
        postedBy: {
          id: user.id,
          name: user.name,
          avatar: user.avatar || ''
        }
      };
      
      console.log('Sending request to store:', requestData);
      
      // Add request to database
      setLoading(true);
      await addRequest(requestData);
      
      // Redirect to custom requests page
      navigate('/custom-requests');
    } catch (err) {
      console.error('Failed to post request:', err);
      setError(err instanceof Error ? err.message : 'Failed to post request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Post a Custom Request</h1>
        <p className="text-gray-600">Describe your project requirements and find the perfect developer</p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative flex items-center" role="alert">
          <XCircle className="h-5 w-5 mr-2" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg shadow-sm p-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Project Title
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
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Project Description
          </label>
          <textarea
            id="description"
            rows={6}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
              Budget Range (€)
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="budget"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="pl-10 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                placeholder="5,000 - 10,000"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
              Project Deadline
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                id="deadline"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="pl-10 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Required Skills</label>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {[
              'Web Development',
              'Mobile Development',
              'API Integration',
              'Database Design',
              'Cloud Services',
              'UI/UX Design',
              'DevOps',
              'Security',
            ].map((skill) => (
              <label key={skill} className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  onChange={(e) => {
                    const newSkills = e.target.checked
                      ? [...formData.skills, skill]
                      : formData.skills.filter((s) => s !== skill);
                    setFormData({ ...formData, skills: newSkills });
                  }}
                />
                <span className="ml-2 text-gray-700">{skill}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Attachments</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
                  <span>Upload files</span>
                  <input
                    id="file-upload"
                    type="file"
                    className="sr-only"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      setFormData({ ...formData, attachments: files });
                    }}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/custom-requests')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            aria-live="polite"
          >
            {loading ? (
              <>
                <Loader className="animate-spin h-4 w-4 mr-2 inline" />
                Posting...
              </>
            ) : (
              'Post Request'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostRequest;