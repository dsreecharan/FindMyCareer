import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results;

  if (!results) {
    navigate('/assessment');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Your Career Assessment Results
          </h2>

          {/* Personality Profile */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Personality Profile
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(results.personalityTraits).map(([trait, score]) => (
                <div
                  key={trait}
                  className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-900 dark:text-white">{trait}</span>
                    <span className="text-indigo-600 dark:text-indigo-400">
                      {score}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Careers */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Recommended Careers
            </h3>
            <div className="space-y-4">
              {results.recommendedCareers.map((career, index) => (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                >
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {career.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    {career.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Match Score: {career.matchScore}%
                    </span>
                    <button
                      onClick={() => navigate(`/career/${career.id}`)}
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                    >
                      Learn More →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Items */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Next Steps
            </h3>
            <div className="space-y-4">
              {results.actionItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3"
                >
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                      <span className="text-indigo-600 dark:text-indigo-400">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => navigate('/counseling')}
              className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Schedule Career Counseling
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results; 