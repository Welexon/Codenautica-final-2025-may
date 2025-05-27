import React from 'react';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const posts = [
    {
      id: '1',
      title: 'Best Practices for Nordic Software Integration',
      excerpt: 'Learn how to effectively integrate software solutions in the Nordic market while maintaining compliance and security.',
      author: {
        name: 'John Developer',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      date: '2024-03-15',
      readTime: '5 min read',
      category: 'Technical',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '2',
      title: 'The Future of Nordic Tech: Trends to Watch',
      excerpt: 'Explore emerging technology trends shaping the Nordic software industry and what they mean for businesses.',
      author: {
        name: 'Sarah Engineer',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      date: '2024-03-10',
      readTime: '7 min read',
      category: 'Industry',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '3',
      title: 'Building Secure Software for Nordic Businesses',
      excerpt: 'Security considerations and best practices for developing software solutions that meet Nordic compliance standards.',
      author: {
        name: 'Marcus Jensen',
        avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      date: '2024-03-05',
      readTime: '6 min read',
      category: 'Security',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">CodeNautica Blog</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Insights, tutorials, and updates from the Nordic software community
        </p>
      </div>

      {/* Featured Post */}
      <div className="mb-12">
        <div className="relative h-[400px] rounded-xl overflow-hidden">
          <img
            src={posts[0].image}
            alt={posts[0].title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <span className="inline-block px-3 py-1 bg-blue-500/20 backdrop-blur-sm rounded-full text-sm font-medium text-white mb-4">
                {posts[0].category}
              </span>
              <h2 className="text-3xl font-bold text-white mb-4">{posts[0].title}</h2>
              <p className="text-lg text-gray-200 mb-4">{posts[0].excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={posts[0].author.avatar}
                    alt={posts[0].author.name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">{posts[0].author.name}</p>
                    <div className="flex items-center text-sm text-gray-300">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{new Date(posts[0].date).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span>{posts[0].readTime}</span>
                    </div>
                  </div>
                </div>
                <Link
                  to={`/blog/${posts[0].id}`}
                  className="inline-flex items-center px-4 py-2 bg-white text-blue-700 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                >
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.slice(1).map((post) => (
          <article key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                {post.category}
              </span>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="h-8 w-8 rounded-full"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              <Link
                to={`/blog/${post.id}`}
                className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                Read More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;