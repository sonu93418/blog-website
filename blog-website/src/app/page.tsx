'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, TrendingUp, Tag, ChevronRight } from 'lucide-react';
import { getAllBlogs, getFeaturedBlogs, getTrendingBlogs, getAuthorById } from '@/lib/api';
import BlogCard from '@/components/blog/BlogCard';

export default function Home() {
  const [visiblePosts, setVisiblePosts] = useState(4);
  const [blogs, setBlogs] = useState([]);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [trendingBlogs, setTrendingBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const allBlogs = await getAllBlogs();
        const featured = await getFeaturedBlogs();
        const trending = await getTrendingBlogs();
        
        setBlogs(allBlogs);
        setFilteredBlogs(allBlogs);
        setFeaturedBlogs(featured);
        setTrendingBlogs(trending);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter(blog => 
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredBlogs(filtered);
    }
  }, [searchQuery, blogs]);
  
  const loadMorePosts = () => {
    setVisiblePosts(prev => prev + 4);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="Search articles, tags, or authors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* Loading State */}
      {isLoading ? (
        <div className="space-y-8">
          <div className="h-[500px] w-full rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-[300px] rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Hero Section with Featured Post */}
          {featuredBlogs.length > 0 && (
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              className="mb-16"
            >
              <div className="relative h-[500px] w-full rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={featuredBlogs[0].coverImage}
                  alt={featuredBlogs[0].title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full md:w-2/3">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {featuredBlogs[0].tags.slice(0, 3).map((tag) => (
                      <motion.span
                        key={tag}
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.9)' }}
                        className="text-xs px-3 py-1.5 bg-blue-500/80 text-white rounded-full font-medium"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                  <Link href={`/blog/${featuredBlogs[0].slug}`}>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 hover:text-blue-300 transition-colors">
                      {featuredBlogs[0].title}
                    </h1>
                  </Link>
                  <p className="text-gray-200 mb-4 text-lg">
                    {featuredBlogs[0].excerpt}
                  </p>
                  <div className="flex items-center">
                    {featuredBlogs[0].author && (
                      <>
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-3 ring-2 ring-blue-400 p-0.5">
                          <Image
                            src={featuredBlogs[0].author.avatar}
                            alt={featuredBlogs[0].author.name}
                            width={48}
                            height={48}
                            className="object-cover rounded-full"
                          />
                        </div>
                        <div>
                          <Link href={`/author/${featuredBlogs[0].author.id}`} className="text-white font-medium hover:text-blue-300 transition-colors">
                            {featuredBlogs[0].author.name}
                          </Link>
                          <p className="text-sm text-gray-300">
                            {new Date(featuredBlogs[0].date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </>
      )}

      {!isLoading && (
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content - Blog Feed */}
          <div className="md:w-2/3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Latest Articles</h2>
              <Link href="/blog" className="text-blue-600 dark:text-blue-400 flex items-center hover:underline">
                View all <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            {filteredBlogs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">No articles found matching your search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <AnimatePresence>
                  {filteredBlogs.slice(0, visiblePosts).map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="w-full"
                    >
                      <BlogCard post={post} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
            
            {visiblePosts < filteredBlogs.length && (
              <div className="mt-8 text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={loadMorePosts}
                  className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-md"
                >
                  Load More
                </motion.button>
              </div>
            )}
          </div>
          
          {/* Sidebar - Trending Posts */}
          <div className="md:w-1/3 mt-8 md:mt-0">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 sticky top-24 shadow-md">
              <div className="flex items-center mb-4">
                <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Trending Now</h3>
              </div>
              
              <div className="space-y-4">
                {trendingBlogs.map((post) => (
                  <motion.div 
                    key={post.id} 
                    className="flex gap-3 group"
                    whileHover={{ x: 3 }}
                  >
                    <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div>
                      <Link href={`/blog/${post.slug}`} className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 line-clamp-2 transition-colors">
                        {post.title}
                      </Link>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8">
                <div className="flex items-center mb-4">
                  <Tag className="h-5 w-5 text-blue-500 mr-2" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Popular Tags</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(blogs.flatMap(post => post.tags))).slice(0, 10).map((tag) => (
                    <motion.div key={tag} whileHover={{ scale: 1.05 }}>
                      <Link 
                        href={`/blog/tag/${tag}`}
                        className="text-sm px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors inline-block"
                      >
                        {tag}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
