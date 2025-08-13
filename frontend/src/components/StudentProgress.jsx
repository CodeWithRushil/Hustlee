import React from 'react';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  CheckCircleIcon,
  ClockIcon,
  AcademicCapIcon,
  BookOpenIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';

const StudentProgress = ({ studentId }) => {
  // Mock data - Replace with actual API calls
  const studentData = {
    name: 'John Doe',
    course: 'Full Stack Development',
    startDate: '2024-01-15',
    progress: {
      overall: 75,
      assignments: 12,
      completedAssignments: 9,
      quizzes: 8,
      completedQuizzes: 6,
      projects: 3,
      completedProjects: 2,
    },
    skills: [
      { name: 'HTML/CSS', level: 85 },
      { name: 'JavaScript', level: 70 },
      { name: 'React', level: 65 },
      { name: 'Node.js', level: 60 },
      { name: 'Database', level: 55 },
    ],
    recentActivity: [
      { type: 'assignment', title: 'React Hooks Project', date: '2024-03-18', status: 'completed' },
      { type: 'quiz', title: 'JavaScript Fundamentals', date: '2024-03-17', status: 'completed' },
      { type: 'project', title: 'E-commerce Website', date: '2024-03-15', status: 'in-progress' },
    ],
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* Student Info Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{studentData.name}</h2>
        <p className="text-gray-600">{studentData.course}</p>
        <p className="text-sm text-gray-500">Started: {studentData.startDate}</p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-blue-50 p-4 rounded-lg"
        >
          <div className="flex items-center space-x-3">
            <ChartBarIcon className="h-6 w-6 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Overall Progress</p>
              <p className="text-xl font-semibold text-gray-900">{studentData.progress.overall}%</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-green-50 p-4 rounded-lg"
        >
          <div className="flex items-center space-x-3">
            <CheckCircleIcon className="h-6 w-6 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Assignments</p>
              <p className="text-xl font-semibold text-gray-900">
                {studentData.progress.completedAssignments}/{studentData.progress.assignments}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-purple-50 p-4 rounded-lg"
        >
          <div className="flex items-center space-x-3">
            <BookOpenIcon className="h-6 w-6 text-purple-600" />
            <div>
              <p className="text-sm text-gray-600">Quizzes</p>
              <p className="text-xl font-semibold text-gray-900">
                {studentData.progress.completedQuizzes}/{studentData.progress.quizzes}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-yellow-50 p-4 rounded-lg"
        >
          <div className="flex items-center space-x-3">
            <LightBulbIcon className="h-6 w-6 text-yellow-600" />
            <div>
              <p className="text-sm text-gray-600">Projects</p>
              <p className="text-xl font-semibold text-gray-900">
                {studentData.progress.completedProjects}/{studentData.progress.projects}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Skills Progress */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills Progress</h3>
        <div className="space-y-4">
          {studentData.skills.map((skill) => (
            <div key={skill.name}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                <span className="text-sm text-gray-600">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1 }}
                  className="bg-blue-600 h-2 rounded-full"
                ></motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {studentData.recentActivity.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${
                  activity.type === 'assignment' ? 'bg-blue-100' :
                  activity.type === 'quiz' ? 'bg-purple-100' :
                  'bg-yellow-100'
                }`}>
                  {activity.type === 'assignment' ? (
                    <BookOpenIcon className="h-5 w-5 text-blue-600" />
                  ) : activity.type === 'quiz' ? (
                    <AcademicCapIcon className="h-5 w-5 text-purple-600" />
                  ) : (
                    <LightBulbIcon className="h-5 w-5 text-yellow-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-500">{activity.date}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {activity.status}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentProgress; 