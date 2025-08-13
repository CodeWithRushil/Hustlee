import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

// Define a list of common skills
const commonSkills = [
  'JavaScript', 'React', 'Node.js', 'Python', 'Data Science', 'UI/UX', 'DevOps', 'Mobile Development', 'Java', 'C++', 'Ruby', 'PHP', 'SQL', 'MongoDB', 'AWS', 'Docker', 'Kubernetes', 'Machine Learning', 'AI', 'Blockchain'
];

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'student',
    name: '',
    // Student specific fields
    education: '',
    skills: [],
    interests: [],
    // Mentor specific fields
    expertise: [],
    yearsOfExperience: '',
    hourlyRate: '',
    // Company specific fields
    companyName: '',
    industry: '',
    size: '',
    website: '',
    // Employee specific fields
    department: '',
    role: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayInput = (e, field) => {
    const values = e.target.value.split(',').map(item => item.trim());
    setFormData(prev => ({
      ...prev,
      [field]: values
    }));
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    // Validate user type specific fields
    switch (formData.userType) {
      case 'student':
        if (!formData.education) {
          setError('Education is required for students');
          return false;
        }
        break;
      case 'mentor':
        if (!formData.expertise.length || !formData.yearsOfExperience || !formData.hourlyRate) {
          setError('Please fill in all mentor-specific fields');
          return false;
        }
        break;
      case 'company':
        if (!formData.companyName || !formData.industry) {
          setError('Please fill in all company-specific fields');
          return false;
        }
        break;
      case 'employee':
        if (!formData.department || !formData.role) {
          setError('Please fill in all employee-specific fields');
          return false;
        }
        break;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Remove confirmPassword from the request
      const { confirmPassword, ...registrationData } = formData;

      const response = await fetch('https://hustleeworkspace.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationData)
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle validation errors
        if (data.errors && Array.isArray(data.errors)) {
          // Multiple validation errors
          throw new Error(data.errors.join('\n'));
        } else if (data.message) {
          // Single error message
          throw new Error(data.message);
        } else {
          throw new Error('Registration failed. Please check your input and try again.');
        }
      }

      // Store token and user data
      localStorage.setItem('token', data.token);
      login(data.user);

      // Redirect based on user type
      switch (data.user.userType) {
        case 'student':
          navigate('/dashboard');
          break;
        case 'mentor':
          navigate('/mentor/dashboard');
          break;
        case 'company':
          navigate('/company/dashboard');
          break;
        case 'employee':
          navigate('/employee/dashboard');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      // Format error message for display
      const errorMessage = err.message.split('\n').map((line, index) => (
        <div key={index} className="mb-1">
          {line}
        </div>
      ));
      setError(errorMessage);
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderUserTypeFields = () => {
    switch (formData.userType) {
      case 'student':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="education" className="block text-sm font-medium text-gray-700">
                Education
              </label>
              <input
                type="text"
                name="education"
                id="education"
                value={formData.education}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 py-2 text-base"
                placeholder="e.g., Bachelor's in Computer Science"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Skills
              </label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {commonSkills.map((skill) => (
                  <label key={skill} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.skills.includes(skill)}
                      onChange={(e) => {
                        const newSkills = e.target.checked
                          ? [...formData.skills, skill]
                          : formData.skills.filter((s) => s !== skill);
                        setFormData((prev) => ({ ...prev, skills: newSkills }));
                      }}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{skill}</span>
                  </label>
                ))}
              </div>
            </div>
          </motion.div>
        );
      case 'mentor':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expertise
              </label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {commonSkills.map((skill) => (
                  <label key={skill} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.expertise.includes(skill)}
                      onChange={(e) => {
                        const newExpertise = e.target.checked
                          ? [...formData.expertise, skill]
                          : formData.expertise.filter((s) => s !== skill);
                        setFormData((prev) => ({ ...prev, expertise: newExpertise }));
                      }}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{skill}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700">
                Years of Experience
              </label>
              <input
                type="number"
                name="yearsOfExperience"
                id="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 py-2 text-base"
                min="0"
                placeholder="e.g., 5"
              />
            </div>
            <div>
              <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700">
                Hourly Rate (USD)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 py-2 text-base">$</span>
                </div>
                <input
                  type="number"
                  name="hourlyRate"
                  id="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={handleChange}
                  className="block w-full pl-7 pr-12 rounded-md border-gray-300 focus:border-purple-500 focus:ring-purple-500 py-2 text-base"
                  min="0"
                  placeholder="0.00"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 py-2 text-base">/hr</span>
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 'company':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                id="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 py-2 text-base"
                placeholder="e.g., Tech Solutions Inc."
              />
            </div>
            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                Industry
              </label>
              <input
                type="text"
                name="industry"
                id="industry"
                value={formData.industry}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 py-2 text-base"
                placeholder="e.g., Software Development"
              />
            </div>
            <div>
              <label htmlFor="size" className="block text-sm font-medium text-gray-700">
                Company Size
              </label>
              <select
                name="size"
                id="size"
                value={formData.size}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 py-2 text-base"
              >
                <option value="">Select size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="501+">501+ employees</option>
              </select>
            </div>
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                Website
              </label>
              <input
                type="url"
                name="website"
                id="website"
                value={formData.website}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 py-2 text-base"
                placeholder="e.g., https://www.company.com"
              />
            </div>
          </motion.div>
        );
      case 'employee':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <input
                type="text"
                name="department"
                id="department"
                value={formData.department}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 py-2 text-base"
                placeholder="e.g., Engineering"
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <input
                type="text"
                name="role"
                id="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 py-2 text-base"
                placeholder="e.g., Senior Developer"
              />
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join Hustlee and start your journey
          </p>
        </div>

        <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-md bg-red-50 p-4"
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <div className="text-sm text-red-700">
                      {error}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
                  Account Type
                </label>
                <select
                  name="userType"
                  id="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 py-2 text-base"
                >
                  <option value="student">Student</option>
                  <option value="mentor">Mentor</option>
                  <option value="company">Company</option>
                  <option value="employee">Employee</option>
                </select>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 py-2 text-base"
                  placeholder="Alakh Pandey"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 py-2 text-base"
                  placeholder="alakhpandey@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 py-2 text-base"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 py-2 text-base"
                  placeholder="••••••••"
                />
              </div>

              {renderUserTypeFields()}
            </div>

            <div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </div>
                ) : (
                  'Create account'
                )}
              </motion.button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register; 
