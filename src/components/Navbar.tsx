import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, 
  Menu, 
  X, 
  Bell, 
  CheckCircle2,
  Info,
  AlertCircle,
  XCircle,
  Ship,
  LayoutDashboard,
  Store,
  Users,
  MessageSquare,
  Settings,
  FileText,
  PlusCircle,
  Building2,
  Briefcase,
  UserCircle,
  Shield,
  BarChart3,
  Lock,
  AlertTriangle,
  FileText as Reports,
  Mail
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useMessageStore } from '../store/messageStore';
import { useNotificationStore } from '../store/notificationStore';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get auth state directly from the store
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
  
  const messageStore = useMessageStore();
  const { 
    notifications, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification, 
    getUnreadCount, 
    getUserNotifications 
  } = useNotificationStore();
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      console.log('Logging out user...');
      await logout();
      console.log('Logout function completed, redirecting to home');
      navigate('/');
      setIsUserMenuOpen(false);
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Error during logout:', error);
       // Force navigation even if there was an error
       navigate('/');
       setIsUserMenuOpen(false);
       setIsMenuOpen(false);
    }
  };

  const handleNotificationClick = (notification: any) => {
    markAsRead(notification.id);
    if (notification.action?.url) {
      navigate(notification.action.url);
    }
    setIsNotificationsOpen(false);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 hover:bg-green-200';
      case 'info':
        return 'bg-blue-100 hover:bg-blue-200';
      case 'warning':
        return 'bg-yellow-100 hover:bg-yellow-200';
      case 'error':
        return 'bg-red-100 hover:bg-red-200';
      default:
        return 'bg-gray-100 hover:bg-gray-200';
    }
  };

  const publicNavItems = [
    { to: '/marketplace', label: 'Solutions', icon: Store },
    { to: '/pricing', label: 'Pricing', icon: FileText },
    { to: '/developers/directory', label: 'Developers', icon: Users },
    { to: '/community', label: 'Community', icon: MessageSquare },
    { to: '/about', label: 'About', icon: Building2 }
  ];

  const businessNavItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/marketplace', label: 'Browse Solutions', icon: Store },
    { to: '/post-request', label: 'Post Request', icon: FileText },
    { to: '/developers/directory', label: 'Find Developers', icon: Users },
    { to: '/community', label: 'Community', icon: MessageSquare }
  ];

  const developerNavItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/solutions', label: 'My Solutions', icon: Store },
    { to: '/custom-requests', label: 'Browse Requests', icon: Briefcase },
    { to: '/solutions/add', label: 'Add Solution', icon: PlusCircle },
    { to: '/community', label: 'Community', icon: MessageSquare }
  ];

  const adminNavItems = [
    { to: '/admin', label: 'Admin Dashboard', icon: LayoutDashboard },
    { to: '/admin/users', label: 'Users', icon: Users },
    { to: '/admin/solutions', label: 'Solutions', icon: Store },
    { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/admin/security', label: 'Security', icon: Shield },
    { to: '/admin/reports', label: 'Reports', icon: Reports },
    { to: '/admin/settings', label: 'Settings', icon: Settings }
  ];

  // Memoize user notifications to prevent unnecessary re-renders
  const userNotifications = useMemo(() => {
    if (!user) return [];
    return getUserNotifications(user.id);
  }, [user, notifications, getUserNotifications]);
  
  const unreadCount = useMemo(() => {
    if (!user) return 0;
    return getUnreadCount(user.id);
  }, [user, getUnreadCount]);

  const renderNavItems = () => {
    if (!isAuthenticated) {
      return publicNavItems.map(item => (
        <Link
          key={item.to}
          to={item.to}
          className="flex items-center text-gray-600 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
        >
          <item.icon className="h-4 w-4 mr-2" />
          {item.label}
        </Link>
      ));
    }

    if (user?.role === 'admin') {
      return adminNavItems.map(item => (
        <Link
          key={item.to}
          to={item.to}
          className="flex items-center text-gray-600 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
        >
          <item.icon className="h-4 w-4 mr-2" />
          {item.label}
        </Link>
      ));
    }

    const items = user?.role === 'business' ? businessNavItems : developerNavItems;
    return items.map(item => (
      <Link
        key={item.to}
        to={item.to}
        className="flex items-center text-gray-600 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
      >
        <item.icon className="h-4 w-4 mr-2" />
        {item.label}
      </Link>
    ));
  };

  const renderUserMenu = () => {
    if (!isAuthenticated) {
      return (
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/login"
            className="text-gray-600 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="codenautica-button"
          >
            Sign up
          </Link>
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-4">
        <span className="hidden md:flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
          <UserCircle className="w-4 h-4 mr-1" />
          {user?.role === 'admin' ? 'Admin' : user?.role === 'business' ? 'Business' : 'Developer'}
        </span>

        {/* Notifications */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="text-gray-600 hover:text-blue-700 relative p-2 rounded-full hover:bg-gray-100 transition-colors"
            title="Notifications"
          >
            <Bell className="h-6 w-6" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl py-1 z-50 border border-gray-200">
              <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={() => user && markAllAsRead(user.id)}
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
              <div className="max-h-96 overflow-y-auto">
                {userNotifications.length === 0 ? (
                  <div className="px-4 py-6 text-center text-gray-500">
                    No notifications
                  </div>
                ) : (
                  userNotifications
                    .map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 ${getNotificationColor(notification.type)} ${
                          !notification.read ? 'font-medium' : ''
                        } cursor-pointer`}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-700 mt-1">
                              {notification.message}
                            </p>
                            {notification.action && (
                              <p className="text-sm text-blue-600 mt-1">
                                {notification.action.label}
                              </p>
                            )}
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(notification.timestamp).toLocaleString()}
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            className="ml-2 text-gray-400 hover:text-gray-600"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Messages */}
        <Link 
          to="/messages" 
          className="text-gray-600 hover:text-blue-700 relative"
          title="Messages"
        >
          <MessageSquare className="h-6 w-6" />
          {messageStore.getUnreadCount(user!.id) > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {messageStore.getUnreadCount(user!.id)}
            </span>
          )}
        </Link>

        {/* User Menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center focus:outline-none"
            aria-label="User menu"
          >
            <img
              src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=3B82F6&color=fff`}
              alt={user?.name || 'User'}
              className="h-8 w-8 rounded-full object-cover border-2 border-gray-200 hover:border-blue-500 transition-colors"
            />
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
              <div className="px-4 py-2 border-b border-gray-200">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              {user?.role === 'admin' ? (
                <Link
                  to="/admin"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  Admin Dashboard
                </Link>
              ) : (
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsUserMenuOpen(false)}
              >
                Profile
              </Link>
              <Link
                to="/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsUserMenuOpen(false)}
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <nav className="codenautica-nav sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Ship className="h-8 w-8 text-blue-600" strokeWidth={1.5} />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900">CodeNautica</span>
                <span className="text-xs text-blue-600 font-medium -mt-1">Nordic Software Solutions</span>
              </div>
            </Link>

            <div className="hidden md:ml-8 md:flex md:items-center md:space-x-4">
              {renderNavItems()}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {renderUserMenu()}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-700 hover:bg-gray-100"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {isAuthenticated ? (
              <>
                {(user?.role === 'admin' ? adminNavItems : 
                  user?.role === 'business' ? businessNavItems : developerNavItems)
                  .map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex items-center">
                        <item.icon className="h-5 w-5 mr-2" />
                        {item.label}
                      </div>
                    </Link>
                  ))}
                <div className="px-3 py-2">
                  <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    <UserCircle className="w-4 h-4 mr-1" />
                    {user?.role === 'admin' ? 'Admin' : user?.role === 'business' ? 'Business' : 'Developer'}
                  </span>
                </div>
              </>
            ) : (
              <>
                {publicNavItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <item.icon className="h-5 w-5 mr-2" />
                      {item.label}
                    </div>
                  </Link>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;