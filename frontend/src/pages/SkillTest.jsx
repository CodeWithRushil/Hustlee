import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import Badge from '../components/Badge';

const Timer = ({ timeLimit, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit * 60); // Convert minutes to seconds
  const totalTime = timeLimit * 60;
  const progress = (timeLeft / totalTime) * 100;

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Determine color based on remaining time
  const getProgressColor = () => {
    if (progress <= 25) return 'bg-red-500';
    if (progress <= 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className={`text-lg font-semibold ${timeLeft <= 60 ? 'text-red-600' : 'text-gray-700'}`}>
          Time Left: {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </div>
        <div className="text-sm text-gray-500">
          {Math.round(progress)}% remaining
        </div>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ease-linear ${getProgressColor()}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

const SkillTest = () => {
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setBadge } = useAuth();
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [earnedBadge, setEarnedBadge] = useState(null);

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/skill-tests', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setTests(response.data);
    } catch (err) {
      setError('Failed to fetch tests. Please try again.');
    }
  };

  const handleStartTest = () => {
    if (selectedTest) {
      setStarted(true);
      setAnswers(Array(selectedTest.questions.length).fill(null));
      setShowResult(false);
      setResult(null);
    } else {
      setError('Please select a test');
    }
  };

  const handleOptionChange = (qIdx, oIdx) => {
    const newAnswers = [...answers];
    newAnswers[qIdx] = oIdx;
    setAnswers(newAnswers);
  };

  const handleTimeUp = async () => {
    setError('Time is up! Submitting your answers...');
    await handleSubmit(new Event('submit'));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        `http://localhost:5000/api/skill-tests/${selectedTest._id}/submit`,
        { answers },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      setResult(response.data);
      setShowResult(true);
      if (response.data.badgeEarned) {
        setBadge(true);
        setEarnedBadge({
          category: selectedTest.category,
          level: selectedTest.difficulty,
          earned: true
        });
        setShowBadgeModal(true);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit test. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRetake = () => {
    setStarted(false);
    setAnswers([]);
    setShowResult(false);
    setResult(null);
    setSelectedTest(null);
    setError('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-50 p-4">
      <h1 className="text-3xl font-bold mb-4">Skill Test</h1>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      {!started && (
        <>
          <p className="text-lg mb-8">Choose a test to begin.</p>
          <div className="mb-4 w-full max-w-lg">
            <select
              value={selectedTest?._id || ''}
              onChange={(e) => {
                const test = tests.find(t => t._id === e.target.value);
                setSelectedTest(test);
              }}
              className="w-full p-2 border rounded"
            >
              <option value="">Select a test</option>
              {tests.map((test) => (
                <option key={test._id} value={test._id}>
                  {test.title} ({test.difficulty})
                </option>
              ))}
            </select>
          </div>
          {selectedTest && (
            <div className="mb-4 w-full max-w-lg bg-white p-4 rounded shadow">
              <h3 className="font-semibold mb-2">{selectedTest.title}</h3>
              <p className="text-gray-600 mb-2">{selectedTest.description}</p>
              <p className="text-sm text-gray-500">
                Time Limit: {selectedTest.timeLimit} minutes
              </p>
            </div>
          )}
          <button
            onClick={handleStartTest}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded shadow hover:bg-blue-700 transition"
          >
            Start Test
          </button>
        </>
      )}
      {started && !showResult && selectedTest && (
        <div className="w-full max-w-lg">
          <div className="bg-white p-4 rounded-t shadow">
            <Timer timeLimit={selectedTest.timeLimit} onTimeUp={handleTimeUp} />
          </div>
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-b shadow">
            {selectedTest.questions.map((q, qIdx) => (
              <div key={qIdx} className="mb-6">
                <p className="font-semibold mb-2">{qIdx + 1}. {q.question}</p>
                <div className="space-y-2">
                  {q.options.map((opt, oIdx) => (
                    <label key={oIdx} className="block">
                      <input
                        type="radio"
                        name={`q${qIdx}`}
                        value={oIdx}
                        checked={answers[qIdx] === oIdx}
                        onChange={() => handleOptionChange(qIdx, oIdx)}
                        className="mr-2"
                        required
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button 
              type="submit" 
              className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      )}
      {showResult && result && (
        <div className="w-full max-w-lg bg-white p-6 rounded shadow text-center">
          <h2 className="text-2xl font-bold mb-2">Result</h2>
          <p className="mb-4">
            You scored {result.score} out of {result.totalQuestions} ({result.percentage}%)
          </p>
          {result.passed ? (
            <div className="mb-4">
              <span className="inline-block bg-green-200 text-green-800 px-4 py-2 rounded-full font-semibold">
                {result.badgeEarned ? '🏅 New Badge Unlocked!' : '🏅 Badge Earned!'}
              </span>
              <p className="mt-2 text-green-700">Congratulations! You passed the test.</p>
            </div>
          ) : (
            <p className="mb-4 text-red-600">You did not pass. Try again!</p>
          )}
          <button 
            onClick={handleRetake} 
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retake Test
          </button>
        </div>
      )}

      {showBadgeModal && earnedBadge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
            <h3 className="text-2xl font-bold mb-4">New Badge Earned!</h3>
            <div className="flex justify-center mb-6">
              <Badge {...earnedBadge} />
            </div>
            <p className="text-gray-600 mb-6">
              Congratulations! You've earned the {earnedBadge.category} badge at {earnedBadge.level} level.
            </p>
            <button
              onClick={() => setShowBadgeModal(false)}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillTest; 