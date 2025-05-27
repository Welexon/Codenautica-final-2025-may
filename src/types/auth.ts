import { ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'developer' | 'business' | 'admin';
  avatar?: string;
  bio?: string;
  company?: string;
  location?: string;
  website?: string;
  plan?: string;
  subscriptions?: string[];
  settings?: {
    notifications: boolean;
    emailUpdates: boolean;
    twoFactorEnabled: boolean;
  };
  billing?: {
    plan: string;
    nextBilling: string;
    paymentMethod?: {
      type: string;
      last4?: string;
    };
  };
  status?: 'active' | 'suspended' | 'pending';
  createdAt?: string;
  lastLogin?: string;
  permissions?: {
    canManageUsers: boolean;
    canManageSolutions: boolean;
    canManageContent: boolean;
    canViewAnalytics: boolean;
    canManageBilling: boolean;
    canManageSettings: boolean;
  };
  // Developer-specific fields
  skills?: string[];
  languages?: string[];
  certifications?: string[];
  hourlyRate?: number;
  availability?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  completedProjects?: number;
  activeProjects?: number;
  // Business-specific fields
  companySize?: string;
  industry?: string;
  taxId?: string;
  billingEmail?: string;
  billingAddress?: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  updateUser: (userId: string, data: Partial<User>) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  suspendUser: (userId: string) => Promise<void>;
  activateUser: (userId: string) => Promise<void>;
  isAdmin: () => boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: 'developer' | 'business' | string;
  plan?: string;
}

export interface AuthRouteProps {
  children: ReactNode;
  allowedRoles?: ('developer' | 'business' | 'admin')[];
  requireAuth?: boolean;
}

export interface ViewPermissions {
  canView: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canContact: boolean;
  canPurchase: boolean;
  canReview: boolean;
  message?: string;
}