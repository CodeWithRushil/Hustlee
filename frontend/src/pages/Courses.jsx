import { useState } from 'react';

const coursesData = [
  {
    id: 1,
    title: 'Introduction to Web Development',
    category: 'Web Development',
    duration: '4 weeks',
    progress: 0,
  },
  {
    id: 2,
    title: 'Data Science Fundamentals',
    category: 'Data Science',
    duration: '6 weeks',
    progress: 0,
  },
  {
    id: 3,
    title: 'UI/UX Design Basics',
    category: 'Design',
    duration: '3 weeks',
    progress: 0,
  },
  {
    id: 4,
    title: 'Mobile App Development',
    category: 'Mobile Development',
    duration: '5 weeks',
    progress: 0,
  },
];

const categories = ['All', ...Array.from(new Set(coursesData.map(c => c.category)))];

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [courses, setCourses] = useState(coursesData);

  const filteredCourses = selectedCategory === 'All'
    ? courses
    : courses.filter(course => course.category === selectedCategory);

  const handleProgressUpdate = (id, progress) => {
    setCourses(courses.map(course =>
      course.id === id ? { ...course, progress } : course
    ));
  };

  return (
    <div className="min-h-screen bg-purple-50 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Courses</h1>
      <div className="flex justify-center mb-8">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded"
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <div key={course.id} className="bg-white rounded shadow p-6">
            <h2 className="text-xl font-bold mb-2">{course.title}</h2>
            <p className="mb-1"><span className="font-semibold">Category:</span> {course.category}</p>
            <p className="mb-4"><span className="font-semibold">Duration:</span> {course.duration}</p>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Progress: {course.progress}%</label>
              <input
                type="range"
                min="0"
                max="100"
                value={course.progress}
                onChange={(e) => handleProgressUpdate(course.id, parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses; 