// ... Previous solutions (s1-s4) remain the same ...

// Additional solutions
export const additionalSolutions = [
  {
    id: 's5',
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
        id: 'r5',
        user: 'TechCorp AS',
        rating: 5,
        comment: 'Excellent HR solution with great Nordic market understanding.',
        date: '2024-02-20'
      }
    ]
  },
  {
    id: 's6',
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
        id: 'r6',
        user: 'Nordic Mobile Solutions',
        rating: 5,
        comment: 'Outstanding toolkit that accelerated our mobile app development.',
        date: '2024-03-01'
      }
    ]
  },
  {
    id: 's7',
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
    id: 's8',
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
    id: 's9',
    title: 'Nordic Payment Gateway',
    description: 'Unified payment processing solution that integrates all major Nordic payment methods into a single API.',
    price: 299,
    category: 'Finance',
    image: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&w=800&q=80',
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
    id: 's10',
    title: 'Smart Home Automation System',
    description: 'IoT platform for controlling and automating smart home devices with focus on energy efficiency.',
    price: 349,
    category: 'IoT',
    image: 'https://images.unsplash.com/photo-1558002038-1055e2e28cd0?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    downloads: 520,
    activeUsers: 480,
    verified: true,
    subscription: true,
    developer: mockDevelopers[14],
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
  },
  {
    id: 's11',
    title: 'Healthcare Patient Management System',
    description: 'Secure and compliant patient management solution designed specifically for Nordic healthcare providers.',
    price: 599,
    category: 'Healthcare',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    downloads: 340,
    activeUsers: 310,
    verified: true,
    subscription: true,
    developer: mockDevelopers[7],
    features: [
      'Patient records management',
      'Appointment scheduling',
      'Prescription management',
      'Secure messaging',
      'Billing integration',
      'Health insurance processing',
      'Medical imaging integration',
      'Compliance reporting'
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'Redis'],
    requirements: [
      'Modern web browser',
      'Internet connection',
      'Healthcare provider credentials',
      'SSL certificate'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1576091160101-2a8b7a8f0be6?auto=format&fit=crop&w=800&q=80'
    ],
    demo: 'https://demo.healthcarenordic.com',
    documentation: 'https://docs.healthcarenordic.com',
    releaseDate: '2023-11-15',
    lastUpdate: '2024-03-01',
    version: '2.2.0',
    supportedLanguages: ['English', 'Swedish', 'Norwegian', 'Danish', 'Finnish'],
    industries: ['Healthcare', 'Medical Clinics', 'Hospitals'],
    reviews: [
      {
        id: 'r11',
        user: 'Swedish Medical Center',
        rating: 4.8,
        comment: 'This system has transformed our patient management workflow. The Nordic-specific features for healthcare compliance are excellent.',
        date: '2024-02-15'
      }
    ]
  },
  {
    id: 's12',
    title: 'Financial Reporting & Analysis Tool',
    description: 'Comprehensive financial reporting solution with advanced analytics and Nordic accounting standards compliance.',
    price: 499,
    category: 'Finance',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    downloads: 580,
    activeUsers: 520,
    verified: true,
    subscription: true,
    developer: mockDevelopers[8],
    features: [
      'Financial statements generation',
      'Budget planning',
      'Cash flow analysis',
      'Tax reporting',
      'Multi-currency support',
      'Nordic accounting standards',
      'Data visualization',
      'Audit trail'
    ],
    technologies: ['Angular', 'C#', '.NET Core', 'SQL Server', 'Power BI'],
    requirements: [
      'Modern web browser',
      'Internet connection',
      'Accounting system integration'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&w=800&q=80'
    ],
    demo: 'https://demo.financenordic.com',
    documentation: 'https://docs.financenordic.com',
    releaseDate: '2023-10-10',
    lastUpdate: '2024-02-28',
    version: '3.1.0',
    supportedLanguages: ['English', 'Swedish', 'Norwegian', 'Danish', 'Finnish'],
    industries: ['Finance', 'Accounting', 'Business Services'],
    reviews: [
      {
        id: 'r12',
        user: 'Norwegian Accounting Firm',
        rating: 4.7,
        comment: 'This tool has streamlined our financial reporting process and ensures compliance with all Nordic accounting standards.',
        date: '2024-02-05'
      }
    ]
  },
  {
    id: 's13',
    title: 'Nordic E-Learning Platform',
    description: 'Comprehensive e-learning solution designed for educational institutions and corporate training in the Nordic region.',
    price: 399,
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    downloads: 420,
    activeUsers: 380,
    verified: true,
    subscription: true,
    developer: mockDevelopers[5],
    features: [
      'Course management',
      'Interactive lessons',
      'Assessment tools',
      'Progress tracking',
      'Virtual classrooms',
      'Content library',
      'Certification system',
      'Analytics dashboard'
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'WebRTC', 'Socket.io'],
    requirements: [
      'Modern web browser',
      'Internet connection',
      'Webcam and microphone for virtual classrooms'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80'
    ],
    demo: 'https://demo.nordicelearning.com',
    documentation: 'https://docs.nordicelearning.com',
    releaseDate: '2023-09-01',
    lastUpdate: '2024-03-05',
    version: '2.4.0',
    supportedLanguages: ['English', 'Swedish', 'Norwegian', 'Danish', 'Finnish'],
    industries: ['Education', 'Corporate Training', 'Public Sector'],
    reviews: [
      {
        id: 'r13',
        user: 'Swedish University',
        rating: 4.8,
        comment: 'This platform has transformed our distance learning programs. The Nordic language support is excellent.',
        date: '2024-01-30'
      }
    ]
  },
  {
    id: 's14',
    title: 'Supply Chain Management System',
    description: 'End-to-end supply chain management solution optimized for Nordic logistics and transportation networks.',
    price: 549,
    category: 'Operations',
    image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    downloads: 310,
    activeUsers: 280,
    verified: true,
    subscription: true,
    developer: mockDevelopers[11],
    features: [
      'Inventory management',
      'Order processing',
      'Supplier management',
      'Logistics optimization',
      'Warehouse management',
      'Shipping integration',
      'Forecasting tools',
      'Reporting dashboard'
    ],
    technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'React', 'Docker'],
    requirements: [
      'Modern web browser',
      'Internet connection',
      'ERP system integration (optional)'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586528116493-da5c4ed5bc72?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1565891741441-64926e441838?auto=format&fit=crop&w=800&q=80'
    ],
    demo: 'https://demo.nordicsupplychain.com',
    documentation: 'https://docs.nordicsupplychain.com',
    releaseDate: '2023-11-05',
    lastUpdate: '2024-02-20',
    version: '2.0.0',
    supportedLanguages: ['English', 'Swedish', 'Norwegian', 'Danish'],
    industries: ['Logistics', 'Manufacturing', 'Retail', 'Wholesale'],
    reviews: [
      {
        id: 'r14',
        user: 'Norwegian Logistics Company',
        rating: 4.6,
        comment: 'This system has optimized our entire supply chain operations. The Nordic shipping integrations are particularly valuable.',
        date: '2024-01-25'
      }
    ]
  },
  {
    id: 's15',
    title: 'Digital Marketing Automation Suite',
    description: 'Comprehensive marketing automation platform with specialized features for Nordic market campaigns.',
    price: 349,
    category: 'Marketing',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    downloads: 680,
    activeUsers: 620,
    verified: true,
    subscription: true,
    developer: mockDevelopers[13],
    features: [
      'Email marketing',
      'Social media automation',
      'Campaign management',
      'Lead scoring',
      'A/B testing',
      'Analytics dashboard',
      'Landing page builder',
      'CRM integration'
    ],
    technologies: ['Node.js', 'React', 'PostgreSQL', 'Redis', 'AWS'],
    requirements: [
      'Modern web browser',
      'Internet connection',
      'Marketing channels access'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=800&q=80'
    ],
    demo: 'https://demo.nordicmarketing.com',
    documentation: 'https://docs.nordicmarketing.com',
    releaseDate: '2023-10-20',
    lastUpdate: '2024-03-01',
    version: '2.6.0',
    supportedLanguages: ['English', 'Swedish', 'Norwegian', 'Danish', 'Finnish'],
    industries: ['Marketing', 'Retail', 'E-commerce', 'Services'],
    reviews: [
      {
        id: 'r15',
        user: 'Danish Marketing Agency',
        rating: 4.7,
        comment: 'This suite has transformed our marketing operations. The Nordic-specific features are particularly valuable for our regional campaigns.',
        date: '2024-02-12'
      }
    ]
  },
  {
    id: 's16',
    title: 'Project Management System for Construction',
    description: 'Specialized project management solution for construction companies in the Nordic region.',
    price: 499,
    category: 'Project Management',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    downloads: 290,
    activeUsers: 260,
    verified: true,
    subscription: true,
    developer: mockDevelopers[10],
    features: [
      'Project planning',
      'Resource allocation',
      'Budget management',
      'Document management',
      'Building regulations compliance',
      'Subcontractor management',
      'Progress tracking',
      'Reporting tools'
    ],
    technologies: ['Angular', '.NET Core', 'SQL Server', 'Azure'],
    requirements: [
      'Modern web browser',
      'Internet connection',
      'Company account'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'
    ],
    demo: 'https://demo.nordicconstruction.com',
    documentation: 'https://docs.nordicconstruction.com',
    releaseDate: '2023-12-10',
    lastUpdate: '2024-02-25',
    version: '1.5.0',
    supportedLanguages: ['English', 'Swedish', 'Norwegian', 'Danish', 'Finnish'],
    industries: ['Construction', 'Architecture', 'Engineering'],
    reviews: [
      {
        id: 'r16',
        user: 'Norwegian Construction Company',
        rating: 4.8,
        comment: 'This system has streamlined our project management and ensures compliance with all Nordic building regulations.',
        date: '2024-02-08'
      }
    ]
  },
  {
    id: 's17',
    title: 'Sustainable Energy Management Platform',
    description: 'Comprehensive solution for monitoring and optimizing energy usage in buildings and industrial facilities.',
    price: 479,
    category: 'Energy',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    downloads: 380,
    activeUsers: 350,
    verified: true,
    subscription: true,
    developer: mockDevelopers[12],
    features: [
      'Real-time energy monitoring',
      'Consumption analytics',
      'Automated optimization',
      'Carbon footprint tracking',
      'Renewable energy integration',
      'Regulatory compliance',
      'Cost analysis',
      'Reporting tools'
    ],
    technologies: ['Python', 'React', 'PostgreSQL', 'IoT', 'Machine Learning'],
    requirements: [
      'Smart meters or energy monitoring devices',
      'Internet connection',
      'Building management system (optional)'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80'
    ],
    demo: 'https://demo.nordicenergy.com',
    documentation: 'https://docs.nordicenergy.com',
    releaseDate: '2023-10-15',
    lastUpdate: '2024-03-10',
    version: '2.3.0',
    supportedLanguages: ['English', 'Swedish', 'Norwegian', 'Danish', 'Finnish'],
    industries: ['Energy', 'Real Estate', 'Manufacturing', 'Public Sector'],
    reviews: [
      {
        id: 'r17',
        user: 'Swedish Municipality',
        rating: 4.8,
        comment: 'This platform has helped us reduce energy consumption in public buildings by 30%. The analytics and optimization features are outstanding.',
        date: '2024-02-20'
      }
    ]
  },
  {
    id: 's18',
    title: 'Nordic Legal Document Management',
    description: 'Specialized document management system for law firms and legal departments with Nordic legal framework compliance.',
    price: 529,
    category: 'Legal',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    downloads: 290,
    activeUsers: 270,
    verified: true,
    subscription: true,
    developer: mockDevelopers[15],
    features: [
      'Document management',
      'Version control',
      'Secure client portal',
      'E-signature integration',
      'Legal templates',
      'Case management',
      'Time tracking',
      'Billing integration'
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Elasticsearch', 'AWS'],
    requirements: [
      'Modern web browser',
      'Internet connection',
      'SSL certificate'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=800&q=80'
    ],
    demo: 'https://demo.nordiclegal.com',
    documentation: 'https://docs.nordiclegal.com',
    releaseDate: '2023-11-20',
    lastUpdate: '2024-02-15',
    version: '2.0.0',
    supportedLanguages: ['English', 'Swedish', 'Norwegian', 'Danish', 'Finnish'],
    industries: ['Legal', 'Professional Services', 'Corporate Legal Departments'],
    reviews: [
      {
        id: 'r18',
        user: 'Finnish Law Firm',
        rating: 4.7,
        comment: 'This system has transformed our document management processes. The Nordic legal templates are particularly valuable.',
        date: '2024-01-30'
      }
    ]
  },
  {
    id: 's19',
    title: 'Restaurant Management System',
    description: 'Complete restaurant management solution with features tailored for Nordic hospitality businesses.',
    price: 399,
    category: 'Hospitality',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    downloads: 410,
    activeUsers: 380,
    verified: true,
    subscription: true,
    developer: mockDevelopers[16],
    features: [
      'Reservation management',
      'Table management',
      'Order processing',
      'Inventory control',
      'Staff scheduling',
      'Customer loyalty program',
      'Payment processing',
      'Reporting and analytics'
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Docker'],
    requirements: [
      'Modern web browser',
      'Internet connection',
      'Tablet or computer for POS',
      'Printer for receipts (optional)'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80'
    ],
    demo: 'https://demo.nordicrestaurant.com',
    documentation: 'https://docs.nordicrestaurant.com',
    releaseDate: '2023-12-05',
    lastUpdate: '2024-03-01',
    version: '2.2.0',
    supportedLanguages: ['English', 'Swedish', 'Norwegian', 'Danish', 'Finnish'],
    industries: ['Restaurants', 'Cafes', 'Bars', 'Catering'],
    reviews: [
      {
        id: 'r19',
        user: 'Danish Restaurant Chain',
        rating: 4.8,
        comment: 'This system has streamlined all our restaurant operations. The reservation and table management features are particularly impressive.',
        date: '2024-02-10'
      }
    ]
  },
  {
    id: 's20',
    title: 'Nordic Tourism Platform',
    description: 'Comprehensive tourism management solution for travel businesses in the Nordic region.',
    price: 449,
    category: 'Tourism',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    downloads: 320,
    activeUsers: 290,
    verified: true,
    subscription: true,
    developer: mockDevelopers[17],
    features: [
      'Booking management',
      'Tour packages',
      'Customer management',
      'Payment processing',
      'Seasonal pricing',
      'Activity scheduling',
      'Guide assignment',
      'Reporting and analytics'
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'AWS'],
    requirements: [
      'Modern web browser',
      'Internet connection',
      'Payment gateway integration'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1490079027102-cd08f2308c73?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80'
    ],
    demo: 'https://demo.nordictourism.com',
    documentation: 'https://docs.nordictourism.com',
    releaseDate: '2023-11-10',
    lastUpdate: '2024-02-28',
    version: '1.8.0',
    supportedLanguages: ['English', 'Swedish', 'Norwegian', 'Danish', 'Finnish'],
    industries: ['Tourism', 'Travel Agencies', 'Tour Operators', 'Activity Providers'],
    reviews: [
      {
        id: 'r20',
        user: 'Norwegian Tourism Agency',
        rating: 4.7,
        comment: 'This platform has transformed how we manage our tour operations. The seasonal pricing and activity scheduling features are particularly valuable.',
        date: '2024-02-05'
      }
    ]
  }
];

// Combine all solutions
export const allSolutions = [...mockSolutions, ...additionalSolutions];