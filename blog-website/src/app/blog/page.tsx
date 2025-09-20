'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Blog Coming Soon
        </h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 text-center">
            We're working hard to bring you amazing content. Our blog section will be available soon!
          </p>
          <div className="flex justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                Back to Home
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}