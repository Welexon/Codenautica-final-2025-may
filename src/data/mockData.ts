import {
  Developer,
  Solution,
  Request,
  ForumTopic,
  ForumReply
} from '../types/marketplace';

// Developers
export const mockDevelopers: Developer[] = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'John Developer',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 4.8,
    totalSales: 156,
    joinedDate: '2022-01-15',
    location: 'Oslo, Norway',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
    bio: 'Full-stack developer specializing in scalable web applications',
    company: 'Nordic Tech Solutions',
    website: 'https://johndeveloper.com',
    availability: 'Available',
    hourlyRate: 95,
    languages: ['English', 'Norwegian'],
    certifications: ['AWS Certified Developer', 'MongoDB Certified'],
    githubUrl: 'https://github.com/johndeveloper',
    linkedinUrl: 'https://linkedin.com/in/johndeveloper',
    completedProjects: 45,
    activeProjects: 3,
    testimonials: [
      {
        id: 't1',
        text: 'Excellent work on our e-commerce platform. Highly recommended!',
        author: 'TechCorp AS',
        rating: 5
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    name: 'Sarah Engineer',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 4.9,
    totalSales: 89,
    joinedDate: '2022-03-20',
    location: 'Stockholm, Sweden',
    skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
    bio: 'Backend developer with focus on API design and system architecture',
    company: 'DataFlow AB',
    website: 'https://sarahcodes.se',
    availability: 'Available',
    hourlyRate: 85,
    languages: ['English', 'Swedish'],
    certifications: ['Python Professional', 'Docker Certified Associate'],
    githubUrl: 'https://github.com/saraheng',
    linkedinUrl: 'https://linkedin.com/in/saraheng',
    completedProjects: 32,
    activeProjects: 2,
    testimonials: [
      {
        id: 't2',
        text: 'Sarah delivered our analytics system ahead of schedule. Great communication!',
        author: 'DataNordic',
        rating: 5
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000003',
    name: 'Marcus Jensen',
    avatar:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 4.7,
    totalSales: 120,
    joinedDate: '2022-05-10',
    location: 'Copenhagen, Denmark',
    skills: ['Vue.js', 'Laravel', 'AWS', 'DevOps'],
    bio: 'Full-stack developer specializing in cloud solutions',
    company: 'CloudNordic',
    website: 'https://marcusjensen.dev',
    availability: 'Available',
    hourlyRate: 90,
    languages: ['English', 'Danish'],
    certifications: ['AWS Solutions Architect', 'Vue.js Certified'],
    githubUrl: 'https://github.com/marcusj',
    linkedinUrl: 'https://linkedin.com/in/marcusj',
    completedProjects: 38,
    activeProjects: 1,
    testimonials: [
      {
        id: 't3',
        text: 'Marcus helped us migrate to AWS with zero downtime. Exceptional work!',
        author: 'Nordic Retail Group',
        rating: 4.8
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000004',
    name: 'Emma Virtanen',
    avatar:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 4.9,
    totalSales: 178,
    joinedDate: '2022-02-01',
    location: 'Helsinki, Finland',
    skills: ['React Native', 'TypeScript', 'GraphQL', 'Firebase'],
    bio: 'Mobile app developer specializing in cross-platform solutions',
    company: 'MobileNordic Oy',
    website: 'https://emmav.dev',
    availability: 'Available',
    hourlyRate: 92,
    languages: ['English', 'Finnish', 'Swedish'],
    certifications: ['Google Mobile Web Specialist', 'React Native Certified'],
    githubUrl: 'https://github.com/emmav',
    linkedinUrl: 'https://linkedin.com/in/emmav',
    completedProjects: 42,
    activeProjects: 2,
    testimonials: [
      {
        id: 't4',
        text: 'Emma delivered an exceptional mobile app that exceeded our expectations.',
        author: 'Nordic Mobile Solutions',
        rating: 5
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000005',
    name: 'Lars Andersen',
    avatar:
      'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 4.8,
    totalSales: 145,
    joinedDate: '2022-06-15',
    location: 'Bergen, Norway',
    skills: ['Angular', 'Java', 'Spring Boot', 'Azure'],
    bio: 'Enterprise software architect with focus on scalable solutions',
    company: 'Nordic Enterprise Solutions',
    website: 'https://larsandersen.no',
    availability: 'Available',
    hourlyRate: 105,
    languages: ['English', 'Norwegian', 'Danish'],
    certifications: [
      'Microsoft Certified: Azure Solutions Architect',
      'Java Enterprise Architect'
    ],
    githubUrl: 'https://github.com/larsa',
    linkedinUrl: 'https://linkedin.com/in/larsa',
    completedProjects: 35,
    activeProjects: 3,
    testimonials: [
      {
        id: 't5',
        text: 'Lars helped us modernize our legacy systems with great success.',
        author: 'Nordic Banking Group',
        rating: 4.8
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000006',
    name: 'Sofia Lindberg',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 4.9,
    totalSales: 132,
    joinedDate: '2022-04-18',
    location: 'Gothenburg, Sweden',
    skills: ['UX/UI Design', 'Figma', 'React', 'CSS/SASS'],
    bio: 'Frontend developer and UX designer creating beautiful, user-friendly interfaces',
    company: 'Design Nordic',
    website: 'https://sofialindberg.se',
    availability: 'Limited Availability',
    hourlyRate: 88,
    languages: ['English', 'Swedish', 'Norwegian'],
    certifications: ['Certified UX Designer', 'Adobe Certified Expert'],
    githubUrl: 'https://github.com/sofialindberg',
    linkedinUrl: 'https://linkedin.com/in/sofialindberg',
    completedProjects: 39,
    activeProjects: 4,
    testimonials: [
      {
        id: 't6',
        text: 'Sofia transformed our user interface and increased our conversion rate by 35%.',
        author: 'E-commerce Solutions AB',
        rating: 5
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000007',
    name: 'Henrik Nielsen',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 4.7,
    totalSales: 98,
    joinedDate: '2022-07-22',
    location: 'Aarhus, Denmark',
    skills: ['PHP', 'Laravel', 'MySQL', 'JavaScript'],
    bio: 'Backend developer specializing in e-commerce and payment solutions',
    company: 'Nordic Web Solutions',
    website: 'https://henriknielsen.dk',
    availability: 'Available',
    hourlyRate: 82,
    languages: ['English', 'Danish'],
    certifications: ['Laravel Certified Developer', 'MySQL Database Administrator'],
    githubUrl: 'https://github.com/henriknielsen',
    linkedinUrl: 'https://linkedin.com/in/henriknielsen',
    completedProjects: 28,
    activeProjects: 2,
    testimonials: [
      {
        id: 't7',
        text: 'Henrik developed a custom payment solution that perfectly integrated with our existing systems.',
        author: 'Danish Retail Association',
        rating: 4.7
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000008',
    name: 'Annika Korhonen',
    avatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 4.9,
    totalSales: 165,
    joinedDate: '2022-03-05',
    location: 'Tampere, Finland',
    skills: ['Data Science', 'Python', 'Machine Learning', 'TensorFlow'],
    bio: 'Data scientist and AI specialist with focus on business intelligence solutions',
    company: 'AI Nordic',
    website: 'https://annikakorhonen.fi',
    availability: 'Available',
    hourlyRate: 110,
    languages: ['English', 'Finnish', 'Swedish'],
    certifications: ['TensorFlow Developer Certificate', 'IBM Data Science Professional'],
    githubUrl: 'https://github.com/annikakorhonen',
    linkedinUrl: 'https://linkedin.com/in/annikakorhonen',
    completedProjects: 31,
    activeProjects: 3,
    testimonials: [
      {
        id: 't8',
        text: 'Annika built a predictive analytics system that has transformed our inventory management.',
        author: 'Finnish Logistics Group',
        rating: 5
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000009',
    name: 'Mikkel Hansen',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 4.8,
    totalSales: 112,
    joinedDate: '2022-05-15',
    location: 'Malmö, Sweden',
    skills: ['C#', '.NET', 'Azure', 'Microservices'],
    bio: 'Enterprise software developer specializing in .NET and cloud solutions',
    company: 'Nilsson Solutions',
    website: 'https://mikkelhansen.dk',
    availability: 'Available',
    hourlyRate: 95,
    languages: ['English', 'Swedish', 'Danish'],
    certifications: ['Microsoft Certified: Azure Developer Associate', '.NET Core Developer'],
    githubUrl: 'https://github.com/mikkelhansen',
    linkedinUrl: 'https://linkedin.com/in/mikkelhansen',
    completedProjects: 29,
    activeProjects: 2,
    testimonials: [
      {
        id: 't9',
        text: 'Mikkel delivered a complex microservices architecture that has significantly improved our system performance.',
        author: 'Swedish Tech Innovations',
        rating: 4.8
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000010',
    name: 'Ingrid Johansen',
    avatar:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 4.9,
    totalSales: 143,
    joinedDate: '2022-02-28',
    location: 'Trondheim, Norway',
    skills: ['Security', 'Penetration Testing', 'Python', 'Cybersecurity'],
    bio: 'Cybersecurity specialist with focus on secure application development',
    company: 'SecureNordic',
    website: 'https://ingridjohansen.no',
    availability: 'Limited Availability',
    hourlyRate: 115,
    languages: ['English', 'Norwegian'],
    certifications: ['Certified Ethical Hacker', 'CISSP', 'CompTIA Security+'],
    githubUrl: 'https://github.com/ingridjohansen',
    linkedinUrl: 'https://linkedin.com/in/ingridjohansen',
    completedProjects: 27,
    activeProjects: 2,
    testimonials: [
      {
        id: 't10',
        text: 'Ingrid identified critical security vulnerabilities in our application and provided clear remediation steps.',
        author: 'Norwegian Financial Services',
        rating: 5
      }
    ]
  }
];

// Solutions
export const mockSolutions: Solution[] = [
  {
    id: '00000000-0000-0000-0000-000000000101',
    title: 'Advanced Inventory Management',
    description:
      'Complete inventory management solution with real-time tracking and analytics.',
    price: 299,
    category: 'Operations',
    image:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    downloads: 1200,
    activeUsers: 850,
    verified: true,
    subscription: true,
    developer: mockDevelopers[0],
    features: [
      'Real-time inventory tracking',
      'Automated reordering',
      'Analytics dashboard',
      'Multi-location support',
      'Barcode scanning',
      'Supplier management',
      'Stock alerts',
      'Custom reporting'
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'WebSocket', 'Docker'],
    requirements: [
      'Modern web browser',
      'Internet connection',
      'Minimum 2GB RAM',
      'Compatible with all major operating systems'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586528116493-da5c4ed5bc72?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586528116425-28320cd8c5ca?auto=format&fit=crop&w=800&q=80'
    ],
    demo: 'https://demo.example.com',
    documentation: 'https://docs.example.com',
    releaseDate: '2023-12-15',
    lastUpdate: '2024-03-10',
    version: '2.1.0',
    supportedLanguages: ['English', 'Norwegian', 'Swedish'],
    industries: ['Retail', 'Manufacturing', 'Wholesale'],
    reviews: [
      {
        id: 'r1',
        user: 'TechCorp AS',
        rating: 5,
        comment:
          'Excellent solution that transformed our inventory management.',
        date: '2024-02-15'
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000102',
    title: 'Customer Analytics Dashboard',
    description:
      'Powerful analytics platform for tracking customer behavior and engagement.',
    price: 199,
    category: 'Analytics',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    downloads: 850,
    activeUsers: 620,
    verified: true,
    subscription: true,
    developer: mockDevelopers[1],
    features: [
      'Real-time analytics',
      'Custom dashboards',
      'User behavior tracking',
      'Conversion funnels',
      'A/B testing',
      'Export capabilities',
      'API access'
    ],
    technologies: ['Vue.js', 'Python', 'PostgreSQL', 'Redis'],
    requirements: [
      'Modern web browser',
      'Internet connection',
      'API key for integration'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551288049-a22ae1ddba32?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551288049-7e0324a88b2f?auto=format&fit=crop&w=800&q=80'
    ],
    demo: 'https://demo.dataviz.com',
    documentation: 'https://docs.dataviz.com',
    releaseDate: '2023-11-20',
    lastUpdate: '2024-03-05',
    version: '1.8.0',
    supportedLanguages: ['English', 'Swedish'],
    industries: ['E-commerce', 'SaaS', 'Retail'],
    reviews: [
      {
        id: 'r2',
        user: 'DataNordic',
        rating: 4,
        comment: 'Great insights and easy to use interface.',
        date: '2024-01-20'
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000103',
    title: 'HR Management Suite Pro',
    description:
      'Comprehensive HR management system with advanced features for Nordic businesses.',
    price: 449,
    category: 'HR',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    downloads: 320,
    activeUsers: 280,
    verified: true,
    subscription: true,
    developer: mockDevelopers[4],
    features: [
      'Employee management',
      'Time tracking',
      'Performance reviews',
      'Leave management',
      'Payroll integration',
      'Nordic compliance',
      'Multi-language support',
      'Custom workflows'
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
    requirements: [
      'Modern web browser',
      'Internet connection',
      'Company email domain',
      'SSL certificate'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1573496359610-54d5d1173114?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1573496359501-857880c2f821?auto=format&fit=crop&w=800&q=80'
    ],
    demo: 'https://demo.hrpro.com',
    documentation: 'https://docs.hrpro.com',
    releaseDate: '2024-01-15',
    lastUpdate: '2024-03-10',
    version: '2.1.0',
    supportedLanguages: [
      'English',
      'Swedish',
      'Norwegian',
      'Danish'
    ],
    industries: ['Technology', 'Manufacturing', 'Services'],
    reviews: [
      {
        id: 'r3',
        user: 'TechCorp AS',
        rating: 5,
        comment:
          'Excellent HR solution with great Nordic market understanding.',
        date: '2024-02-20'
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000104',
    title: 'Mobile App Development Kit',
    description:
      'Complete toolkit for developing cross-platform mobile applications with Nordic design principles.',
    price: 599,
    category: 'Development',
    image:
      'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    downloads: 450,
    activeUsers: 380,
    verified: true,
    subscription: true,
    developer: mockDevelopers[3],
    features: [
      'Cross-platform development',
      'Nordic design templates',
      'Payment integration',
      'Push notifications',
      'Offline support',
      'Analytics integration',
      'CI/CD pipelines',
      'Testing frameworks'
    ],
    technologies: ['React Native', 'TypeScript', 'GraphQL', 'Firebase'],
    requirements: [
      'Node.js 14+',
      'macOS/Windows/Linux',
      'Git',
      'Android Studio / Xcode'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555774698-eb2d683a49b6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555774698-4581bbf6b3cf?auto=format&fit=crop&w=800&q=80'
    ],
    demo: 'https://demo.mobilekit.dev',
    documentation: 'https://docs.mobilekit.dev',
    releaseDate: '2024-02-01',
    lastUpdate: '2024-03-15',
    version: '1.2.0',
    supportedLanguages: ['English', 'Finnish', 'Swedish'],
    industries: ['Technology', 'E-commerce', 'Services'],
    reviews: [
      {
        id: 'r4',
        user: 'Nordic Mobile Solutions',
        rating: 5,
        comment:
          'Outstanding toolkit that accelerated our mobile app development.',
        date: '2024-03-01'
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000105',
    title: 'AI-Powered Customer Support Chatbot',
    description:
      'An intelligent chatbot solution that provides instant customer support using AI and machine learning.',
    price: 399,
    category: 'Customer Support',
    image:
      'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    downloads: 600,
    activeUsers: 550,
    verified: true,
    subscription: true,
    developer: mockDevelopers[2],
    features: [
      'Natural language processing',
      '24/7 customer support',
      'Multi-language support',
      'Seamless integration',
      'Analytics dashboard',
      'Customizable responses',
      'AI learning over time',
      'Security compliance'
    ],
    technologies: ['Python', 'TensorFlow', 'Flask', 'Docker'],
    requirements: [
      'Server with Python 3.8+',
      'Internet connection',
      'API keys for integrations'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1531746790731-6c087fecd65b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1531746790731-6c087fecd65c?auto=format&fit=crop&w=800&q=80'
    ],
    demo: 'https://demo.chatbotai.com',
    documentation: 'https://docs.chatbotai.com',
    releaseDate: '2024-02-20',
    lastUpdate: '2024-03-18',
    version: '1.0.0',
    supportedLanguages: [
      'English',
      'Finnish',
      'Swedish',
      'Norwegian',
      'Danish'
    ],
    industries: ['E-commerce', 'Finance', 'Healthcare'],
    reviews: [
      {
        id: 'r5',
        user: 'FinTech Solutions',
        rating: 5,
        comment:
          'The chatbot has significantly improved our customer response time.',
        date: '2024-03-10'
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000106',
    title: 'Real Estate Management Platform',
    description:
      'A comprehensive platform for managing real estate properties, tenants, and maintenance requests.',
    price: 499,
    category: 'Operations',
    image:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    downloads: 400,
    activeUsers: 350,
    verified: true,
    subscription: true,
    developer: mockDevelopers[0],
    features: [
      'Property listings',
      'Tenant management',
      'Maintenance tracking',
      'Online payments',
      'Lease agreements',
      'Reporting tools',
      'Calendar integration',
      'Notification system'
    ],
    technologies: ['PHP', 'Laravel', 'MySQL', 'Vue.js'],
    requirements: [
      'Server with PHP 7.4+',
      'MySQL 5.7+',
      'Internet connection',
      'SSL certificate'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560518883-b414a6dd3a1d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560518883-7d3bdbf5b0c2?auto=format&fit=crop&w=800&q=80'
    ],
    demo: 'https://demo.realestateplatform.com',
    documentation: 'https://docs.realestateplatform.com',
    releaseDate: '2024-01-25',
    lastUpdate: '2024-03-12',
    version: '2.0.0',
    supportedLanguages: ['English', 'Swedish'],
    industries: ['Real Estate', 'Property Management'],
    reviews: [
      {
        id: 'r6',
        user: 'Nordic Properties',
        rating: 4.5,
        comment:
          'A great tool that streamlined our property management processes.',
        date: '2024-03-05'
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000107',
    title: 'Nordic E-commerce Platform',
    description:
      'Complete e-commerce solution tailored for Nordic markets with local payment methods and shipping integrations.',
    price: 549,
    category: 'E-commerce',
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    downloads: 780,
    activeUsers: 650,
    verified: true,
    subscription: true,
    developer: mockDevelopers[6],
    features: [
      'Nordic payment integrations (Klarna, Vipps, MobilePay)',
      'Multi-currency support',
      'VAT compliance',
      'Local shipping providers',
      'Responsive design',
      'Product management',
      'Customer accounts',
      'Order tracking'
    ],
    technologies: ['PHP', 'Laravel', 'MySQL', 'Vue.js', 'Docker'],
    requirements: [
      'Web server with PHP 8.0+',
      'MySQL 5.7+',
      'SSL certificate',
      'Payment gateway accounts'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556742205-e10c9486e506?auto=format&fit=crop&w=800&q=80'
    ],
    demo: 'https://demo.nordicshop.com',
    documentation: 'https://docs.nordicshop.com',
    releaseDate: '2023-11-10',
    lastUpdate: '2024-03-05',
    version: '3.2.1',
    supportedLanguages: ['English', 'Swedish', 'Norwegian', 'Danish', 'Finnish'],
    industries: ['Retail', 'Fashion', 'Electronics', 'Food & Beverage'],
    reviews: [
      {
        id: 'r7',
        user: 'Danish Fashion Brand',
        rating: 5,
        comment: 'This platform has everything we needed for our Nordic e-commerce operations. The local payment integrations work flawlessly.',
        date: '2024-02-18'
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000108',
    title: 'GDPR Compliance Toolkit',
    description:
      'Comprehensive solution for ensuring GDPR compliance in web applications and data management systems.',
    price: 349,
    category: 'Security',
    image:
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    downloads: 920,
    activeUsers: 870,
    verified: true,
    subscription: true,
    developer: mockDevelopers[9],
    features: [
      'Consent management',
      'Data subject request handling',
      'Privacy policy generator',
      'Data processing register',
      'Breach notification system',
      'Cookie consent banner',
      'Data retention policies',
      'Compliance documentation'
    ],
    technologies: ['JavaScript', 'React', 'Node.js', 'PostgreSQL'],
    requirements: [
      'Modern web browser',
      'Node.js 14+',
      'Database for storing consent records'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1563986768142-af45f8247bce?auto=format&fit=crop&w=800&q=80'
    ],
    demo: 'https://demo.gdprtoolkit.com',
    documentation: 'https://docs.gdprtoolkit.com',
    releaseDate: '2023-10-05',
    lastUpdate: '2024-03-15',
    version: '2.3.0',
    supportedLanguages: ['English', 'Swedish', 'Norwegian', 'Danish', 'Finnish'],
    industries: ['All industries', 'Technology', 'Healthcare', 'Finance'],
    reviews: [
      {
        id: 'r8',
        user: 'Norwegian Healthcare Provider',
        rating: 5,
        comment: 'This toolkit has been invaluable in ensuring our GDPR compliance. Highly recommended for any business handling personal data.',
        date: '2024-02-25'
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000109',
    title: 'Nordic Payment Gateway',
    description:
      'Unified payment processing solution that integrates all major Nordic payment methods into a single API.',
    price: 299,
    category: 'Finance',
    image:
      'https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    downloads: 850,
    activeUsers: 780,
    verified: true,
    subscription: true,
    developer: mockDevelopers[2],
    features: [
      'Klarna integration',
      'Vipps integration',
      'MobilePay integration',
      'Swish integration',
      'Credit card processing',
      'Invoice payments',
      'Subscription billing',
      'Payment analytics'
    ],
    technologies: ['Node.js', 'Express', 'MongoDB', 'Docker'],
    requirements: [
      'Server with Node.js 14+',
      'Merchant accounts with payment providers',
      'SSL certificate',
      'Business registration in Nordic countries'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556745753-b2904692b3cd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556742212-5b321f3c261b?auto=format&fit=crop&w=800&q=80'
    ],
    demo: 'https://demo.nordicpay.com',
    documentation: 'https://docs.nordicpay.com',
    releaseDate: '2023-09-15',
    lastUpdate: '2024-03-08',
    version: '2.5.0',
    supportedLanguages: ['English', 'Swedish', 'Norwegian', 'Danish', 'Finnish'],
    industries: ['E-commerce', 'Retail', 'Services', 'Subscription Businesses'],
    reviews: [
      {
        id: 'r9',
        user: 'Swedish E-commerce Platform',
        rating: 4.7,
        comment: 'This payment gateway has simplified our payment processing across all Nordic countries. Great solution!',
        date: '2024-02-10'
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000110',
    title: 'Smart Home Automation System',
    description:
      'IoT platform for controlling and automating smart home devices with focus on energy efficiency.',
    price: 349,
    category: 'IoT',
    image:
      'https://images.unsplash.com/photo-1558002038-1055e2e28cd0?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    downloads: 520,
    activeUsers: 480,
    verified: true,
    subscription: true,
    developer: mockDevelopers[8],
    features: [
      'Device management',
      'Automation rules',
      'Energy monitoring',
      'Voice control integration',
      'Mobile app control',
      'Scheduling',
      'Scene creation',
      'Multi-user access'
    ],
    technologies: ['Python', 'React Native', 'MQTT', 'Node.js', 'MongoDB'],
    requirements: [
      'Compatible smart home devices',
      'Home Wi-Fi network',
      'Mobile device for app',
      'Raspberry Pi or similar for local hub (optional)'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1558002038-1055e2e28cd0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558000143-a78f8299c40b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558346648-9757f2fa4474?auto=format&fit=crop&w=800&q=80'
    ],
    demo: 'https://demo.smarthomenordic.com',
    documentation: 'https://docs.smarthomenordic.com',
    releaseDate: '2023-12-01',
    lastUpdate: '2024-03-10',
    version: '1.8.0',
    supportedLanguages: ['English', 'Finnish', 'Swedish'],
    industries: ['Smart Home', 'Real Estate', 'Energy Management'],
    reviews: [
      {
        id: 'r10',
        user: 'Finnish Property Management',
        rating: 4.6,
        comment: 'This system has helped us reduce energy costs in our properties by 25%. The automation features are excellent.',
        date: '2024-02-28'
      }
    ]
  }
];

// Requests
export const mockRequests: Request[] = [
  {
    id: '00000000-0000-0000-0000-000000000201',
    title: 'E-commerce Integration Solution',
    description:
      'Looking for a developer to create a custom e-commerce integration between our existing platform and major Nordic payment providers.',
    budget: '15000-25000',
    deadline: '2024-04-15',
    status: 'open',
    proposals: 5,
    skills: ['API Integration', 'Payment Systems', 'Node.js', 'Security'],
    postedBy: {
      id: '00000000-0000-0000-0000-000000000301',
      name: 'TechCorp AS',
      avatar:
        'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80'
    },
    postedAt: '2024-03-10',
    requirements: [
      'Experience with Nordic payment providers',
      'Strong security background',
      'Excellent communication skills',
      'Available for regular meetings'
    ],
    attachments: [
      {
        name: 'Requirements.pdf',
        url: '#',
        size: '2.4 MB'
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000202',
    title: 'Analytics Dashboard Development',
    description:
      'Need a custom analytics dashboard for our business intelligence platform with real-time data visualization.',
    budget: '20000-30000',
    deadline: '2024-05-01',
    status: 'open',
    proposals: 3,
    skills: ['Data Visualization', 'React', 'D3.js', 'WebSocket'],
    postedBy: {
      id: '00000000-0000-0000-0000-000000000302',
      name: 'DataNordic',
      avatar:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
    },
    postedAt: '2024-03-12',
    requirements: [
      'Experience with real-time data visualization',
      'Knowledge of data analytics',
      'Performance optimization skills',
      'Responsive design experience'
    ],
    attachments: [
      {
        name: 'Dashboard_Mockups.pdf',
        url: '#',
        size: '3.1 MB'
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000203',
    title: 'Mobile App for Retail Chain',
    description:
      'Looking for a developer to create a mobile app for our retail chain with loyalty program integration.',
    budget: '30000-45000',
    deadline: '2024-05-15',
    status: 'open',
    proposals: 4,
    skills: ['React Native', 'Mobile Development', 'API Integration', 'UI/UX'],
    postedBy: {
      id: '00000000-0000-0000-0000-000000000303',
      name: 'Nordic Retail Group',
      avatar:
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80'
    },
    postedAt: '2024-03-14',
    requirements: [
      'Experience with retail applications',
      'Knowledge of loyalty programs',
      'Strong UI/UX skills',
      'Cross-platform development experience'
    ],
    attachments: [
      {
        name: 'App_Requirements.pdf',
        url: '#',
        size: '3.2 MB'
      }
    ]
  }
];

// Forum Topics
export const mockForumTopics: ForumTopic[] = [
  {
    id: 'topic1',
    title: 'Best practices for Nordic e-commerce solutions',
    content:
      'Looking for recommendations on implementing e-commerce solutions for the Nordic market, including payment integration, shipping, and GDPR compliance. I\'m particularly interested in experiences with Klarna, Vipps, and MobilePay integrations. Also, how are you handling the different VAT rates across Nordic countries? Any insights on shipping providers that work well across the region would be appreciated too.',
    author: {
      id: '00000000-0000-0000-0000-000000000001',
      name: 'John Developer',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    category: 'Technical',
    tags: ['e-commerce', 'payments', 'GDPR'],
    createdAt: '2024-03-10T10:00:00Z',
    views: 245,
    lastReply: '2024-03-13T10:00:00Z',
    pinned: true,
    replies: [
      {
        id: 'reply1',
        content:
          'For Nordic payments, I highly recommend integrating with Nets and Klarna. Vipps is essential for Norway, and MobilePay for Denmark. Make sure your solution can handle different currencies and VAT rates.',
        author: {
          id: '00000000-0000-0000-0000-000000000002',
          name: 'Sarah Engineer',
          avatar:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        createdAt: '2024-03-10T11:30:00Z',
        votes: 12
      },
      {
        id: 'reply2',
        content: "Don't forget about Swish for the Swedish market. It's widely used and customers expect it as a payment option.",
        author: {
          id: '00000000-0000-0000-0000-000000000003',
          name: 'Marcus Jensen',
          avatar:
            'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        createdAt: '2024-03-10T12:15:00Z',
        votes: 8
      },
      {
        id: 'reply3',
        content: "For shipping, PostNord covers all Nordic countries, but consider Bring as well. They have good cross-border services. Also, make sure your address forms support the different postal code formats used in each country.",
        author: {
          id: '00000000-0000-0000-0000-000000000004',
          name: 'Emma Virtanen',
          avatar:
            'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        createdAt: '2024-03-11T09:45:00Z',
        votes: 10
      },
      {
        id: 'reply4',
        content: "GDPR compliance is critical. Make sure you have clear consent mechanisms and data processing agreements. The Nordic countries are strict about enforcement. I recommend implementing a comprehensive consent management system.",
        author: {
          id: '00000000-0000-0000-0000-000000000005',
          name: 'Lars Andersen',
          avatar:
            'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        createdAt: '2024-03-12T14:20:00Z',
        votes: 15
      },
      {
        id: 'reply5',
        content: "Don't underestimate the importance of language support. While English is widely understood, having your platform available in local languages will significantly improve conversion rates.",
        author: {
          id: 'd6',
          name: 'Henrik Johansson',
          avatar:
            'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        createdAt: '2024-03-13T10:00:00Z',
        votes: 9
      }
    ]
  },
  {
    id: 'topic2',
    title: 'Implementing GDPR compliance in web applications',
    content:
      'Seeking advice on best practices for implementing GDPR compliance in web applications, including user consent management and data handling. What are the key components we should include in our GDPR implementation? How are you handling data subject access requests and the right to be forgotten? Any recommended tools or libraries that have worked well for Nordic businesses?',
    author: {
      id: '00000000-0000-0000-0000-000000000002',
      name: 'Sarah Engineer',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    category: 'Legal & Compliance',
    tags: ['GDPR', 'security', 'privacy'],
    createdAt: '2024-03-11T09:00:00Z',
    views: 189,
    lastReply: '2024-03-14T15:30:00Z',
    pinned: false,
    replies: [
      {
        id: 'reply3',
        content: "Here's a comprehensive checklist we use for GDPR compliance: 1) Clear consent mechanisms, 2) Data processing register, 3) Privacy policy, 4) Data breach notification process, 5) Data subject request handling, 6) Data retention policies, 7) Data protection impact assessments for high-risk processing.",
        author: {
          id: '00000000-0000-0000-0000-000000000001',
          name: 'John Developer',
          avatar:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        createdAt: '2024-03-11T10:45:00Z',
        votes: 15
      },
      {
        id: 'reply6',
        content: "For handling data subject access requests, we've implemented a self-service portal where users can download all their data and request deletion. This has significantly reduced the manual work for our team.",
        author: {
          id: '00000000-0000-0000-0000-000000000005',
          name: 'Lars Andersen',
          avatar:
            'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        createdAt: '2024-03-12T09:30:00Z',
        votes: 12
      },
      {
        id: 'reply7',
        content: "We've had good experiences with the 'gdpr-consent' npm package for managing cookie consent. It's customizable and handles all the necessary compliance requirements.",
        author: {
          id: '00000000-0000-0000-0000-000000000003',
          name: 'Marcus Jensen',
          avatar:
            'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        createdAt: '2024-03-13T11:15:00Z',
        votes: 8
      },
      {
        id: 'reply8',
        content: "Don't forget about data minimization principles. Only collect what you absolutely need, and be transparent about why you need it. This reduces your compliance burden significantly.",
        author: {
          id: 'd8',
          name: 'Mikkel Hansen',
          avatar:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        createdAt: '2024-03-14T15:30:00Z',
        votes: 10
      }
    ]
  },
  {
    id: 'topic3',
    title: 'Nordic payment gateway integration experiences',
    content:
      'Looking to gather experiences and recommendations for integrating Nordic payment gateways like Nets, Klarna, and Vipps. Which ones have you found most reliable? Are there any specific challenges with certain gateways? How do you handle the different currencies and payment preferences across the Nordic countries?',
    author: {
      id: '00000000-0000-0000-0000-000000000003',
      name: 'Marcus Jensen',
      avatar:
        'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    category: 'Technical',
    tags: ['payments', 'integration', 'e-commerce'],
    createdAt: '2024-03-13T09:15:00Z',
    views: 342,
    lastReply: '2024-03-16T14:20:00Z',
    pinned: false,
    replies: [
      {
        id: 'reply9',
        content: "We've integrated with all major Nordic payment providers, and Nets has been the most reliable for card payments across all Nordic countries. Their API is well-documented and their support is responsive.",
        author: {
          id: '00000000-0000-0000-0000-000000000001',
          name: 'John Developer',
          avatar:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        createdAt: '2024-03-13T10:30:00Z',
        votes: 14
      },
      {
        id: 'reply10',
        content: "Klarna has been excellent for us, especially for the Swedish market. Their checkout solution is comprehensive and handles a lot of the complexity for you. The main challenge was adapting our order management system to handle their unique payment flow.",
        author: {
          id: '00000000-0000-0000-0000-000000000002',
          name: 'Sarah Engineer',
          avatar:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        createdAt: '2024-03-14T09:45:00Z',
        votes: 11
      },
      {
        id: 'reply11',
        content: "For Norway, Vipps is absolutely essential. It's widely used and customers expect it. The integration is straightforward, but be aware that they require a Norwegian organization number, which can be a challenge for international businesses.",
        author: {
          id: '00000000-0000-0000-0000-000000000005',
          name: 'Lars Andersen',
          avatar:
            'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        createdAt: '2024-03-15T11:20:00Z',
        votes: 9
      },
      {
        id: 'reply12',
        content: "MobilePay is crucial for the Danish market. Their API has improved significantly in recent years, but their sandbox environment can be a bit unstable at times. Plan for extra testing time.",
        author: {
          id: 'd7',
          name: 'Henrik Nielsen',
          avatar:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        createdAt: '2024-03-16T14:20:00Z',
        votes: 7
      }
    ]
  },
  {
    id: 'topic4',
    title: 'Optimizing React applications for Nordic markets',
    content:
      'I\'m working on a React application targeted at Nordic users and looking for optimization tips. Are there any specific considerations for this market? How are you handling internationalization for multiple Nordic languages? Any performance optimizations that have worked well for users in this region?',
    author: {
      id: '00000000-0000-0000-0000-000000000004',
      name: 'Emma Virtanen',
      avatar:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    category: 'Technical',
    tags: ['React', 'performance', 'i18n'],
    createdAt: '2024-03-14T08:30:00Z',
    views: 278,
    lastReply: '2024-03-17T16:45:00Z',
    pinned: false,
    replies: [
      {
        id: 'reply13',
        content: "For internationalization, I recommend using react-i18next. It handles all Nordic languages well and supports pluralization rules. We've implemented language detection based on browser settings with a manual override option.",
        author: {
          id: '00000000-0000-0000-0000-000000000001',
          name: 'John Developer',
          avatar:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        createdAt: '2024-03-14T10:15:00Z',
        votes: 13
      },
      {
        id: 'reply14',
        content: "Consider implementing server-side rendering or static site generation. Nordic countries generally have good internet infrastructure, but there are still rural areas with slower connections. This approach improves initial load times significantly.",
        author: {
          id: 'd6',
          name: 'Henrik Johansson',
          avatar:
            'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        createdAt: '2024-03-15T09:30:00Z',
        votes: 11
      },
      {
        id: 'reply15',
        content: "For date and time formatting, be aware that Nordic countries use different formats. Sweden and Denmark typically use 'YYYY-MM-DD', while Finland might use 'DD.MM.YYYY'. Use the Intl.DateTimeFormat API with the appropriate locale.",
        author: {
          id: '00000000-0000-0000-0000-000000000002',
          name: 'Sarah Engineer',
          avatar:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        createdAt: '2024-03-16T11:45:00Z',
        votes: 9
      },
      {
        id: 'reply16',
        content: "Don't forget about accessibility. Nordic countries have strong digital accessibility requirements. Ensure your app meets WCAG 2.1 AA standards at minimum. This is not just good practice but often a legal requirement for many sectors.",
        author: {
          id: 'd7',
          name: 'Sofia Lindberg',
          avatar:
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        createdAt: '2024-03-17T16:45:00Z',
        votes: 15
      }
    ]
  },
  {
    id: 'topic5',
    title: 'Serverless architecture for Nordic businesses',
    content:
      'I\'m considering moving our business applications to a serverless architecture. Has anyone here implemented serverless solutions for Nordic businesses? What cloud providers work best in this region? Any specific challenges or benefits you\'ve encountered?',
    author: {
      id: '00000000-0000-0000-0000-000000000005',
      name: 'Lars Andersen',
      avatar:
        'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    category: 'Technical',
    tags: ['serverless', 'cloud', 'architecture'],
    createdAt: '2024-03-15T14:00:00Z',
    views: 215,
    lastReply: '2024-03-18T13:30:00Z',
    pinned: false,
    replies: [
      {
        id: 'reply17',
        content: "We've had great success with AWS Lambda for our serverless applications. AWS has a region in Stockholm which provides low latency for Nordic users. Their compliance certifications also cover all the requirements for Nordic businesses.",
        author: {
          id: '00000000-0000-0000-0000-000000000003',
          name: 'Marcus Jensen',
          avatar:
            'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        createdAt: '2024-03-15T15:45:00Z',
        votes: 12
      },
      {
        id: 'reply18',
        content: "Azure is another good option, especially if you're already using Microsoft products. They have data centers in Norway, Sweden, and Finland, which helps with data residency requirements that some Nordic businesses have.",
        author: {
          id: 'd10',
          name: 'Anders Nilsson',
          avatar:
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        createdAt: '2024-03-16T10:30:00Z',
        votes: 10
      },
      {
        id: 'reply19',
        content: "One challenge we faced was cold start times affecting user experience. We implemented provisioned concurrency for our critical functions to mitigate this. Also, be aware of the data protection requirements if you're handling personal data.",
        author: {
          id: '00000000-0000-0000-0000-000000000001',
          name: 'John Developer',
          avatar:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        createdAt: '2024-03-17T09:15:00Z',
        votes: 8
      },
      {
        id: 'reply20',
        content: "Cost monitoring is crucial with serverless. We initially saw some unexpected costs due to high function invocation rates. Implementing proper monitoring and alerts helped us optimize our architecture and reduce costs significantly.",
        author: {
          id: 'd13',
          name: 'Astrid Olsen',
          avatar:
            'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        createdAt: '2024-03-18T13:30:00Z',
        votes: 11
      }
    ]
  },
  {
    id: 'topic6',
    title: 'Sustainable software development practices',
    content:
      'Sustainability is a major focus in the Nordic region. How are you implementing sustainable practices in your software development? Are there any tools or methodologies you\'ve found particularly effective? How do you measure the environmental impact of your applications?',
    author: {
      id: 'd7',
      name: 'Sofia Lindberg',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    category: 'Innovation',
    tags: ['sustainability', 'green-coding', 'best-practices'],
    createdAt: '2024-03-16T11:00:00Z',
    views: 198,
    lastReply: '2024-03-19T10:45:00Z',
    pinned: false,
    replies: [
      {
        id: 'reply21',
        content: "We've been optimizing our applications for energy efficiency by reducing unnecessary computations and data transfers. Tools like GreenFrame help us measure the carbon footprint of our web applications and identify areas for improvement.",
        author: {
          id: '00000000-0000-0000-0000-000000000004',
          name: 'Emma Virtanen',
          avatar:
            'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        createdAt: '2024-03-16T13:30:00Z',
        votes: 16
      },
      {
        id: 'reply22',
        content: "Cloud provider selection is important. We chose providers with commitments to renewable energy and carbon neutrality. AWS, Azure, and Google Cloud all have data centers in the Nordics that use renewable energy sources.",
        author: {
          id: '00000000-0000-0000-0000-000000000005',
          name: 'Lars Andersen',
          avatar:
            'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        createdAt: '2024-03-17T09:45:00Z',
        votes: 13
      },
      {
        id: 'reply23',
        content: "We've implemented 'green coding' practices: optimizing algorithms, reducing unnecessary API calls, implementing efficient caching strategies, and minimizing asset sizes. These not only reduce environmental impact but also improve performance.",
        author: {
          id: 'd12',
          name: 'Mikko Virtanen',
          avatar:
            'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        createdAt: '2024-03-18T14:15:00Z',
        votes: 11
      },
      {
        id: 'reply24',
        content: "Consider the hardware lifecycle too. We've extended our device refresh cycles and partnered with local e-waste recycling programs. For development environments, we use containerization to maximize resource utilization on our servers.",
        author: {
          id: 'd17',
          name: 'Kristian Larsen',
          avatar:
            'https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        createdAt: '2024-03-19T10:45:00Z',
        votes: 9
      }
    ]
  },
  {
    id: 'topic7',
    title: 'Accessibility standards for Nordic markets',
    content:
      'What accessibility standards and regulations should we be aware of when developing applications for Nordic markets? Are there any country-specific requirements beyond WCAG? What testing tools and methodologies do you recommend for ensuring compliance?',
    author: {
      id: 'd18',
      name: 'Maija Koivisto',
      avatar:
        'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    category: 'Technical',
    tags: ['accessibility', 'WCAG', 'compliance'],
    createdAt: '2024-03-17T09:30:00Z',
    views: 176,
    lastReply: '2024-03-20T15:20:00Z',
    pinned: false,
    replies: [
      {
        id: 'reply25',
        content: "All Nordic countries follow the EU Web Accessibility Directive, which requires public sector websites to meet WCAG 2.1 AA standards. In practice, many private companies also adhere to these standards, especially those providing essential services.",
        author: {
          id: '00000000-0000-0000-0000-000000000002',
          name: 'Sarah Engineer',
          avatar:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        createdAt: '2024-03-17T11:45:00Z',
        votes: 14
      },
      {
        id: 'reply26',
        content: "For testing, we use a combination of automated tools (Axe, WAVE, Lighthouse) and manual testing with screen readers. Involving users with disabilities in your testing process is invaluable and strongly encouraged in the Nordic accessibility community.",
        author: {
          id: 'd7',
          name: 'Sofia Lindberg',
          avatar:
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        createdAt: '2024-03-18T10:30:00Z',
        votes: 12
      },
      {
        id: 'reply27',
        content: "Norway has some additional requirements through their Anti-discrimination and Accessibility Act. It's similar to WCAG but has some specific provisions. The Norwegian Authority for Universal Design of ICT (Tilsynet for universell utforming av IKT) provides guidance.",
        author: {
          id: '00000000-0000-0000-0000-000000000005',
          name: 'Lars Andersen',
          avatar:
            'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        createdAt: '2024-03-19T09:15:00Z',
        votes: 10
      },
      {
        id: 'reply28',
        content: "Don't forget about keyboard navigation and focus management, especially for complex interactive components. Nordic users have high expectations for digital accessibility, and poor implementation can damage your brand reputation.",
        author: {
          id: 'd6',
          name: 'Henrik Johansson',
          avatar:
            'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        createdAt: '2024-03-20T15:20:00Z',
        votes: 9
      }
    ]
  },
  {
    id: 'topic8',
    title: 'Remote work tools for distributed Nordic teams',
    content:
      'Our development team is distributed across several Nordic countries. What tools and practices have you found most effective for remote collaboration? How do you handle the challenges of different time zones (albeit small differences) and work cultures?',
    author: {
      id: '00000000-0000-0000-0000-000000000001',
      name: 'John Developer',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    category: 'Networking',
    tags: ['remote-work', 'collaboration', 'tools'],
    createdAt: '2024-03-18T08:45:00Z',
    views: 165,
    lastReply: '2024-03-21T11:30:00Z',
    pinned: false,
    replies: [
      {
        id: 'reply29',
        content: "We use a combination of Slack for communication, Notion for documentation, and Figma for design collaboration. For project management, Jira works well for us. The key is having clear communication channels and documentation practices.",
        author: {
          id: '00000000-0000-0000-0000-000000000004',
          name: 'Emma Virtanen',
          avatar:
            'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        createdAt: '2024-03-18T10:30:00Z',
        votes: 11
      },
      {
        id: 'reply30',
        content: "Regular video meetings are essential for building team cohesion. We have a daily standup and a weekly team meeting with cameras on. We also organize quarterly in-person meetups, rotating between our different office locations across the Nordics.",
        author: {
          id: 'd9',
          name: 'Elina Virtanen',
          avatar:
            'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        createdAt: '2024-03-19T09:15:00Z',
        votes: 9
      },
      {
        id: 'reply31',
        content: "For time zone differences, we establish core hours (10:00-15:00 CET) when everyone should be available for meetings and collaboration. Outside those hours, people can work flexibly according to their preferences and local work culture.",
        author: {
          id: '00000000-0000-0000-0000-000000000003',
          name: 'Marcus Jensen',
          avatar:
            'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        createdAt: '2024-03-20T14:45:00Z',
        votes: 8
      },
      {
        id: 'reply32',
        content: "Don't underestimate the importance of social interaction. We have virtual coffee breaks, online game sessions, and a dedicated Slack channel for non-work discussions. These help build relationships despite the physical distance.",
        author: {
          id: 'd15',
          name: 'Mette Pedersen',
          avatar:
            'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        createdAt: '2024-03-21T11:30:00Z',
        votes: 12
      }
    ]
  }
];

// Categories
export const categories = [
  'Operations',
  'Analytics',
  'HR',
  'Finance',
  'Marketing',
  'Security',
  'Integration',
  'Communication',
  'Project Management',
  'Customer Support',
  'Education',
  'Development',
  'E-commerce',
  'IoT',
  'Healthcare',
  'Tourism',
  'Hospitality',
  'Legal',
  'Energy'
];

// Helper Functions
export const getRandomItems = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getRelatedSolutions = (
  solution: Solution,
  count: number = 3
): Solution[] => {
  return mockSolutions
    .filter(s => s.id !== solution.id && s.category === solution.category)
    .slice(0, count);
};

export const getDeveloperSolutions = (developerId: string): Solution[] => {
  return mockSolutions.filter(
    solution => solution.developer.id === developerId
  );
};

export const getSolutionsByCategory = (category: string): Solution[] => {
  return mockSolutions.filter(solution => solution.category === category);
};

export const searchSolutions = (query: string): Solution[] => {
  const lowercaseQuery = query.toLowerCase();
  return mockSolutions.filter(
    solution =>
      solution.title.toLowerCase().includes(lowercaseQuery) ||
      solution.description.toLowerCase().includes(lowercaseQuery) ||
      solution.technologies.some(tech =>
        tech.toLowerCase().includes(lowercaseQuery)
      )
  );
};

export const searchDevelopers = (query: string): Developer[] => {
  const lowercaseQuery = query.toLowerCase();
  return mockDevelopers.filter(
    developer =>
      developer.name.toLowerCase().includes(lowercaseQuery) ||
      developer.skills.some(skill =>
        skill.toLowerCase().includes(lowercaseQuery)
      ) ||
      developer.location.toLowerCase().includes(lowercaseQuery)
  );
};