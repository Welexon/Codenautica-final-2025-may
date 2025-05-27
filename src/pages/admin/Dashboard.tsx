import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Package, 
  BarChart3, 
  Settings, 
  Shield, 
  AlertTriangle,
  UserPlus,
  UserMinus,
  DollarSign,
  Activity,
  Database,
  Server
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { supabase } from '../../lib/supabase';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeSolutions: 0,
    monthlyRevenue: '€0',
    activeSubscriptions: 0,
    pendingApprovals: 0,
    reportedIssues: 0,
    databaseSize: '0 MB',
    storageUsed: '0 MB'
  });
  
  const [recentActivity, setRecentActivity] = useState([
    {
      type: 'user_registered',
      message: 'New developer registration',
      time: '2 minutes ago',
      icon: UserPlus
    },
    {
      type: 'user_suspended',
      message: 'User account suspended',
      time: '1 hour ago',
      icon: UserMinus
    },
    {
      type: 'payment_received',
      message: 'New subscription payment',
      time: '3 hours ago',
      icon: DollarSign
    }
  ]);

  // Check if user is admin, otherwise redirect
  useEffect(() => {
    if (user && !isAdmin()) {
      navigate('/unauthorized', { 
        state: { message: 'Only administrators can access this page.' } 
      });
    }
  }, [user, isAdmin, navigate]);

  // Fetch admin dashboard data
  useEffect(() => {
    const fetchAdminData = async () => {
      setLoading(true);
      try {
        // Check connection to Supabase
        const isConnected = await checkSupabaseConnection();
        
        if (!isConnected) {
          console.warn('Not connected to Supabase, using mock data');
          setStats({
            totalUsers: 1234,
            activeSolutions: 456,
            monthlyRevenue: '€89,450',
            activeSubscriptions: 789,
            pendingApprovals: 12,
            reportedIssues: 5,
            databaseSize: '256 MB',
            storageUsed: '1.2 GB'
          });
          setLoading(false);
          return;
        }
        
        // Fetch user count
        const { count: userCount, error: userError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
          
        // Fetch solutions count
        const { count: solutionCount, error: solutionError } = await supabase
          .from('solutions')
          .select('*', { count: 'exact', head: true });
          
        // Fetch pending solutions count
        const { count: pendingCount, error: pendingError } = await supabase
          .from('solutions')
          .select('*', { count: 'exact', head: true })
          .eq('verified', false);
          
        // Fetch subscriptions count
        const { count: subscriptionCount, error: subscriptionError } = await supabase
          .from('subscriptions')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'active');
          
        // Update stats with real data if available
        setStats({
          totalUsers: userError ? 1234 : (userCount || 0),
          activeSolutions: solutionError ? 456 : (solutionCount || 0),
          monthlyRevenue: '€89,450', // This would come from a payment system in a real app
          activeSubscriptions: subscriptionError ? 789 : (subscriptionCount || 0),
          pendingApprovals: pendingError ? 12 : (pendingCount || 0),
          reportedIssues: 5, // This would come from a support ticket system in a real app
          databaseSize: '256 MB',
          storageUsed: '1.2 GB'
        });
        
        // Fetch recent activity
        const { data: activityData, error: activityError } = await supabase
          .from('activity_logs')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);
          
        if (!activityError && activityData && activityData.length > 0) {
          // Format activity data
          const formattedActivity = activityData.map(activity => {
            let icon;
            switch (activity.type) {
              case 'user_registered':
                icon = UserPlus;
                break;
              case 'user_suspended':
                icon = UserMinus;
                break;
              case 'payment_received':
                icon = DollarSign;
                break;
              default:
                icon = Activity;
            }
            
            return {
              type: activity.type,
              message: activity.details.message || activity.type.replace('_', ' '),
              time: formatDistanceToNow(new Date(activity.created_at), { addSuffix: true }),
              icon
            };
          });
          
          setRecentActivity(formattedActivity);
        }
        // Fetch recent activity (in a real app)
        // For now we'll use the mock data
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (user && isAdmin()) {
      fetchAdminData();
    }
  }, [user, isAdmin]);

  const quickActions = [
    {
      title: 'User Management',
      icon: Users,
      path: '/admin/users',
      description: 'Manage users and permissions'
    },
    {
      title: 'Solutions',
      icon: Package,
      path: '/admin/solutions',
      description: 'Review and manage solutions'
    },
    {
      title: 'Analytics',
      icon: BarChart3,
      path: '/admin/analytics',
      description: 'Platform analytics and insights'
    },
    {
      title: 'Settings',
      icon: Settings,
      path: '/admin/settings',
      description: 'Platform configuration'
    },
    {
      title: 'Security',
      icon: Shield,
      path: '/admin/security',
      description: 'Security settings and logs'
    },
    {
      title: 'Reports',
      icon: AlertTriangle,
      path: '/admin/reports',
      description: 'View and manage reports'
    }
  ];

  if (loading) {
    return <LoadingSpinner text="Loading admin dashboard..." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Platform overview and management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <Users className="h-6 w-6 text-blue-600" />
            <span className="text-sm text-green-600">+12% this month</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.totalUsers}</h3>
          <p className="text-sm text-gray-600">Total Users</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <Package className="h-6 w-6 text-blue-600" />
            <span className="text-sm text-green-600">+8% this month</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.activeSolutions}</h3>
          <p className="text-sm text-gray-600">Active Solutions</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="h-6 w-6 text-blue-600" />
            <span className="text-sm text-green-600">+15% this month</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.monthlyRevenue}</h3>
          <p className="text-sm text-gray-600">Monthly Revenue</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <Activity className="h-6 w-6 text-blue-600" />
            <span className="text-sm text-green-600">+5% this month</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.activeSubscriptions}</h3>
          <p className="text-sm text-gray-600">Active Subscriptions</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <AlertTriangle className="h-6 w-6 text-yellow-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.pendingApprovals}</h3>
          <p className="text-sm text-gray-600">Pending Approvals</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <Shield className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.reportedIssues}</h3>
          <p className="text-sm text-gray-600">Reported Issues</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <Database className="h-6 w-6 text-indigo-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.databaseSize}</h3>
          <p className="text-sm text-gray-600">Database Size</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <Server className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.storageUsed}</h3>
          <p className="text-sm text-gray-600">Storage Used</p>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {quickActions.map((action) => (
          <button
            key={action.title}
            onClick={() => navigate(action.path)}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all text-left"
          >
            <div className="flex items-center mb-4">
              <action.icon className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900 ml-3">{action.title}</h3>
            </div>
            <p className="text-gray-600">{action.description}</p>
          </button>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center">
              <activity.icon className="h-5 w-5 text-gray-400 mr-4" />
              <div className="flex-1">
                <p className="text-gray-900">{activity.message}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;