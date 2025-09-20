import { authors, blogPosts, Author, BlogPost } from './data/dummy-data';

// Blog API functions
export async function getAllBlogs(): Promise<BlogPost[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return blogPosts;
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  const blog = blogPosts.find(post => post.id === slug);
  return blog || null;
}

export async function getRelatedBlogs(currentBlogId: string, tags: string[], limit = 3): Promise<BlogPost[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Filter out current blog and find blogs with matching tags
  const relatedBlogs = blogPosts
    .filter(post => post.id !== currentBlogId)
    .filter(post => post.tags.some(tag => tags.includes(tag)))
    .slice(0, limit);
    
  return relatedBlogs;
}

export async function getTrendingBlogs(limit = 5): Promise<BlogPost[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  return blogPosts
    .filter(post => post.trending)
    .slice(0, limit);
}

export async function getFeaturedBlogs(limit = 3): Promise<BlogPost[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  return blogPosts
    .filter(post => post.featured)
    .slice(0, limit);
}

export async function searchBlogs(query: string): Promise<BlogPost[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  const searchTerms = query.toLowerCase().split(' ');
  
  return blogPosts.filter(post => {
    const titleMatch = searchTerms.some(term => 
      post.title.toLowerCase().includes(term)
    );
    const contentMatch = searchTerms.some(term => 
      post.content.toLowerCase().includes(term)
    );
    const tagMatch = post.tags.some(tag => 
      searchTerms.some(term => tag.toLowerCase().includes(term))
    );
    
    return titleMatch || contentMatch || tagMatch;
  });
}

export async function getBlogsByTag(tag: string): Promise<BlogPost[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return blogPosts.filter(post => 
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

// Author API functions
export async function getAllAuthors(): Promise<Author[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return authors;
}

export async function getAuthorById(id: string): Promise<Author | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  const author = authors.find(author => author.id === id);
  return author || null;
}

export async function getAuthorBlogs(authorId: string): Promise<BlogPost[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return blogPosts.filter(post => post.authorId === authorId);
}

// CRUD operations (simulated)
export async function createBlog(blog: Omit<BlogPost, 'id'>): Promise<BlogPost> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const newBlog: BlogPost = {
    ...blog,
    id: `post-${Date.now()}`,
  };
  
  // In a real app, this would save to a database
  // For now, we'll just return the new blog
  return newBlog;
}

export async function updateBlog(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const blogIndex = blogPosts.findIndex(post => post.id === id);
  if (blogIndex === -1) return null;
  
  // In a real app, this would update the database
  // For now, we'll just return the updated blog
  const updatedBlog = {
    ...blogPosts[blogIndex],
    ...updates,
  };
  
  return updatedBlog;
}

export async function deleteBlog(id: string): Promise<boolean> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // In a real app, this would delete from the database
  // For now, we'll just return success
  return true;
}

// Comment system (simulated)
export interface Comment {
  id: string;
  blogId: string;
  authorId: string;
  content: string;
  date: string;
  likes: number;
  parentId?: string;
}

// Dummy comments data
const comments: Comment[] = [
  {
    id: "comment-1",
    blogId: "post-1",
    authorId: "author-2",
    content: "Great article! Very informative.",
    date: "2023-05-16",
    likes: 5,
  },
  {
    id: "comment-2",
    blogId: "post-1",
    authorId: "author-3",
    content: "I've been using Next.js with TypeScript for a while now and it's amazing!",
    date: "2023-05-17",
    likes: 3,
  },
  {
    id: "comment-3",
    blogId: "post-1",
    authorId: "author-2",
    content: "Have you tried using the new App Router?",
    date: "2023-05-17",
    likes: 2,
    parentId: "comment-2",
  },
];

export async function getCommentsByBlogId(blogId: string): Promise<Comment[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return comments.filter(comment => comment.blogId === blogId);
}

export async function addComment(comment: Omit<Comment, 'id' | 'likes'>): Promise<Comment> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  const newComment: Comment = {
    ...comment,
    id: `comment-${Date.now()}`,
    likes: 0,
  };
  
  // In a real app, this would save to a database
  return newComment;
}

export async function likeComment(commentId: string): Promise<Comment | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const commentIndex = comments.findIndex(c => c.id === commentId);
  if (commentIndex === -1) return null;
  
  // In a real app, this would update the database
  const updatedComment = {
    ...comments[commentIndex],
    likes: comments[commentIndex].likes + 1,
  };
  
  return updatedComment;
}

// Utility functions
export function getAllTags(): string[] {
  const allTags = blogPosts.flatMap(post => post.tags);
  return [...new Set(allTags)];
}