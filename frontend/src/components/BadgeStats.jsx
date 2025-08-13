import React from 'react';

const BadgeStats = ({ badges, testHistory }) => {
  const calculateStats = () => {
    const totalBadges = badges.length;
    const earnedBadges = badges.filter(badge => badge.earned).length;
    const categoryProgress = {};
    const levelProgress = {
      Beginner: 0,
      Intermediate: 0,
      Advanced: 0
    };

    // Calculate category progress
    badges.forEach(badge => {
      if (!categoryProgress[badge.category]) {
        categoryProgress[badge.category] = {
          total: 0,
          earned: 0
        };
      }
      categoryProgress[badge.category].total++;
      if (badge.earned) {
        categoryProgress[badge.category].earned++;
        levelProgress[badge.level]++;
      }
    });

    // Calculate test statistics
    const testStats = {
      totalAttempts: testHistory.length,
      averageScore: 0,
      highestScore: 0,
      recentTests: []
    };

    if (testHistory.length > 0) {
      const scores = testHistory.map(test => test.score);
      testStats.averageScore = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
      testStats.highestScore = Math.max(...scores);
      testStats.recentTests = testHistory.slice(-3).reverse();
    }

    return {
      totalBadges,
      earnedBadges,
      categoryProgress,
      levelProgress,
      testStats
    };
  };

  const stats = calculateStats();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Achievement Statistics</h2>
      
      {/* Overall Progress */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Overall Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Badges</p>
            <p className="text-2xl font-bold text-blue-600">{stats.totalBadges}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Earned Badges</p>
            <p className="text-2xl font-bold text-green-600">{stats.earnedBadges}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Completion Rate</p>
            <p className="text-2xl font-bold text-purple-600">
              {((stats.earnedBadges / stats.totalBadges) * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {/* Category Progress */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Category Progress</h3>
        <div className="space-y-4">
          {Object.entries(stats.categoryProgress).map(([category, progress]) => (
            <div key={category} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="font-medium">{category}</span>
                <span className="text-sm text-gray-600">
                  {progress.earned}/{progress.total} badges
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(progress.earned / progress.total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Level Distribution */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Level Distribution</h3>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(stats.levelProgress).map(([level, count]) => (
            <div key={level} className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600">{level}</p>
              <p className="text-xl font-bold text-gray-800">{count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Test Statistics */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Test Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Attempts</p>
            <p className="text-xl font-bold text-gray-800">{stats.testStats.totalAttempts}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Average Score</p>
            <p className="text-xl font-bold text-gray-800">{stats.testStats.averageScore}%</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Highest Score</p>
            <p className="text-xl font-bold text-gray-800">{stats.testStats.highestScore}%</p>
          </div>
        </div>

        {stats.testStats.recentTests.length > 0 && (
          <div>
            <h4 className="text-md font-medium mb-2">Recent Tests</h4>
            <div className="space-y-2">
              {stats.testStats.recentTests.map((test, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                  <span className="font-medium">{test.test.title}</span>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    test.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {test.score}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BadgeStats; 