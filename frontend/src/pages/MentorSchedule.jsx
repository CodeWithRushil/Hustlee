import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  XMarkIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const MentorSchedule = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState('60'); // Default 60 minutes
  const [notes, setNotes] = useState('');
  const [scheduledSessions, setScheduledSessions] = useState([]);

  // Mock student data - replace with API call
  const student = {
    id: studentId,
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe',
  };

  // Available time slots (9 AM to 5 PM)
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  // Duration options
  const durationOptions = [
    { value: '30', label: '30 minutes' },
    { value: '60', label: '1 hour' },
    { value: '90', label: '1.5 hours' },
    { value: '120', label: '2 hours' },
  ];

  const handleScheduleSession = () => {
    if (!selectedDate || !selectedTime) {
      toast.error('Please select both date and time');
      return;
    }

    const newSession = {
      id: Date.now(),
      date: selectedDate,
      time: selectedTime,
      duration: parseInt(duration),
      notes,
      status: 'scheduled'
    };

    setScheduledSessions([...scheduledSessions, newSession]);
    toast.success('Session scheduled successfully!');
    
    // Reset form
    setSelectedDate('');
    setSelectedTime('');
    setDuration('60');
    setNotes('');
  };

  const handleCancelSession = (sessionId) => {
    setScheduledSessions(scheduledSessions.filter(session => session.id !== sessionId));
    toast.success('Session cancelled');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <img
            src={student.avatar}
            alt={student.name}
            className="h-12 w-12 rounded-full"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Schedule Session with {student.name}</h2>
            <p className="text-sm text-gray-500">{student.email}</p>
          </div>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="text-gray-500 hover:text-gray-700"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Schedule New Session */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <h3 className="text-lg font-medium text-gray-900 mb-4">Schedule New Session</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              >
                <option value="">Select a time</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              >
                {durationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                placeholder="Add any notes for the session..."
              />
            </div>

            <button
              onClick={handleScheduleSession}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Schedule Session
            </button>
          </div>
        </motion.div>

        {/* Scheduled Sessions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <h3 className="text-lg font-medium text-gray-900 mb-4">Scheduled Sessions</h3>
          
          {scheduledSessions.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No sessions scheduled yet</p>
          ) : (
            <div className="space-y-4">
              {scheduledSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <CalendarIcon className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(session.date).toLocaleDateString()} at {session.time}
                      </p>
                      <p className="text-xs text-gray-500">
                        Duration: {session.duration} minutes
                      </p>
                      {session.notes && (
                        <p className="text-xs text-gray-500 mt-1">{session.notes}</p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleCancelSession(session.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MentorSchedule; 