import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { PaperAirplaneIcon, PaperClipIcon } from '@heroicons/react/24/outline';

const MentorChat = ({ studentId, studentName }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Mock messages - Replace with actual API calls
  const mockMessages = [
    { id: 1, sender: 'student', text: 'Hi mentor, I have a question about React hooks', timestamp: '10:30 AM' },
    { id: 2, sender: 'mentor', text: 'Sure, what would you like to know?', timestamp: '10:31 AM' },
    { id: 3, sender: 'student', text: 'I\'m confused about useEffect dependencies', timestamp: '10:32 AM' },
  ];

  useEffect(() => {
    // Simulate loading messages
    setMessages(mockMessages);
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: messages.length + 1,
      sender: 'mentor',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, message]);
    setNewMessage('');
    scrollToBottom();
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-xl shadow-sm">
      {/* Chat Header */}
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
          <div>
            <h3 className="font-medium text-gray-900">{studentName}</h3>
            <p className="text-sm text-gray-500">Online</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.sender === 'mentor' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.sender === 'mentor'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p>{message.text}</p>
              <p
                className={`text-xs mt-1 ${
                  message.sender === 'mentor' ? 'text-blue-100' : 'text-gray-500'
                }`}
              >
                {message.timestamp}
              </p>
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
          >
            <PaperClipIcon className="h-5 w-5" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="p-2 text-blue-600 hover:text-blue-700 rounded-full hover:bg-blue-50"
          >
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MentorChat; 