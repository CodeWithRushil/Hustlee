import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import {
  CameraIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  LinkIcon,
  GlobeAltIcon,
  ClockIcon,
  StarIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  PlusIcon,
  TrashIcon,
  PencilIcon,
  PencilSquareIcon,
  XMarkIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ArrowPathIcon,
  BellIcon,
  ShieldCheckIcon,
  BookOpenIcon,
  PresentationChartLineIcon,
  UserCircleIcon,
  LanguageIcon,
  TrophyIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { Dialog } from '@headlessui/react';

const MentorProfile = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('basic');
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    avatar: '',
    bio: '',
    expertise: [],
    experience: [],
    education: [],
    languages: [],
    hourlyRate: 0,
    timezone: '',
    availability: {
      monday: { start: '09:00', end: '17:00' },
      tuesday: { start: '09:00', end: '17:00' },
      wednesday: { start: '09:00', end: '17:00' },
      thursday: { start: '09:00', end: '17:00' },
      friday: { start: '09:00', end: '17:00' },
      saturday: { start: '10:00', end: '14:00' },
      sunday: { start: '', end: '' }
    },
    teachingStyle: {
      approach: '',
      methods: [],
      tools: [],
      resources: []
    },
    certifications: [],
    achievements: [],
    socialLinks: {
      linkedin: '',
      github: '',
      twitter: '',
      website: ''
    },
    preferences: {
      sessionDuration: 60,
      maxStudentsPerSession: 1,
      preferredCommunication: 'video',
      autoConfirmSessions: false,
      notificationSettings: {
        email: true,
        push: true,
        sms: false
      }
    }
  });
  const [editing, setEditing] = useState(false);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [showTeachingStyleModal, setShowTeachingStyleModal] = useState(false);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [newExpertise, setNewExpertise] = useState('');
  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    description: ''
  });
  const [newEducation, setNewEducation] = useState({
    degree: '',
    institution: '',
    year: '',
    field: ''
  });
  const [newLanguage, setNewLanguage] = useState({
    language: '',
    proficiency: 'intermediate'
  });
  const [newCertification, setNewCertification] = useState({
    name: '',
    issuer: '',
    date: '',
    expiry: ''
  });
  const [newAchievement, setNewAchievement] = useState({
    title: '',
    date: '',
    description: ''
  });
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [showEducationModal, setShowEducationModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showCertificationModal, setShowCertificationModal] = useState(false);
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [selectedCertification, setSelectedCertification] = useState(null);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [preferencesForm, setPreferencesForm] = useState({
    teachingStyle: '',
    availability: {
      monday: { start: '09:00', end: '17:00' },
      tuesday: { start: '09:00', end: '17:00' },
      wednesday: { start: '09:00', end: '17:00' },
      thursday: { start: '09:00', end: '17:00' },
      friday: { start: '09:00', end: '17:00' },
      saturday: { start: '10:00', end: '14:00' },
      sunday: { start: '10:00', end: '14:00' },
    },
    sessionDuration: 60,
    maxStudentsPerSession: 1,
    preferredCommunication: 'video',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://hustleeworkspace.onrender.com/api/mentor/profile');
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Fallback to mock data if API fails
      setProfile({
        name: 'Alakh Pandey',
        email: 'Alakh Pandey@example.com',
        avatar: null,
        bio: 'Experienced mentor with a passion for teaching and helping students achieve their goals.',
        expertise: [
          { skill: 'JavaScript', level: 'Expert' },
          { skill: 'React', level: 'Expert' },
          { skill: 'Node.js', level: 'Advanced' }
        ],
        experience: [
          {
            title: 'Senior Software Engineer',
            company: 'Tech Corp',
            startDate: '2020-01',
            endDate: 'Present',
            description: 'Leading development of enterprise applications.'
          }
        ],
        education: [
          {
            degree: 'Master of Computer Science',
            institution: 'University of Technology',
            startDate: '2018-09',
            endDate: '2020-06',
            description: 'Specialized in Software Engineering'
          }
        ],
        languages: [
          { language: 'English', proficiency: 'Native' },
          { language: 'Spanish', proficiency: 'Intermediate' }
        ],
        certifications: [
          {
            name: 'AWS Certified Developer',
            issuer: 'Amazon Web Services',
            date: '2021-03',
            description: 'Professional level certification for AWS development'
          }
        ],
        achievements: [
          {
            title: 'Best Mentor Award 2022',
            date: '2022-12',
            description: 'Recognized for outstanding mentorship and student success rate'
          }
        ],
        socialLinks: {
          linkedin: 'https://linkedin.com/in/johndoe',
          github: 'https://github.com/johndoe',
          twitter: 'https://twitter.com/johndoe',
          website: 'https://johndoe.com'
        },
        preferences: {
          teachingStyle: 'Interactive and hands-on approach with real-world examples',
          availability: {
            monday: { start: '09:00', end: '17:00' },
            tuesday: { start: '09:00', end: '17:00' },
            wednesday: { start: '09:00', end: '17:00' },
            thursday: { start: '09:00', end: '17:00' },
            friday: { start: '09:00', end: '17:00' },
            saturday: { start: '10:00', end: '14:00' },
            sunday: { start: '10:00', end: '14:00' }
          },
          sessionDuration: 60,
          maxStudentsPerSession: 1,
          preferredCommunication: 'video'
        }
      });
      toast.error('Using demo data - API not available');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(
        'http://localhost:5000/api/mentor/profile',
        profile,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      updateUser(response.data);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('An error occurred while updating profile');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await axios.post(
        'https://hustleeworkspace.onrender.com/api/mentor/profile/avatar',
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      updateUser(response.data);
      toast.success('Profile picture updated successfully!');
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast.error('An error occurred while uploading profile picture');
    }
  };

  const handleAddExpertise = () => {
    if (newExpertise.trim()) {
      setProfile({
        ...profile,
        expertise: [...profile.expertise, newExpertise.trim()]
      });
      setNewExpertise('');
    }
  };

  const handleAddExperience = () => {
    if (newExperience.title && newExperience.company) {
      setProfile({
        ...profile,
        experience: [...profile.experience, newExperience],
      });
      setNewExperience({
        title: '',
        company: '',
        startDate: '',
        endDate: '',
        description: '',
      });
      setShowExperienceModal(false);
      toast.success('Experience added successfully');
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const handleAddEducation = () => {
    if (newEducation.degree && newEducation.institution) {
      setProfile({
        ...profile,
        education: [...profile.education, newEducation],
      });
      setNewEducation({
        degree: '',
        institution: '',
        year: '',
        field: '',
      });
      setShowEducationModal(false);
      toast.success('Education added successfully');
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const handleAddLanguage = () => {
    if (newLanguage.language) {
      setProfile({
        ...profile,
        languages: [...profile.languages, newLanguage],
      });
      setNewLanguage({
        language: '',
        proficiency: 'intermediate',
      });
      setShowLanguageModal(false);
      toast.success('Language added successfully');
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const handleAddCertification = () => {
    if (newCertification.name && newCertification.issuer) {
      setProfile({
        ...profile,
        certifications: [...profile.certifications, newCertification],
      });
      setNewCertification({
        name: '',
        issuer: '',
        date: '',
        expiry: '',
      });
      setShowCertificationModal(false);
      toast.success('Certification added successfully');
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const handleAddAchievement = () => {
    if (newAchievement.title) {
      setProfile({
        ...profile,
        achievements: [...profile.achievements, newAchievement],
      });
      setNewAchievement({
        title: '',
        date: '',
        description: '',
      });
      setShowAchievementModal(false);
      toast.success('Achievement added successfully');
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    // Validate required fields
    if (!profile.name || !profile.email) {
      toast.error('Name and email are required');
      return;
    }

    // Update the profile state
    const updatedProfile = {
      ...profile,
      expertise: profile.expertise || [],
      experience: profile.experience || [],
      education: profile.education || [],
      languages: profile.languages || [],
      certifications: profile.certifications || [],
      achievements: profile.achievements || [],
      socialLinks: profile.socialLinks || {
        linkedin: '',
        github: '',
        twitter: '',
        website: '',
      },
      preferences: profile.preferences || {
        teachingStyle: '',
        availability: {
          monday: { start: '09:00', end: '17:00' },
          tuesday: { start: '09:00', end: '17:00' },
          wednesday: { start: '09:00', end: '17:00' },
          thursday: { start: '09:00', end: '17:00' },
          friday: { start: '09:00', end: '17:00' },
          saturday: { start: '10:00', end: '14:00' },
          sunday: { start: '10:00', end: '14:00' },
        },
        sessionDuration: 60,
        maxStudentsPerSession: 1,
        preferredCommunication: 'video',
      },
    };

    // Update the state
    setProfile(updatedProfile);
    setEditing(false);
    toast.success('Profile updated successfully');

    // Log for debugging
    console.log('Updated profile:', updatedProfile);
  };

  const handleCancel = () => {
    setEditing(false);
    fetchProfile(); // Reset to original data
  };

  const handlePreferencesEdit = () => {
    setPreferencesForm(profile.preferences);
    setShowPreferencesModal(true);
  };

  const handlePreferencesSave = () => {
    setProfile(prev => ({
      ...prev,
      preferences: preferencesForm
    }));
    setShowPreferencesModal(false);
    toast.success('Preferences updated successfully');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <div className="relative">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
              ) : (
                <UserCircleIcon className="h-16 w-16 text-gray-400" />
              )}
              {editing && (
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 bg-purple-600 rounded-full p-1 cursor-pointer hover:bg-purple-700"
                >
                  <CameraIcon className="h-4 w-4 text-white" />
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setProfile(prev => ({
                            ...prev,
                            avatar: reader.result
                          }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              )}
            </div>
            <div className="space-y-2">
              {editing ? (
                <>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    className="block w-full text-2xl font-bold text-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Your name"
                  />
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    className="block w-full text-gray-500 border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Your email"
                  />
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                  <p className="text-gray-500">{profile.email}</p>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <StarIcon className="h-5 w-5 text-yellow-400" />
              <span className="text-sm font-medium text-gray-900">
                {profile.expertise.length} Skills
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <BriefcaseIcon className="h-5 w-5 text-indigo-400" />
              <span className="text-sm font-medium text-gray-900">
                {profile.experience.length} Years
              </span>
            </div>
            {editing ? (
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={handleEdit}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <PencilIcon className="h-4 w-4 mr-1" />
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bio */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">About</h3>
            {editing ? (
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                rows={4}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
              />
            ) : (
              <p className="text-gray-600">{profile.bio}</p>
            )}
          </div>

          {/* Expertise */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Expertise</h3>
              {editing && (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newExpertise}
                    onChange={(e) => setNewExpertise(e.target.value)}
                    placeholder="Add new expertise"
                    className="border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  />
                  <button
                    onClick={handleAddExpertise}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.expertise.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
                >
                  {skill.skill}
                  {editing && (
                    <button
                      onClick={() => {
                        setProfile({
                          ...profile,
                          expertise: profile.expertise.filter((_, i) => i !== index)
                        });
                      }}
                      className="ml-2 text-purple-600 hover:text-purple-800"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Experience</h3>
              <button
                onClick={() => setShowExperienceModal(true)}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                Add Experience
              </button>
            </div>
            <div className="space-y-4">
              {profile.experience.map((exp, index) => (
                <div key={index} className="border-l-4 border-purple-500 pl-4">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{exp.title}</h4>
                      <p className="text-sm text-gray-500">{exp.company}</p>
                    </div>
                    {editing && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedExperience(exp);
                            setShowExperienceModal(true);
                          }}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <PencilSquareIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => {
                            setProfile({
                              ...profile,
                              experience: profile.experience.filter((_, i) => i !== index)
                            });
                          }}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {exp.startDate} - {exp.endDate}
                  </p>
                  <p className="mt-2 text-gray-600">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Education</h3>
              <button
                onClick={() => setShowEducationModal(true)}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                Add Education
              </button>
            </div>
            <div className="space-y-4">
              {profile.education.map((edu, index) => (
                <div key={index} className="border-l-4 border-purple-500 pl-4">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{edu.degree}</h4>
                      <p className="text-sm text-gray-500">{edu.institution}</p>
                    </div>
                    {editing && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedEducation(edu);
                            setShowEducationModal(true);
                          }}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <PencilSquareIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => {
                            setProfile({
                              ...profile,
                              education: profile.education.filter((_, i) => i !== index)
                            });
                          }}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {edu.startDate} - {edu.endDate}
                  </p>
                  <p className="mt-2 text-gray-600">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Preferences Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Preferences</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Teaching Style</h4>
                {editing ? (
                  <textarea
                    value={profile.preferences.teachingStyle}
                    onChange={(e) => setProfile(prev => ({
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        teachingStyle: e.target.value
                      }
                    }))}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    rows={3}
                  />
                ) : (
                  <p className="text-gray-900">{profile.preferences.teachingStyle || 'Not specified'}</p>
                )}
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Session Duration</h4>
                {editing ? (
                  <input
                    type="number"
                    value={profile.preferences.sessionDuration}
                    onChange={(e) => setProfile(prev => ({
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        sessionDuration: parseInt(e.target.value)
                      }
                    }))}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  />
                ) : (
                  <p className="text-gray-900">{profile.preferences.sessionDuration} minutes</p>
                )}
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Max Students per Session</h4>
                {editing ? (
                  <input
                    type="number"
                    value={profile.preferences.maxStudentsPerSession}
                    onChange={(e) => setProfile(prev => ({
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        maxStudentsPerSession: parseInt(e.target.value)
                      }
                    }))}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  />
                ) : (
                  <p className="text-gray-900">{profile.preferences.maxStudentsPerSession}</p>
                )}
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Preferred Communication</h4>
                {editing ? (
                  <select
                    value={profile.preferences.preferredCommunication}
                    onChange={(e) => setProfile(prev => ({
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        preferredCommunication: e.target.value
                      }
                    }))}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="video">Video Call</option>
                    <option value="audio">Audio Call</option>
                    <option value="chat">Chat</option>
                  </select>
                ) : (
                  <p className="text-gray-900 capitalize">{profile.preferences.preferredCommunication}</p>
                )}
              </div>
            </div>
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Availability</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(profile.preferences.availability).map(([day, hours]) => (
                  <div key={day} className="bg-gray-50 rounded-lg p-3">
                    <h5 className="text-sm font-medium text-gray-900 capitalize mb-2">{day}</h5>
                    {editing ? (
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs text-gray-500">Start</label>
                          <input
                            type="time"
                            value={hours.start}
                            onChange={(e) => setProfile(prev => ({
                              ...prev,
                              preferences: {
                                ...prev.preferences,
                                availability: {
                                  ...prev.preferences.availability,
                                  [day]: { ...prev.preferences.availability[day], start: e.target.value }
                                }
                              }
                            }))}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500">End</label>
                          <input
                            type="time"
                            value={hours.end}
                            onChange={(e) => setProfile(prev => ({
                              ...prev,
                              preferences: {
                                ...prev.preferences,
                                availability: {
                                  ...prev.preferences.availability,
                                  [day]: { ...prev.preferences.availability[day], end: e.target.value }
                                }
                              }
                            }))}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                          />
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">
                        {hours.start} - {hours.end}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Languages */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Languages</h3>
              <button
                onClick={() => setShowLanguageModal(true)}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                Add Language
              </button>
            </div>
            <div className="space-y-2">
              {profile.languages.map((lang, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{lang.language}</p>
                    <p className="text-xs text-gray-500 capitalize">{lang.proficiency}</p>
                  </div>
                  {editing && (
                    <button
                      onClick={() => {
                        setProfile({
                          ...profile,
                          languages: profile.languages.filter((_, i) => i !== index)
                        });
                      }}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Certifications</h3>
              <button
                onClick={() => setShowCertificationModal(true)}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                Add Certification
              </button>
            </div>
            <div className="space-y-4">
              {profile.certifications.map((cert, index) => (
                <div key={index} className="border-l-4 border-purple-500 pl-4">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{cert.name}</h4>
                      <p className="text-xs text-gray-500">{cert.issuer}</p>
                    </div>
                    {editing && (
                      <button
                        onClick={() => {
                          setProfile({
                            ...profile,
                            certifications: profile.certifications.filter((_, i) => i !== index)
                          });
                        }}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    {cert.date} - {cert.expiry}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Achievements</h3>
              <button
                onClick={() => setShowAchievementModal(true)}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                Add Achievement
              </button>
            </div>
            <div className="space-y-4">
              {profile.achievements.map((achievement, index) => (
                <div key={index} className="border-l-4 border-purple-500 pl-4">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{achievement.title}</h4>
                      <p className="text-xs text-gray-500">{achievement.date}</p>
                    </div>
                    {editing && (
                      <button
                        onClick={() => {
                          setProfile({
                            ...profile,
                            achievements: profile.achievements.filter((_, i) => i !== index)
                          });
                        }}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Social Links</h3>
            <div className="space-y-3">
              {Object.entries(profile.socialLinks).map(([platform, url]) => (
                <div key={platform} className="flex items-center">
                  <span className="text-sm font-medium text-gray-500 w-24 capitalize">
                    {platform}
                  </span>
                  {editing ? (
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => setProfile({
                        ...profile,
                        socialLinks: {
                          ...profile.socialLinks,
                          [platform]: e.target.value
                        }
                      })}
                      className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    />
                  ) : (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-purple-600 hover:text-purple-800"
                    >
                      {url}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Experience Modal */}
      {showExperienceModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {selectedExperience ? 'Edit Experience' : 'Add Experience'}
              </h3>
              <button
                onClick={() => {
                  setShowExperienceModal(false);
                  setSelectedExperience(null);
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={selectedExperience?.title || newExperience.title}
                  onChange={(e) => selectedExperience
                    ? setSelectedExperience({ ...selectedExperience, title: e.target.value })
                    : setNewExperience({ ...newExperience, title: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Company</label>
                <input
                  type="text"
                  value={selectedExperience?.company || newExperience.company}
                  onChange={(e) => selectedExperience
                    ? setSelectedExperience({ ...selectedExperience, company: e.target.value })
                    : setNewExperience({ ...newExperience, company: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="month"
                    value={selectedExperience?.startDate || newExperience.startDate}
                    onChange={(e) => selectedExperience
                      ? setSelectedExperience({ ...selectedExperience, startDate: e.target.value })
                      : setNewExperience({ ...newExperience, startDate: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <input
                    type="month"
                    value={selectedExperience?.endDate || newExperience.endDate}
                    onChange={(e) => selectedExperience
                      ? setSelectedExperience({ ...selectedExperience, endDate: e.target.value })
                      : setNewExperience({ ...newExperience, endDate: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={selectedExperience?.description || newExperience.description}
                  onChange={(e) => selectedExperience
                    ? setSelectedExperience({ ...selectedExperience, description: e.target.value })
                    : setNewExperience({ ...newExperience, description: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => {
                    setShowExperienceModal(false);
                    setSelectedExperience(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (selectedExperience) {
                      setProfile({
                        ...profile,
                        experience: profile.experience.map(exp =>
                          exp === selectedExperience ? selectedExperience : exp
                        )
                      });
                    } else {
                      handleAddExperience();
                    }
                    setShowExperienceModal(false);
                    setSelectedExperience(null);
                  }}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  {selectedExperience ? 'Update' : 'Add'} Experience
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Education Modal */}
      {showEducationModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {selectedEducation ? 'Edit Education' : 'Add Education'}
              </h3>
              <button
                onClick={() => {
                  setShowEducationModal(false);
                  setSelectedEducation(null);
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Degree</label>
                <input
                  type="text"
                  value={selectedEducation?.degree || newEducation.degree}
                  onChange={(e) => selectedEducation
                    ? setSelectedEducation({ ...selectedEducation, degree: e.target.value })
                    : setNewEducation({ ...newEducation, degree: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Institution</label>
                <input
                  type="text"
                  value={selectedEducation?.institution || newEducation.institution}
                  onChange={(e) => selectedEducation
                    ? setSelectedEducation({ ...selectedEducation, institution: e.target.value })
                    : setNewEducation({ ...newEducation, institution: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="month"
                    value={selectedEducation?.startDate || newEducation.startDate}
                    onChange={(e) => selectedEducation
                      ? setSelectedEducation({ ...selectedEducation, startDate: e.target.value })
                      : setNewEducation({ ...newEducation, startDate: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <input
                    type="month"
                    value={selectedEducation?.endDate || newEducation.endDate}
                    onChange={(e) => selectedEducation
                      ? setSelectedEducation({ ...selectedEducation, endDate: e.target.value })
                      : setNewEducation({ ...newEducation, endDate: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={selectedEducation?.description || newEducation.description}
                  onChange={(e) => selectedEducation
                    ? setSelectedEducation({ ...selectedEducation, description: e.target.value })
                    : setNewEducation({ ...newEducation, description: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => {
                    setShowEducationModal(false);
                    setSelectedEducation(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (selectedEducation) {
                      setProfile({
                        ...profile,
                        education: profile.education.map(edu =>
                          edu === selectedEducation ? selectedEducation : edu
                        )
                      });
                    } else {
                      handleAddEducation();
                    }
                    setShowEducationModal(false);
                    setSelectedEducation(null);
                  }}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  {selectedEducation ? 'Update' : 'Add'} Education
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Language Modal */}
      {showLanguageModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Add Language</h3>
              <button
                onClick={() => setShowLanguageModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Language</label>
                <input
                  type="text"
                  value={newLanguage.language}
                  onChange={(e) => setNewLanguage({ ...newLanguage, language: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Proficiency</label>
                <select
                  value={newLanguage.proficiency}
                  onChange={(e) => setNewLanguage({ ...newLanguage, proficiency: e.target.value })}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="native">Native</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowLanguageModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleAddLanguage();
                    setShowLanguageModal(false);
                  }}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Add Language
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Certification Modal */}
      {showCertificationModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {selectedCertification ? 'Edit Certification' : 'Add Certification'}
              </h3>
              <button
                onClick={() => {
                  setShowCertificationModal(false);
                  setSelectedCertification(null);
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Certification Name</label>
                <input
                  type="text"
                  value={selectedCertification?.name || newCertification.name}
                  onChange={(e) => selectedCertification
                    ? setSelectedCertification({ ...selectedCertification, name: e.target.value })
                    : setNewCertification({ ...newCertification, name: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Issuing Organization</label>
                <input
                  type="text"
                  value={selectedCertification?.issuer || newCertification.issuer}
                  onChange={(e) => selectedCertification
                    ? setSelectedCertification({ ...selectedCertification, issuer: e.target.value })
                    : setNewCertification({ ...newCertification, issuer: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Issue Date</label>
                  <input
                    type="month"
                    value={selectedCertification?.date || newCertification.date}
                    onChange={(e) => selectedCertification
                      ? setSelectedCertification({ ...selectedCertification, date: e.target.value })
                      : setNewCertification({ ...newCertification, date: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                  <input
                    type="month"
                    value={selectedCertification?.expiry || newCertification.expiry}
                    onChange={(e) => selectedCertification
                      ? setSelectedCertification({ ...selectedCertification, expiry: e.target.value })
                      : setNewCertification({ ...newCertification, expiry: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => {
                    setShowCertificationModal(false);
                    setSelectedCertification(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (selectedCertification) {
                      setProfile({
                        ...profile,
                        certifications: profile.certifications.map(cert =>
                          cert === selectedCertification ? selectedCertification : cert
                        )
                      });
                    } else {
                      handleAddCertification();
                    }
                    setShowCertificationModal(false);
                    setSelectedCertification(null);
                  }}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  {selectedCertification ? 'Update' : 'Add'} Certification
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Achievement Modal */}
      {showAchievementModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {selectedAchievement ? 'Edit Achievement' : 'Add Achievement'}
              </h3>
              <button
                onClick={() => {
                  setShowAchievementModal(false);
                  setSelectedAchievement(null);
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={selectedAchievement?.title || newAchievement.title}
                  onChange={(e) => selectedAchievement
                    ? setSelectedAchievement({ ...selectedAchievement, title: e.target.value })
                    : setNewAchievement({ ...newAchievement, title: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="month"
                  value={selectedAchievement?.date || newAchievement.date}
                  onChange={(e) => selectedAchievement
                    ? setSelectedAchievement({ ...selectedAchievement, date: e.target.value })
                    : setNewAchievement({ ...newAchievement, date: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={selectedAchievement?.description || newAchievement.description}
                  onChange={(e) => selectedAchievement
                    ? setSelectedAchievement({ ...selectedAchievement, description: e.target.value })
                    : setNewAchievement({ ...newAchievement, description: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => {
                    setShowAchievementModal(false);
                    setSelectedAchievement(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (selectedAchievement) {
                      setProfile({
                        ...profile,
                        achievements: profile.achievements.map(achievement =>
                          achievement === selectedAchievement ? selectedAchievement : achievement
                        )
                      });
                    } else {
                      handleAddAchievement();
                    }
                    setShowAchievementModal(false);
                    setSelectedAchievement(null);
                  }}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  {selectedAchievement ? 'Update' : 'Add'} Achievement
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      <Dialog
        open={showPreferencesModal}
        onClose={() => setShowPreferencesModal(false)}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="relative bg-white rounded-lg max-w-2xl w-full mx-4 p-6">
            <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
              Edit Preferences
            </Dialog.Title>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Teaching Style</label>
                <textarea
                  value={preferencesForm.teachingStyle}
                  onChange={(e) => setPreferencesForm(prev => ({
                    ...prev,
                    teachingStyle: e.target.value
                  }))}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Session Duration (minutes)</label>
                <input
                  type="number"
                  value={preferencesForm.sessionDuration}
                  onChange={(e) => setPreferencesForm(prev => ({
                    ...prev,
                    sessionDuration: parseInt(e.target.value)
                  }))}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Max Students per Session</label>
                <input
                  type="number"
                  value={preferencesForm.maxStudentsPerSession}
                  onChange={(e) => setPreferencesForm(prev => ({
                    ...prev,
                    maxStudentsPerSession: parseInt(e.target.value)
                  }))}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Preferred Communication</label>
                <select
                  value={preferencesForm.preferredCommunication}
                  onChange={(e) => setPreferencesForm(prev => ({
                    ...prev,
                    preferredCommunication: e.target.value
                  }))}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="video">Video Call</option>
                  <option value="audio">Audio Call</option>
                  <option value="chat">Chat</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(preferencesForm.availability).map(([day, hours]) => (
                    <div key={day} className="bg-gray-50 rounded-lg p-3">
                      <h5 className="text-sm font-medium text-gray-900 capitalize mb-2">{day}</h5>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs text-gray-500">Start</label>
                          <input
                            type="time"
                            value={hours.start}
                            onChange={(e) => setPreferencesForm(prev => ({
                              ...prev,
                              availability: {
                                ...prev.availability,
                                [day]: { ...prev.availability[day], start: e.target.value }
                              }
                            }))}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500">End</label>
                          <input
                            type="time"
                            value={hours.end}
                            onChange={(e) => setPreferencesForm(prev => ({
                              ...prev,
                              availability: {
                                ...prev.availability,
                                [day]: { ...prev.availability[day], end: e.target.value }
                              }
                            }))}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowPreferencesModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Cancel
              </button>
              <button
                onClick={handlePreferencesSave}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default MentorProfile; 
