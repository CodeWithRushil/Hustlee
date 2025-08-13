import { useState } from 'react';
import { Link } from 'react-router-dom';

const Gigs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'frontend', name: 'Frontend Development' },
    { id: 'backend', name: 'Backend Development' },
    { id: 'fullstack', name: 'Full Stack Development' },
    { id: 'ui-ux', name: 'UI/UX Design' },
    { id: 'mobile', name: 'Mobile Development' },
  ];

  const durations = [
    { id: 'all', name: 'Any Duration' },
    { id: 'short', name: 'Short Term (< 1 month)' },
    { id: 'medium', name: 'Medium Term (1-3 months)' },
    { id: 'long', name: 'Long Term (> 3 months)' },
  ];

  const gigs = [
    {
      id: 1,
      title: 'Frontend Developer for E-commerce Platform',
      category: 'frontend',
      duration: 'medium',
      budget: '$500-800',
      description: 'Looking for a skilled frontend developer to help build an e-commerce platform using React and TypeScript.',
      skills: ['React', 'TypeScript', 'Redux', 'Tailwind CSS'],
      posted: '2 hours ago',
      client: {
        name: 'Tech Solutions Inc.',
        rating: 4.8,
        completedProjects: 12
      }
    },
    {
      id: 2,
      title: 'UI/UX Designer for Mobile App',
      category: 'ui-ux',
      duration: 'short',
      budget: '$400-600',
      description: 'Need a creative UI/UX designer to design a modern mobile app interface with a focus on user experience.',
      skills: ['Figma', 'UI Design', 'UX Research', 'Prototyping'],
      posted: '5 hours ago',
      client: {
        name: 'Mobile Innovations',
        rating: 4.5,
        completedProjects: 8
      }
    },
    {
      id: 3,
      title: 'Full Stack Developer for SaaS Platform',
      category: 'fullstack',
      duration: 'long',
      budget: '$1000-1500',
      description: 'Seeking an experienced full stack developer to build and maintain a SaaS platform.',
      skills: ['Node.js', 'React', 'MongoDB', 'AWS'],
      posted: '1 day ago',
      client: {
        name: 'Cloud Solutions',
        rating: 4.9,
        completedProjects: 25
      }
    }
  ];

  const filteredGigs = gigs.filter(gig => {
    const matchesSearch = gig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         gig.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || gig.category === selectedCategory;
    const matchesDuration = selectedDuration === 'all' || gig.duration === selectedDuration;
    return matchesSearch && matchesCategory && matchesDuration;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Find Gigs</h1>
          <p className="mt-2 text-sm text-gray-600">Browse and apply for gigs that match your skills</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search gigs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Duration Filter */}
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            >
              {durations.map(duration => (
                <option key={duration.id} value={duration.id}>
                  {duration.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Gigs List */}
        <div className="space-y-4">
          {filteredGigs.map(gig => (
            <div key={gig.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{gig.title}</h3>
                    <p className="mt-1 text-sm text-gray-600">{gig.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      {gig.budget}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {gig.skills.map(skill => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{gig.client.name}</p>
                      <div className="flex items-center mt-1">
                        <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-1 text-sm text-gray-600">{gig.client.rating}</span>
                        <span className="ml-2 text-sm text-gray-500">({gig.client.completedProjects} projects)</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">Posted {gig.posted}</span>
                    <Link
                      to={`/gigs/${gig.id}`}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gigs; 