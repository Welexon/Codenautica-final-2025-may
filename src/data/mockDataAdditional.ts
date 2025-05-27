import { Developer, Solution, Request } from '../types/marketplace';

// Additional Developers
export const additionalDevelopers: Developer[] = [
  {
    id: 'd4',
    name: 'Emma Virtanen',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
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
    id: 'd5',
    name: 'Lars Andersen',
    avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
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
    certifications: ['Microsoft Certified: Azure Solutions Architect', 'Java Enterprise Architect'],
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
    id: 'd6',
    name: 'Sofia Lindberg',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
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
    id: 'd7',
    name: 'Henrik Nielsen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
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
    id: 'd8',
    name: 'Annika Korhonen',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
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
  }
];

// Additional Solutions
export const additionalSolutions: Solution[] = [
  {
    id: 's3',
    title: 'HR Management Suite Pro',
    description: 'Comprehensive HR management system with advanced features for Nordic businesses.',
    price: 449,
    category: 'HR',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    downloads: 320,
    activeUsers: 280,
    verified: true,
    subscription: true,
    developer: additionalDevelopers[1],
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
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80'
    ],
    demo: 'https://demo.hrpro.com',
    documentation: 'https://docs.hrpro.com',
    releaseDate: '2024-01-15',
    lastUpdate: '2024-03-10',
    version: '2.1.0',
    supportedLanguages: ['English', 'Swedish', 'Norwegian', 'Danish'],
    industries: ['Technology', 'Manufacturing', 'Services'],
    reviews: [
      {
        id: 'r3',
        user: 'TechCorp AS',
        rating: 5,
        comment: 'Excellent HR solution with great Nordic market understanding.',
        date: '2024-02-20'
      }
    ]
  },
  {
    id: 's4',
    title: 'Mobile App Development Kit',
    description: 'Complete toolkit for developing cross-platform mobile applications with Nordic design principles.',
    price: 599,
    category: 'Development',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    downloads: 450,
    activeUsers: 380,
    verified: true,
    subscription: true,
    developer: additionalDevelopers[0],
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
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80'
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
        comment: 'Outstanding toolkit that accelerated our mobile app development.',
        date: '2024-03-01'
      }
    ]
  },
  {
    id: 's5',
    title: 'E-commerce Platform for Nordic Businesses',
    description: 'Complete e-commerce solution tailored for Nordic markets with local payment methods and shipping integrations.',
    price: 549,
    category: 'E-commerce',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    downloads: 780,
    activeUsers: 650,
    verified: true,
    subscription: true,
    developer: additionalDevelopers[3],
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
    id: 's6',
    title: 'GDPR Compliance Toolkit',
    description: 'Comprehensive solution for ensuring GDPR compliance in web applications and data management systems.',
    price: 349,
    category: 'Security',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    downloads: 920,
    activeUsers: 870,
    verified: true,
    subscription: true,
    developer: additionalDevelopers[4],
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
  }
];

// Additional Requests
export const additionalRequests: Request[] = [
  {
    id: 'req3',
    title: 'Mobile App for Retail Chain',
    description: 'Looking for a developer to create a mobile app for our retail chain with loyalty program integration.',
    budget: '30000-45000',
    deadline: '2024-05-15',
    status: 'open',
    proposals: 4,
    skills: ['React Native', 'Mobile Development', 'API Integration', 'UI/UX'],
    postedBy: {
      id: 'b3',
      name: 'Nordic Retail Group',
      avatar: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80'
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
  },
  {
    id: 'req4',
    title: 'Enterprise Resource Planning System',
    description: 'Need a custom ERP solution tailored for manufacturing companies in the Nordic region.',
    budget: '50000-80000',
    deadline: '2024-06-30',
    status: 'open',
    proposals: 6,
    skills: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL'],
    postedBy: {
      id: 'b4',
      name: 'Nordic Manufacturing AS',
      avatar: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80'
    },
    postedAt: '2024-03-15',
    requirements: [
      'Enterprise software experience',
      'Manufacturing industry knowledge',
      'Security expertise',
      'Integration capabilities'
    ],
    attachments: [
      {
        name: 'ERP_Specifications.pdf',
        url: '#',
        size: '4.5 MB'
      }
    ]
  },
  {
    id: 'req5',
    title: 'Healthcare Patient Portal',
    description: 'Seeking a developer to build a secure patient portal for our healthcare clinic with appointment booking and medical record access.',
    budget: '35000-50000',
    deadline: '2024-05-30',
    status: 'open',
    proposals: 7,
    skills: ['React', 'Node.js', 'HIPAA Compliance', 'Security'],
    postedBy: {
      id: 'b5',
      name: 'Swedish Medical Center',
      avatar: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80'
    },
    postedAt: '2024-03-18',
    requirements: [
      'Healthcare software experience',
      'Security and compliance expertise',
      'User experience design for patients',
      'Integration with existing systems'
    ],
    attachments: [
      {
        name: 'Portal_Requirements.pdf',
        url: '#',
        size: '3.8 MB'
      }
    ]
  },
  {
    id: 'req6',
    title: 'AI-Powered Product Recommendation Engine',
    description: 'Looking for a developer to create a machine learning-based product recommendation system for our e-commerce platform.',
    budget: '25000-40000',
    deadline: '2024-05-20',
    status: 'open',
    proposals: 5,
    skills: ['Machine Learning', 'Python', 'TensorFlow', 'API Development'],
    postedBy: {
      id: 'b6',
      name: 'Finnish E-commerce Group',
      avatar: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80'
    },
    postedAt: '2024-03-20',
    requirements: [
      'Experience with recommendation systems',
      'Machine learning expertise',
      'E-commerce understanding',
      'Scalable solution design'
    ],
    attachments: [
      {
        name: 'ML_Requirements.pdf',
        url: '#',
        size: '2.9 MB'
      }
    ]
  }
];

// Export combined data
export const allDevelopers = [...mockDevelopers, ...additionalDevelopers];
export const allSolutions = [...mockSolutions, ...additionalSolutions];
export const allRequests = [...mockRequests, ...additionalRequests];