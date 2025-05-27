import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { CheckCircle2, Loader, AlertCircle } from 'lucide-react';
import WelcomeDashboard from '../components/WelcomeDashboard';
import { supabase } from '../lib/supabase';
import { formatUserData } from '../store/authStore';

const Onboarding = () => {
  const { user, updateProfile } = useAuthStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    company: '',
    industry: '',
    size: '',
    interests: [] as string[],
    bio: '',
    skills: [] as string[],
    location: '',
    website: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      console.log('No user in onboarding, checking session...');
      
      // Check if there's a session even if the user state isn't set yet
      supabase.auth.getSession().then(({ data }) => {
        if (!data.session) {
          console.log('No session found in onboarding, redirecting to login');
          window.location.href = '/login?returnTo=/onboarding';
        } else {
          console.log('Session exists but user state not loaded yet, waiting...');
          
          // Try to get the user from the session
          supabase.auth.getUser().then(({ data: userData, error }) => {
            if (error || !userData.user) {
              console.error('Error getting user from session:', error);
              window.location.href = '/login?returnTo=/onboarding';
              return;
            }
            
            // Try to fetch the profile directly
            supabase
              .from('profiles')
              .select('*')
              .eq('id', userData.user.id)
              .single()
              .then(({ data: profile, error: profileError }) => {
                if (profileError || !profile) {
                  console.error('Error fetching profile:', profileError);
                  window.location.href = '/login?returnTo=/onboarding';
                  return;
                }
                
                // Manually update the auth store
                useAuthStore.setState({ 
                  user: formatUserData(profile), 
                  isAuthenticated: true 
                });
              });
          });
        }
      }).catch(error => {
        console.error('Error checking session:', error);
        window.location.href = '/login?returnTo=/onboarding';
      });
    }
  }, [user]);

  // Initialize form data from user profile if available
  useEffect(() => {
    if (user) {
      setFormData({
        company: user.company || '',
        industry: user.industry || '',
        size: user.companySize || '',
        interests: [],
        bio: user.bio || '',
        skills: user.skills || [],
        location: user.location || '',
        website: user.website || '',
      });
    }
  }, [user]);

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Manufacturing',
    'Retail',
    'Education',
    'Other'
  ];

  const companySizes = [
    '1-10',
    '11-50',
    '51-200',
    '201-500',
    '500+'
  ];

  const skills = [
    'React',
    'Node.js',
    'TypeScript',
    'Python',
    'Java',
    'AWS',
    'Docker',
    'DevOps',
    'UI/UX',
    'Mobile Development'
  ];

  const businessInterests = [
    'Inventory Management',
    'Customer Analytics',
    'HR Solutions',
    'Financial Tools',
    'Marketing Automation'
  ];

  const developerInterests = [
    'Web Development',
    'Mobile Apps',
    'Data Analytics',
    'AI/ML',
    'Cloud Solutions'
  ];

  const interests = user?.role === 'business' ? businessInterests : developerInterests;

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setLoading(true);
      setError('');
      
      // Save onboarding data
      try {
        const profileData = user?.role === 'business' 
          ? {
              company: formData.company,
              industry: formData.industry,
              companySize: formData.size,
              bio: formData.bio,
              location: formData.location,
              website: formData.website,
            }
          : {
              bio: formData.bio,
              skills: formData.skills,
              location: formData.location,
              website: formData.website,
            };
            
        await updateProfile(profileData);
        setStep(4); // Move to completed state
      } catch (error) {
        console.error('Failed to save profile:', error);
        setError(error instanceof Error ? error.message : 'Failed to save profile data');
      } finally {
        setLoading(false);
      }
    }
  };

  // Show welcome dashboard after completing onboarding
  if (step > 3) {
    return <WelcomeDashboard />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-16">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((number) => (
              <div key={number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step >= number ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step > number ? (
                    <CheckCircle2 className="h-6 w-6" />
                  ) : (
                    number
                  )}
                </div>
                {number < 3 && (
                  <div className={`w-24 h-1 ${
                    step > number ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white shadow rounded-lg p-8">
          {error && (
            <div className="mb-4 bg-red-50 p-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
              {user?.role === 'business' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Industry</label>
                    <select
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Select Industry</option>
                      {industries.map((industry) => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Professional Bio
                  </label>
                  <textarea
                    rows={4}
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Tell us about your experience and expertise..."
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="City, Country"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Website (Optional)</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="https://example.com"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {user?.role === 'business' ? 'Company Size' : 'Skills & Expertise'}
              </h2>
              
              {user?.role === 'business' ? (
                <div className="grid grid-cols-2 gap-4">
                  {companySizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setFormData({ ...formData, size })}
                      className={`p-4 border rounded-lg text-center transition-colors ${
                        formData.size === size
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-blue-300 text-gray-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select your skills
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {skills.map((skill) => (
                      <label key={skill} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.skills.includes(skill)}
                          onChange={(e) => {
                            const newSkills = e.target.checked
                              ? [...formData.skills, skill]
                              : formData.skills.filter(s => s !== skill);
                            setFormData({ ...formData, skills: newSkills });
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-gray-700">{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {user?.role === 'business' ? 'Areas of Interest' : 'Expertise'}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {interests.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => {
                      const newInterests = formData.interests.includes(interest)
                        ? formData.interests.filter(i => i !== interest)
                        : [...formData.interests, interest];
                      setFormData({ ...formData, interests: newInterests });
                    }}
                    className={`p-4 border rounded-lg text-center transition-colors ${
                      formData.interests.includes(interest)
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-blue-300 text-gray-700'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleNext}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin h-5 w-5 mr-2 inline" />
                  Saving...
                </>
              ) : step === 3 ? 'Complete Setup' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;