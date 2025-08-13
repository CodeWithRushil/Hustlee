import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect, useRef } from 'react';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showTooltip, setShowTooltip] = useState(null);
  const [greeting, setGreeting] = useState('');
  const [selectedNotification, setSelectedNotification] = useState(null);
  const tooltipTimeoutRef = useRef(null);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  // Clear timeout when component unmounts
  useEffect(() => {
    return () => {
      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current);
      }
    };
  }, []);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Add cells for each day of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = i === new Date().getDate() && month === new Date().getMonth();
      const isSelected = i === selectedDate.getDate();
      days.push(
        <div
          key={i}
          onClick={() => handleDateClick(new Date(year, month, i))}
          className={`p-2 text-sm cursor-pointer transition-colors duration-200 ${
            isToday
              ? 'bg-purple-100 text-purple-600 font-semibold rounded-full'
              : isSelected
              ? 'bg-purple-200 text-purple-700 font-semibold rounded-full'
              : 'text-gray-900 hover:bg-gray-100 rounded-full'
          }`}
        >
          {i}
        </div>
      );
    }

    return days;
  };

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
  };

  const handleSettingsClick = (setting) => {
    switch(setting) {
      case 'profile':
        navigate('/profile');
        break;
      case 'notifications':
        navigate('/settings/notifications');
        break;
      case 'privacy':
        navigate('/settings/privacy');
        break;
      default:
        break;
    }
    setShowTooltip(null);
  };

  const handleTooltipShow = (tooltipType) => {
    setShowTooltip(tooltipType);
    // Clear any existing timeout
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
    }
  };

  const handleTooltipHide = () => {
    // Set a timeout to hide the tooltip after 3 seconds
    tooltipTimeoutRef.current = setTimeout(() => {
      setShowTooltip(null);
    }, 3000);
  };

  const handleTooltipMouseEnter = (tooltipType) => {
    // Clear the timeout when mouse enters the tooltip
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
    }
    setShowTooltip(tooltipType);
  };

  const handleTooltipMouseLeave = () => {
    // Start the timeout when mouse leaves the tooltip
    handleTooltipHide();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section with Enhanced Design */}
        <div className="mb-8 bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {greeting}, {user?.name || 'Student'}! 👋
              </h1>
              <p className="mt-2 text-sm text-gray-600">Here's your personalized dashboard overview</p>
            </div>
            <div className="flex space-x-4">
              <div className="relative">
                <button
                  className="p-2 text-gray-400 hover:text-purple-600 transition-all duration-200 hover:bg-purple-50 rounded-full"
                  onMouseEnter={() => handleTooltipShow('notifications')}
                  onMouseLeave={handleTooltipHide}
                >
                  <div className="relative">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                      3
                    </span>
                  </div>
                </button>
                {showTooltip === 'notifications' && (
                  <div 
                    className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl py-2 z-10 border border-gray-100"
                    onMouseEnter={() => handleTooltipMouseEnter('notifications')}
                    onMouseLeave={handleTooltipMouseLeave}
                  >
                    <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                      <Link to="/notifications" className="text-xs text-purple-600 hover:text-purple-500">
                        View All
                      </Link>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      <div 
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                        onClick={() => handleNotificationClick({
                          title: "New skill test available",
                          message: "A new JavaScript skill test has been added to your recommended tests. This test will help you validate your JavaScript knowledge and improve your profile.",
                          time: "2 minutes ago",
                          type: "skill-test"
                        })}
                      >
                        <p className="text-sm font-medium text-gray-900">New skill test available</p>
                        <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
                      </div>
                      <div 
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                        onClick={() => handleNotificationClick({
                          title: "Portfolio review completed",
                          message: "Your portfolio has been reviewed by our expert team. They've provided detailed feedback on your projects and suggestions for improvement.",
                          time: "1 hour ago",
                          type: "portfolio"
                        })}
                      >
                        <p className="text-sm font-medium text-gray-900">Portfolio review completed</p>
                        <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                      </div>
                      <div 
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleNotificationClick({
                          title: "New gig opportunity",
                          message: "A new frontend development gig matching your skills has been posted. The client is looking for someone with React and JavaScript experience.",
                          time: "3 hours ago",
                          type: "gig"
                        })}
                      >
                        <p className="text-sm font-medium text-gray-900">New gig opportunity</p>
                        <p className="text-xs text-gray-500 mt-1">3 hours ago</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  className="p-2 text-gray-400 hover:text-purple-600 transition-all duration-200 hover:bg-purple-50 rounded-full"
                  onMouseEnter={() => handleTooltipShow('settings')}
                  onMouseLeave={handleTooltipHide}
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
                {showTooltip === 'settings' && (
                  <div 
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-10 border border-gray-100"
                    onMouseEnter={() => handleTooltipMouseEnter('settings')}
                    onMouseLeave={handleTooltipMouseLeave}
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <h3 className="text-sm font-semibold text-gray-900">Settings</h3>
                    </div>
                    <div className="py-1">
                      <button 
                        onClick={() => handleSettingsClick('profile')}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                      >
                        <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Profile Settings
                      </button>
                      <button 
                        onClick={() => handleSettingsClick('notifications')}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                      >
                        <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        Notification Preferences
                      </button>
                      <button 
                        onClick={() => handleSettingsClick('privacy')}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                      >
                        <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Privacy Settings
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Notification Modal */}
        {selectedNotification && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">{selectedNotification.title}</h3>
                <button 
                  onClick={() => setSelectedNotification(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="px-6 py-4">
                <p className="text-gray-600">{selectedNotification.message}</p>
                <p className="text-sm text-gray-500 mt-2">{selectedNotification.time}</p>
              </div>
              <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedNotification(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    navigate(`/${selectedNotification.type}`);
                    setSelectedNotification(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats Grid with Enhanced Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Skill Tests Stats */}
          <div 
            className="bg-white overflow-hidden shadow-lg rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer border border-gray-100"
            onClick={() => toggleSection('skillTests')}
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-100 p-3 rounded-lg">
                  <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Skill Tests Completed</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">3/5</div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        <span>60%</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            {expandedSection === 'skillTests' && (
              <div className="bg-gray-50 px-5 py-3 border-t border-gray-200">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">JavaScript</span>
                    <span className="text-sm font-medium text-green-600">Completed</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">React</span>
                    <span className="text-sm font-medium text-yellow-600">In Progress</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Node.js</span>
                    <span className="text-sm font-medium text-gray-600">Not Started</span>
                  </div>
                </div>
              </div>
            )}
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link to="/skill-test" className="font-medium text-purple-600 hover:text-purple-500 flex items-center">
                  View all tests
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Portfolio Stats */}
          <div 
            className="bg-white overflow-hidden shadow-lg rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer border border-gray-100"
            onClick={() => toggleSection('portfolio')}
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Portfolio Items</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">4</div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        <span>+2 this week</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            {expandedSection === 'portfolio' && (
              <div className="bg-gray-50 px-5 py-3 border-t border-gray-200">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">E-commerce Website</span>
                    <span className="text-sm font-medium text-green-600">Featured</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Mobile App</span>
                    <span className="text-sm font-medium text-blue-600">New</span>
                  </div>
                </div>
              </div>
            )}
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link to="/portfolio" className="font-medium text-purple-600 hover:text-purple-500 flex items-center">
                  View portfolio
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Gigs Stats */}
          <div 
            className="bg-white overflow-hidden shadow-lg rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer border border-gray-100"
            onClick={() => toggleSection('gigs')}
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Active Gigs</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">2</div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        <span>1 new</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            {expandedSection === 'gigs' && (
              <div className="bg-gray-50 px-5 py-3 border-t border-gray-200">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Frontend Development</span>
                    <span className="text-sm font-medium text-green-600">Active</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">UI Design</span>
                    <span className="text-sm font-medium text-yellow-600">Pending</span>
                  </div>
                </div>
              </div>
            )}
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link to="/gigs" className="font-medium text-purple-600 hover:text-purple-500 flex items-center">
                  View all gigs
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Earnings Stats */}
          <div 
            className="bg-white overflow-hidden shadow-lg rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer border border-gray-100"
            onClick={() => toggleSection('earnings')}
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-100 p-3 rounded-lg">
                  <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Earnings</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">$850</div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        <span>+$150 this month</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            {expandedSection === 'earnings' && (
              <div className="bg-gray-50 px-5 py-3 border-t border-gray-200">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">This Month</span>
                    <span className="text-sm font-medium text-green-600">$150</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Last Month</span>
                    <span className="text-sm font-medium text-gray-600">$700</span>
                  </div>
                </div>
              </div>
            )}
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link to="/gigs" className="font-medium text-purple-600 hover:text-purple-500 flex items-center">
                  View earnings
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* Left Column - Recent Activity and Quick Actions */}
          <div className="lg:col-span-2 space-y-5">
            {/* Recent Activity with Interactive Timeline */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
              </div>
              <div className="border-t border-gray-200">
                <ul className="divide-y divide-gray-200">
                  <li className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">Completed JavaScript Skill Test</p>
                          <p className="text-sm text-gray-500">Earned 100 points</p>
                        </div>
                      </div>
                      <div className="ml-2 flex-shrink-0">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Completed
                        </span>
                      </div>
                    </div>
                  </li>
                  <li className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">New Portfolio Project Added</p>
                          <p className="text-sm text-gray-500">E-commerce Website</p>
                        </div>
                      </div>
                      <div className="ml-2 flex-shrink-0">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          New
                        </span>
                      </div>
                    </div>
                  </li>
                  <li className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">Mentorship Session Scheduled</p>
                          <p className="text-sm text-gray-500">With John Smith - UI/UX Expert</p>
                        </div>
                      </div>
                      <div className="ml-2 flex-shrink-0">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Upcoming
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Quick Actions with Hover Effects */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Quick Actions</h3>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Link
                    to="/skill-test"
                    className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-purple-500 hover:shadow-md transition-all duration-200 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500"
                  >
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="absolute inset-0" aria-hidden="true" />
                      <p className="text-sm font-medium text-gray-900">Take Skill Test</p>
                      <p className="text-sm text-gray-500">Validate your skills</p>
                    </div>
                  </Link>

                  <Link
                    to="/portfolio"
                    className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-purple-500 hover:shadow-md transition-all duration-200 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500"
                  >
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="absolute inset-0" aria-hidden="true" />
                      <p className="text-sm font-medium text-gray-900">Update Portfolio</p>
                      <p className="text-sm text-gray-500">Add new projects</p>
                    </div>
                  </Link>

                  <Link
                    to="/gigs"
                    className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-purple-500 hover:shadow-md transition-all duration-200 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500"
                  >
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="absolute inset-0" aria-hidden="true" />
                      <p className="text-sm font-medium text-gray-900">Browse Gigs</p>
                      <p className="text-sm text-gray-500">Find opportunities</p>
                    </div>
                  </Link>

                  <Link
                    to="/mentorship"
                    className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-purple-500 hover:shadow-md transition-all duration-200 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500"
                  >
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="absolute inset-0" aria-hidden="true" />
                      <p className="text-sm font-medium text-gray-900">Book Mentorship</p>
                      <p className="text-sm text-gray-500">Get expert guidance</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Recommended Gigs with Interactive Cards */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Recommended Gigs</h3>
              </div>
              <div className="border-t border-gray-200">
                <ul className="divide-y divide-gray-200">
                  <li className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-purple-600 truncate">Frontend Developer</p>
                        <p className="text-sm text-gray-500">E-commerce Website Development</p>
                        <div className="mt-2 flex">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            $500-800
                          </span>
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            React
                          </span>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <Link to="/gigs/1" className="font-medium text-purple-600 hover:text-purple-500">
                          View
                        </Link>
                      </div>
                    </div>
                  </li>
                  <li className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-purple-600 truncate">UI/UX Designer</p>
                        <p className="text-sm text-gray-500">Mobile App Design</p>
                        <div className="mt-2 flex">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            $400-600
                          </span>
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Figma
                          </span>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <Link to="/gigs/2" className="font-medium text-purple-600 hover:text-purple-500">
                          View
                        </Link>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Calendar and Upcoming Deadlines */}
          <div className="space-y-5">
            {/* Interactive Calendar */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Calendar</h3>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                <div className="text-center">
                  <div className="flex items-center justify-between mb-4">
                    <button 
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                      onClick={() => {
                        const newDate = new Date(selectedDate);
                        newDate.setMonth(newDate.getMonth() - 1);
                        setSelectedDate(newDate);
                      }}
                    >
                      <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </h4>
                    <button 
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                      onClick={() => {
                        const newDate = new Date(selectedDate);
                        newDate.setMonth(newDate.getMonth() + 1);
                        setSelectedDate(newDate);
                      }}
                    >
                      <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                      <div key={day} className="text-sm font-medium text-gray-500 py-2">
                        {day}
                      </div>
                    ))}
                    {renderCalendar()}
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Deadlines with Interactive Items */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Upcoming Deadlines</h3>
              </div>
              <div className="border-t border-gray-200">
                <ul className="divide-y divide-gray-200">
                  <li className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">React Skill Test</p>
                        <p className="text-sm text-gray-500">Due in 2 days</p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Upcoming
                        </span>
                      </div>
                    </div>
                  </li>
                  <li className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">Portfolio Review</p>
                        <p className="text-sm text-gray-500">Due in 5 days</p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Upcoming
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Skill Progress with Interactive Bars */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Skill Progress</h3>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">JavaScript</span>
                      <span className="text-sm font-medium text-gray-700">80%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: '80%' }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">React</span>
                      <span className="text-sm font-medium text-gray-700">65%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: '65%' }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">UI/UX Design</span>
                      <span className="text-sm font-medium text-gray-700">45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: '45%' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 