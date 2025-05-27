import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Mail, Globe2, MapPin, CreditCard, Loader, CheckCircle, XCircle } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const BusinessSettings = () => {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuthStore();
  const [formData, setFormData] = useState({
    companyName: user?.company || '',
    website: user?.website || '',
    location: user?.location || '',
    industry: user?.industry || '',
    companySize: user?.companySize || '',
    billingEmail: user?.billingEmail || user?.email || '',
    taxId: user?.taxId || '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Update form data when user data changes
  useEffect(() => {
    if (user) {
      setFormData({
        companyName: user.company || '',
        website: user.website || '',
        location: user.location || '',
        industry: user.industry || '',
        companySize: user.companySize || '',
        billingEmail: user.billingEmail || user.email || '',
        taxId: user.taxId || '',
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Prepare data object with all form fields
      const profileData: Record<string, any> = {
        company: formData.companyName.trim(),
        website: formData.website.trim(),
        location: formData.location.trim(),
        industry: formData.industry,
        companySize: formData.companySize,
        billingEmail: formData.billingEmail.trim(),
        taxId: formData.taxId.trim(),
      };
      
      console.log('Updating business profile with data:', profileData);
      await updateProfile(profileData);
      
      setSuccess(true);
    } catch (err) {
      console.error('Failed to update profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Business Settings</h2>
      </div>

      {success && (
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded-md flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          Profile updated successfully!
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-800 px-4 py-2 rounded-md flex items-center">
          <XCircle className="h-5 w-5 mr-2" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Company Information */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Building2 className="h-6 w-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Company Information</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                Website
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  <Globe2 className="h-4 w-4" />
                </span>
                <input
                  type="url"
                  id="website"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  <MapPin className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                Industry
              </label>
              <select
                id="industry"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select Industry</option>
                <option value="technology">Technology</option>
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
                <option value="retail">Retail</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="education">Education</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="companySize" className="block text-sm font-medium text-gray-700">
                Company Size
              </label>
              <select
                id="companySize"
                value={formData.companySize}
                onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select Size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="501+">501+ employees</option>
              </select>
            </div>
          </div>
        </div>

        {/* Billing Information */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <CreditCard className="h-6 w-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Billing Information</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="billingEmail" className="block text-sm font-medium text-gray-700">
                Billing Email
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  <Mail className="h-4 w-4" />
                </span>
                <input
                  type="email"
                  id="billingEmail"
                  value={formData.billingEmail}
                  onChange={(e) => setFormData({ ...formData, billingEmail: e.target.value })}
                  className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="taxId" className="block text-sm font-medium text-gray-700">
                Tax ID / VAT Number
              </label>
              <input
                type="text"
                id="taxId"
                value={formData.taxId}
                onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/profile')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            aria-live="polite"
          >
            {loading ? (
              <>
                <Loader className="animate-spin h-4 w-4 mr-2 inline" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessSettings;