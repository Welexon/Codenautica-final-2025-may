import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code2, Globe2, MapPin, Briefcase, Book, Github, Linkedin, Loader, CheckCircle, XCircle } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const DeveloperSettings = () => {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuthStore();
  const [formData, setFormData] = useState({
    skills: user?.skills || [],
    website: user?.website || '',
    location: user?.location || '',
    bio: user?.bio || '',
    githubUrl: user?.githubUrl || '',
    linkedinUrl: user?.linkedinUrl || '',
    hourlyRate: user?.hourlyRate?.toString() || '',
    availability: user?.availability || 'available',
    languages: user?.languages || [],
    certifications: user?.certifications || [],
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Update form data when user data changes
  useEffect(() => {
    if (user) {
      setFormData({
        skills: user.skills || [],
        website: user.website || '',
        location: user.location || '',
        bio: user.bio || '',
        githubUrl: user.githubUrl || '',
        linkedinUrl: user.linkedinUrl || '',
        hourlyRate: user.hourlyRate?.toString() || '',
        availability: user.availability || 'available',
        languages: user.languages || [],
        certifications: user.certifications || [],
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
        bio: formData.bio.trim(),
        website: formData.website.trim(),
        location: formData.location.trim(),
        skills: formData.skills,
        languages: formData.languages,
        certifications: formData.certifications,
        hourlyRate: formData.hourlyRate ? parseInt(formData.hourlyRate, 10) : undefined,
        availability: formData.availability,
        githubUrl: formData.githubUrl.trim(),
        linkedinUrl: formData.linkedinUrl.trim(),
      };
      
      console.log('Updating developer profile with data:', profileData);
      await updateProfile(profileData);
      
      setSuccess(true);
    } catch (err) {
      console.error('Failed to update profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSkillChange = (skill: string) => {
    const updatedSkills = formData.skills.includes(skill)
      ? formData.skills.filter(s => s !== skill)
      : [...formData.skills, skill];
    setFormData({ ...formData, skills: updatedSkills });
  };

  const handleLanguageChange = (language: string) => {
    const updatedLanguages = formData.languages.includes(language)
      ? formData.languages.filter(l => l !== language)
      : [...formData.languages, language];
    setFormData({ ...formData, languages: updatedLanguages });
  };

  const addCertification = () => {
    setFormData({
      ...formData,
      certifications: [...formData.certifications, '']
    });
  };

  const updateCertification = (index: number, value: string) => {
    const updatedCertifications = [...formData.certifications];
    updatedCertifications[index] = value;
    setFormData({
      ...formData,
      certifications: updatedCertifications
    });
  };

  const removeCertification = (index: number) => {
    const updatedCertifications = formData.certifications.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      certifications: updatedCertifications
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Developer Settings</h2>
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
        {/* Professional Information */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Code2 className="h-6 w-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Professional Information</h3>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                Professional Bio
              </label>
              <textarea
                id="bio"
                rows={4}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skills
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  'React',
                  'Node.js',
                  'TypeScript',
                  'Python',
                  'Java',
                  'AWS',
                  'Docker',
                  'GraphQL',
                  'DevOps',
                ].map((skill) => (
                  <label key={skill} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.skills.includes(skill)}
                      onChange={() => handleSkillChange(skill)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">{skill}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                  Personal Website
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
                <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700">
                  GitHub Profile
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                    <Github className="h-4 w-4" />
                  </span>
                  <input
                    type="url"
                    id="githubUrl"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-700">
                  LinkedIn Profile
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                    <Linkedin className="h-4 w-4" />
                  </span>
                  <input
                    type="url"
                    id="linkedinUrl"
                    value={formData.linkedinUrl}
                    onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                    className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Work Preferences */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Briefcase className="h-6 w-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Work Preferences</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700">
                Hourly Rate (€)
              </label>
              <input
                type="number"
                id="hourlyRate"
                value={formData.hourlyRate}
                onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="availability" className="block text-sm font-medium text-gray-700">
                Availability
              </label>
              <select
                id="availability"
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="available">Available for hire</option>
                <option value="limited">Limited availability</option>
                <option value="unavailable">Not available</option>
              </select>
            </div>
          </div>
        </div>

        {/* Languages & Certifications */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Book className="h-6 w-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Languages & Certifications</h3>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Languages
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  'English',
                  'Norwegian',
                  'Swedish',
                  'Danish',
                  'Finnish',
                  'German',
                ].map((language) => (
                  <label key={language} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.languages.includes(language)}
                      onChange={() => handleLanguageChange(language)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">{language}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Certifications
              </label>
              <div className="space-y-2">
                {formData.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={cert}
                      onChange={(e) => updateCertification(index, e.target.value)}
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeCertification(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addCertification}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Add Certification
                </button>
              </div>
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

export default DeveloperSettings;