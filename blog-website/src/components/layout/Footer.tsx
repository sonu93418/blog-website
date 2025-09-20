'use client';

import Link from 'next/link';
import { Twitter, Facebook, Instagram, Github, Mail, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
              BlogHub
            </Link>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              A modern blog platform for sharing your thoughts and ideas with the world.
            </p>
            
            {/* Newsletter Signup */}
            <div className="mt-6 mb-6 md:mb-0">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Subscribe to our newsletter
              </h3>
              <div className="flex mt-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-l-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#3b82f6" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors flex items-center"
                >
                  <span className="mr-1">Join</span>
                  <ArrowRight size={16} />
                </motion.button>
              </div>
            </div>
            
            <div className="flex space-x-4 mt-6">
              <motion.a 
                whileHover={{ y: -3, color: '#1DA1F2' }} 
                href="#" 
                className="text-gray-500 dark:text-gray-400"
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a 
                whileHover={{ y: -3, color: '#4267B2' }} 
                href="#" 
                className="text-gray-500 dark:text-gray-400"
              >
                <Facebook size={20} />
              </motion.a>
              <motion.a 
                whileHover={{ y: -3, color: '#E1306C' }} 
                href="#" 
                className="text-gray-500 dark:text-gray-400"
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a 
                whileHover={{ y: -3, color: '#333' }} 
                href="#" 
                className="text-gray-500 dark:text-gray-400"
              >
                <Github size={20} />
              </motion.a>
              <motion.a 
                whileHover={{ y: -3, color: '#EA4335' }} 
                href="#" 
                className="text-gray-500 dark:text-gray-400"
              >
                <Mail size={20} />
              </motion.a>
            </div>
          </div>
          
          <div className="mt-6 md:mt-0">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200">
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/auth/signup" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="mt-6 md:mt-0">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Mobile-friendly quick links */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 md:hidden">
          <div className="grid grid-cols-2 gap-4">
            <Link href="/" className="text-center py-2 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              Home
            </Link>
            <Link href="/blog" className="text-center py-2 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              Blogs
            </Link>
            <Link href="/auth/login" className="text-center py-2 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              Login
            </Link>
            <Link href="/auth/signup" className="text-center py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700 transition-colors">
              Sign Up
            </Link>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
            &copy; {new Date().getFullYear()} BlogHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}