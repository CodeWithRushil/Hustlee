import React, { useState } from 'react';
import Badge from './Badge';
import BadgeStats from './BadgeStats';

const BadgeCollection = ({ badges, onBadgeClick, testHistory }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showEarnedOnly, setShowEarnedOnly] = useState(false);
  const [showStats, setShowStats] = useState(true);

  const categories = [
    'all',
    'Web Development',
    'Data Science',
    'Mobile Development',
    'UI/UX Design',
    'DevOps',
    'Database'
  ];

  const filteredBadges = badges.filter(badge => {
    if (showEarnedOnly && !badge.earned) return false;
    if (selectedCategory !== 'all' && badge.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {showStats && (
        <BadgeStats badges={badges} testHistory={testHistory} />
      )}

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-gray-800">Your Badges</h2>
            <button
              onClick={() => setShowStats(!showStats)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {showStats ? 'Hide Statistics' : 'Show Statistics'}
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border rounded px-3 py-1 text-sm"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={showEarnedOnly}
                onChange={(e) => setShowEarnedOnly(e.target.checked)}
                className="form-checkbox"
              />
              <span>Show earned only</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBadges.map((badge, index) => (
            <Badge
              key={index}
              category={badge.category}
              level={badge.level}
              earned={badge.earned}
              onClick={() => onBadgeClick(badge)}
            />
          ))}
        </div>

        {filteredBadges.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No badges found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BadgeCollection; 