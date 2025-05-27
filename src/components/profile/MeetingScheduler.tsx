import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Video, Users } from 'lucide-react';

interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  attendees: string[];
  type: 'video' | 'in-person';
}

const MeetingScheduler = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: '1',
      title: 'Project Discussion',
      date: '2024-03-15',
      time: '10:00',
      attendees: ['john@example.com', 'sarah@example.com'],
      type: 'video',
    },
    // Add more mock meetings
  ]);

  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    date: '',
    time: '',
    attendees: '',
    type: 'video' as const,
  });

  const handleScheduleMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle meeting scheduling
    setShowScheduleForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Meetings</h2>
        <button
          onClick={() => setShowScheduleForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Schedule Meeting
        </button>
      </div>

      {/* Meeting List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {meetings.map((meeting) => (
            <li key={meeting.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {meeting.type === 'video' ? (
                      <Video className="h-5 w-5 text-blue-500 mr-3" />
                    ) : (
                      <Users className="h-5 w-5 text-blue-500 mr-3" />
                    )}
                    <p className="text-sm font-medium text-blue-600 truncate">
                      {meeting.title}
                    </p>
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Scheduled
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      {meeting.date}
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      <Clock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      {meeting.time}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <Users className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                    {meeting.attendees.length} attendees
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Schedule Meeting Form */}
      {showScheduleForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
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
                      value={newMeeting.title}
                      onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                        value={newMeeting.date}
                        onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                        value={newMeeting.time}
                        onChange={(e) => setNewMeeting({ ...newMeeting, time: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="attendees" className="block text-sm font-medium text-gray-700">
                      Attendees (comma-separated emails)
                    </label>
                    <input
                      type="text"
                      id="attendees"
                      value={newMeeting.attendees}
                      onChange={(e) => setNewMeeting({ ...newMeeting, attendees: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Meeting Type</label>
                    <div className="mt-2 space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          value="video"
                          checked={newMeeting.type === 'video'}
                          onChange={(e) => setNewMeeting({ ...newMeeting, type: 'video' })}
                          className="form-radio h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2">Video Call</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          value="in-person"
                          checked={newMeeting.type === 'in-person'}
                          onChange={(e) => setNewMeeting({ ...newMeeting, type: 'in-person' })}
                          className="form-radio h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2">In Person</span>
                      </label>
                    </div>
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
                    onClick={() => setShowScheduleForm(false)}
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

export default MeetingScheduler;