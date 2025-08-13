import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Tab } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BellIcon, 
  UserGroupIcon, 
  CalendarIcon, 
  StarIcon, 
  CurrencyDollarIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import MentorAnalytics from '../components/MentorAnalytics';
import MentorStudents from '../components/MentorStudents';
import MentorCalendar from '../components/MentorCalendar';
import MentorProfile from '../components/MentorProfile';
import NotificationsView from '../components/NotificationsView';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const MentorDashboard = () => {
  const { user } = useAuth();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showFullNotifications, setShowFullNotifications] = useState(false);
  const notificationRef = useRef(null);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'session',
      message: 'New session request from John Doe',
      time: '5 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'message',
      message: 'New message from Sarah Smith',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'review',
      message: 'You received a new 5-star review',
      time: '2 hours ago',
      read: true
    }
  ]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const tabs = [
    { name: 'Overview', component: MentorAnalytics },
    { name: 'Students', component: MentorStudents },
    { name: 'Calendar', component: MentorCalendar },
    { name: 'Profile', component: MentorProfile }
  ];

  const quickStats = [
    {
      name: 'Total Students',
      value: '24',
      change: '+12%',
      icon: UserGroupIcon,
      color: 'bg-blue-500'
    },
    {
      name: 'Upcoming Sessions',
      value: '8',
      change: '+2',
      icon: CalendarIcon,
      color: 'bg-green-500'
    },
    {
      name: 'Average Rating',
      value: '4.8',
      change: '+0.2',
      icon: StarIcon,
      color: 'bg-yellow-500'
    },
    {
      name: 'Monthly Earnings',
      value: '$2,450',
      change: '+15%',
      icon: CurrencyDollarIcon,
      color: 'bg-purple-500'
    }
  ];

  const activityFeed = [
    {
      id: 1,
      type: 'session',
      title: 'New Session Request',
      description: 'John Doe requested a session on React Hooks',
      time: '5 minutes ago',
      status: 'pending',
      icon: CalendarIcon,
      color: 'text-blue-500'
    },
    {
      id: 2,
      type: 'message',
      title: 'New Message',
      description: 'Sarah Smith sent you a message about the next session',
      time: '1 hour ago',
      status: 'unread',
      icon: ChatBubbleLeftRightIcon,
      color: 'text-green-500'
    },
    {
      id: 3,
      type: 'review',
      title: 'New Review',
      description: 'You received a 5-star review from Michael Brown',
      time: '2 hours ago',
      status: 'completed',
      icon: StarIcon,
      color: 'text-yellow-500'
    },
    {
      id: 4,
      type: 'reminder',
      title: 'Upcoming Session',
      description: 'Session with Emma Wilson in 30 minutes',
      time: '30 minutes from now',
      status: 'upcoming',
      icon: ClockIcon,
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={user?.profile?.avatar || 'https://via.placeholder.com/150'}
                alt={user?.profile?.name}
                className="h-20 w-20 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Welcome back, {user?.profile?.name || 'Mentor'}! 👋
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                  Manage your students, schedule sessions, and track your progress.
                </p>
              </div>
            </div>

            {/* Notification Bell */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                <BellIcon className="h-6 w-6" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div 
                  className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                            !notification.read ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex items-start">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {notification.time}
                              </p>
                            </div>
                            {!notification.read && (
                              <span className="ml-2 inline-block h-2 w-2 rounded-full bg-blue-500"></span>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        No notifications
                      </div>
                    )}
                  </div>
                  <div className="p-4 border-t border-gray-200">
                    <button
                      onClick={() => {
                        setShowNotifications(false);
                        setShowFullNotifications(true);
                      }}
                      className="w-full text-center text-sm text-blue-600 hover:text-blue-800"
                    >
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {quickStats.map((stat) => (
              <div
                key={stat.name}
                className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow hover:shadow-md transition-shadow duration-300"
              >
                <dt>
                  <div className={`absolute rounded-md p-3 ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
                </dt>
                <dd className="ml-16 flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <p className={`ml-2 flex items-baseline text-sm font-semibold ${
                    stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </p>
                </dd>
              </div>
            ))}
          </div>

          {/* Activity Feed */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              <button className="text-sm text-blue-600 hover:text-blue-800">
                View all activity
              </button>
            </div>
            <div className="space-y-4">
              {activityFeed.map((activity) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start space-x-4 p-4 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors duration-200"
                >
                  <div className={`flex-shrink-0 p-2 rounded-full ${activity.color} bg-opacity-10`}>
                    <activity.icon className={`h-5 w-5 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{activity.description}</p>
                  </div>
                  <div className="flex-shrink-0">
                    {activity.status === 'pending' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    )}
                    {activity.status === 'unread' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Unread
                      </span>
                    )}
                    {activity.status === 'completed' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Completed
                      </span>
                    )}
                    {activity.status === 'upcoming' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        Upcoming
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
            <Tab.List className="flex space-x-1 border-b border-gray-200 px-6">
              {tabs.map((tab) => (
                <Tab
                  key={tab.name}
                  className={({ selected }) =>
                    classNames(
                      'py-4 px-6 text-sm font-medium border-b-2 focus:outline-none transition-colors duration-200',
                      selected
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    )
                  }
                >
                  {tab.name}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              {tabs.map((tab, idx) => (
                <Tab.Panel
                  key={idx}
                  className="p-6 focus:outline-none"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <tab.component />
                  </motion.div>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>

      {/* Full Notifications View */}
      <AnimatePresence>
        {showFullNotifications && (
          <NotificationsView
            notifications={notifications}
            onClose={() => setShowFullNotifications(false)}
            onMarkAsRead={markAsRead}
            onMarkAllAsRead={markAllAsRead}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MentorDashboard;
