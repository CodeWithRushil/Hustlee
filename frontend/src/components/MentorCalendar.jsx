import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {
  PlusIcon,
  VideoCameraIcon,
  MicrophoneIcon,
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  ClockIcon,
  UserIcon,
  TagIcon,
  LinkIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  CalendarDaysIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ClipboardDocumentIcon,
  UserGroupIcon,
  BellIcon,
  FlagIcon,
  CalendarIcon,
  DocumentTextIcon,
  ArrowPathIcon,
  PencilSquareIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const MentorCalendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [students, setStudents] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSessionType, setSelectedSessionType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newSession, setNewSession] = useState({
    title: '',
    start: '',
    end: '',
    studentId: '',
    description: '',
    type: 'video',
    link: '',
    status: 'scheduled',
    category: 'meeting', // meeting, note, admin-assigned
    priority: 'medium', // high, medium, low
    notes: '',
    reminder: false,
    reminderTime: '',
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showBreakModal, setShowBreakModal] = useState(false);
  const [showRecurringModal, setShowRecurringModal] = useState(false);
  const [newBreak, setNewBreak] = useState({
    title: 'Break',
    start: '',
    end: '',
    type: 'break'
  });
  const [recurringSettings, setRecurringSettings] = useState({
    frequency: 'weekly',
    interval: 1,
    daysOfWeek: [],
    endDate: '',
    endAfter: 0
  });
  const [sessions, setSessions] = useState([]);
  const [availability, setAvailability] = useState({
    monday: { start: '09:00', end: '17:00' },
    tuesday: { start: '09:00', end: '17:00' },
    wednesday: { start: '09:00', end: '17:00' },
    thursday: { start: '09:00', end: '17:00' },
    friday: { start: '09:00', end: '17:00' },
    saturday: { start: '10:00', end: '14:00' },
    sunday: { start: '', end: '' }
  });
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [conflicts, setConflicts] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchEvents();
    fetchStudents();
    fetchSessions();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/mentor/calendar/events', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
      // Mock data for demonstration
      setEvents([
        {
          id: 1,
          title: 'Session with John Doe',
          start: '2024-02-20T10:00:00',
          end: '2024-02-20T11:00:00',
          type: 'session',
          studentId: 1,
          description: 'React Basics'
        },
        {
          id: 2,
          title: 'Break',
          start: '2024-02-20T12:00:00',
          end: '2024-02-20T13:00:00',
          type: 'break'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/mentor/students', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
      // Mock data for demonstration
      setStudents([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' }
      ]);
    }
  };

  const fetchSessions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/mentor/sessions', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setSessions(response.data);
    } catch (error) {
      console.error('Error fetching sessions:', error);
      // Mock data for demonstration
      setSessions([
        { id: 1, title: 'React Basics', duration: 60 },
        { id: 2, title: 'Advanced JavaScript', duration: 90 }
      ]);
    }
  };

  const getEventColor = (status, type) => {
    if (status === 'completed') return '#10B981';
    if (status === 'cancelled') return '#EF4444';
    switch (type) {
      case 'video': return '#3B82F6';
      case 'voice': return '#8B5CF6';
      case 'text': return '#EC4899';
      default: return '#3B82F6';
    }
  };

  const getEventBorderColor = (status, type) => {
    if (status === 'completed') return '#059669';
    if (status === 'cancelled') return '#DC2626';
    switch (type) {
      case 'video': return '#2563EB';
      case 'voice': return '#7C3AED';
      case 'text': return '#DB2777';
      default: return '#2563EB';
    }
  };

  const handleDateSelect = (selectInfo) => {
    setSelectedDate(selectInfo);
    setNewSession({
      ...newSession,
      start: selectInfo.startStr,
      end: selectInfo.endStr
    });
    setShowSessionModal(true);
  };

  const handleEventClick = (clickInfo) => {
    const event = clickInfo.event;
    setSelectedEvent(event);
    setNewSession({
      id: event.id,
      title: event.title,
      start: event.startStr,
      end: event.endStr,
      studentId: event.extendedProps.studentId,
      description: event.extendedProps.description,
      type: event.extendedProps.type,
      link: event.extendedProps.link,
      status: event.extendedProps.status,
      category: event.extendedProps.category,
      priority: event.extendedProps.priority,
      notes: event.extendedProps.notes,
      reminder: event.extendedProps.reminder,
      reminderTime: event.extendedProps.reminderTime,
    });
    setShowSessionModal(true);
  };

  const handleCreateSession = async () => {
    try {
      if (!newSession.title || !newSession.studentId) {
        toast.error('Please fill in all required fields');
        return;
      }

      // Simulate API call
      const newEvent = {
        id: Date.now().toString(),
        title: newSession.title,
        start: newSession.start,
        end: newSession.end,
        extendedProps: {
          studentId: newSession.studentId,
          type: newSession.type,
          status: newSession.status,
          description: newSession.description,
          link: newSession.link,
          category: newSession.category,
          priority: newSession.priority,
          notes: newSession.notes,
          reminder: newSession.reminder,
          reminderTime: newSession.reminderTime,
        },
        backgroundColor: getEventColor(newSession.status, newSession.type),
        borderColor: getEventBorderColor(newSession.status, newSession.type)
      };

      setEvents(prevEvents => [...prevEvents, newEvent]);
      toast.success('Session created successfully');
      setShowSessionModal(false);
      setNewSession({
        title: '',
        start: '',
        end: '',
        studentId: '',
        description: '',
        type: 'video',
        link: '',
        status: 'scheduled',
        category: 'meeting',
        priority: 'medium',
        notes: '',
        reminder: false,
        reminderTime: '',
      });
    } catch (error) {
      console.error('Error creating session:', error);
      toast.error('Failed to create session');
    }
  };

  const handleUpdateSession = async () => {
    try {
      if (!newSession.title || !newSession.studentId) {
        toast.error('Please fill in all required fields');
        return;
      }

      // Create the updated event object
      const updatedEvent = {
        id: newSession.id,
        title: newSession.title,
        start: newSession.start,
        end: newSession.end,
        extendedProps: {
          studentId: newSession.studentId,
          type: newSession.type,
          status: newSession.status,
          description: newSession.description,
          link: newSession.link,
          category: newSession.category,
          priority: newSession.priority,
          notes: newSession.notes,
          reminder: newSession.reminder,
          reminderTime: newSession.reminderTime,
        },
        backgroundColor: getEventColor(newSession.status, newSession.type),
        borderColor: getEventBorderColor(newSession.status, newSession.type)
      };

      // Update the events array
      setEvents(prevEvents => {
        const updatedEvents = prevEvents.map(event => 
          event.id === newSession.id ? updatedEvent : event
        );
        console.log('Updated Events:', updatedEvents); // Debug log
        return updatedEvents;
      });

      // Force calendar to re-render
      const calendarApi = document.querySelector('.fc').__fullCalendar;
      if (calendarApi) {
        calendarApi.refetchEvents();
      }

      toast.success('Session updated successfully');
      setShowSessionModal(false);
      setNewSession({
        title: '',
        start: '',
        end: '',
        studentId: '',
        description: '',
        type: 'video',
        link: '',
        status: 'scheduled',
        category: 'meeting',
        priority: 'medium',
        notes: '',
        reminder: false,
        reminderTime: '',
      });
    } catch (error) {
      console.error('Error updating session:', error);
      toast.error('Failed to update session');
    }
  };

  const handleDeleteSession = async () => {
    try {
      // Simulate API call
      setEvents(prevEvents => prevEvents.filter(event => event.id !== newSession.id));
      toast.success('Session deleted successfully');
      setShowSessionModal(false);
      setNewSession({
        title: '',
        start: '',
        end: '',
        studentId: '',
        description: '',
        type: 'video',
        link: '',
        status: 'scheduled',
        category: 'meeting',
        priority: 'medium',
        notes: '',
        reminder: false,
        reminderTime: '',
      });
    } catch (error) {
      console.error('Error deleting session:', error);
      toast.error('Failed to delete session');
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesType = selectedSessionType === 'all' || event.extendedProps.type === selectedSessionType;
    const matchesStatus = selectedStatus === 'all' || event.extendedProps.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || event.extendedProps.category === selectedCategory;
    return matchesType && matchesStatus && matchesCategory;
  });

  // Add a ref for the calendar
  const calendarRef = React.useRef(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
          className="rounded-full h-12 w-12 border-b-2 border-purple-500"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Session Calendar</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage and track your mentoring sessions and notes
          </p>
        </div>
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium ${
              showFilters
                ? 'bg-purple-100 text-purple-700 border-purple-300'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {showFilters ? (
              <ChevronUpIcon className="h-5 w-5 mr-2" />
            ) : (
              <ChevronDownIcon className="h-5 w-5 mr-2" />
            )}
            Filters
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setSelectedDate(null);
              setNewSession({
                title: '',
                start: '',
                end: '',
                studentId: '',
                description: '',
                type: 'video',
                link: '',
                status: 'scheduled',
                category: 'meeting',
                priority: 'medium',
                notes: '',
                reminder: false,
                reminderTime: '',
              });
              setShowSessionModal(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            New Event
          </motion.button>
        </div>
      </div>

      {/* Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-xl shadow-lg p-4 space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                >
                  <option value="all">All Categories</option>
                  <option value="meeting">Meetings</option>
                  <option value="note">Personal Notes</option>
                  <option value="admin-assigned">Admin Assigned</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Session Type
                </label>
                <select
                  value={selectedSessionType}
                  onChange={(e) => setSelectedSessionType(e.target.value)}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                >
                  <option value="all">All Types</option>
                  <option value="video">Video Call</option>
                  <option value="voice">Voice Call</option>
                  <option value="text">Text Chat</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                >
                  <option value="all">All Status</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Calendar */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          events={filteredEvents}
          select={handleDateSelect}
          eventClick={handleEventClick}
          height="600px"
          slotMinTime="06:00:00"
          slotMaxTime="22:00:00"
          allDaySlot={true}
          slotDuration="00:30:00"
          expandRows={true}
          stickyHeaderDates={true}
          nowIndicator={true}
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            meridiem: false,
            hour12: false
          }}
          eventContent={(eventInfo) => {
            return (
              <div className="p-1">
                <div className="font-medium">{eventInfo.event.title}</div>
                <div className="text-xs">
                  {eventInfo.timeText}
                </div>
              </div>
            );
          }}
        />
      </div>

      {/* Session Modal */}
      <AnimatePresence>
        {showSessionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowSessionModal(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6 sticky top-0 bg-white pb-4 border-b">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {selectedDate ? 'Create New Event' : 'Edit Event'}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {selectedDate ? 'Create a new event or note' : 'Update event details'}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowSessionModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon className="h-6 w-6" />
                </motion.button>
              </div>

              <div className="space-y-6">
                {/* Event Category Selection */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Event Category
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setNewSession({ ...newSession, category: 'meeting' })}
                      className={`p-4 rounded-lg border flex flex-col items-center space-y-2 transition-all duration-200 ${
                        newSession.category === 'meeting'
                          ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-sm'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <UserGroupIcon className="h-7 w-7" />
                      <span className="text-sm font-medium">Meeting</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setNewSession({ ...newSession, category: 'note' })}
                      className={`p-4 rounded-lg border flex flex-col items-center space-y-2 transition-all duration-200 ${
                        newSession.category === 'note'
                          ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-sm'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <ClipboardDocumentIcon className="h-7 w-7" />
                      <span className="text-sm font-medium">Note</span>
                    </motion.button>
                  </div>
                </div>

                {/* Session Type Selection (only for meetings) */}
                {newSession.category === 'meeting' && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Session Type
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setNewSession({ ...newSession, type: 'video' })}
                        className={`p-4 rounded-lg border flex flex-col items-center space-y-2 transition-all duration-200 ${
                          newSession.type === 'video'
                            ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-sm'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <VideoCameraIcon className="h-7 w-7" />
                        <span className="text-sm font-medium">Video Call</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setNewSession({ ...newSession, type: 'voice' })}
                        className={`p-4 rounded-lg border flex flex-col items-center space-y-2 transition-all duration-200 ${
                          newSession.type === 'voice'
                            ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-sm'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <MicrophoneIcon className="h-7 w-7" />
                        <span className="text-sm font-medium">Voice Call</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setNewSession({ ...newSession, type: 'text' })}
                        className={`p-4 rounded-lg border flex flex-col items-center space-y-2 transition-all duration-200 ${
                          newSession.type === 'text'
                            ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-sm'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <ChatBubbleLeftRightIcon className="h-7 w-7" />
                        <span className="text-sm font-medium">Text Chat</span>
                      </motion.button>
                    </div>
                  </div>
                )}

                {/* Event Details */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newSession.title}
                      onChange={(e) => setNewSession({ ...newSession, title: e.target.value })}
                      placeholder="Enter event title"
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  {newSession.category === 'meeting' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Student <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={newSession.studentId}
                        onChange={(e) => setNewSession({ ...newSession, studentId: e.target.value })}
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      >
                        <option value="">Select a student</option>
                        {students.map((student) => (
                          <option key={student.id} value={student.id}>
                            {student.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Time <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="datetime-local"
                        value={newSession.start}
                        onChange={(e) => setNewSession({ ...newSession, start: e.target.value })}
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      />
                      <CalendarDaysIcon className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Time <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="datetime-local"
                        value={newSession.end}
                        onChange={(e) => setNewSession({ ...newSession, end: e.target.value })}
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      />
                      <ClockIcon className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </div>

                {/* Session Link (only for meetings) */}
                {newSession.category === 'meeting' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {newSession.type === 'text' ? 'Chat Link' : newSession.type === 'video' ? 'Meeting Link' : 'Call Link'}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={newSession.link}
                        onChange={(e) => setNewSession({ ...newSession, link: e.target.value })}
                        placeholder={`Enter ${newSession.type === 'text' ? 'chat' : newSession.type === 'video' ? 'meeting' : 'call'} link`}
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 pl-10"
                      />
                      <LinkIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                )}

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newSession.description}
                    onChange={(e) => setNewSession({ ...newSession, description: e.target.value })}
                    rows="3"
                    placeholder="Enter event description"
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 resize-none"
                  />
                </div>

                {/* Personal Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Personal Notes
                  </label>
                  <textarea
                    value={newSession.notes}
                    onChange={(e) => setNewSession({ ...newSession, notes: e.target.value })}
                    rows="2"
                    placeholder="Add personal notes or reminders"
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 resize-none"
                  />
                </div>

                {/* Reminder Settings */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="reminder"
                        checked={newSession.reminder}
                        onChange={(e) => setNewSession({ ...newSession, reminder: e.target.checked })}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <label htmlFor="reminder" className="ml-2 block text-sm font-medium text-gray-700">
                        Set Reminder
                      </label>
                    </div>
                    {newSession.reminder && (
                      <div className="flex-1">
                        <input
                          type="datetime-local"
                          value={newSession.reminderTime}
                          onChange={(e) => setNewSession({ ...newSession, reminderTime: e.target.value })}
                          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Priority Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    value={newSession.priority}
                    onChange={(e) => setNewSession({ ...newSession, priority: e.target.value })}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                {/* Status Selection (only for meetings) */}
                {newSession.category === 'meeting' && !selectedDate && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={newSession.status}
                      onChange={(e) => setNewSession({ ...newSession, status: e.target.value })}
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    >
                      <option value="scheduled">Scheduled</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4 border-t">
                  {!selectedDate && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDeleteSession}
                      className="px-4 py-2 text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      Delete Event
                    </motion.button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowSessionModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={selectedDate ? handleCreateSession : handleUpdateSession}
                    disabled={!newSession.title}
                    className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                      newSession.title
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {selectedDate ? (
                      <>
                        <PlusIcon className="h-5 w-5" />
                        <span>Create Event</span>
                      </>
                    ) : (
                      <>
                        <CheckCircleIcon className="h-5 w-5" />
                        <span>Update Event</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MentorCalendar; 