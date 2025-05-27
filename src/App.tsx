import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { useAuthStore } from './store/authStore';
import { useNotificationStore } from './store/notificationStore';
import { useMarketplaceStore } from './store/marketplaceStore';
import { useRequestStore } from './store/requestStore';
import { checkSupabaseConnection } from './lib/supabase';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const Marketplace = lazy(() => import('./pages/marketplace'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Profile = lazy(() => import('./pages/Profile'));
const Documentation = lazy(() => import('./pages/Documentation'));
const Guides = lazy(() => import('./pages/Guides'));
const Privacy = lazy(() => import('./pages/legal/Privacy'));
const Terms = lazy(() => import('./pages/legal/Terms'));
const Cookies = lazy(() => import('./pages/legal/Cookies'));
const Categories = lazy(() => import('./pages/marketplace/Categories'));
const Pricing = lazy(() => import('./pages/Pricing'));
const DeveloperProfile = lazy(() => import('./pages/developers/DeveloperProfile'));
const DeveloperDirectory = lazy(() => import('./pages/developers/DeveloperDirectory'));
const BlogPost = lazy(() => import('./pages/blog/BlogPost'));
const EventDetails = lazy(() => import('./pages/events/EventDetails'));
const SecurityAudit = lazy(() => import('./pages/security/SecurityAudit'));
const SecurityFAQ = lazy(() => import('./pages/security/SecurityFAQ'));
const ComplianceCertifications = lazy(() => import('./pages/security/ComplianceCertifications'));
const PrivacyControls = lazy(() => import('./pages/security/PrivacyControls'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const Analytics = lazy(() => import('./pages/analytics'));
const Support = lazy(() => import('./pages/support'));
const Customers = lazy(() => import('./pages/customers'));
const Solutions = lazy(() => import('./pages/solutions'));
const AddSolution = lazy(() => import('./pages/marketplace/AddSolution'));
const Messages = lazy(() => import('./components/profile/MessageCenter'));
const CustomRequests = lazy(() => import('./pages/marketplace/CustomRequests'));
const PostRequest = lazy(() => import('./pages/marketplace/PostRequest'));
const RequestDetails = lazy(() => import('./pages/marketplace/requests/RequestDetails'));
const ScheduleMeeting = lazy(() => import('./pages/meetings/ScheduleMeeting'));
const Settings = lazy(() => import('./pages/settings'));
const ProfileSettings = lazy(() => import('./pages/settings/profile'));
const SecuritySettings = lazy(() => import('./pages/settings/security'));
const NotificationSettings = lazy(() => import('./pages/settings/notifications'));
const BillingSettings = lazy(() => import('./pages/settings/billing'));
const BusinessBenefits = lazy(() => import('./pages/register/BusinessBenefits'));
const DeveloperBenefits = lazy(() => import('./pages/register/DeveloperBenefits'));
const CommunityForum = lazy(() => import('./pages/community'));
const TopicDetails = lazy(() => import('./pages/community/TopicDetails'));
const NewTopic = lazy(() => import('./pages/community/NewTopic'));
const CategoryView = lazy(() => import('./pages/community/CategoryView'));
const SolutionDetails = lazy(() => import('./pages/marketplace/SolutionDetails'));
const Blog = lazy(() => import('./pages/blog'));
const Events = lazy(() => import('./pages/events'));
const Security = lazy(() => import('./pages/security'));
const Onboarding = lazy(() => import('./pages/Onboarding'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));

// Admin Routes
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminUserManagement = lazy(() => import('./pages/admin/UserManagement'));
const AdminSolutions = lazy(() => import('./pages/admin/Solutions'));
const AdminAnalytics = lazy(() => import('./pages/admin/Analytics'));
const AdminSettings = lazy(() => import('./pages/admin/Settings'));
const AdminSecurity = lazy(() => import('./pages/admin/Security'));
const AdminReports = lazy(() => import('./pages/admin/Reports'));

// Error Boundary Component
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const App = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { fetchNotifications } = useNotificationStore();
  const { fetchSolutions } = useMarketplaceStore();
  const { fetchRequests } = useRequestStore();

  // Initialize app data
  useEffect(() => {
    const initializeApp = async () => {
      const isConnected = await checkSupabaseConnection();
      
      // Fetch initial data
      if (user) {
        try {
          await Promise.all([
            fetchNotifications(user.id),
            fetchSolutions(),
            fetchRequests()
          ]);
        } catch (error) {
          console.error('Error fetching initial data:', error);
        }
      } else {
        // Load marketplace data even for non-authenticated users
        try {
          await Promise.all([
            fetchSolutions(),
            fetchRequests()
          ]);
        } catch (error) {
          console.error('Error fetching public data:', error);
        }
      }
    };

    initializeApp();
  }, [user, fetchNotifications, fetchSolutions, fetchRequests]);

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state change in App component:', event, session ? 'with session' : 'without session');
      
      if (event === 'SIGNED_IN' && session) {
        console.log('User signed in, session exists');
        
        // Check if we need to redirect
        setTimeout(() => {
          const currentPath = window.location.pathname;
          if (currentPath === '/login' || currentPath === '/register') {
            console.log('On login/register page after sign-in, redirecting to dashboard');
            window.location.href = '/dashboard';
          }
        }, 500);
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <main className="flex-grow">
          <Suspense 
            fallback={
              <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner />
              </div>
            }
          >
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/marketplace/solutions/:id" element={<SolutionDetails />} />
              <Route path="/marketplace/categories" element={<Categories />} />
              <Route path="/documentation" element={<Documentation />} />
              <Route path="/guides" element={<Guides />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/register/business" element={<BusinessBenefits />} />
              <Route path="/register/developer" element={<DeveloperBenefits />} />
              <Route path="/developers/directory" element={<DeveloperDirectory />} />
              <Route path="/developers/:id" element={<DeveloperProfile />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<EventDetails />} />
              <Route path="/security" element={<Security />} />
              <Route path="/security/audit" element={<SecurityAudit />} />
              <Route path="/security/faq" element={<SecurityFAQ />} />
              <Route path="/security/compliance" element={<ComplianceCertifications />} />
              <Route path="/security/privacy-controls" element={<PrivacyControls />} />
              <Route path="/onboarding" element={<Onboarding />} />

              {/* Community Routes */}
              <Route path="/community" element={<CommunityForum />} />
              <Route path="/community/categories/:categoryId" element={<CategoryView />} />
              <Route path="/community/topics/:id" element={<TopicDetails />} />
              <Route path="/community/new-topic" element={<NewTopic />} />

              {/* Protected Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/settings/profile" element={<ProfileSettings />} />
              <Route path="/settings/security" element={<SecuritySettings />} />
              <Route path="/settings/notifications" element={<NotificationSettings />} />
              <Route path="/settings/billing" element={<BillingSettings />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/solutions/add" element={<AddSolution />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/custom-requests" element={<CustomRequests />} />
              <Route path="/post-request" element={<PostRequest />} />
              <Route path="/marketplace/requests/:id" element={<RequestDetails />} />
              <Route path="/meetings/schedule" element={<ScheduleMeeting />} />
              <Route path="/support" element={<Support />} />
              <Route path="/customers" element={<Customers />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUserManagement />} />
              <Route path="/admin/solutions" element={<AdminSolutions />} />
              <Route path="/admin/analytics" element={<AdminAnalytics />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="/admin/security" element={<AdminSecurity />} />
              <Route path="/admin/reports" element={<AdminReports />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default App;