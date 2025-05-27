import React from 'react';
import { Users, Star } from 'lucide-react';

const contributors = [
  {
    name: 'John Developer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    posts: 234,
    rating: 4.8,
  },
  {
    name: 'Sarah Engineer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    posts: 189,
    rating: 4.9,
  },
  {
    name: 'Michael Designer',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    posts: 156,
    rating: 4.7,
  },
  {
    name: 'Emma Virtanen',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    posts: 142,
    rating: 4.9,
  },
  {
    name: 'Lars Andersen',
    avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    posts: 128,
    rating: 4.8,
  },
  {
    name: 'Sofia Lindberg',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    posts: 115,
    rating: 4.9,
  },
  {
    name: 'Henrik Nielsen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    posts: 98,
    rating: 4.7,
  },
  {
    name: 'Annika Korhonen',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    posts: 87,
    rating: 4.9,
  }
];

const TopContributors = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-4">
        <Users className="h-5 w-5 text-blue-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">Top Contributors</h2>
      </div>
      <div className="space-y-4">
        {contributors.map((contributor) => (
          <div key={contributor.name} className="flex items-center">
            <img
              src={contributor.avatar}
              alt={contributor.name}
              className="h-10 w-10 rounded-full"
            />
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-medium text-gray-900">{contributor.name}</h3>
              <div className="flex items-center text-sm text-gray-500">
                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                <span>{contributor.rating}</span>
                <span className="mx-2">•</span>
                <span>{contributor.posts} posts</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopContributors;