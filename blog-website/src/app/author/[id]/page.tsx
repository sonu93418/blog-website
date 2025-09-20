'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getAuthorById, getPostsByAuthor } from '@/lib/data/dummy-data';
import { Facebook, Twitter, Instagram, Linkedin, Globe } from 'lucide-react';
import BlogCard from '@/components/blog/BlogCard';

interface PageProps {
  params: {
    id: string;
  };
}

export default function AuthorPage({ params }: PageProps) {
  const author = getAuthorById(params.id);
  const authorPosts = author ? getPostsByAuthor(author.id) : [];
  
  if (!author) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Author not found</h1>
        <Link href="/" className="text-blue-600 hover:underline">
          Return to home page
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-12">
          <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
            {/* Cover background */}
          </div>
          
          <div className="px-6 py-8 sm:px-8 sm:py-10 relative">
            <div className="absolute -top-16 left-6 sm:left-8">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden">
                <Image 
                  src={author.avatar} 
                  alt={author.name}
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
            </div>
            
            <div className="mt-16 sm:mt-12">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {author.name}
              </h1>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {author.role}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <a href="#" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                  <Globe size={20} />
                </a>
              </div>
              
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p>{author.bio}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Articles by {author.name}
          </h2>
          
          <div className="grid grid-cols-1 gap-8">
            {authorPosts.length > 0 ? (
              authorPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-400">
                This author hasn't published any articles yet.
              </p>
            )}
          </div>
        </div>
        
        <div className="flex justify-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Follow {author.name}
          </motion.button>
        </div>
      </div>
    </div>
  );
}