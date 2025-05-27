import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  Calendar, 
  Globe2, 
  Mail, 
  MessageCircle, 
  ExternalLink,
  Github,
  Linkedin,
  CheckCircle2,
  Code2,
  Package,
  Users,
  Clock,
  DollarSign,
  Calendar as CalendarIcon
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useMessageStore } from '../../store/messageStore';
import { useMeetingStore } from '../../store/meetingStore';
import { useNotificationStore } from '../../store/notificationStore';
import { useActivityStore } from '../../store/activityStore';
import { supabase } from '../../lib/supabase';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { mockDevelopers, mockSolutions } from '../../data/mockData';
import { v4 as uuidv4 } from 'uuid';

const DeveloperProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const { sendMessage } = useMessageStore();
  const { scheduleMeeting } = useMeetingStore();
  const { addNotification } = useNotificationStore();
  const { addActivity } = useActivityStore();
  
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [meetingDetails, setMeetingDetails] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
  });
  
  const [developer, setDeveloper] = useState<any>(null);
  const [developerSolutions, setDeveloperSolutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch developer profile
  useEffect(() => {
    const fetchDeveloperProfile = async () => {
      setLoading(true);
      try {
        // Always use mock data first to ensure immediate display
        console.log('Fetching developer profile for ID:', id);
        const mockDeveloper = mockDevelopers.find(d => d.id === id);
        
        if (!mockDeveloper) {
          setError('Developer not found');
          setLoading(false);
          return;
        }
        
        // Set mock data immediately
        setDeveloper(mockDeveloper);
        setDeveloperSolutions(mockSolutions.filter(s => s.developer.id === id));
        setLoading(false);
        
        // Try to fetch from Supabase in the background
        try {
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', id)
            .eq('role', 'developer')
            .maybeSingle();

          if (!profileError && profileData) {
            // Format the developer data from Supabase
            const formattedDeveloper = {
              id: profileData.id,
              name: profileData.name || 'Unknown Developer',
              email: profileData.email,
              avatar: profileData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.name || 'Unknown Developer')}`,
              bio: profileData.bio || 'No bio available',
              company: profileData.company,
              location: profileData.location,
              website: profileData.website,
              skills: profileData.skills || [],
              languages: profileData.languages || [],
              certifications: profileData.certifications || [],
              hourlyRate: profileData.hourly_rate || 0,
              availability: profileData.availability || 'Available',
              githubUrl: profileData.github_url,
              linkedinUrl: profileData.linkedin_url,
              completedProjects: profileData.completed_projects || 0,
              activeProjects: profileData.active_projects || 0,
              joinedDate: profileData.created_at,
              verified: true,
              testimonials: []
            };

            setDeveloper(formattedDeveloper);

            // Fetch developer's solutions
            const { data: solutionsData, error: solutionsError } = await supabase
              .from('solutions')
              .select('*')
              .eq('developer_id', id);

            if (!solutionsError && solutionsData && solutionsData.length > 0) {
              setDeveloperSolutions(solutionsData);
            }
          }
        } catch (supabaseError) {
          console.error('Error fetching from Supabase:', supabaseError);
          // We already have mock data displayed, so no need to set error
        }

      } catch (error) {
        console.error('Error fetching developer profile:', error);
        
        // Fall back to mock data
        const mockDeveloper = mockDevelopers.find(d => d.id === id);
        
        if (!mockDeveloper) {
          setError('Developer not found');
        } else {
          setDeveloper(mockDeveloper);
          setDeveloperSolutions(mockSolutions.filter(s => s.developer.id === id));
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDeveloperProfile();
    }
  }, [id]);

  const handleContact = async () => {
    if (!isAuthenticated) {
      navigate('/login', { 
        state: { 
          returnTo: `/developers/${id}`,
          message: 'Please log in to contact developers'
        }
      });
      return;
    }

    try {
      // Create a new conversation
      await sendMessage(
        user!.id,
        developer.id,
        `Hi ${developer.name}, I'm interested in discussing potential collaboration.`
      );

      // Add activity
      addActivity({
        userId: user!.id,
        type: 'message_send',
        details: {
          recipientId: developer.id,
          recipientName: developer.name,
        }
      });

      // Add notification for the developer
      addNotification({
        userId: developer.id,
        type: 'info',
        title: 'New Message',
        message: `${user!.name} has sent you a message`,
        action: {
          label: 'View Message',
          url: '/messages'
        }
      });

      navigate('/messages');
    } catch (error) {
      console.error('Failed to send message:', error);
      // Show error notification
    }
  };

  const handleScheduleMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login', { 
        state: { 
          returnTo: `/developers/${id}`,
          message: 'Please log in to schedule meetings'
        }
      });
      return;
    }

    try {
      await scheduleMeeting({
        title: meetingDetails.title,
        description: meetingDetails.description,
        date: meetingDetails.date,
        time: meetingDetails.time,
        duration: 60, // Default duration in minutes
        type: 'video',
        organizer: user!.id,
        attendees: [developer.id],
        status: 'scheduled'
      });

      // Add activity
      addActivity({
        userId: user!.id,
        type: 'meeting_schedule',
        details: {
          developerId: developer.id,
          developerName: developer.name,
          meetingDate: meetingDetails.date,
          meetingTime: meetingDetails.time
        }
      });

      // Add notification for the developer
      addNotification({
        userId: developer.id,
        type: 'info',
        title: 'New Meeting Request',
        message: `${user!.name} has scheduled a meeting with you`,
        action: {
          label: 'View Meeting',
          url: '/meetings'
        }
      });

      setShowMeetingModal(false);
      navigate('/meetings');
    } catch (error) {
      console.error('Failed to schedule meeting:', error);
      // Show error notification
    }
  };

  const handleViewSolution = (solutionId: string) => {
    navigate(`/marketplace/solutions/${solutionId}`);
  };

  const handleVisitWebsite = (url: string) => {
    if (url) {
      window.open(url.startsWith('http') ? url : `https://${url}`, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading developer profile..." />;
  }

  if (error || !developer) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Developer not found</h2>
        <Link
          to="/developers/directory"
          className="text-blue-600 hover:text-blue-700"
        >
          Back to Developer Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <img
            src={developer.avatar}
            alt={developer.name}
            className="w-32 h-32 rounded-lg object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{developer.name}</h1>
              {developer.verified && (
                <CheckCircle2 className="h-6 w-6 text-blue-600" />
              )}
            </div>
            <div className="flex items-center space-x-4 text-gray-600 mb-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                <span>{developer.rating || '4.8'} rating</span>
              </div>
              {developer.location && (
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-1" />
                  <span>{developer.location}</span>
                </div>
              )}
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-1" />
                <span>Member since {new Date(developer.joinedDate).toLocaleDateString()}</span>
              </div>
            </div>
            <p className="text-gray-700 mb-6 max-w-2xl">
              {developer.bio}
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleContact}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact Developer
              </button>
              <button
                onClick={() => setShowMeetingModal(true)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <CalendarIcon className="h-4 w-4 mr-2" />
                Schedule Meeting
              </button>
              {developer.website && (
                <button
                  onClick={() => handleVisitWebsite(developer.website)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Globe2 className="h-4 w-4 mr-2" />
                  Visit Website
                  <ExternalLink className="h-4 w-4 ml-1" />
                </button>
              )}
              {developer.githubUrl && (
                <a
                  href={developer.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </a>
              )}
              {developer.linkedinUrl && (
                <a
                  href={developer.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Completed Projects', value: developer.completedProjects, icon: Package },
          { label: 'Active Projects', value: developer.activeProjects, icon: Clock },
          { label: 'Hourly Rate', value: developer.hourlyRate ? `€${developer.hourlyRate}` : 'Not specified', icon: DollarSign },
          { label: 'Availability', value: developer.availability || 'Available', icon: Users }
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Skills & Technologies */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills & Technologies</h2>
        <div className="flex flex-wrap gap-2">
          {developer.skills && developer.skills.length > 0 ? (
            developer.skills.map((skill: string) => (
              <span
                key={skill}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                <Code2 className="h-4 w-4 mr-2" />
                {skill}
              </span>
            ))
          ) : (
            <p className="text-gray-500">No skills specified</p>
          )}
        </div>
      </div>

      {/* Languages & Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Languages</h2>
          <div className="space-y-2">
            {developer.languages && developer.languages.length > 0 ? (
              developer.languages.map((language: string) => (
                <div key={language} className="flex items-center text-gray-700">
                  <Globe2 className="h-5 w-5 mr-2 text-blue-600" />
                  {language}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No languages specified</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Certifications</h2>
          <div className="space-y-2">
            {developer.certifications && developer.certifications.length > 0 ? (
              developer.certifications.map((cert: string) => (
                <div key={cert} className="flex items-center text-gray-700">
                  <CheckCircle2 className="h-5 w-5 mr-2 text-blue-600" />
                  {cert}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No certifications specified</p>
            )}
          </div>
        </div>
      </div>

      {/* Solutions */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Solutions by {developer.name}</h2>
        {developerSolutions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {developerSolutions.map((solution) => (
              <div key={solution.id} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{solution.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{solution.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-1" />
                    {solution.active_users || solution.activeUsers || 0} users
                  </div>
                  <button
                    onClick={() => handleViewSolution(solution.id)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No solutions available</p>
        )}
      </div>

      {/* Testimonials */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Client Testimonials</h2>
        {developer.testimonials && developer.testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {developer.testimonials.map((testimonial: any) => (
              <div key={testimonial.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-2 font-medium text-gray-900">{testimonial.rating}/5</span>
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                <p className="text-sm font-medium text-gray-900">- {testimonial.author}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No testimonials available</p>
        )}
      </div>

      {/* Schedule Meeting Modal */}
      {showMeetingModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleScheduleMeeting} className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Schedule Meeting</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Meeting Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={meetingDetails.title}
                      onChange={(e) => setMeetingDetails({ ...meetingDetails, title: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                        Date
                      </label>
                      <input
                        type="date"
                        id="date"
                        value={meetingDetails.date}
                        onChange={(e) => setMeetingDetails({ ...meetingDetails, date: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                        Time
                      </label>
                      <input
                        type="time"
                        id="time"
                        value={meetingDetails.time}
                        onChange={(e) => setMeetingDetails({ ...meetingDetails, time: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Meeting Description
                    </label>
                    <textarea
                      id="description"
                      rows={4}
                      value={meetingDetails.description}
                      onChange={(e) => setMeetingDetails({ ...meetingDetails, description: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                  >
                    Schedule
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowMeetingModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeveloperProfile;