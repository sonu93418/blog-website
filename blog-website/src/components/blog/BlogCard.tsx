'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BookmarkPlus, Share2 } from 'lucide-react';
import { getAuthorById } from '@/lib/api';

interface BlogCardProps {
  post: {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    coverImage: string;
    date: string;
    authorId: string;
    author?: {
      id: string;
      name: string;
      avatar: string;
    };
    tags: string[];
  };
}

export default function BlogCard({ post }: BlogCardProps) {
  // Use author from post if available, otherwise fetch it
  const author = post.author || getAuthorById(post.authorId);
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-48 w-full">
        <Image 
          src={post.coverImage} 
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-5">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.slice(0, 2).map((tag) => (
            <span 
              key={tag} 
              className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <Link href={`/blog/${post.slug || post.id}`}>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {post.title}
          </h2>
        </Link>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
          {post.excerpt}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {author && author.avatar && author.name ? (
              <>
                <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                  <Image 
                    src={author.avatar} 
                    alt={author.name || "Author avatar"}
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <div>
                  <Link href={`/author/${author.id}`} className="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                    {author.name}
                  </Link>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </>
            ) : (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </p>
            )}
          </div>
          
          <div className="flex space-x-2">
            <button className="p-1 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              <BookmarkPlus size={18} />
            </button>
            <button className="p-1 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}