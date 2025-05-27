import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Users, ArrowLeft, ExternalLink, Clock, Tag } from 'lucide-react';

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  
  // Mock events data - in a real app, fetch from API
  const events = [
    {
      id: '1',
      title: 'Nordic Developer Conference 2024',
      description: 'Join leading developers and businesses from across the Nordic region for two days of learning, networking, and collaboration.',
      longDescription: `
        <p>The Nordic Developer Conference (NDC) 2024 is the premier gathering for software professionals across the Nordic region. This two-day event brings together industry leaders, innovative startups, and talented developers to share knowledge, explore new technologies, and build valuable connections.</p>
        
        <p>This year's conference focuses on sustainable software development, AI integration, and Nordic-specific market solutions. Attendees will have access to over 50 sessions across 5 specialized tracks, hands-on workshops, and exclusive networking opportunities.</p>
        
        <h3>Conference Highlights:</h3>
        <ul>
          <li>Keynote presentations from industry leaders</li>
          <li>Technical deep dives into emerging technologies</li>
          <li>Panel discussions on Nordic market challenges and opportunities</li>
          <li>Hands-on workshops for practical skill development</li>
          <li>Startup showcase featuring innovative Nordic solutions</li>
          <li>Networking events with developers and businesses</li>
        </ul>
        
        <h3>Who Should Attend:</h3>
        <ul>
          <li>Software developers and engineers</li>
          <li>Technical leaders and architects</li>
          <li>Product managers and designers</li>
          <li>Startup founders and entrepreneurs</li>
          <li>Business leaders interested in digital transformation</li>
        </ul>
        
        <p>Don't miss this opportunity to connect with the Nordic developer community and stay at the forefront of software innovation in the region.</p>
      `,
      date: '2024-05-15',
      endDate: '2024-05-16',
      time: '09:00 - 18:00',
      location: 'Oslo, Norway',
      venue: 'Oslo Conference Center',
      address: 'Kongens gate 10, 0153 Oslo, Norway',
      organizer: 'Nordic Tech Association',
      attendees: 450,
      maxAttendees: 500,
      type: 'Conference',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
      tags: ['Development', 'Networking', 'Innovation'],
      speakers: [
        {
          name: 'Erik Johansson',
          title: 'CTO, Nordic Solutions',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          topic: 'Sustainable Software Architecture'
        },
        {
          name: 'Maria Andersson',
          title: 'Lead Developer, TechNordic',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          topic: 'AI Integration in Nordic Businesses'
        },
        {
          name: 'Lars Nielsen',
          title: 'Founder, Copenhagen Code',
          avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          topic: 'The Future of Nordic Fintech'
        }
      ],
      schedule: [
        {
          day: 'Day 1 - May 15',
          sessions: [
            { time: '09:00 - 10:00', title: 'Registration and Breakfast' },
            { time: '10:00 - 11:00', title: 'Opening Keynote: The State of Nordic Tech' },
            { time: '11:15 - 12:15', title: 'Technical Sessions (Multiple Tracks)' },
            { time: '12:15 - 13:30', title: 'Lunch and Networking' },
            { time: '13:30 - 15:30', title: 'Technical Sessions (Multiple Tracks)' },
            { time: '15:30 - 16:00', title: 'Coffee Break' },
            { time: '16:00 - 17:30', title: 'Panel: Challenges in Nordic Software Development' },
            { time: '18:00 - 20:00', title: 'Welcome Reception and Networking' }
          ]
        },
        {
          day: 'Day 2 - May 16',
          sessions: [
            { time: '09:00 - 09:30', title: 'Breakfast' },
            { time: '09:30 - 10:30', title: 'Keynote: Future Trends in Nordic Tech' },
            { time: '10:45 - 12:15', title: 'Technical Sessions (Multiple Tracks)' },
            { time: '12:15 - 13:30', title: 'Lunch and Networking' },
            { time: '13:30 - 15:30', title: 'Workshops (Pre-registration Required)' },
            { time: '15:30 - 16:00', title: 'Coffee Break' },
            { time: '16:00 - 17:00', title: 'Closing Keynote: Building the Future Together' },
            { time: '17:00 - 18:00', title: 'Closing Remarks and Networking' }
          ]
        }
      ],
      website: 'https://nordicdevcon.com'
    },
    {
      id: '2',
      title: 'Tech Meetup: Nordic Integration Solutions',
      description: 'Monthly meetup focusing on software integration challenges and solutions in the Nordic market.',
      longDescription: `
        <p>Join us for our monthly Tech Meetup focused on Nordic Integration Solutions. This event brings together developers, system architects, and business analysts to discuss the unique challenges and opportunities in integrating software systems across the Nordic market.</p>
        
        <p>This month's meetup will focus on payment system integrations, featuring presentations from industry experts and an open discussion session where attendees can share their experiences and ask questions.</p>
        
        <h3>Event Highlights:</h3>
        <ul>
          <li>Expert presentation on Klarna, Vipps, and MobilePay integrations</li>
          <li>Case study: Successful multi-country payment implementation</li>
          <li>Open discussion and Q&A session</li>
          <li>Networking opportunity with peers facing similar challenges</li>
          <li>Refreshments and light snacks provided</li>
        </ul>
        
        <h3>Who Should Attend:</h3>
        <ul>
          <li>Developers working on payment integrations</li>
          <li>System architects designing multi-country solutions</li>
          <li>Product managers overseeing Nordic market products</li>
          <li>Business analysts researching payment solutions</li>
          <li>Anyone interested in Nordic payment systems</li>
        </ul>
        
        <p>This is a free event, but registration is required as space is limited. We look forward to seeing you there!</p>
      `,
      date: '2024-04-20',
      time: '18:00 - 20:00',
      location: 'Stockholm, Sweden',
      venue: 'Tech Hub Stockholm',
      address: 'Birger Jarlsgatan 57, 113 56 Stockholm, Sweden',
      organizer: 'Stockholm Tech Community',
      attendees: 120,
      maxAttendees: 150,
      type: 'Meetup',
      image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=800&q=80',
      tags: ['Payments', 'Integration', 'Networking'],
      speakers: [
        {
          name: 'Anna Lindberg',
          title: 'Payment Integration Specialist, NordicPay',
          avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          topic: 'Unified Payment Approaches for Nordic Markets'
        }
      ],
      schedule: [
        {
          day: 'April 20',
          sessions: [
            { time: '18:00 - 18:15', title: 'Welcome and Introduction' },
            { time: '18:15 - 18:45', title: 'Presentation: Nordic Payment Integration Challenges' },
            { time: '18:45 - 19:15', title: 'Case Study: Multi-Country Implementation' },
            { time: '19:15 - 19:45', title: 'Open Discussion and Q&A' },
            { time: '19:45 - 20:00', title: 'Networking' }
          ]
        }
      ],
      website: 'https://stockholmtech.community/events'
    },
    {
      id: '3',
      title: 'Nordic FinTech Workshop',
      description: 'Hands-on workshop exploring the latest technologies in Nordic financial software development.',
      longDescription: `
        <p>The Nordic FinTech Workshop is an intensive, hands-on event designed for developers and architects working in the financial technology sector. This workshop will provide practical experience with the latest technologies and methodologies specific to the Nordic financial market.</p>
        
        <p>Led by experienced instructors from leading financial institutions and technology providers, participants will work through real-world scenarios and implementation challenges commonly faced when developing financial software for Nordic markets.</p>
        
        <h3>Workshop Topics:</h3>
        <ul>
          <li>Open Banking API implementation for Nordic banks</li>
          <li>Secure authentication using BankID across different countries</li>
          <li>Regulatory compliance for financial applications (PSD2, GDPR, AML)</li>
          <li>Building scalable payment processing systems</li>
          <li>Testing and security validation for financial applications</li>
        </ul>
        
        <h3>What to Bring:</h3>
        <ul>
          <li>Laptop with development environment set up</li>
          <li>Basic knowledge of RESTful APIs and OAuth 2.0</li>
          <li>Familiarity with at least one backend programming language</li>
          <li>Interest in financial technology solutions</li>
        </ul>
        
        <p>Participants will receive a certificate of completion and access to workshop materials for future reference. Space is limited to ensure a quality learning experience, so early registration is recommended.</p>
      `,
      date: '2024-04-25',
      time: '13:00 - 17:00',
      location: 'Copenhagen, Denmark',
      venue: 'FinTech Innovation Center',
      address: 'Kalvebod Brygge 45, 1560 Copenhagen, Denmark',
      organizer: 'Nordic FinTech Alliance',
      attendees: 80,
      maxAttendees: 100,
      type: 'Workshop',
      image: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?auto=format&fit=crop&w=800&q=80',
      tags: ['FinTech', 'Hands-on', 'Development'],
      speakers: [
        {
          name: 'Mikkel Hansen',
          title: 'Head of API Development, Nordic Bank',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          topic: 'Open Banking Implementation'
        },
        {
          name: 'Sofia Bergman',
          title: 'Security Architect, SecureFinance',
          avatar: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          topic: 'Authentication and Security'
        }
      ],
      schedule: [
        {
          day: 'April 25',
          sessions: [
            { time: '13:00 - 13:30', title: 'Introduction and Setup' },
            { time: '13:30 - 14:30', title: 'Open Banking API Workshop' },
            { time: '14:30 - 14:45', title: 'Coffee Break' },
            { time: '14:45 - 15:45', title: 'Authentication and Security Workshop' },
            { time: '15:45 - 16:00', title: 'Break' },
            { time: '16:00 - 16:45', title: 'Compliance and Testing Workshop' },
            { time: '16:45 - 17:00', title: 'Q&A and Wrap-up' }
          ]
        }
      ],
      website: 'https://nordicfintech.org/workshop'
    }
  ];
  
  const event = events.find(e => e.id === id);
  
  if (!event) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Event not found</h2>
        <Link
          to="/events"
          className="text-blue-600 hover:text-blue-700"
        >
          Back to Events
        </Link>
      </div>
    );
  }

  const isMultiDay = event.endDate !== undefined;
  const formattedDate = isMultiDay 
    ? `${new Date(event.date).toLocaleDateString()} - ${new Date(event.endDate).toLocaleDateString()}`
    : new Date(event.date).toLocaleDateString();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        to="/events"
        className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Events
      </Link>
      
      {/* Event Header */}
      <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
        <img
          src={event.image}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex items-center space-x-2 mb-4">
              <span className="px-3 py-1 bg-blue-500/20 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                {event.type}
              </span>
              {event.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-gray-500/20 backdrop-blur-sm rounded-full text-sm font-medium text-white flex items-center">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{event.title}</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{event.venue}, {event.location}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                <span>{event.attendees}/{event.maxAttendees} attendees</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Event Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Description */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
            <div 
              className="prose prose-lg max-w-none prose-blue"
              dangerouslySetInnerHTML={{ __html: event.longDescription }}
            />
          </div>
          
          {/* Speakers */}
          {event.speakers && event.speakers.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Speakers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {event.speakers.map((speaker) => (
                  <div key={speaker.name} className="flex items-start">
                    <img
                      src={speaker.avatar}
                      alt={speaker.name}
                      className="h-16 w-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{speaker.name}</h3>
                      <p className="text-gray-600 mb-2">{speaker.title}</p>
                      <p className="text-sm text-gray-500">Topic: {speaker.topic}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Schedule */}
          {event.schedule && event.schedule.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule</h2>
              <div className="space-y-8">
                {event.schedule.map((day) => (
                  <div key={day.day}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{day.day}</h3>
                    <div className="space-y-4">
                      {day.sessions.map((session, index) => (
                        <div key={index} className="flex">
                          <div className="w-32 flex-shrink-0 text-gray-500">{session.time}</div>
                          <div className="flex-1 bg-gray-50 p-3 rounded-lg">
                            <p className="font-medium text-gray-900">{session.title}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Sidebar */}
        <div>
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
            {/* Registration */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Registration</h3>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Available spots</span>
                  <span>{event.maxAttendees - event.attendees} remaining</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                  ></div>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white rounded-lg px-4 py-3 font-medium hover:bg-blue-700 transition-colors mb-3">
                Register Now
              </button>
              {event.website && (
                <a
                  href={event.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Visit Event Website
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              )}
            </div>
            
            {/* Location */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <p className="font-medium text-gray-900 mb-1">{event.venue}</p>
                <p className="text-gray-600 mb-2">{event.address}</p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(event.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center"
                >
                  View on Map
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>
              <div className="bg-gray-200 rounded-lg h-48">
                {/* Map would go here in a real implementation */}
                <div className="h-full flex items-center justify-center text-gray-500">
                  Map Preview
                </div>
              </div>
            </div>
            
            {/* Organizer */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Organizer</h3>
              <p className="text-gray-600 mb-2">{event.organizer}</p>
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Contact Organizer
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;