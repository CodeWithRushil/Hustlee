import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Portfolio = () => {
  const [resume, setResume] = useState(null);
  const [link, setLink] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [verified, setVerified] = useState(null);
  const { badge, setPortfolioVerified } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate verification (randomly approve or suggest improvement)
    const isApproved = Math.random() > 0.4;
    setVerified(isApproved);
    setSubmitted(true);
    setPortfolioVerified(isApproved);
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleTryAgain = () => {
    setSubmitted(false);
    setVerified(null);
    setResume(null);
    setLink('');
    setPortfolioVerified(false);
  };

  if (!badge) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-4">
        <h1 className="text-3xl font-bold mb-4">Portfolio Submission</h1>
        <div className="w-full max-w-md bg-white p-6 rounded shadow text-center">
          <span className="inline-block bg-yellow-200 text-yellow-800 px-4 py-2 rounded-full font-semibold mb-4">Skill Badge Required</span>
          <p className="text-gray-700">You need to pass a skill test and unlock a badge before submitting your portfolio.<br/>Improve your skills and try again!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-4">
      <h1 className="text-3xl font-bold mb-4">Portfolio Submission</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded shadow">
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Upload Resume (PDF)</label>
            <input type="file" accept=".pdf" onChange={handleFileChange} className="w-full" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">GitHub/Behance/Portfolio Link</label>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="https://github.com/yourprofile"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Submit Portfolio</button>
        </form>
      ) : (
        <div className="w-full max-w-md bg-white p-6 rounded shadow text-center">
          {verified ? (
            <>
              <span className="inline-block bg-green-200 text-green-800 px-4 py-2 rounded-full font-semibold">✔ Portfolio Verified</span>
              <p className="mt-4 text-green-700">Your portfolio has been approved!</p>
            </>
          ) : (
            <>
              <span className="inline-block bg-red-200 text-red-800 px-4 py-2 rounded-full font-semibold">✖ Not Verified</span>
              <p className="mt-4 text-red-700">Please improve your portfolio or <a href="/mentorship" className="text-blue-600 underline">connect with a mentor</a>.</p>
              <button onClick={handleTryAgain} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Try Again</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Portfolio; 