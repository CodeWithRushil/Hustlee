import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import EmojiPicker from 'emoji-picker-react';
import {
  PaperAirplaneIcon,
  PaperClipIcon,
  PhotoIcon,
  XMarkIcon,
  EllipsisHorizontalIcon,
  PhoneIcon,
  VideoCameraIcon,
  FaceSmileIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const MentorChat = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showReactionPicker, setShowReactionPicker] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const reactionPickerRef = useRef(null);

  // Mock student data - replace with API call
  const student = {
    id: studentId,
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe',
    status: 'online',
    lastSeen: '2 minutes ago'
  };

  // Mock messages - replace with API call
  useEffect(() => {
    const mockMessages = [
      {
        id: 1,
        sender: 'student',
        content: 'Hi! I have a question about the React project.',
        timestamp: '10:30 AM',
        status: 'read',
        reactions: [
          { emoji: '👍', count: 1, users: ['mentor'] }
        ]
      },
      {
        id: 2,
        sender: 'mentor',
        content: 'Sure, what would you like to know?',
        timestamp: '10:31 AM',
        status: 'read',
        reactions: []
      },
      {
        id: 3,
        sender: 'student',
        content: 'I\'m having trouble with state management in my components.',
        timestamp: '10:32 AM',
        status: 'read',
        reactions: []
      },
      {
        id: 4,
        sender: 'mentor',
        content: 'Let\'s go through it together. Can you share your code?',
        timestamp: '10:33 AM',
        status: 'read',
        reactions: []
      }
    ];
    setMessages(mockMessages);
  }, []);

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
      if (reactionPickerRef.current && !reactionPickerRef.current.contains(event.target)) {
        setShowReactionPicker(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: 'mentor',
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
      reactions: []
    };

    setMessages([...messages, newMessage]);
    setMessage('');
    setIsTyping(true);

    // Simulate student typing and response
    setTimeout(() => {
      setIsTyping(false);
      const studentResponse = {
        id: Date.now() + 1,
        sender: 'student',
        content: 'Thanks for your help! I\'ll try that.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sent',
        reactions: []
      };
      setMessages(prev => [...prev, studentResponse]);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Handle file upload logic here
      toast.success('File uploaded successfully!');
    }
  };

  const onEmojiClick = (emojiData) => {
    setMessage(prev => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const onReactionClick = (messageId, emojiData) => {
    setMessages(prevMessages => 
      prevMessages.map(msg => {
        if (msg.id === messageId) {
          const existingReaction = msg.reactions.find(r => r.emoji === emojiData.emoji);
          if (existingReaction) {
            // Toggle reaction
            if (existingReaction.users.includes('mentor')) {
              existingReaction.users = existingReaction.users.filter(u => u !== 'mentor');
              existingReaction.count--;
              if (existingReaction.count === 0) {
                return {
                  ...msg,
                  reactions: msg.reactions.filter(r => r.emoji !== emojiData.emoji)
                };
              }
            } else {
              existingReaction.users.push('mentor');
              existingReaction.count++;
            }
          } else {
            // Add new reaction
            msg.reactions.push({
              emoji: emojiData.emoji,
              count: 1,
              users: ['mentor']
            });
          }
        }
        return msg;
      })
    );
    setShowReactionPicker(null);
  };

  const getReactionCount = (reactions, emoji) => {
    const reaction = reactions.find(r => r.emoji === emoji);
    return reaction ? reaction.count : 0;
  };

  const hasReacted = (reactions, emoji) => {
    const reaction = reactions.find(r => r.emoji === emoji);
    return reaction?.users.includes('mentor') || false;
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={student.avatar}
              alt={student.name}
              className="h-10 w-10 rounded-full"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{student.name}</h2>
              <p className="text-sm text-gray-500">
                {student.status === 'online' ? (
                  <span className="flex items-center">
                    <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                    Online
                  </span>
                ) : (
                  `Last seen ${student.lastSeen}`
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700">
              <PhoneIcon className="h-6 w-6" />
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <VideoCameraIcon className="h-6 w-6" />
            </button>
            <button
              onClick={() => navigate(-1)}
              className="text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${msg.sender === 'mentor' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="relative group">
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    msg.sender === 'mentor'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-900 shadow-sm'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <div className={`flex items-center mt-1 text-xs ${
                    msg.sender === 'mentor' ? 'text-purple-200' : 'text-gray-500'
                  }`}>
                    <span>{msg.timestamp}</span>
                    {msg.sender === 'mentor' && (
                      <span className="ml-2">
                        {msg.status === 'read' ? '✓✓' : '✓'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Reactions */}
                {msg.reactions.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {msg.reactions.map((reaction, index) => (
                      <div
                        key={index}
                        className={`flex items-center px-2 py-1 rounded-full text-xs ${
                          hasReacted(msg.reactions, reaction.emoji)
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <span>{reaction.emoji}</span>
                        <span className="ml-1">{reaction.count}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reaction Button */}
                <button
                  onClick={() => setShowReactionPicker(msg.id)}
                  className="absolute -right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <PlusIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>

                {/* Reaction Picker */}
                {showReactionPicker === msg.id && (
                  <div
                    ref={reactionPickerRef}
                    className="absolute -right-8 top-1/2 -translate-y-1/2 z-50"
                  >
                    <EmojiPicker
                      onEmojiClick={(emojiData) => onReactionClick(msg.id, emojiData)}
                      width={300}
                      height={400}
                      theme="light"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-2 text-gray-500 text-sm"
          >
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <span>Student is typing...</span>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-gray-500 hover:text-gray-700"
          >
            <PaperClipIcon className="h-6 w-6" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
          />
          <div className="relative" ref={emojiPickerRef}>
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaceSmileIcon className="h-6 w-6" />
            </button>
            {showEmojiPicker && (
              <div className="absolute bottom-12 left-0 z-50">
                <EmojiPicker
                  onEmojiClick={onEmojiClick}
                  width={300}
                  height={400}
                  theme="light"
                />
              </div>
            )}
          </div>
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              rows={1}
              className="w-full rounded-full border border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 px-4 py-2 resize-none"
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className={`p-2 rounded-full ${
              message.trim()
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <PaperAirplaneIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorChat; 