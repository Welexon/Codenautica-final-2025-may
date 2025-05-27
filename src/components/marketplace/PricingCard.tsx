import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Solution } from '../../types/marketplace';
import { ViewPermissions } from '../../types/auth';
import { useAuthStore } from '../../store/authStore';
import { Loader, Lock } from 'lucide-react';

interface PricingCardProps {
  solution: Solution;
  permissions: ViewPermissions;
}

const PricingCard: React.FC<PricingCardProps> = ({ solution, permissions }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const handleGetStarted = () => {
    if (!isAuthenticated) {
      navigate('/login', { 
        state: { 
          returnTo: `/marketplace/${solution.id}`,
          message: 'Please log in to continue with the purchase.' 
        } 
      });
      return;
    }

    if (!permissions.canPurchase) {
      return;
    }

    setLoading(true);
    setTimeout(() => {
      navigate(`/marketplace/${solution.id}/setup`);
      setLoading(false);
    }, 1000);
  };

  const handleContactDeveloper = () => {
    if (!isAuthenticated) {
      navigate('/login', { 
        state: { 
          returnTo: `/marketplace/${solution.id}`,
          message: 'Please log in to contact the developer.' 
        } 
      });
      return;
    }

    if (!permissions.canContact) {
      return;
    }

    navigate(`/messages/new?developer=${solution.developer.id}`);
  };

  return (
    <div className="w-full lg:w-80 bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6">
        <p className="text-gray-600 mb-2">Starting from</p>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-gray-900">€{solution.price}</span>
          {solution.subscription && (
            <span className="ml-2 text-gray-500">/month</span>
          )}
        </div>
      </div>

      <button
        onClick={handleGetStarted}
        className="w-full bg-blue-700 text-white rounded-lg px-4 py-3 font-medium hover:bg-blue-800 transition-colors mb-4 flex items-center justify-center"
      >
        {loading ? (
          <>
            <Loader className="animate-spin h-5 w-5 mr-2" />
            Processing...
          </>
        ) : !isAuthenticated ? (
          'Log in to Purchase'
        ) : (
          'Get Started'
        )}
      </button>

      <button
        onClick={handleContactDeveloper}
        className="w-full bg-white text-blue-700 border border-blue-700 rounded-lg px-4 py-3 font-medium hover:bg-blue-50 transition-colors"
      >
        {!isAuthenticated ? 'Log in to Contact' : 'Contact Developer'}
      </button>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-4">Included in this price:</h4>
        <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-center">
            <svg className="h-4 w-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            Full access to all features
          </li>
          <li className="flex items-center">
            <svg className="h-4 w-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            Premium support
          </li>
          <li className="flex items-center">
            <svg className="h-4 w-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            Regular updates
          </li>
          {solution.subscription && (
            <li className="flex items-center">
              <svg className="h-4 w-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Cancel anytime
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default PricingCard;