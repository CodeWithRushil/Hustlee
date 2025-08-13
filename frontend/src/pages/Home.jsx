import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section with Integrated Navigation */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 mix-blend-multiply" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        </div>

        {/* Integrated Navigation */}
        <nav className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <Link to="/" className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-white">Hustlee</span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden sm:flex sm:items-center sm:space-x-8">
                {user ? (
                  <>
                    <Link to="/dashboard" className="text-white hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                      Dashboard
                    </Link>
                    <Link to="/skill-test" className="text-white hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                      Skill Tests
                    </Link>
                    <Link to="/portfolio" className="text-white hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                      Portfolio
                    </Link>
                    <Link to="/mentorship" className="text-white hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                      Mentorship
                    </Link>
                    <Link to="/gigs" className="text-white hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                      Gigs
                    </Link>
                    <Link to="/courses" className="text-white hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                      Courses
                    </Link>
                    <Link to="/mentor/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-600">
                    Mentor Dashboard
                  </Link>
                    <button
                      onClick={handleLogout}
                      className="bg-white text-purple-600 hover:bg-purple-100 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Link to="/login" className="text-white hover:bg-purple-700 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                      Login
                    </Link>
                    <Link to="/register" className="bg-white text-purple-600 hover:bg-purple-100 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                      Register
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="sm:hidden flex items-center">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-indigo-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <span className="sr-only">Open main menu</span>
                  {!isMenuOpen ? (
                    <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  ) : (
                    <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <motion.div
            initial={false}
            animate={isMenuOpen ? "open" : "closed"}
            variants={{
              open: { opacity: 1, height: "auto" },
              closed: { opacity: 0, height: 0 }
            }}
            className="sm:hidden bg-indigo-700"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {user ? (
                <>
                  <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-600">
                    Dashboard
                  </Link>
                  <Link to="/skill-test" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-600">
                    Skill Tests
                  </Link>
                  <Link to="/portfolio" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-600">
                    Portfolio
                  </Link>
                  <Link to="/mentorship" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-600">
                    Mentorship
                  </Link>
                  <Link to="/gigs" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-600">
                    Gigs
                  </Link>
                  {/*Just for testing Mentor Dashboard*/}
                  <Link to="/mentor/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-600">
                    Mentor Dashboard
                  </Link>
                  <Link to="/courses" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-600">
                    Courses
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-600">
                    Login
                  </Link>
                  <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-600">
                    Register
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        </nav>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Launch Your Tech Career
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="mt-6 text-xl text-indigo-100 max-w-3xl"
          >
            Join Hustlee to showcase your skills, build your portfolio, and connect with opportunities that match your expertise.
          </motion.p>
          <motion.div 
            variants={fadeInUp}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            {!user && (
              <>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 transition-all duration-200 transform hover:scale-105"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition-all duration-200 transform hover:scale-105"
                >
                  Sign In
                </Link>
              </>
            )}
            {user && (
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 transition-all duration-200 transform hover:scale-105"
              >
                Go to Dashboard
              </Link>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section with Interactive Cards */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Everything You Need to Succeed
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Comprehensive tools and resources to help you build your tech career
            </p>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Skill Tests',
                description: 'Validate your expertise with industry-standard assessments',
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                ),
              },
              {
                title: 'Portfolio Building',
                description: 'Create a stunning portfolio to showcase your work',
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                ),
              },
              {
                title: 'Mentorship',
                description: 'Get guidance from industry experts',
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
              },
              {
                title: 'Gigs & Internships',
                description: 'Find opportunities to apply your skills',
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <div className="h-full bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-200 border border-gray-100">
                  <div className="text-indigo-600 mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              What Our Students Say
            </h2>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                content: "Hustlee helped me land my dream job at a top tech company. The skill tests and portfolio building features were invaluable.",
                author: "Srishti",
                role: "Frontend Developer",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              },
              {
                content: "The mentorship program connected me with industry experts who provided invaluable guidance for my career transition.",
                author: "Dev",
                role: "Full Stack Developer",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              },
              {
                content: "I found my first freelance gig through Hustlee's platform. The community is supportive and the opportunities are endless.",
                author: "Amaan",
                role: "UI/UX Designer",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-200"
              >
                <div className="flex items-center mb-4">
                  <img
                    className="h-12 w-12 rounded-full"
                    src={testimonial.image}
                    alt={testimonial.author}
                  />
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">{testimonial.author}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600">{testimonial.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-indigo-700"
      >
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to start your journey?</span>
            <span className="block text-indigo-200">Join Hustlee today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 transition-all duration-200"
              >
                Get started
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-3 inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition-all duration-200"
            >
              Learn more
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home; 