export interface Developer {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  totalSales: number;
  joinedDate: string;
  location: string;
  skills: string[];
  bio: string;
  company: string;
  website: string;
  availability: string;
  hourlyRate: number;
  languages: string[];
  certifications: string[];
  githubUrl: string;
  linkedinUrl: string;
  completedProjects: number;
  activeProjects: number;
  testimonials: {
    id: string;
    text: string;
    author: string;
    rating: number;
  }[];
}

export interface Solution {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  downloads: number;
  activeUsers: number;
  verified: boolean;
  subscription: boolean;
  developer: Developer;
  features: string[];
  technologies: string[];
  requirements: string[];
  screenshots: string[];
  demo?: string;
  documentation?: string;
  releaseDate: string;
  lastUpdate: string;
  version: string;
  supportedLanguages: string[];
  industries: string[];
  reviews: {
    id: string;
    user: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

export interface Request {
  id: string;
  title: string;
  description: string;
  budget: string;
  deadline: string;
  status: string;
  proposals: number;
  skills: string[];
  postedBy: {
    id: string;
    name: string;
    avatar: string;
  };
  postedAt: string;
  requirements: string[];
  attachments: {
    name: string;
    url: string;
    size: string;
  }[];
}

export interface ForumTopic {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  category: string;
  tags: string[];
  createdAt: string;
  views: number;
  replies: ForumReply[];
}

export interface ForumReply {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  createdAt: string;
  votes: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  solutionCount: number;
}