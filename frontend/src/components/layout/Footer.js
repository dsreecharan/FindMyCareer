import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShareIcon,
  ChatBubbleLeftRightIcon,
  GlobeAltIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: ShareIcon, href: 'https://facebook.com' },
    { name: 'Twitter', icon: ChatBubbleLeftRightIcon, href: 'https://twitter.com' },
    { name: 'Instagram', icon: GlobeAltIcon, href: 'https://instagram.com' },
    { name: 'LinkedIn', icon: EnvelopeIcon, href: 'https://linkedin.com' },
  ];

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              FindMyCareer
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Empowering students to discover their perfect career path through AI-powered assessments and personalized guidance.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-2">
              <li className="text-sm text-gray-500 dark:text-gray-400">
                123 Career Street
              </li>
              <li className="text-sm text-gray-500 dark:text-gray-400">
                Education City, EC 12345
              </li>
              <li className="text-sm text-gray-500 dark:text-gray-400">
                contact@findmycareer.com
              </li>
              <li className="text-sm text-gray-500 dark:text-gray-400">
                +1 (555) 123-4567
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Follow Us
            </h3>
            <div className="mt-4 flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{social.name}</span>
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © {currentYear} FindMyCareer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 