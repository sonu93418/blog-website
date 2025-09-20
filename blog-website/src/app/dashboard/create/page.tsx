'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Save, Image as ImageIcon, Tag, X } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function CreateBlogPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  
  const quillRef = useRef<any>(null);
  
  // Quill editor modules and formats
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };
  
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image', 'video'
  ];

  const handleAddTag = () => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSave = () => {
    setSaving(true);
    
    // Simulate saving
    setTimeout(() => {
      console.log('Saving blog post:', { title, content, coverImage, tags });
      setSaving(false);
      
      // In a real app, this would save to a database and redirect
      // For demo, just redirect to home
      window.location.href = '/';
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create New Blog Post</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Share your thoughts, ideas, and expertise with the world
        </p>
      </div>
      
      <div className="space-y-6">
        {/* Title input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a captivating title..."
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl"
          />
        </div>
        
        {/* Cover image URL */}
        <div>
          <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Cover Image URL
          </label>
          <div className="flex">
            <div className="flex-grow flex items-center border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 px-4">
              <ImageIcon size={20} className="text-gray-400 mr-2" />
              <input
                type="text"
                id="coverImage"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full py-3 bg-transparent text-gray-900 dark:text-white focus:outline-none"
              />
            </div>
            {coverImage && (
              <button
                type="button"
                onClick={() => setCoverImage('')}
                className="ml-2 p-3 text-gray-500 hover:text-red-500 bg-gray-100 dark:bg-gray-700 rounded-lg"
              >
                <X size={20} />
              </button>
            )}
          </div>
          {coverImage && (
            <div className="mt-2 relative h-40 w-full rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-500">Image Preview</p>
              </div>
              <img 
                src={coverImage} 
                alt="Cover preview" 
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          )}
        </div>
        
        {/* Tags */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tags
          </label>
          <div className="flex">
            <div className="flex-grow flex items-center border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 px-4">
              <Tag size={20} className="text-gray-400 mr-2" />
              <input
                type="text"
                id="tags"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add a tag and press Enter"
                className="w-full py-3 bg-transparent text-gray-900 dark:text-white focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={handleAddTag}
              className="ml-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add
            </button>
          </div>
          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map((t) => (
                <div 
                  key={t} 
                  className="flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full"
                >
                  <span>{t}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(t)}
                    className="ml-1.5 text-blue-600 dark:text-blue-300 hover:text-red-500 dark:hover:text-red-400"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Rich text editor */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Content
          </label>
          <div className="min-h-[400px] border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
            <ReactQuill
              ref={quillRef}
              value={content}
              onChange={setContent}
              modules={modules}
              formats={formats}
              placeholder="Write your blog post content here..."
              theme="snow"
              className="h-[400px] bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex justify-end space-x-4 pt-4">
          <Link
            href="/dashboard"
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Cancel
          </Link>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            disabled={saving || !title || !content}
            className={`px-6 py-3 rounded-md flex items-center ${
              saving || !title || !content
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}
          >
            <Save size={20} className="mr-2" />
            {saving ? 'Saving...' : 'Publish Post'}
          </motion.button>
        </div>
      </div>
    </div>
  );
}