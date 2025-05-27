import { User, ViewPermissions } from '../types/auth';
import { Solution } from '../types/marketplace';

/**
 * Determines the permissions a user has for a specific solution
 * @param solution The solution to check permissions for
 * @param user The current user (or null if not authenticated)
 * @returns Object containing permission flags and optional message
 */
export const getSolutionPermissions = (
  solution: Solution,
  user: User | null
): ViewPermissions => {
  // Default permissions for non-authenticated users
  if (!user) {
    return {
      canView: true,
      canEdit: false,
      canDelete: false,
      canContact: false,
      canPurchase: false,
      canReview: false,
      message: 'Log in to purchase or contact the developer',
    };
  }

  // Check if user account is active
  if (user.status === 'suspended') {
    return {
      canView: true,
      canEdit: false,
      canDelete: false,
      canContact: false,
      canPurchase: false,
      canReview: false,
      message: 'Your account is suspended. Please contact support.',
    };
  }

  // Admin permissions (full access)
  if (user.role === 'admin') {
    return {
      canView: true,
      canEdit: true,
      canDelete: true,
      canContact: true,
      canPurchase: true,
      canReview: true,
    };
  }

  // Developer permissions (owner)
  if (user.role === 'developer' && solution.developer.id === user.id) {
    return {
      canView: true,
      canEdit: true,
      canDelete: true,
      canContact: false,
      canPurchase: false,
      canReview: false,
    };
  }

  // Developer permissions (non-owner)
  if (user.role === 'developer' && solution.developer.id !== user.id) {
    return {
      canView: true,
      canEdit: false,
      canDelete: false,
      canContact: true,
      canPurchase: true, // Developers can purchase other developers' solutions
      canReview: true,
    };
  }

  // Business permissions
  if (user.role === 'business') {
    // Check if already subscribed
    const isSubscribed = user.subscriptions?.includes(solution.id);
    
    return {
      canView: true,
      canEdit: false,
      canDelete: false,
      canContact: true,
      canPurchase: !isSubscribed,
      canReview: true,
      message: isSubscribed ? 'You are already subscribed to this solution' : undefined
    };
  }

  // Default fallback permissions
  return {
    canView: true,
    canEdit: false,
    canDelete: false,
    canContact: false,
    canPurchase: false,
    canReview: false,
  };
};

/**
 * Determines the permissions a user has for a specific developer
 * @param developerId The ID of the developer to check permissions for
 * @param user The current user (or null if not authenticated)
 * @returns Object containing permission flags and optional message
 */
export const getDeveloperPermissions = (
  developerId: string,
  user: User | null
): ViewPermissions => {
  // Default permissions for non-authenticated users
  if (!user) {
    return {
      canView: true,
      canEdit: false,
      canDelete: false,
      canContact: false,
      canPurchase: false,
      canReview: false,
      message: 'Log in to contact this developer',
    };
  }

  // Check if user account is active
  if (user.status === 'suspended') {
    return {
      canView: true,
      canEdit: false,
      canDelete: false,
      canContact: false,
      canPurchase: false,
      canReview: false,
      message: 'Your account is suspended. Please contact support.',
    };
  }

  // Admin permissions
  if (user.role === 'admin') {
    return {
      canView: true,
      canEdit: true,
      canDelete: true,
      canContact: true,
      canPurchase: true,
      canReview: true,
    };
  }

  // Self permissions
  if (user.id === developerId) {
    return {
      canView: true,
      canEdit: true,
      canDelete: false,
      canContact: false,
      canPurchase: false,
      canReview: false,
    };
  }

  // Business permissions
  if (user.role === 'business') {
    return {
      canView: true,
      canEdit: false,
      canDelete: false,
      canContact: true,
      canPurchase: false,
      canReview: true,
    };
  }

  // Developer permissions (viewing another developer)
  if (user.role === 'developer') {
    return {
      canView: true,
      canEdit: false,
      canDelete: false,
      canContact: true,
      canPurchase: false,
      canReview: false,
    };
  }

  // Default fallback permissions
  return {
    canView: true,
    canEdit: false,
    canDelete: false,
    canContact: false,
    canPurchase: false,
    canReview: false,
  };
};

/**
 * Determines if a user has permission to access a specific route
 * @param requiredRole The role required to access the route
 * @param user The current user
 * @returns Boolean indicating if the user has permission
 */
export const hasRoutePermission = (
  requiredRole: string | string[] | undefined,
  user: User | null
): boolean => {
  // If no role is required, allow access
  if (!requiredRole) return true;
  
  // If user is not authenticated, deny access
  if (!user) return false;
  
  // If user is suspended, deny access
  if (user.status === 'suspended') return false;
  
  // Admin has access to everything
  if (user.role === 'admin') return true;
  
  // Check if user role matches required role
  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(user.role);
  }
  
  return user.role === requiredRole;
};

/**
 * Determines if a user can perform a specific action
 * @param action The action to check permission for
 * @param user The current user
 * @returns Boolean indicating if the user can perform the action
 */
export const canPerformAction = (
  action: string,
  user: User | null
): boolean => {
  if (!user) return false;
  
  // If user is suspended, deny all actions
  if (user.status === 'suspended') return false;
  
  // Admin can perform any action
  if (user.role === 'admin') return true;
  
  // Check user permissions
  switch (action) {
    case 'manage_users':
      return !!user.permissions?.canManageUsers;
    
    case 'manage_solutions':
      return !!user.permissions?.canManageSolutions;
    
    case 'manage_content':
      return !!user.permissions?.canManageContent;
    
    case 'view_analytics':
      return !!user.permissions?.canViewAnalytics;
    
    case 'manage_billing':
      return !!user.permissions?.canManageBilling;
    
    case 'manage_settings':
      return !!user.permissions?.canManageSettings;
    
    case 'create_solution':
      return user.role === 'developer';
    
    case 'create_request':
      return user.role === 'business';
    
    case 'submit_proposal':
      return user.role === 'developer';
    
    default:
      return false;
  }
};