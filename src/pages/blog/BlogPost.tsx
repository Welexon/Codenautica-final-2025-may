import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  
  // Mock blog posts data - in a real app, fetch from API
  const posts = [
    {
      id: '1',
      title: 'Best Practices for Nordic Software Integration',
      content: `
        <p>When integrating software solutions in the Nordic market, there are several key considerations that developers and businesses need to keep in mind. This comprehensive guide will walk you through the essential practices to ensure successful integration while maintaining compliance with regional regulations.</p>
        
        <h2>Understanding Nordic Payment Systems</h2>
        
        <p>The Nordic region has unique payment ecosystems that differ from other European markets. Each country has preferred payment methods that are essential to integrate:</p>
        
        <ul>
          <li><strong>Sweden:</strong> Swish and Klarna dominate the market, with Swish being used by over 75% of the population for peer-to-peer and business payments.</li>
          <li><strong>Norway:</strong> Vipps is the primary mobile payment solution, with over 3.7 million users in a country of 5.4 million people.</li>
          <li><strong>Denmark:</strong> MobilePay is the preferred payment method, with approximately 4 million users.</li>
          <li><strong>Finland:</strong> While MobilePay has presence, traditional bank transfers remain popular, and Pivo is gaining traction.</li>
        </ul>
        
        <p>Integrating these payment systems requires specific APIs and SDKs. Most providers offer comprehensive documentation in English, making the technical implementation straightforward. However, testing thoroughly with local payment accounts is essential.</p>
        
        <h2>GDPR Compliance Considerations</h2>
        
        <p>The Nordic countries strictly enforce GDPR regulations, often with additional local requirements. Key compliance areas include:</p>
        
        <ul>
          <li>Explicit consent mechanisms for data collection</li>
          <li>Clear data processing documentation</li>
          <li>Robust data subject access request (DSAR) handling</li>
          <li>Proper data retention policies</li>
          <li>Transparent privacy policies in local languages</li>
        </ul>
        
        <p>We recommend implementing a comprehensive consent management system that covers all Nordic countries. This should include options for users to easily access, modify, and delete their data.</p>
        
        <h2>Localization Best Practices</h2>
        
        <p>While English is widely understood across the Nordic region, providing localized experiences significantly improves user engagement and conversion rates. Consider these localization practices:</p>
        
        <ul>
          <li>Implement proper language detection based on browser settings</li>
          <li>Offer language selection options prominently in the UI</li>
          <li>Use professional translation services rather than machine translation</li>
          <li>Adapt date formats (Sweden and Denmark typically use YYYY-MM-DD, while Finland might use DD.MM.YYYY)</li>
          <li>Support local address formats in forms</li>
          <li>Adapt currency display based on user location</li>
        </ul>
        
        <p>A robust internationalization (i18n) system like react-i18next or similar libraries can help manage these requirements efficiently.</p>
        
        <h2>Shipping and Logistics Integration</h2>
        
        <p>For e-commerce solutions, integrating with local shipping providers is crucial. PostNord operates across all Nordic countries, but there are country-specific options as well:</p>
        
        <ul>
          <li><strong>Sweden:</strong> PostNord, DHL, DB Schenker</li>
          <li><strong>Norway:</strong> Posten, Bring, PostNord</li>
          <li><strong>Denmark:</strong> PostNord, GLS, DAO</li>
          <li><strong>Finland:</strong> Posti, Matkahuolto, DB Schenker</li>
        </ul>
        
        <p>Most of these providers offer REST APIs for integration, allowing for automated shipping label generation, tracking, and delivery notifications.</p>
        
        <h2>Technical Infrastructure Considerations</h2>
        
        <p>The Nordic region has excellent digital infrastructure, but there are still some technical aspects to consider:</p>
        
        <ul>
          <li>Server locations: Using cloud providers with Nordic data centers (like AWS Stockholm region) can reduce latency</li>
          <li>Mobile optimization: The region has high smartphone penetration and users expect excellent mobile experiences</li>
          <li>Accessibility: Nordic countries have strong digital accessibility requirements, often mandating WCAG 2.1 AA compliance</li>
          <li>Performance optimization: Despite good internet infrastructure, optimizing for performance is still important, especially in rural areas</li>
        </ul>
        
        <h2>Conclusion</h2>
        
        <p>Successful software integration in the Nordic market requires attention to local payment systems, strict compliance with privacy regulations, thoughtful localization, and integration with regional logistics providers. By addressing these key areas, developers can create seamless experiences that resonate with Nordic users and meet the region's high standards for digital services.</p>
      `,
      excerpt: 'Learn how to effectively integrate software solutions in the Nordic market while maintaining compliance and security.',
      author: {
        name: 'John Developer',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      date: '2024-03-15',
      readTime: '5 min read',
      category: 'Technical',
      tags: ['integration', 'payments', 'GDPR', 'localization'],
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '2',
      title: 'The Future of Nordic Tech: Trends to Watch',
      content: `
        <p>The Nordic tech ecosystem has long been recognized as one of the most innovative and forward-thinking in the world. From Sweden's unicorn factory to Finland's gaming industry, Denmark's green tech initiatives, and Norway's maritime technology innovations, the region continues to punch above its weight in the global tech scene.</p>
        
        <h2>Sustainable Technology Takes Center Stage</h2>
        
        <p>Sustainability isn't just a buzzword in the Nordic region—it's deeply embedded in the culture and business practices. This focus is increasingly reflected in technology development:</p>
        
        <ul>
          <li><strong>Green Coding:</strong> Nordic developers are pioneering energy-efficient programming practices that reduce the carbon footprint of software applications.</li>
          <li><strong>Circular Economy Platforms:</strong> New marketplaces and solutions that extend product lifecycles and reduce waste are gaining significant traction.</li>
          <li><strong>Climate Tech:</strong> Solutions for carbon tracking, renewable energy optimization, and sustainable supply chain management are seeing unprecedented investment.</li>
        </ul>
        
        <p>Companies like Normative (carbon accounting), Einride (autonomous electric transport), and Spinnova (sustainable textile technology) exemplify this trend, attracting both users and investors with their sustainability-focused innovations.</p>
        
        <h2>Digital Healthcare Revolution</h2>
        
        <p>The Nordic healthcare systems are already among the world's most digitized, but several emerging trends are accelerating this transformation:</p>
        
        <ul>
          <li><strong>AI-Powered Diagnostics:</strong> Machine learning algorithms that assist healthcare professionals in diagnosing conditions from medical imaging and patient data.</li>
          <li><strong>Remote Monitoring Solutions:</strong> IoT devices and platforms that enable continuous patient monitoring outside clinical settings.</li>
          <li><strong>Mental Health Tech:</strong> Digital therapeutics and platforms addressing the growing mental health challenges, with a distinctly Nordic approach to work-life balance.</li>
        </ul>
        
        <p>Companies like Kry/Livi (telemedicine), Coala Life (heart monitoring), and Mendi (brain training) are leading this healthcare technology revolution, with strong support from both public and private sectors.</p>
        
        <h2>Fintech Innovation Beyond Payments</h2>
        
        <p>While the Nordic region has already produced fintech giants like Klarna and Nets, the next wave of financial technology is expanding into new territories:</p>
        
        <ul>
          <li><strong>Embedded Finance:</strong> Financial services integrated seamlessly into non-financial platforms and applications.</li>
          <li><strong>Decentralized Finance (DeFi):</strong> Blockchain-based financial instruments that operate without centralized intermediaries.</li>
          <li><strong>Financial Inclusion:</strong> Solutions that make financial services accessible to underserved segments of the population.</li>
        </ul>
        
        <p>Emerging players like Lunar (banking), Safello (cryptocurrency), and Dreams (financial wellbeing) represent the diversity of approaches in the Nordic fintech landscape.</p>
        
        <h2>B2B SaaS Specialization</h2>
        
        <p>The Nordic region is increasingly becoming known for highly specialized B2B software solutions that address specific industry needs:</p>
        
        <ul>
          <li><strong>Vertical SaaS:</strong> Industry-specific software solutions that deeply understand and address sector-specific challenges.</li>
          <li><strong>API-First Platforms:</strong> Modular, composable software architectures that enable businesses to build custom solutions.</li>
          <li><strong>Enterprise Automation:</strong> Advanced tools that streamline complex business processes through intelligent automation.</li>
        </ul>
        
        <p>Companies like Pleo (expense management), Supermetrics (marketing data), and Planday (workforce management) exemplify this trend of creating deep, specialized solutions rather than broad, general-purpose tools.</p>
        
        <h2>Privacy-Focused Technology</h2>
        
        <p>With the Nordic region's strong emphasis on individual rights and data protection, privacy-enhancing technologies are gaining significant momentum:</p>
        
        <ul>
          <li><strong>Privacy by Design:</strong> Development methodologies that incorporate privacy considerations from the earliest stages.</li>
          <li><strong>Consent Management:</strong> Sophisticated tools for managing user consent in compliance with evolving regulations.</li>
          <li><strong>Data Minimization:</strong> Technologies that enable businesses to collect only the data they absolutely need.</li>
        </ul>
        
        <p>This focus on privacy isn't just about compliance—it's increasingly becoming a competitive advantage as global consumers become more privacy-conscious.</p>
        
        <h2>Conclusion: The Nordic Advantage</h2>
        
        <p>What makes the Nordic tech ecosystem particularly interesting is how these trends intersect and reinforce each other. The region's cultural values of sustainability, equality, and trust, combined with excellent digital infrastructure and technical education, create a unique environment for innovation.</p>
        
        <p>For businesses and developers looking to stay ahead of the curve, the Nordic tech scene offers valuable insights into how technology can be both commercially successful and socially responsible. As these trends continue to evolve, we can expect to see more groundbreaking solutions emerging from this small but mighty region.</p>
      `,
      excerpt: 'Explore emerging technology trends shaping the Nordic software industry and what they mean for businesses.',
      author: {
        name: 'Sarah Engineer',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      date: '2024-03-10',
      readTime: '7 min read',
      category: 'Industry',
      tags: ['trends', 'innovation', 'sustainability', 'healthcare', 'fintech'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '3',
      title: 'Building Secure Software for Nordic Businesses',
      content: `
        <p>Security is a paramount concern for software development in the Nordic region, where businesses handle sensitive data and must comply with strict regulations. This comprehensive guide outlines the essential security considerations and best practices for developing software solutions that meet Nordic compliance standards.</p>
        
        <h2>Understanding the Nordic Security Landscape</h2>
        
        <p>The Nordic countries (Sweden, Norway, Denmark, Finland, and Iceland) share similar approaches to data security and privacy, but with some country-specific nuances:</p>
        
        <ul>
          <li><strong>GDPR Compliance:</strong> All Nordic countries follow the EU's General Data Protection Regulation, often with additional local requirements.</li>
          <li><strong>NIS2 Directive:</strong> The updated Network and Information Security Directive has been implemented across the region, affecting critical infrastructure and essential service providers.</li>
          <li><strong>Sector-Specific Regulations:</strong> Financial services, healthcare, and public sector organizations face additional regulatory requirements.</li>
        </ul>
        
        <p>Understanding this regulatory landscape is the foundation for building secure software solutions for Nordic businesses.</p>
        
        <h2>Authentication and Access Control</h2>
        
        <p>Nordic businesses typically expect robust authentication mechanisms that balance security with user experience:</p>
        
        <ul>
          <li><strong>Multi-Factor Authentication:</strong> Implement MFA as a standard feature, not just an option. Nordic users are generally familiar with and accepting of this additional security step.</li>
          <li><strong>BankID Integration:</strong> Consider integrating with national electronic identification systems like Swedish BankID, Norwegian BankID, NemID/MitID in Denmark, or Finnish Bank ID.</li>
          <li><strong>Role-Based Access Control:</strong> Implement granular RBAC systems that allow businesses to precisely control who can access what data and functionality.</li>
          <li><strong>Session Management:</strong> Implement secure session handling with appropriate timeouts and the ability to view and terminate active sessions.</li>
        </ul>
        
        <p>These authentication mechanisms should be implemented with careful attention to user experience, as Nordic users expect both security and convenience.</p>
        
        <h2>Data Protection Strategies</h2>
        
        <p>Protecting data throughout its lifecycle is critical for Nordic businesses:</p>
        
        <ul>
          <li><strong>Encryption:</strong> Implement end-to-end encryption for sensitive data both in transit and at rest.</li>
          <li><strong>Data Minimization:</strong> Collect only the data necessary for the specific purpose, aligning with GDPR principles.</li>
          <li><strong>Data Classification:</strong> Implement systems to classify data based on sensitivity and apply appropriate protection measures.</li>
          <li><strong>Secure Data Deletion:</strong> Provide mechanisms for complete and verifiable data deletion when requested by users or when data retention periods expire.</li>
        </ul>
        
        <p>These strategies should be documented and transparent to users, as Nordic businesses often need to demonstrate their compliance to customers and regulators.</p>
        
        <h2>Secure Development Practices</h2>
        
        <p>The development process itself must incorporate security at every stage:</p>
        
        <ul>
          <li><strong>Secure SDLC:</strong> Implement a Secure Software Development Life Cycle with security considerations at each phase.</li>
          <li><strong>Dependency Management:</strong> Regularly audit and update dependencies to address known vulnerabilities.</li>
          <li><strong>Static and Dynamic Analysis:</strong> Incorporate automated security testing tools into your CI/CD pipeline.</li>
          <li><strong>Code Reviews:</strong> Conduct security-focused code reviews, particularly for authentication, authorization, and data handling components.</li>
        </ul>
        
        <p>Documentation of these practices can be valuable for Nordic businesses that need to demonstrate due diligence in their software procurement processes.</p>
        
        <h2>Incident Response and Logging</h2>
        
        <p>Even with the best preventive measures, security incidents can occur. Nordic businesses expect robust incident response capabilities:</p>
        
        <ul>
          <li><strong>Comprehensive Logging:</strong> Implement detailed logging of security events while being mindful of privacy considerations.</li>
          <li><strong>Incident Detection:</strong> Deploy systems to detect potential security incidents promptly.</li>
          <li><strong>Response Procedures:</strong> Develop and document clear procedures for responding to different types of security incidents.</li>
          <li><strong>Breach Notification:</strong> Implement mechanisms to notify affected users and authorities within the 72-hour timeframe required by GDPR.</li>
        </ul>
        
        <p>These capabilities should be regularly tested through simulated incidents to ensure they function effectively when needed.</p>
        
        <h2>Third-Party Risk Management</h2>
        
        <p>Many software solutions integrate with third-party services, each representing a potential security risk:</p>
        
        <ul>
          <li><strong>Vendor Assessment:</strong> Implement a process for assessing the security posture of third-party vendors.</li>
          <li><strong>Data Processing Agreements:</strong> Ensure appropriate DPAs are in place with all data processors, as required by GDPR.</li>
          <li><strong>API Security:</strong> Implement proper authentication, rate limiting, and monitoring for all API integrations.</li>
          <li><strong>Supply Chain Security:</strong> Consider the entire software supply chain, including development tools and libraries.</li>
        </ul>
        
        <p>Transparency about third-party integrations and their security measures is particularly important for Nordic businesses.</p>
        
        <h2>Compliance Documentation</h2>
        
        <p>Nordic businesses often need to demonstrate compliance to their customers, auditors, and regulators:</p>
        
        <ul>
          <li><strong>Security Certifications:</strong> Consider obtaining relevant certifications like ISO 27001, which are highly regarded in the Nordic region.</li>
          <li><strong>Compliance Reports:</strong> Provide documentation that helps businesses demonstrate their compliance with relevant regulations.</li>
          <li><strong>Data Processing Records:</strong> Maintain and share records of data processing activities as required by GDPR Article 30.</li>
          <li><strong>Privacy Impact Assessments:</strong> Offer templates or guidance for conducting Data Protection Impact Assessments (DPIAs).</li>
        </ul>
        
        <p>Well-organized compliance documentation can be a significant competitive advantage when selling to security-conscious Nordic businesses.</p>
        
        <h2>Conclusion</h2>
        
        <p>Building secure software for Nordic businesses requires a comprehensive approach that addresses authentication, data protection, secure development, incident response, third-party risk, and compliance documentation. By implementing these security measures and best practices, developers can create solutions that not only meet the high security expectations of Nordic businesses but also help these businesses demonstrate their own compliance with relevant regulations.</p>
        
        <p>Remember that security is not a one-time effort but an ongoing process of assessment, improvement, and adaptation to evolving threats and regulatory requirements. Regular security reviews and updates should be built into your development and maintenance processes to ensure your software remains secure throughout its lifecycle.</p>
      `,
      excerpt: 'Security considerations and best practices for developing software solutions that meet Nordic compliance standards.',
      author: {
        name: 'Marcus Jensen',
        avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      date: '2024-03-05',
      readTime: '6 min read',
      category: 'Security',
      tags: ['security', 'GDPR', 'compliance', 'authentication', 'encryption'],
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    },
  ];
  
  const post = posts.find(p => p.id === id);
  
  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Blog post not found</h2>
        <Link
          to="/blog"
          className="text-blue-600 hover:text-blue-700"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link
        to="/blog"
        className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Blog
      </Link>
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
            {post.category}
          </span>
          {post.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full flex items-center">
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        
        <div className="flex items-center space-x-4 text-gray-600">
          <div className="flex items-center">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="h-10 w-10 rounded-full mr-3"
            />
            <span>{post.author.name}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-5 w-5 mr-1" />
            <span>{new Date(post.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <User className="h-5 w-5 mr-1" />
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>
      
      {/* Featured Image */}
      <div className="mb-8">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-96 object-cover rounded-lg"
        />
      </div>
      
      {/* Content */}
      <div 
        className="prose prose-lg max-w-none prose-blue"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      
      {/* Author Bio */}
      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <div className="flex items-start">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="h-12 w-12 rounded-full mr-4"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">About {post.author.name}</h3>
            <p className="text-gray-600">
              {post.author.name} is a seasoned expert in Nordic software development with over 10 years of experience building solutions for businesses across Scandinavia.
            </p>
          </div>
        </div>
      </div>
      
      {/* Related Posts */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts
            .filter(p => p.id !== id)
            .slice(0, 2)
            .map(relatedPost => (
              <Link 
                key={relatedPost.id}
                to={`/blog/${relatedPost.id}`}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-sm overflow-hidden group-hover:shadow-md transition-shadow">
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{relatedPost.excerpt}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{new Date(relatedPost.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;