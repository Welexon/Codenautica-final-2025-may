import React from 'react';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Events = () => {
  const events = [
    {
      id: '1',
      title: 'Nordic Developer Conference 2024',
      description: 'Join leading developers and businesses from across the Nordic region for two days of learning, networking, and collaboration.',
      date: '2024-05-15',
      time: '09:00 - 18:00',
      location: 'Oslo, Norway',
      venue: 'Oslo Conference Center',
      attendees: 450,
      type: 'Conference',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '2',
      title: 'Tech Meetup: Nordic Integration Solutions',
      description: 'Monthly meetup focusing on software integration challenges and solutions in the Nordic market.',
      date: '2024-04-20',
      time: '18:00 - 20:00',
      location: 'Stockholm, Sweden',
      venue: 'Tech Hub Stockholm',
      attendees: 120,
      type: 'Meetup',
      image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '3',
      title: 'Nordic FinTech Workshop',
      description: 'Hands-on workshop exploring the latest technologies in Nordic financial software development.',
      date: '2024-04-25',
      time: '13:00 - 17:00',
      location: 'Copenhagen, Denmark',
      venue: 'FinTech Innovation Center',
      attendees: 80,
      type: 'Workshop',
      image: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Connect with the Nordic software community through conferences, workshops, and meetups
        </p>
      </div>

      {/* Featured Event */}
      <div className="mb-12">
        <div className="relative h-[400px] rounded-xl overflow-hidden">
          <img
            src={events[0].image}
            alt={events[0].title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <span className="inline-block px-3 py-1 bg-blue-500/20 backdrop-blur-sm rounded-full text-sm font-medium text-white mb-4">
                {events[0].type}
              </span>
              <h2 className="text-3xl font-bold text-white mb-4">{events[0].title}</h2>
              <p className="text-lg text-gray-200 mb-6">{events[0].description}</p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex items-center text-white">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{new Date(events[0].date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-white">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{events[0].location}</span>
                </div>
                <div className="flex items-center text-white">
                  <Users className="h-5 w-5 mr-2" />
                  <span>{events[0].attendees} attendees</span>
                </div>
              </div>
              <Link
                to={`/events/${events[0].id}`}
                className="inline-flex items-center px-6 py-3 bg-white text-blue-700 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                Register Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Event Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.slice(1).map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                {event.type}
              </span>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-500">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{event.venue}, {event.location}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Users className="h-5 w-5 mr-2" />
                  <span>{event.attendees} attendees</span>
                </div>
              </div>
              <Link
                to={`/events/${event.id}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;