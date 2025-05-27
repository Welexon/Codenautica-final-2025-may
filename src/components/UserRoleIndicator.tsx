import React from 'react';
import { Code2, Building2 } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const UserRoleIndicator = () => {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div className="flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
      {user.role === 'developer' ? (
        <>
          <Code2 className="w-4 h-4 mr-1" />
          Developer
        </>
      ) : (
        <>
          <Building2 className="w-4 h-4 mr-1" />
          Business
        </>
      )}
    </div>
  );
};

export default UserRoleIndicator;