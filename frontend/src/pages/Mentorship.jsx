import { useState } from 'react';
import { Link } from 'react-router-dom';
const Mentorship = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');

  const expertiseAreas = [
    { id: 'all', name: 'All Expertise' },
    { id: 'frontend', name: 'Frontend Development' },
    { id: 'backend', name: 'Backend Development' },
    { id: 'mobile', name: 'Mobile Development' },
    { id: 'data-science', name: 'Data Science' },
    { id: 'ui-ux', name: 'UI/UX Design' },
    { id: 'product', name: 'Product Management' },
  ];

  const availabilityOptions = [
    { id: 'all', name: 'Any Availability' },
    { id: 'weekday', name: 'Weekday Evenings' },
    { id: 'weekend', name: 'Weekends' },
    { id: 'flexible', name: 'Flexible Hours' },
  ];

  const mentors = [
    {
      id: 1,
      name: 'Srishti',
      title: 'Senior Frontend Developer',
      company: 'Tech Solutions Inc.',
      expertise: 'frontend',
      availability: 'weekday',
      rating: 4.9,
      sessions: 156,
      hourlyRate: 75,
      skills: ['React', 'TypeScript', 'Next.js', 'GraphQL'],
      bio: '10+ years of experience in frontend development. Passionate about teaching and helping developers grow their skills.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: 2,
      name: 'Dev',
      title: 'Lead Backend Engineer',
      company: 'Cloud Innovations',
      expertise: 'backend',
      availability: 'weekend',
      rating: 4.8,
      sessions: 98,
      hourlyRate: 85,
      skills: ['Node.js', 'Python', 'Express.js', 'MongoDB'],
      bio: 'Specialized in scalable backend systems and cloud architecture. Love mentoring developers in system design and best practices.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: 3,
      name: 'Amaan',
      title: 'Senior UI/UX Designer',
      company: 'Design Studio',
      expertise: 'ui-ux',
      availability: 'flexible',
      rating: 4.9,
      sessions: 124,
      hourlyRate: 70,
      skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
      bio: 'Award-winning designer with a passion for creating beautiful and functional user experiences. Experienced in mentoring designers at all levels.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  ];

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.bio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesExpertise = selectedExpertise === 'all' || mentor.expertise === selectedExpertise;
    const matchesAvailability = selectedAvailability === 'all' || mentor.availability === selectedAvailability;
    return matchesSearch && matchesExpertise && matchesAvailability;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Find a Mentor</h1>
          <p className="mt-2 text-sm text-gray-600">Connect with experienced professionals who can guide your career growth</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search mentors..."
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

            {/* Expertise Filter */}
            <select
              value={selectedExpertise}
              onChange={(e) => setSelectedExpertise(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            >
              {expertiseAreas.map(area => (
                <option key={area.id} value={area.id}>
                  {area.name}
                </option>
              ))}
            </select>

            {/* Availability Filter */}
            <select
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            >
              {availabilityOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Mentors List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map(mentor => (
            <div key={mentor.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <img
                    className="h-16 w-16 rounded-full"
                    src={mentor.image}
                    alt={mentor.name}
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{mentor.name}</h3>
                    <p className="text-sm text-gray-600">{mentor.title}</p>
                    <p className="text-sm text-gray-500">{mentor.company}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-600">{mentor.bio}</p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {mentor.skills.map(skill => (
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
                    <div className="flex items-center">
                      <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1 text-sm text-gray-600">{mentor.rating}</span>
                      <span className="ml-2 text-sm text-gray-500">({mentor.sessions} sessions)</span>
                    </div>
                    <span className="text-sm font-medium text-green-600">${mentor.hourlyRate}/hr</span>
                  </div>
                  <Link
                    to={`/mentorship/${mentor.id}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Book Session
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mentorship; 