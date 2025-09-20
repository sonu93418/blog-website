export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  socialLinks: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    github?: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  authorId: string;
  tags: string[];
  featured: boolean;
  trending: boolean;
}

export const authors: Author[] = [
  {
    id: "author-1",
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=1",
    bio: "Tech enthusiast and software developer with over 10 years of experience in web development.",
    socialLinks: {
      twitter: "https://twitter.com/johndoe",
      github: "https://github.com/johndoe",
    },
  },
  {
    id: "author-2",
    name: "Jane Smith",
    avatar: "https://i.pravatar.cc/150?img=5",
    bio: "UX designer and frontend developer passionate about creating beautiful and functional user interfaces.",
    socialLinks: {
      twitter: "https://twitter.com/janesmith",
      instagram: "https://instagram.com/janesmith",
    },
  },
  {
    id: "author-3",
    name: "Alex Johnson",
    avatar: "https://i.pravatar.cc/150?img=3",
    bio: "Full-stack developer and tech blogger. Loves to share knowledge about the latest technologies.",
    socialLinks: {
      github: "https://github.com/alexjohnson",
      facebook: "https://facebook.com/alexjohnson",
    },
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "post-1",
    title: "Getting Started with Next.js and TypeScript",
    excerpt: "Learn how to set up a new project with Next.js and TypeScript for a better development experience.",
    content: `
# Getting Started with Next.js and TypeScript

Next.js is a React framework that enables server-side rendering, static site generation, and more. TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. Together, they provide a powerful development experience.

## Setting Up Your Project

To create a new Next.js project with TypeScript, you can use the following command:

\`\`\`bash
npx create-next-app@latest my-app --typescript
\`\`\`

This will create a new Next.js project with TypeScript support.

## Key Features of Next.js

- **Server-Side Rendering (SSR)**: Next.js allows you to render your React components on the server before sending them to the client.
- **Static Site Generation (SSG)**: You can generate static HTML at build time for better performance.
- **API Routes**: Next.js allows you to create API endpoints as part of your application.
- **File-System Based Routing**: Pages are associated with a route based on their file name.

## Benefits of TypeScript

- **Type Safety**: TypeScript provides static type checking, which helps catch errors during development.
- **Better IDE Support**: TypeScript offers better autocompletion, navigation, and refactoring services.
- **Enhanced Documentation**: Types serve as documentation for your code.

## Conclusion

Next.js and TypeScript are a powerful combination for building modern web applications. They provide a great developer experience and help you build more robust applications.
    `,
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    date: "2023-05-15",
    authorId: "author-1",
    tags: ["Next.js", "TypeScript", "React", "Web Development"],
    featured: true,
    trending: true,
  },
  {
    id: "post-2",
    title: "Mastering CSS Grid Layout",
    excerpt: "A comprehensive guide to using CSS Grid Layout for creating complex web layouts with ease.",
    content: `
# Mastering CSS Grid Layout

CSS Grid Layout is a powerful tool for creating two-dimensional layouts on the web. It allows you to create complex layouts with ease.

## Basic Concepts

CSS Grid Layout works by dividing a container into rows and columns, creating a grid. You can then place items on this grid.

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 20px;
}
\`\`\`

## Placing Items

You can place items on the grid using the \`grid-column\` and \`grid-row\` properties.

\`\`\`css
.item {
  grid-column: 1 / 3;
  grid-row: 1 / 2;
}
\`\`\`

## Grid Areas

You can also define grid areas and place items in these areas.

\`\`\`css
.container {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar content content"
    "footer footer footer";
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.footer { grid-area: footer; }
\`\`\`

## Responsive Layouts

CSS Grid Layout makes it easy to create responsive layouts using media queries.

\`\`\`css
@media (max-width: 768px) {
  .container {
    grid-template-areas:
      "header"
      "content"
      "sidebar"
      "footer";
  }
}
\`\`\`

## Conclusion

CSS Grid Layout is a powerful tool for creating complex layouts on the web. It's well-supported in modern browsers and provides a lot of flexibility.
    `,
    coverImage: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8",
    date: "2023-06-20",
    authorId: "author-2",
    tags: ["CSS", "Web Design", "Layout", "Frontend"],
    featured: true,
    trending: false,
  },
  {
    id: "post-3",
    title: "Introduction to Framer Motion",
    excerpt: "Learn how to add beautiful animations to your React applications using Framer Motion.",
    content: `
# Introduction to Framer Motion

Framer Motion is a production-ready motion library for React. It allows you to create beautiful animations with ease.

## Installation

You can install Framer Motion using npm or yarn:

\`\`\`bash
npm install framer-motion
# or
yarn add framer-motion
\`\`\`

## Basic Animation

To animate a component, you can use the \`motion\` component provided by Framer Motion.

\`\`\`jsx
import { motion } from 'framer-motion';

function MyComponent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      Hello, world!
    </motion.div>
  );
}
\`\`\`

## Variants

Variants allow you to define animation states and orchestrate animations across multiple components.

\`\`\`jsx
const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

function MyComponent() {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
    >
      Hello, world!
    </motion.div>
  );
}
\`\`\`

## Gestures

Framer Motion provides easy-to-use gesture recognition.

\`\`\`jsx
function MyComponent() {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      Click me!
    </motion.div>
  );
}
\`\`\`

## Conclusion

Framer Motion is a powerful tool for adding animations to your React applications. It's easy to use and provides a lot of flexibility.
    `,
    coverImage: "https://images.unsplash.com/photo-1550063873-ab792950096b",
    date: "2023-07-10",
    authorId: "author-3",
    tags: ["React", "Animation", "Framer Motion", "Frontend"],
    featured: false,
    trending: true,
  },
  {
    id: "post-4",
    title: "Building a RESTful API with Node.js and Express",
    excerpt: "A step-by-step guide to building a RESTful API using Node.js and Express.",
    content: `
# Building a RESTful API with Node.js and Express

Node.js and Express provide a powerful platform for building RESTful APIs. In this guide, we'll walk through the process of building a simple API.

## Setting Up Your Project

First, let's set up a new Node.js project:

\`\`\`bash
mkdir my-api
cd my-api
npm init -y
npm install express mongoose cors dotenv
\`\`\`

## Creating the Server

Next, let's create a simple Express server:

\`\`\`javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
\`\`\`

## Defining Models

Let's define a simple model using Mongoose:

\`\`\`javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
\`\`\`

## Creating Routes

Now, let's create some routes for our API:

\`\`\`javascript
const express = require('express');
const User = require('../models/userModel');

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new user
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
\`\`\`

## Conclusion

Node.js and Express provide a powerful platform for building RESTful APIs. With Mongoose, you can easily integrate MongoDB for data storage.
    `,
    coverImage: "https://images.unsplash.com/photo-1555099962-4199c345e5dd",
    date: "2023-08-05",
    authorId: "author-1",
    tags: ["Node.js", "Express", "API", "Backend"],
    featured: false,
    trending: true,
  },
  {
    id: "post-5",
    title: "Understanding React Hooks",
    excerpt: "A deep dive into React Hooks and how they can simplify your React components.",
    content: `
# Understanding React Hooks

React Hooks were introduced in React 16.8 as a way to use state and other React features without writing a class. They allow you to "hook into" React state and lifecycle features from function components.

## useState

The \`useState\` hook allows you to add state to your function components.

\`\`\`jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

## useEffect

The \`useEffect\` hook allows you to perform side effects in your function components.

\`\`\`jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`You clicked \${count} times\`;
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

## useContext

The \`useContext\` hook allows you to subscribe to React context without introducing nesting.

\`\`\`jsx
import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}
\`\`\`

## Custom Hooks

You can also create your own custom hooks to reuse stateful logic between different components.

\`\`\`jsx
import { useState, useEffect } from 'react';

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return width;
}

function MyComponent() {
  const width = useWindowWidth();
  return <div>Window width: {width}</div>;
}
\`\`\`

## Conclusion

React Hooks provide a more direct API to the React concepts you already know: props, state, context, refs, and lifecycle. They allow you to write more concise and readable code.
    `,
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    date: "2023-09-12",
    authorId: "author-2",
    tags: ["React", "Hooks", "JavaScript", "Frontend"],
    featured: true,
    trending: false,
  },
  {
    id: "post-6",
    title: "Introduction to TailwindCSS",
    excerpt: "Learn how to use TailwindCSS to rapidly build modern websites without leaving your HTML.",
    content: `
# Introduction to TailwindCSS

TailwindCSS is a utility-first CSS framework that allows you to build modern websites without ever leaving your HTML. It provides low-level utility classes that let you build completely custom designs.

## Installation

You can install TailwindCSS using npm or yarn:

\`\`\`bash
npm install tailwindcss
# or
yarn add tailwindcss
\`\`\`

Then, create a configuration file:

\`\`\`bash
npx tailwindcss init
\`\`\`

## Basic Usage

TailwindCSS provides utility classes for almost everything you might want to style:

\`\`\`html
<div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
  <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Card Title</h2>
  <p class="text-gray-700 dark:text-gray-300">
    This is a simple card built with TailwindCSS utility classes.
  </p>
  <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
    Click me
  </button>
</div>
\`\`\`

## Responsive Design

TailwindCSS makes it easy to build responsive designs:

\`\`\`html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div class="bg-white p-4 rounded shadow">Item 1</div>
  <div class="bg-white p-4 rounded shadow">Item 2</div>
  <div class="bg-white p-4 rounded shadow">Item 3</div>
</div>
\`\`\`

## Dark Mode

TailwindCSS also supports dark mode out of the box:

\`\`\`html
<div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  This text will be black on white in light mode, and white on dark gray in dark mode.
</div>
\`\`\`

## Customization

You can customize TailwindCSS by editing the \`tailwind.config.js\` file:

\`\`\`javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3490dc',
        secondary: '#ffed4a',
        danger: '#e3342f',
      },
    },
  },
  variants: {},
  plugins: [],
}
\`\`\`

## Conclusion

TailwindCSS is a powerful tool for building modern websites. It allows you to build custom designs without writing CSS, and it's highly customizable.
    `,
    coverImage: "https://images.unsplash.com/photo-1618788372246-79faff0c3742",
    date: "2023-10-18",
    authorId: "author-3",
    tags: ["TailwindCSS", "CSS", "Web Design", "Frontend"],
    featured: false,
    trending: true,
  },
];

export function getFeaturedPosts() {
  return blogPosts.filter(post => post.featured);
}

export function getTrendingPosts() {
  return blogPosts.filter(post => post.trending);
}

export function getPostsByAuthor(authorId: string) {
  return blogPosts.filter(post => post.authorId === authorId);
}

export function getPostsByTag(tag: string) {
  return blogPosts.filter(post => post.tags.includes(tag));
}

export function getAuthorById(authorId: string) {
  return authors.find(author => author.id === authorId);
}

export function getPostById(postId: string) {
  return blogPosts.find(post => post.id === postId);
}