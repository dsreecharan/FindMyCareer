import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/auth/profile');
        setProfile(response.data);
      } catch (error) {
        setError('Failed to load profile');
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex items-center space-x-4 mb-8">
            <div className="flex-shrink-0">
              <div className="h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  {user.name.charAt(0)}
                </span>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {user.name}
              </h2>
              <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Role
                  </label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white capitalize">
                    {user.role}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Account Created
                  </label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Assessment History */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Assessment History
              </h3>
              {profile?.assessments?.length > 0 ? (
                <div className="space-y-4">
                  {profile.assessments.map((assessment) => (
                    <div
                      key={assessment._id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                            {assessment.title}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Completed on {new Date(assessment.completedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <span className="text-sm text-indigo-600 dark:text-indigo-400">
                          Score: {assessment.score}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No assessment history found.
                </p>
              )}
            </div>

            {/* Counseling Requests */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Counseling Requests
              </h3>
              {profile?.counselingRequests?.length > 0 ? (
                <div className="space-y-4">
                  {profile.counselingRequests.map((request) => (
                    <div
                      key={request._id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                            Request #{request._id.slice(-6)}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Status: {request.status}
                          </p>
                        </div>
                        <span className={`text-sm ${
                          request.status === 'Completed'
                            ? 'text-green-600 dark:text-green-400'
                            : request.status === 'Pending'
                            ? 'text-yellow-600 dark:text-yellow-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}>
                          {request.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No counseling requests found.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 