import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AcademicCapIcon,
  ChartBarIcon,
  UserGroupIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

const Home = () => {
  const features = [
    {
      name: 'Career Assessment',
      description: 'Take our comprehensive assessment to discover your strengths, interests, and career preferences.',
      icon: SparklesIcon,
      link: '/assessment',
    },
    {
      name: 'Career Counseling',
      description: 'Get personalized guidance from experienced career counselors to help you make informed decisions.',
      icon: UserGroupIcon,
      link: '/counseling',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-gray-50 dark:bg-gray-900 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                  <span className="block">Find Your Perfect</span>
                  <span className="block text-indigo-600 dark:text-indigo-400">Career Path</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Discover your true potential and find the career that matches your interests, skills, and personality.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/assessment"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
                    >
                      Start Assessment
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/about"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Everything you need to succeed
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
              Our comprehensive platform provides all the tools and guidance you need to make informed career decisions.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.name}
                  className="relative group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link to={feature.link} className="block">
                    <div className="relative p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
                      <div className="absolute top-6 left-6">
                        <feature.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-500 transition-colors duration-200" />
                      </div>
                      <div className="ml-16">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                          {feature.name}
                        </h3>
                        <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 