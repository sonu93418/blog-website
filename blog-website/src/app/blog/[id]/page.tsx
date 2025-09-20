'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { BookmarkPlus, Share2, ThumbsUp, MessageSquare, Twitter, Linkedin, Send } from 'lucide-react';
import { getBlogBySlug, getAuthorById, getRelatedBlogs, getCommentsByBlogId, likeComment, addComment } from '@/lib/api';
import { BlogPost, Author, Comment } from '@/lib/data/dummy-data';
import { useRouter } from 'next/navigation';

interface PageProps {
  params: {
    id: string;
  };
}

export default function BlogPage({ params }: PageProps) {
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [author, setAuthor] = useState<Author | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(42);
  const [bookmarked, setBookmarked] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [commentText, setCommentText] = useState('');
  
  // Load blog data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const blogData = await getBlogBySlug(params.id);
        
        if (!blogData) {
          setIsLoading(false);
          return;
        }
        
        setPost(blogData);
        
        // Get author data
        const authorData = await getAuthorById(blogData.authorId);
        setAuthor(authorData);
        
        // Get related posts
        const related = await getRelatedBlogs(blogData.id, blogData.tags);
        setRelatedPosts(related);
        
        // Get comments
        const blogComments = await getCommentsByBlogId(blogData.id);
        setComments(blogComments);
        
        // Check if bookmarked in localStorage
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
        setBookmarked(bookmarks.includes(blogData.id));
        
      } catch (error) {
        console.error('Error fetching blog data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [params.id]);
  
  // Handle bookmark toggle
  const toggleBookmark = () => {
    if (!post) return;
    
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    let newBookmarks;
    
    if (bookmarked) {
      newBookmarks = bookmarks.filter((id: string) => id !== post.id);
    } else {
      newBookmarks = [...bookmarks, post.id];
    }
    
    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
    setBookmarked(!bookmarked);
  };
  
  // Handle share
  const sharePost = (platform: string) => {
    if (!post) return;
    
    const url = window.location.href;
    const text = `Check out this article: ${post.title}`;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
        break;
      default:
        navigator.clipboard.writeText(url);
        // Show toast notification (would implement with a toast library)
        alert('Link copied to clipboard!');
    }
    
    setShowShareOptions(false);
  };
  
  // Handle comment submission
  const submitComment = async () => {
    if (!post || !commentText.trim()) return;
    
    try {
      const newComment = await addComment({
        blogId: post.id,
        authorId: 'author-1', // In a real app, this would be the logged-in user
        content: commentText,
        date: new Date().toISOString(),
      });
      
      setComments(prev => [newComment, ...prev]);
      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
  
  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full mb-6"></div>
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 mr-4"></div>
            <div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
            </div>
          </div>
          <div className="h-[400px] bg-gray-200 dark:bg-gray-700 rounded-xl mb-8"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!post || !author) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Blog post not found</h1>
        <Link href="/" className="text-blue-600 hover:underline">
          Return to home page
        </Link>
      </div>
    );
  }

  const handleLike = () => {
    if (liked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <article className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag, index) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  href={`/blog/tag/${tag}`}
                  className="text-xs px-3 py-1.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-all duration-300 hover:shadow-md"
                >
                  {tag}
                </Link>
              </motion.div>
            ))}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {post.title}
          </h1>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4 ring-2 ring-blue-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900">
                <Image 
                  src={author.avatar} 
                  alt={author.name}
                  width={48}
                  height={48}
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div>
                <Link href={`/author/${author.id}`} className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                  {author.name}
                </Link>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleBookmark}
                className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 ${
                  bookmarked 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                <BookmarkPlus size={20} />
              </motion.button>
              
              <div className="relative">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowShareOptions(!showShareOptions)}
                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
                >
                  <Share2 size={20} />
                </motion.button>
                
                <AnimatePresence>
                  {showShareOptions && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10 w-40"
                    >
                      <button 
                        onClick={() => sharePost('twitter')}
                        className="flex items-center w-full p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                      >
                        <Twitter size={16} className="mr-2 text-blue-400" />
                        Twitter
                      </button>
                      <button 
                        onClick={() => sharePost('linkedin')}
                        className="flex items-center w-full p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                      >
                        <Linkedin size={16} className="mr-2 text-blue-700" />
                        LinkedIn
                      </button>
                      <button 
                        onClick={() => sharePost('whatsapp')}
                        className="flex items-center w-full p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                      >
                        <Send size={16} className="mr-2 text-green-500" />
                        WhatsApp
                      </button>
                      <button 
                        onClick={() => sharePost('copy')}
                        className="flex items-center w-full p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                      >
                        <Share2 size={16} className="mr-2 text-gray-500" />
                        Copy Link
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative h-[400px] w-full mb-8 rounded-xl overflow-hidden shadow-xl"
        >
          <Image 
            src={post.coverImage} 
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
            priority
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="prose prose-lg dark:prose-invert max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }}
        />
        
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mb-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLike}
                className={`flex items-center space-x-1 px-4 py-2 rounded-full ${
                  liked 
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                } transition-colors duration-300`}
              >
                <ThumbsUp size={18} />
                <span>{likeCount}</span>
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-1 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors duration-300"
              >
                <MessageSquare size={18} />
                <span>{comments.length || 24}</span>
              </motion.button>
            </div>
            
            <div className="flex items-center space-x-3">
              <a href="#" className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Comments Section */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Comments ({comments.length})</h3>
          
          <div className="mb-8">
            <textarea 
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..." 
              className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            ></textarea>
            <div className="mt-2 flex justify-end">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={submitComment}
                disabled={!commentText.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Post Comment
              </motion.button>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Sample comments */}
            <div className="border-b border-gray-200 dark:border-gray-800 pb-6">
              <div className="flex items-start mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-4">
                  <Image 
                    src="https://i.pravatar.cc/150?img=11" 
                    alt="Commenter"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">Michael Brown</h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400">2 days ago</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Great article! I've been using Next.js for a while now and it's definitely improved my development workflow.
                  </p>
                  <div className="flex items-center mt-2 space-x-4">
                    <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                      Reply
                    </button>
                    <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center">
                      <ThumbsUp size={14} className="mr-1" />
                      <span>12</span>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Nested reply */}
              <div className="ml-12 mt-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                    <Image 
                      src="https://i.pravatar.cc/150?img=12" 
                      alt="Replier"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">Sarah Johnson</h4>
                      <span className="text-sm text-gray-500 dark:text-gray-400">1 day ago</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      I agree! The server components feature is a game changer.
                    </p>
                    <div className="flex items-center mt-2 space-x-4">
                      <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                        Reply
                      </button>
                      <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center">
                        <ThumbsUp size={14} className="mr-1" />
                        <span>5</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-b border-gray-200 dark:border-gray-800 pb-6">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-4">
                  <Image 
                    src="https://i.pravatar.cc/150?img=13" 
                    alt="Commenter"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">David Wilson</h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400">1 week ago</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    I'm still learning TypeScript, but this article makes it seem less intimidating. Thanks for sharing!
                  </p>
                  <div className="flex items-center mt-2 space-x-4">
                    <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                      Reply
                    </button>
                    <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center">
                      <ThumbsUp size={14} className="mr-1" />
                      <span>8</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <button className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
              Load More Comments
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}