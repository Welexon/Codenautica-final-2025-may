import React from 'react';
import { Loader } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
  className?: string;
  text?: string;
  fullScreen?: boolean;
}

/**
 * A reusable loading spinner component
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = 'primary',
  className = '',
  text,
  fullScreen = false
}) => {
  // Size mappings
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };
  
  // Color mappings
  const colorClasses = {
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    white: 'text-white'
  };
  
  // Container classes for full screen mode
  const containerClasses = fullScreen 
    ? 'fixed inset-0 flex items-center justify-center bg-gray-900/50 z-50' 
    : 'flex items-center justify-center';

  return (
    <div className={containerClasses} role="status">
      <div className={`flex flex-col items-center ${className}`}>
        <Loader 
          className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]}`} 
          aria-hidden="true"
        />
        {text && (
          <p className={`mt-2 text-sm ${colorClasses[color]}`}>{text}</p>
        )}
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;