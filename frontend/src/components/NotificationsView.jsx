import React from 'react';
import { motion } from 'framer-motion';
import { BellIcon, XMarkIcon } from '@heroicons/react/24/outline';

const NotificationsView = ({ notifications, onClose, onMarkAsRead, onMarkAllAsRead }) => {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <BellIcon className="h-6 w-6 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
            {unreadCount > 0 && (
              <span className="px-2 py-1 text-xs font-medium text-white bg-blue-500 rounded-full">
                {unreadCount} unread
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllAsRead}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Mark all as read
              </button>
            )}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {notifications.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-6 hover:bg-gray-50 cursor-pointer ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => onMarkAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.message}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {notification.time}
                      </p>
                    </div>
                    {!notification.read && (
                      <span className="inline-block h-2 w-2 rounded-full bg-blue-500"></span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              No notifications
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationsView; 