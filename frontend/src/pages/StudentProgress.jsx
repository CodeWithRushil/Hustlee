import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';

const StudentProgress = () => {
  const { studentId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - in a real app, this would come from an API
  const studentData = {
    name: 'John Doe',
    course: 'Web Development Bootcamp',
    progress: 75,
    completedLessons: 15,
    totalLessons: 20,
    lastActive: '2024-02-20',
    upcomingSession: '2024-02-25 14:00',
    assessments: [
      { id: 1, name: 'HTML Basics', score: 85, status: 'completed' },
      { id: 2, name: 'CSS Fundamentals', score: 92, status: 'completed' },
      { id: 3, name: 'JavaScript Intro', score: 78, status: 'completed' },
      { id: 4, name: 'React Basics', score: null, status: 'pending' },
    ],
    recentActivity: [
      { id: 1, type: 'lesson', name: 'React Hooks', date: '2024-02-19', status: 'completed' },
      { id: 2, type: 'quiz', name: 'JavaScript Quiz', date: '2024-02-18', status: 'completed' },
      { id: 3, type: 'assignment', name: 'Todo App', date: '2024-02-17', status: 'completed' },
    ],
  };

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'assessments', name: 'Assessments' },
    { id: 'activity', name: 'Recent Activity' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <div className="flex items-center">
                  <ChartBarIcon className="h-8 w-8 text-indigo-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Overall Progress</p>
                    <p className="text-2xl font-semibold text-gray-900">{studentData.progress}%</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <div className="flex items-center">
                  <AcademicCapIcon className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Completed Lessons</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {studentData.completedLessons}/{studentData.totalLessons}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <div className="flex items-center">
                  <ClockIcon className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Last Active</p>
                    <p className="text-2xl font-semibold text-gray-900">{studentData.lastActive}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <div className="flex items-center">
                  <ClockIcon className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Next Session</p>
                    <p className="text-2xl font-semibold text-gray-900">{studentData.upcomingSession}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Progress Overview</h3>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-indigo-600 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${studentData.progress}%` }}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                {studentData.completedLessons} out of {studentData.totalLessons} lessons completed
              </p>
            </div>
          </div>
        );

      case 'assessments':
        return (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Assessment Results</h3>
              <div className="space-y-4">
                {studentData.assessments.map((assessment) => (
                  <motion.div
                    key={assessment.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900">{assessment.name}</h4>
                      <p className="text-sm text-gray-500">
                        {assessment.status === 'completed' ? 'Completed' : 'Pending'}
                      </p>
                    </div>
                    {assessment.score !== null ? (
                      <div className="flex items-center">
                        <span className="text-lg font-semibold text-gray-900">{assessment.score}%</span>
                        {assessment.score >= 80 ? (
                          <CheckCircleIcon className="ml-2 h-5 w-5 text-green-500" />
                        ) : (
                          <XCircleIcon className="ml-2 h-5 w-5 text-red-500" />
                        )}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">Not taken</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'activity':
        return (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {studentData.recentActivity.map((activity) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900">{activity.name}</h4>
                      <p className="text-sm text-gray-500">
                        {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)} • {activity.date}
                      </p>
                    </div>
                    <div className="flex items-center">
                      {activity.status === 'completed' ? (
                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                      ) : (
                        <ClockIcon className="h-5 w-5 text-yellow-500" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{studentData.name}</h1>
          <p className="mt-2 text-sm text-gray-500">{studentData.course}</p>
        </div>

        <div className="mb-6">
          <nav className="flex space-x-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === tab.id
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default StudentProgress; 