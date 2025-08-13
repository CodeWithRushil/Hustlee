import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ChevronDownIcon,
  ChatBubbleLeftRightIcon,
  StarIcon,
  ClockIcon,
  PencilIcon,
  FlagIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  XCircleIcon,
  PlusIcon,
  UserCircleIcon,
  AcademicCapIcon,
  BookOpenIcon,
  CodeBracketIcon,
  TrophyIcon,
  ChartBarIcon,
  XMarkIcon,
  PencilSquareIcon,
  TrashIcon,
  PlusCircleIcon,
  CheckBadgeIcon,
  ArrowTrendingUpIcon,
  ExclamationCircleIcon,
  CalendarDaysIcon,
  TagIcon,
  ListBulletIcon,
  UserGroupIcon,
  PaperAirplaneIcon,
  DocumentIcon,
  PhotoIcon,
  MicrophoneIcon,
  VideoCameraIcon,
  CheckIcon,
  AdjustmentsHorizontalIcon,
  MapPinIcon,
  LinkIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const MentorStudents = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [showGoalsModal, setShowGoalsModal] = useState(false);
  const [newNote, setNewNote] = useState({
    content: '',
    category: 'progress',
    priority: 'medium'
  });
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    startDate: '',
    deadline: '',
    category: '',
    priority: 'medium'
  });
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [noteError, setNoteError] = useState('');
  const [goalError, setGoalError] = useState('');
  const [showGroupChatModal, setShowGroupChatModal] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [groupChatMessage, setGroupChatMessage] = useState('');
  const [groupChatTitle, setGroupChatTitle] = useState('');
  const [groupChatType, setGroupChatType] = useState('text'); // text, voice, video
  const [groupChatLoading, setGroupChatLoading] = useState(false);
  const [studentSearchQuery, setStudentSearchQuery] = useState('');
  const [studentGroupBy, setStudentGroupBy] = useState('none'); // none, status, progress
  const [showStudentFilters, setShowStudentFilters] = useState(false);
  const [showGroupScheduleModal, setShowGroupScheduleModal] = useState(false);
  const [sessionType, setSessionType] = useState('video'); // video, voice, text
  const [sessionDate, setSessionDate] = useState('');
  const [sessionTime, setSessionTime] = useState('');
  const [sessionDuration, setSessionDuration] = useState('60'); // in minutes
  const [sessionTitle, setSessionTitle] = useState('');
  const [sessionDescription, setSessionDescription] = useState('');
  const [sessionLocation, setSessionLocation] = useState(''); // for in-person meetings
  const [sessionLink, setSessionLink] = useState(''); // for online meetings
  const [sessionAgenda, setSessionAgenda] = useState([]);
  const [newAgendaItem, setNewAgendaItem] = useState('');
  const [sessionLoading, setSessionLoading] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('https://hustleeworkspace.onrender.com/api/mentor/students', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
      // Mock data for demonstration
      setStudents([
        {
          id: 1,
          name: 'Aditya Kaushal',
          email: 'adityakaushal@example.com',
          avatar: 'https://ui-avatars.com/api/?name=Aditya+Kaushal',
          status: 'active',
          lastSession: '2024-03-15',
          nextSession: '2024-03-20',
          progress: 75,
          rating: 4.8,
          totalSessions: 12,
          skills: ['Web Development', 'React', 'Node.js'],
          goals: [
            {
              id: 1,
              title: 'Complete React Project',
              deadline: '2024-03-25',
              status: 'in_progress',
              description: 'Build a full-stack React application'
            },
            {
              id: 2,
              title: 'Learn Redux',
              deadline: '2024-04-01',
              status: 'completed',
              description: 'Master Redux state management'
            }
          ],
          notes: [
            {
              id: 1,
              content: 'Great progress on React fundamentals',
              createdAt: '2024-03-15'
            },
            {
              id: 2,
              content: 'Needs more practice with hooks',
              createdAt: '2024-03-14'
            }
          ]
        },
        {
          id: 2,
          name: 'Ritviz Vaid',
          email: 'ritvizvaid@example.com',
          avatar: 'https://ui-avatars.com/api/?name=Ritviz+Vaid',
          status: 'active',
          lastSession: '2024-03-14',
          nextSession: '2024-03-21',
          progress: 60,
          rating: 4.9,
          totalSessions: 8,
          skills: ['Data Science', 'Python', 'Machine Learning'],
          goals: [
            {
              id: 1,
              title: 'Complete ML Project',
              deadline: '2024-03-28',
              status: 'in_progress',
              description: 'Build a classification model'
            }
          ],
          notes: [
            {
              id: 1,
              content: 'Excellent understanding of ML concepts',
              createdAt: '2024-03-14'
            }
          ]
        },
        {
          id: 3,
          name: 'Dev Prakash',
          email: 'devprakash@example.com',
          avatar: 'https://ui-avatars.com/api/?name=Dev+Prakash',
          status: 'active',
          lastSession: '2024-03-13',
          nextSession: '2024-03-19',
          progress: 85,
          rating: 4.7,
          totalSessions: 15,
          skills: ['Mobile Development', 'Flutter', 'Dart'],
          goals: [
            {
              id: 1,
              title: 'Publish App',
              deadline: '2024-03-30',
              status: 'in_progress',
              description: 'Complete and publish Flutter app'
            }
          ],
          notes: [
            {
              id: 1,
              content: 'Making good progress with Flutter',
              createdAt: '2024-03-13'
            }
          ]
        },
        {
          id: 4,
          name: 'Saniya Gupta',
          email: 'saniyagupta@example.com',
          avatar: 'https://ui-avatars.com/api/?name=Saniya+Gupta',
          status: 'inactive',
          lastSession: '2024-03-10',
          nextSession: '2024-03-24',
          progress: 96,
          rating: 4.5,
          totalSessions: 6,
          skills: ['UI/UX Design', 'Figma', 'Adobe XD'],
          goals: [
            {
              id: 1,
              title: 'Design Portfolio',
              deadline: '2024-04-05',
              status: 'in_progress',
              description: 'Create a design portfolio'
            }
          ],
          notes: [
            {
              id: 1,
              content: 'Strong design skills, needs more practice with prototyping',
              createdAt: '2024-03-10'
            }
          ]
        },
        {
          id: 6,
          name: 'Nitish Kumar Yadav',
          email: 'Nitish Kumar Yadav@example.com',
          avatar: 'https://ui-avatars.com/api/?name=Nitish+Kumar+Yadav',
          status: 'active',
          lastSession: '2024-03-16',
          nextSession: '2024-03-23',
          progress: 95,
          rating: 4.9,
          totalSessions: 20,
          skills: ['DevOps', 'AWS', 'Docker'],
          goals: [
            {
              id: 1,
              title: 'AWS Certification',
              deadline: '2024-04-15',
              status: 'in_progress',
              description: 'Prepare for AWS Solutions Architect exam'
            }
          ],
          notes: [
            {
              id: 1,
              content: 'Excellent understanding of cloud concepts',
              createdAt: '2024-03-16'
            }
          ]
        },
        {
          id: 5,
          name: 'Nitish Kumar Yadav',
          email: 'nitishsoftwaredevloper@example.com',
          avatar: 'https://ui-avatars.com/api/?name=Emily+Davis',
          status: 'completed',
          lastSession: '2024-03-12',
          nextSession: null,
          progress: 100,
          rating: 5.0,
          totalSessions: 25,
          skills: ['Full Stack', 'MERN', 'TypeScript'],
          goals: [
            {
              id: 1,
              title: 'Final Project',
              deadline: '2024-03-12',
              status: 'completed',
              description: 'Complete full-stack project'
            }
          ],
          notes: [
            {
              id: 1,
              content: 'Course completed successfully!',
              createdAt: '2024-03-12'
            }
          ]
        },
        {
          id: 7,
          name: ' Saniya Gupta',
          email: 'saniyagupta@example.com',
          avatar: 'https://ui-avatars.com/api/?name=Saniya+Gupta',
          status: 'active',
          lastSession: '2024-03-15',
          nextSession: '2024-03-22',
          progress: 88,
          rating: 4.6,
          totalSessions: 9,
          skills: ['Backend Development', 'Java', 'Spring Boot'],
          goals: [
            {
              id: 1,
              title: 'Spring Boot Project',
              deadline: '2024-04-01',
              status: 'in_progress',
              description: 'Build REST API with Spring Boot'
            }
          ],
          notes: [
            {
              id: 1,
              content: 'Good progress with Java fundamentals',
              createdAt: '2024-03-15'
            }
          ]
        },
        {
          id: 8,
          name: 'Raghav Dhir',
          email: 'raghavdhir@example.com',
          avatar: 'https://ui-avatars.com/api/?name=Raghav+Dhir',
          status: 'active',
          lastSession: '2024-03-14',
          nextSession: '2024-03-21',
          progress: 70,
          rating: 4.7,
          totalSessions: 11,
          skills: ['Frontend Development', 'Vue.js', 'CSS'],
          goals: [
            {
              id: 1,
              title: 'Vue.js Project',
              deadline: '2024-03-28',
              status: 'in_progress',
              description: 'Build a Vue.js application'
            }
          ],
          notes: [
            {
              id: 1,
              content: 'Strong CSS skills, needs more Vue.js practice',
              createdAt: '2024-03-14'
            }
          ]
        },
        {
          id: 9,
          name: 'Rahul',
          email: 'rahul@example.com',
          avatar: 'https://ui-avatars.com/api/?name=Robert+Taylor',
          status: 'inactive',
          lastSession: '2024-03-11',
          nextSession: '2024-03-25',
          progress: 40,
          rating: 4.4,
          totalSessions: 5,
          skills: ['Game Development', 'Unity', 'C#'],
          goals: [
            {
              id: 1,
              title: 'Unity Game',
              deadline: '2024-04-10',
              status: 'in_progress',
              description: 'Create a simple Unity game'
            }
          ],
          notes: [
            {
              id: 1,
              content: 'Basic understanding of Unity, needs more practice',
              createdAt: '2024-03-11'
            }
          ]
        },
        {
          id: 10,
          name: 'Ritviz Vaid',
          email: 'ritvizvaid@example.com',
          avatar: 'https://ui-avatars.com/api/?name=Ritviz+Vaid',
          status: 'active',
          lastSession: '2024-03-16',
          nextSession: '2024-03-23',
          progress: 85,
          rating: 4.8,
          totalSessions: 10,
          skills: ['Mobile Development', 'React Native', 'JavaScript'],
          goals: [
            {
              id: 1,
              title: 'React Native App',
              deadline: '2024-04-05',
              status: 'in_progress',
              description: 'Build a cross-platform mobile app'
            }
          ],
          notes: [
            {
              id: 1,
              content: 'Good progress with React Native basics',
              createdAt: '2024-03-16'
            }
          ]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProgress = async (studentId, progress) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/mentorship/students/${studentId}/progress`, { progress }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        toast.success('Progress updated successfully');
        setShowProgressModal(false);
        fetchStudents();
      } else {
        toast.error('Failed to update progress');
      }
    } catch (error) {
      console.error('Error updating progress:', error);
      toast.error('Failed to update progress');
    }
  };

  const handleAddNote = async (studentId) => {
    try {
      if (!newNote.content.trim()) {
        setNoteError('Note content is required');
        return;
      }
      if (newNote.content.length > 500) {
        setNoteError('Note content cannot exceed 500 characters');
        return;
      }

      const response = await axios.post(
        `http://localhost:5000/api/mentor/students/${studentId}/notes`,
        newNote,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.status === 201) {
        toast.success('Note added successfully');
        setNewNote({ content: '', category: 'progress', priority: 'medium' });
        setNoteError('');
        setShowNotesModal(false);
        fetchStudents();
      } else {
        throw new Error('Failed to add note');
      }
    } catch (error) {
      console.error('Error adding note:', error);
      setNoteError(error.response?.data?.message || 'Failed to add note');
      toast.error(error.response?.data?.message || 'Failed to add note');
    }
  };

  const handleAddGoal = async (studentId) => {
    try {
      // Validation
      if (!newGoal.title.trim()) {
        setGoalError('Goal title is required');
        return;
      }
      if (!newGoal.deadline) {
        setGoalError('Deadline is required');
        return;
      }
      if (newGoal.startDate && new Date(newGoal.startDate) > new Date(newGoal.deadline)) {
        setGoalError('Start date cannot be after deadline');
        return;
      }
      if (!newGoal.category) {
        setGoalError('Category is required');
        return;
      }

      const response = await axios.post(
        `https://hustleeworkspace.onrender.com/api/mentor/students/${studentId}/goals`,
        newGoal,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.status === 201) {
        toast.success('Goal added successfully');
        setNewGoal({
          title: '',
          description: '',
          startDate: '',
          deadline: '',
          category: '',
          priority: 'medium'
        });
        setGoalError('');
        setShowGoalsModal(false);
        fetchStudents();
      } else {
        throw new Error('Failed to add goal');
      }
    } catch (error) {
      console.error('Error adding goal:', error);
      setGoalError(error.response?.data?.message || 'Failed to add goal');
      toast.error(error.response?.data?.message || 'Failed to add goal');
    }
  };

  const handleUpdateGoalStatus = async (studentId, goalId, status) => {
    try {
      const response = await axios.put(
        `https://hustleeworkspace.onrender.com/api/mentor/students/${studentId}/goals/${goalId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      toast.success('Goal status updated');
      fetchStudents();
    } catch (error) {
      console.error('Error updating goal status:', error);
      toast.error('Failed to update goal status');
    }
  };

  const handleMessageClick = (studentId) => {
    navigate(`/mentor/chat/${studentId}`);
  };

  const handleScheduleClick = (studentId) => {
    navigate(`/mentor/schedule/${studentId}`);
  };

  const handleProfileClick = (student) => {
    setSelectedStudent(student);
    setShowProfileModal(true);
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.lastSession) - new Date(a.lastSession);
      case 'progress':
        return b.progress - a.progress;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

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
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Students</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage and track your students' progress
          </p>
        </div>
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setSelectedStudents(filteredStudents);
              setShowGroupChatModal(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
            Start Group Chat
          </motion.button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="relative">
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="relative">
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recent">Most Recent</option>
              <option value="progress">Progress</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedStudents.map((student) => (
          <motion.div
            key={student.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
          >
            <div className="p-4">
              <div className="flex items-center space-x-3">
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{student.name}</h3>
                  <p className="text-xs text-gray-500">{student.email}</p>
                </div>
              </div>

              <div className="mt-2 space-y-2">
                <div>
                  <div className="flex justify-between text-[10px] mb-0.5">
                    <span className="text-gray-500">Progress</span>
                    <span className="text-gray-900 font-medium">{student.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div
                      className="bg-purple-600 h-1 rounded-full"
                      style={{ width: `${student.progress}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1">
                  <div className="flex items-center space-x-1">
                    <StarIcon className="h-3 w-3 text-yellow-400" />
                    <span className="text-[10px] text-gray-600">{student.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ClockIcon className="h-3 w-3 text-gray-400" />
                    <span className="text-[10px] text-gray-600">{student.totalSessions} sessions</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-medium text-gray-900 mb-0.5">Skills</h4>
                  <div className="flex flex-wrap gap-0.5">
                    {student.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-1 py-0.5 rounded-full text-[10px] font-medium bg-purple-100 text-purple-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-1 border-t border-gray-200">
                  <div className="flex justify-between text-[10px]">
                    <div>
                      <p className="text-gray-500">Last Session</p>
                      <p className="text-gray-900">{new Date(student.lastSession).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Next Session</p>
                      <p className="text-gray-900">{new Date(student.nextSession).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-2 flex space-x-1">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleMessageClick(student.id)}
                  className="flex-1 inline-flex justify-center items-center px-1.5 py-1 border border-gray-300 shadow-sm text-[10px] font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-purple-500"
                >
                  <ChatBubbleLeftRightIcon className="h-3 w-3 mr-0.5" />
                  Message
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleScheduleClick(student.id)}
                  className="flex-1 inline-flex justify-center items-center px-1.5 py-1 border border-transparent text-[10px] font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-purple-500"
                >
                  <CalendarIcon className="h-3 w-3 mr-0.5" />
                  Schedule
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleProfileClick(student)}
                  className="flex-1 inline-flex justify-center items-center px-1.5 py-1 border border-gray-300 shadow-sm text-[10px] font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-purple-500"
                >
                  <UserCircleIcon className="h-3 w-3 mr-0.5" />
                  Profile
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress Update Modal */}
      {showProgressModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Update Progress for {selectedStudent.name}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Progress (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={selectedStudent.progress || 0}
                  onChange={(e) => {
                    setSelectedStudent({
                      ...selectedStudent,
                      progress: Number(e.target.value)
                    });
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowProgressModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleUpdateProgress(selectedStudent.id, selectedStudent.progress)}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Update Progress
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Notes Modal */}
      <AnimatePresence>
        {showNotesModal && selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowNotesModal(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Add Note for {selectedStudent.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Add a note to track student progress or important information
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowNotesModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon className="h-6 w-6" />
                </motion.button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Note Content
                  </label>
                  <div className="relative">
                    <motion.textarea
                      whileFocus={{ scale: 1.01 }}
                      value={newNote.content}
                      onChange={(e) => {
                        setNewNote({ ...newNote, content: e.target.value });
                        setNoteError('');
                      }}
                      rows={4}
                      className={`block w-full rounded-lg shadow-sm focus:ring-purple-500 resize-none ${
                        noteError ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-purple-500'
                      }`}
                      placeholder="Enter your note here..."
                    />
                    <motion.div 
                      className="absolute bottom-2 right-2 text-xs"
                      animate={{ 
                        opacity: newNote.content.length > 450 ? 1 : 0.5,
                        color: newNote.content.length > 450 ? '#EF4444' : '#6B7280'
                      }}
                    >
                      {newNote.content.length}/500
                    </motion.div>
                  </div>
                  {noteError && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-600"
                    >
                      {noteError}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <motion.select
                    whileFocus={{ scale: 1.01 }}
                    value={newNote.category}
                    onChange={(e) => setNewNote({ ...newNote, category: e.target.value })}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  >
                    <option value="progress">Progress Update</option>
                    <option value="feedback">Feedback</option>
                    <option value="achievement">Achievement</option>
                    <option value="concern">Concern</option>
                    <option value="other">Other</option>
                  </motion.select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <div className="flex space-x-2">
                    {['Low', 'Medium', 'High'].map((priority) => (
                      <motion.button
                        key={priority}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setNewNote({ ...newNote, priority: priority.toLowerCase() })}
                        className={`flex-1 px-3 py-2 text-sm border rounded-lg transition-colors ${
                          newNote.priority === priority.toLowerCase()
                            ? priority === 'Low'
                              ? 'bg-green-50 border-green-500 text-green-700'
                              : priority === 'Medium'
                              ? 'bg-yellow-50 border-yellow-500 text-yellow-700'
                              : 'bg-red-50 border-red-500 text-red-700'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {priority}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setShowNotesModal(false);
                      setNoteError('');
                      setNewNote({ content: '', category: 'progress', priority: 'medium' });
                    }}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAddNote(selectedStudent.id)}
                    disabled={!newNote.content.trim()}
                    className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                      newNote.content.trim()
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <DocumentTextIcon className="h-5 w-5" />
                    <span>Add Note</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Goals Modal */}
      <AnimatePresence>
        {showGoalsModal && selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowGoalsModal(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Add Goal for {selectedStudent.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Set a new learning goal or milestone
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowGoalsModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon className="h-6 w-6" />
                </motion.button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Goal Title
                  </label>
                  <div className="relative">
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="text"
                      value={newGoal.title}
                      onChange={(e) => {
                        setNewGoal({ ...newGoal, title: e.target.value });
                        setGoalError('');
                      }}
                      className={`block w-full rounded-lg shadow-sm focus:ring-purple-500 ${
                        goalError && !newGoal.title ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-purple-500'
                      }`}
                      placeholder="Enter goal title"
                    />
                    {newGoal.title.length > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                      </motion.div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={newGoal.startDate}
                        onChange={(e) => {
                          setNewGoal({ ...newGoal, startDate: e.target.value });
                          setGoalError('');
                        }}
                        className={`block w-full rounded-lg shadow-sm focus:ring-purple-500 ${
                          goalError && !newGoal.startDate ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-purple-500'
                        }`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Deadline
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={newGoal.deadline}
                        onChange={(e) => {
                          setNewGoal({ ...newGoal, deadline: e.target.value });
                          setGoalError('');
                        }}
                        className={`block w-full rounded-lg shadow-sm focus:ring-purple-500 ${
                          goalError && !newGoal.deadline ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-purple-500'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {goalError && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-600"
                  >
                    {goalError}
                  </motion.p>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <motion.textarea
                    whileFocus={{ scale: 1.01 }}
                    value={newGoal.description}
                    onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                    rows={3}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 resize-none"
                    placeholder="Enter goal description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <motion.select
                    whileFocus={{ scale: 1.01 }}
                    value={newGoal.category}
                    onChange={(e) => {
                      setNewGoal({ ...newGoal, category: e.target.value });
                      setGoalError('');
                    }}
                    className={`block w-full rounded-lg shadow-sm focus:ring-purple-500 ${
                      goalError && !newGoal.category ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-purple-500'
                    }`}
                  >
                    <option value="">Select a category</option>
                    <option value="technical">Technical Skills</option>
                    <option value="soft">Soft Skills</option>
                    <option value="project">Project Completion</option>
                    <option value="certification">Certification</option>
                    <option value="other">Other</option>
                  </motion.select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority Level
                  </label>
                  <div className="flex space-x-2">
                    {['low', 'medium', 'high'].map((priority) => (
                      <motion.button
                        key={priority}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setNewGoal({ ...newGoal, priority })}
                        className={`flex-1 px-3 py-2 text-sm border rounded-lg transition-colors ${
                          newGoal.priority === priority
                            ? priority === 'low'
                              ? 'bg-green-50 border-green-500 text-green-700'
                              : priority === 'medium'
                              ? 'bg-yellow-50 border-yellow-500 text-yellow-700'
                              : 'bg-red-50 border-red-500 text-red-700'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setShowGoalsModal(false);
                      setGoalError('');
                      setNewGoal({
                        title: '',
                        description: '',
                        startDate: '',
                        deadline: '',
                        category: '',
                        priority: 'medium'
                      });
                    }}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAddGoal(selectedStudent.id)}
                    disabled={!newGoal.title || !newGoal.deadline || !newGoal.category}
                    className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                      newGoal.title && newGoal.deadline && newGoal.category
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <FlagIcon className="h-5 w-5" />
                    <span>Add Goal</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Student Profile Modal */}
      <AnimatePresence>
        {showProfileModal && selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Header with Quick Actions */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <div className="relative group">
                    <img
                      src={selectedStudent.avatar}
                      alt={selectedStudent.name}
                      className="h-16 w-16 rounded-full ring-2 ring-purple-500"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 bg-purple-600 rounded-full text-white">
                        <PencilSquareIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{selectedStudent.name}</h3>
                    <p className="text-sm text-gray-500">{selectedStudent.email}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        selectedStudent.status === 'active' 
                          ? 'bg-green-100 text-green-800'
                          : selectedStudent.status === 'inactive'
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {selectedStudent.status.charAt(0).toUpperCase() + selectedStudent.status.slice(1)}
                      </span>
                      <span className="text-xs text-gray-500">
                        Joined {new Date(selectedStudent.lastSession).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleMessageClick(selectedStudent.id)}
                    className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
                    title="Send Message"
                  >
                    <ChatBubbleLeftRightIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleScheduleClick(selectedStudent.id)}
                    className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
                    title="Schedule Session"
                  >
                    <CalendarIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setShowProfileModal(false)}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-full transition-colors"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-purple-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-purple-600">Progress</span>
                    <ArrowTrendingUpIcon className="h-4 w-4 text-purple-600" />
                  </div>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">{selectedStudent.progress}%</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-600">Sessions</span>
                    <ClockIcon className="h-4 w-4 text-blue-600" />
                  </div>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">{selectedStudent.totalSessions}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-600">Rating</span>
                    <StarIcon className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">{selectedStudent.rating}</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-yellow-600">Goals</span>
                    <FlagIcon className="h-4 w-4 text-yellow-600" />
                  </div>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">{selectedStudent.goals.length}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Skills Section */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <CodeBracketIcon className="h-5 w-5 text-purple-600" />
                    <h4 className="font-medium text-gray-900">Skills</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedStudent.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enrolled Courses with Progress */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <BookOpenIcon className="h-5 w-5 text-purple-600" />
                    <h4 className="font-medium text-gray-900">Enrolled Courses</h4>
                  </div>
                  <div className="space-y-3">
                    {selectedStudent.courses?.map((course, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">{course.name}</span>
                          <span className="text-xs text-gray-500">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-purple-600 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements with Badges */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <TrophyIcon className="h-5 w-5 text-purple-600" />
                    <h4 className="font-medium text-gray-900">Achievements</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedStudent.achievements?.map((achievement, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 p-2 bg-white rounded-lg shadow-sm"
                      >
                        <CheckBadgeIcon className="h-5 w-5 text-green-500" />
                        <span className="text-sm text-gray-700">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Learning Stats with Interactive Charts */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <ChartBarIcon className="h-5 w-5 text-purple-600" />
                    <h4 className="font-medium text-gray-900">Learning Stats</h4>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Total Sessions</span>
                        <span className="text-gray-900">{selectedStudent.totalSessions}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-purple-600 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${(selectedStudent.totalSessions / 30) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Average Rating</span>
                        <span className="text-gray-900">{selectedStudent.rating}/5.0</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-purple-600 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${(selectedStudent.rating / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity with Timeline */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <ClockIcon className="h-5 w-5 text-purple-600" />
                    <h4 className="font-medium text-gray-900">Recent Activity</h4>
                  </div>
                  <button className="text-sm text-purple-600 hover:text-purple-700">View All</button>
                </div>
                <div className="space-y-4">
                  {selectedStudent.recentActivity?.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 group">
                      <div className="flex-shrink-0">
                        <div className="h-2 w-2 bg-purple-600 rounded-full mt-2" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                          {activity.description}
                        </p>
                        <p className="text-xs text-gray-500">{activity.timestamp}</p>
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <DocumentTextIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons with Enhanced Animation */}
              <div className="mt-6 flex justify-end space-x-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowNotesModal(true)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
                >
                  <DocumentTextIcon className="h-5 w-5" />
                  <span>Add Note</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowGoalsModal(true)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                >
                  <FlagIcon className="h-5 w-5" />
                  <span>Add Goal</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Group Chat Modal */}
      <AnimatePresence>
        {showGroupChatModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowGroupChatModal(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-xl p-4 w-full max-w-md shadow-2xl"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Start Group Chat
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Select students and start a group chat
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowGroupChatModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon className="h-6 w-6" />
                </motion.button>
              </div>

              <div className="space-y-4">
                {/* Chat Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Chat Title
                  </label>
                  <input
                    type="text"
                    value={groupChatTitle}
                    onChange={(e) => setGroupChatTitle(e.target.value)}
                    placeholder="Enter a title for this group chat"
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>

                {/* Student Selection */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Select Students ({selectedStudents.length} selected)
                    </label>
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowStudentFilters(!showStudentFilters)}
                        className={`p-1 rounded-lg ${
                          showStudentFilters ? 'bg-purple-100 text-purple-700' : 'text-gray-500 hover:bg-gray-100'
                        }`}
                      >
                        <AdjustmentsHorizontalIcon className="h-4 w-4" />
                      </motion.button>
                      <button
                        onClick={() => setSelectedStudents(filteredStudents)}
                        className="text-xs text-purple-600 hover:text-purple-700"
                      >
                        Select All
                      </button>
                      <button
                        onClick={() => setSelectedStudents([])}
                        className="text-xs text-gray-500 hover:text-gray-700"
                      >
                        Clear
                      </button>
                    </div>
                  </div>

                  {/* Student Search and Filters */}
                  <div className="space-y-2 mb-2">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={studentSearchQuery}
                        onChange={(e) => setStudentSearchQuery(e.target.value)}
                        placeholder="Search students..."
                        className="block w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>

                    {showStudentFilters && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-gray-50 p-2 rounded-lg"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">Group by:</span>
                          <select
                            value={studentGroupBy}
                            onChange={(e) => setStudentGroupBy(e.target.value)}
                            className="text-xs border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                          >
                            <option value="none">None</option>
                            <option value="status">Status</option>
                            <option value="progress">Progress</option>
                          </select>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Student List */}
                  <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg divide-y">
                    {(() => {
                      // Filter students based on search
                      let filteredList = filteredStudents.filter(student =>
                        student.name.toLowerCase().includes(studentSearchQuery.toLowerCase()) ||
                        student.email.toLowerCase().includes(studentSearchQuery.toLowerCase())
                      );

                      // Group students if needed
                      if (studentGroupBy !== 'none') {
                        const groups = {};
                        filteredList.forEach(student => {
                          const key = studentGroupBy === 'status' 
                            ? student.status 
                            : Math.floor(student.progress / 25) * 25;
                          if (!groups[key]) groups[key] = [];
                          groups[key].push(student);
                        });

                        return Object.entries(groups).map(([key, students]) => (
                          <div key={key}>
                            <div className="bg-gray-50 px-2 py-1 text-xs font-medium text-gray-500">
                              {studentGroupBy === 'status' 
                                ? `${key.charAt(0).toUpperCase() + key.slice(1)} Students`
                                : `Progress ${key}-${Number(key) + 25}%`
                              }
                            </div>
                            {students.map(student => (
                              <StudentListItem
                                key={student.id}
                                student={student}
                                isSelected={selectedStudents.some(s => s.id === student.id)}
                                onSelect={() => {
                                  setSelectedStudents(prev => {
                                    const isSelected = prev.some(s => s.id === student.id);
                                    if (isSelected) {
                                      return prev.filter(s => s.id !== student.id);
                                    } else {
                                      return [...prev, student];
                                    }
                                  });
                                }}
                              />
                            ))}
                          </div>
                        ));
                      }

                      return filteredList.map(student => (
                        <StudentListItem
                          key={student.id}
                          student={student}
                          isSelected={selectedStudents.some(s => s.id === student.id)}
                          onSelect={() => {
                            setSelectedStudents(prev => {
                              const isSelected = prev.some(s => s.id === student.id);
                              if (isSelected) {
                                return prev.filter(s => s.id !== student.id);
                              } else {
                                return [...prev, student];
                              }
                            });
                          }}
                        />
                      ));
                    })()}
                  </div>
                </div>

                {/* Chat Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chat Type
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setGroupChatType('text')}
                      className={`p-3 rounded-lg border flex flex-col items-center space-y-2 ${
                        groupChatType === 'text'
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <ChatBubbleLeftRightIcon className="h-6 w-6" />
                      <span className="text-sm">Text</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setGroupChatType('voice')}
                      className={`p-3 rounded-lg border flex flex-col items-center space-y-2 ${
                        groupChatType === 'voice'
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <MicrophoneIcon className="h-6 w-6" />
                      <span className="text-sm">Voice</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setGroupChatType('video')}
                      className={`p-3 rounded-lg border flex flex-col items-center space-y-2 ${
                        groupChatType === 'video'
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <VideoCameraIcon className="h-6 w-6" />
                      <span className="text-sm">Video</span>
                    </motion.button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setShowGroupChatModal(false);
                      setGroupChatTitle('');
                      setGroupChatType('text');
                      setSelectedStudents([]);
                    }}
                    className="px-3 py-1.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={async () => {
                      if (selectedStudents.length === 0) {
                        toast.error('Please select at least one student');
                        return;
                      }
                      try {
                        setGroupChatLoading(true);
                        // Here you would make an API call to create the group chat
                        // await createGroupChat({
                        //   title: groupChatTitle,
                        //   type: groupChatType,
                        //   students: selectedStudents.map(s => s.id)
                        // });
                        
                        // Navigate to the group chat
                        navigate('/mentor/group-chat');
                        setShowGroupChatModal(false);
                      } catch (error) {
                        console.error('Error creating group chat:', error);
                        toast.error('Failed to create group chat');
                      } finally {
                        setGroupChatLoading(false);
                      }
                    }}
                    disabled={!groupChatTitle.trim() || selectedStudents.length === 0 || groupChatLoading}
                    className={`px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-2 text-sm ${
                      groupChatTitle.trim() && selectedStudents.length > 0 && !groupChatLoading
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {groupChatLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <PaperAirplaneIcon className="h-4 w-4" />
                    )}
                    <span>Start Chat</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Group Schedule Modal */}
      <AnimatePresence>
        {showGroupScheduleModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowGroupScheduleModal(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-2xl"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Schedule Group Session
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Schedule a session with {selectedStudents.length} selected students
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowGroupScheduleModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon className="h-6 w-6" />
                </motion.button>
              </div>

              <div className="space-y-6">
                {/* Session Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Session Type
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSessionType('video')}
                      className={`p-3 rounded-lg border flex flex-col items-center space-y-2 ${
                        sessionType === 'video'
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <VideoCameraIcon className="h-6 w-6" />
                      <span className="text-sm">Video Call</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSessionType('voice')}
                      className={`p-3 rounded-lg border flex flex-col items-center space-y-2 ${
                        sessionType === 'voice'
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <MicrophoneIcon className="h-6 w-6" />
                      <span className="text-sm">Voice Call</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSessionType('text')}
                      className={`p-3 rounded-lg border flex flex-col items-center space-y-2 ${
                        sessionType === 'text'
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <ChatBubbleLeftRightIcon className="h-6 w-6" />
                      <span className="text-sm">Text Chat</span>
                    </motion.button>
                  </div>
                </div>

                {/* Session Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Session Title
                    </label>
                    <input
                      type="text"
                      value={sessionTitle}
                      onChange={(e) => setSessionTitle(e.target.value)}
                      placeholder="Enter session title"
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration (minutes)
                    </label>
                    <select
                      value={sessionDuration}
                      onChange={(e) => setSessionDuration(e.target.value)}
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    >
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="90">1.5 hours</option>
                      <option value="120">2 hours</option>
                    </select>
                  </div>
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={sessionDate}
                        onChange={(e) => setSessionDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      />
                      <CalendarDaysIcon className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Time
                    </label>
                    <div className="relative">
                      <input
                        type="time"
                        value={sessionTime}
                        onChange={(e) => setSessionTime(e.target.value)}
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      />
                      <ClockIcon className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </div>

                {/* Location/Link */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {sessionType === 'text' ? 'Chat Link' : sessionType === 'video' ? 'Meeting Link' : 'Call Link'}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={sessionLink}
                      onChange={(e) => setSessionLink(e.target.value)}
                      placeholder={`Enter ${sessionType === 'text' ? 'chat' : sessionType === 'video' ? 'meeting' : 'call'} link`}
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 pl-10"
                    />
                    <LinkIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={sessionDescription}
                    onChange={(e) => setSessionDescription(e.target.value)}
                    rows={3}
                    placeholder="Enter session description"
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 resize-none"
                  />
                </div>

                {/* Agenda */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Session Agenda
                  </label>
                  <div className="space-y-2">
                    {sessionAgenda.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-50 p-2 rounded-lg text-sm">
                          {item}
                        </div>
                        <button
                          onClick={() => setSessionAgenda(prev => prev.filter((_, i) => i !== index))}
                          className="p-1 text-gray-400 hover:text-red-500"
                        >
                          <XMarkIcon className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newAgendaItem}
                        onChange={(e) => setNewAgendaItem(e.target.value)}
                        placeholder="Add agenda item"
                        className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && newAgendaItem.trim()) {
                            setSessionAgenda(prev => [...prev, newAgendaItem.trim()]);
                            setNewAgendaItem('');
                          }
                        }}
                      />
                      <button
                        onClick={() => {
                          if (newAgendaItem.trim()) {
                            setSessionAgenda(prev => [...prev, newAgendaItem.trim()]);
                            setNewAgendaItem('');
                          }
                        }}
                        className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>

                {/* Selected Students */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Selected Students ({selectedStudents.length})
                  </label>
                  <div className="max-h-32 overflow-y-auto space-y-2">
                    {selectedStudents.map((student) => (
                      <div key={student.id} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                        <img src={student.avatar} alt={student.name} className="h-6 w-6 rounded-full" />
                        <div>
                          <span className="text-sm text-gray-700">{student.name}</span>
                          <span className="text-xs text-gray-500 block">{student.email}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setShowGroupScheduleModal(false);
                      setSessionType('video');
                      setSessionDate('');
                      setSessionTime('');
                      setSessionDuration('60');
                      setSessionTitle('');
                      setSessionDescription('');
                      setSessionLink('');
                      setSessionAgenda([]);
                      setNewAgendaItem('');
                    }}
                    className="px-3 py-1.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={async () => {
                      if (!sessionTitle || !sessionDate || !sessionTime) {
                        toast.error('Please fill in all required fields');
                        return;
                      }
                      try {
                        setSessionLoading(true);
                        // Here you would make an API call to schedule the session
                        // await scheduleGroupSession({
                        //   title: sessionTitle,
                        //   type: sessionType,
                        //   date: sessionDate,
                        //   time: sessionTime,
                        //   duration: sessionDuration,
                        //   description: sessionDescription,
                        //   link: sessionLink,
                        //   agenda: sessionAgenda,
                        //   students: selectedStudents.map(s => s.id)
                        // });
                        
                        toast.success('Session scheduled successfully');
                        setShowGroupScheduleModal(false);
                      } catch (error) {
                        console.error('Error scheduling session:', error);
                        toast.error('Failed to schedule session');
                      } finally {
                        setSessionLoading(false);
                      }
                    }}
                    disabled={!sessionTitle || !sessionDate || !sessionTime || sessionLoading}
                    className={`px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-2 text-sm ${
                      sessionTitle && sessionDate && sessionTime && !sessionLoading
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {sessionLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <CalendarIcon className="h-5 w-5" />
                    )}
                    <span>Schedule Session</span>
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

const StudentListItem = ({ student, isSelected, onSelect }) => (
  <div
    className="flex items-center justify-between p-2 hover:bg-gray-50 cursor-pointer"
    onClick={onSelect}
  >
    <div className="flex items-center space-x-2">
      <div className={`h-4 w-4 rounded border ${
        isSelected ? 'bg-purple-600 border-purple-600' : 'border-gray-300'
      }`}>
        {isSelected && <CheckIcon className="h-4 w-4 text-white" />}
      </div>
      <img src={student.avatar} alt={student.name} className="h-6 w-6 rounded-full" />
      <div>
        <span className="text-sm text-gray-700">{student.name}</span>
        <div className="flex items-center space-x-1">
          <span className={`h-1.5 w-1.5 rounded-full ${
            student.status === 'active' ? 'bg-green-500' :
            student.status === 'inactive' ? 'bg-gray-400' :
            'bg-blue-500'
          }`} />
          <span className="text-xs text-gray-500">{student.email}</span>
        </div>
      </div>
    </div>
    <div className="flex items-center space-x-2">
      <div className="w-16 bg-gray-200 rounded-full h-1.5">
        <div
          className="bg-purple-600 h-1.5 rounded-full"
          style={{ width: `${student.progress}%` }}
        />
      </div>
      <span className="text-xs text-gray-500">{student.progress}%</span>
    </div>
  </div>
);

export default MentorStudents; 
