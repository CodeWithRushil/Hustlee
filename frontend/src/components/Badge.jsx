import React from 'react';

const Badge = ({ category, level, earned, onClick }) => {
  const getBadgeColor = (category) => {
    const colors = {
      'Web Development': 'bg-blue-500',
      'Data Science': 'bg-purple-500',
      'Mobile Development': 'bg-green-500',
      'UI/UX Design': 'bg-pink-500',
      'DevOps': 'bg-orange-500',
      'Database': 'bg-yellow-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  const getBadgeIcon = (category) => {
    const icons = {
      'Web Development': '🌐',
      'Data Science': '📊',
      'Mobile Development': '📱',
      'UI/UX Design': '🎨',
      'DevOps': '⚙️',
      'Database': '🗄️'
    };
    return icons[category] || '🏆';
  };

  return (
    <div
      className={`relative group cursor-pointer transform transition-all duration-300 hover:scale-105 ${
        earned ? 'opacity-100' : 'opacity-50'
      }`}
      onClick={onClick}
    >
      <div className={`w-24 h-24 rounded-full ${getBadgeColor(category)} flex items-center justify-center shadow-lg`}>
        <span className="text-4xl">{getBadgeIcon(category)}</span>
      </div>
      {earned && (
        <div className="absolute -top-2 -right-2">
          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">Earned</span>
        </div>
      )}
      <div className="mt-2 text-center">
        <p className="font-semibold text-sm">{category}</p>
        <p className="text-xs text-gray-600">{level}</p>
      </div>
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
        <div className="bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap">
          {earned ? 'Click to view details' : 'Complete skill test to earn'}
        </div>
      </div>
    </div>
  );
};

export default Badge; 