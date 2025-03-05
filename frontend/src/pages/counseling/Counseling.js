import React, { useState } from 'react';
import axios from 'axios';

const Counseling = () => {
  const [formData, setFormData] = useState({
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    preferredContactMethod: 'email',
    preferredTime: '',
    concerns: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await axios.post('/api/counseling/request', formData);
      setSuccess(true);
      setFormData({
        parentName: '',
        parentEmail: '',
        parentPhone: '',
        preferredContactMethod: 'email',
        preferredTime: '',
        concerns: ''
      });
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Request Career Counseling
          </h2>

          {success ? (
            <div className="text-center">
              <div className="mb-4">
                <svg
                  className="mx-auto h-12 w-12 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Request Submitted Successfully
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We'll contact you shortly to schedule your counseling session.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-4 px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="parentName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Parent's Name
                </label>
                <input
                  type="text"
                  name="parentName"
                  id="parentName"
                  required
                  value={formData.parentName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="parentEmail"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Parent's Email
                </label>
                <input
                  type="email"
                  name="parentEmail"
                  id="parentEmail"
                  required
                  value={formData.parentEmail}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="parentPhone"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Parent's Phone
                </label>
                <input
                  type="tel"
                  name="parentPhone"
                  id="parentPhone"
                  required
                  value={formData.parentPhone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="preferredContactMethod"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Preferred Contact Method
                </label>
                <select
                  name="preferredContactMethod"
                  id="preferredContactMethod"
                  value={formData.preferredContactMethod}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                >
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="both">Both</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="preferredTime"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Preferred Time
                </label>
                <input
                  type="datetime-local"
                  name="preferredTime"
                  id="preferredTime"
                  required
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="concerns"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Concerns or Questions
                </label>
                <textarea
                  name="concerns"
                  id="concerns"
                  rows={4}
                  required
                  value={formData.concerns}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Counseling; 