import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Calendar, CreditCard, AlertTriangle } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useMarketplaceStore } from '../../store/marketplaceStore';

const SubscriptionManager = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { solutions } = useMarketplaceStore();

  // Filter active subscriptions
  const activeSubscriptions = solutions.filter(s => 
    user?.subscriptions?.includes(s.id)
  );

  const handleCancelSubscription = (id: string) => {
    if (window.confirm('Are you sure you want to cancel this subscription?')) {
      // Handle subscription cancellation
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Active Subscriptions</h2>
        <button
          onClick={() => navigate('/marketplace')}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Browse Solutions
        </button>
      </div>

      {activeSubscriptions.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No active subscriptions</h3>
          <p className="mt-1 text-sm text-gray-500">
            Browse our marketplace to find solutions for your business.
          </p>
          <div className="mt-6">
            <button
              onClick={() => navigate('/marketplace')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Browse Solutions
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {activeSubscriptions.map((subscription) => (
              <li key={subscription.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Package className="h-8 w-8 text-blue-600" />
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          {subscription.title}
                        </h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            Next billing: {new Date().toLocaleDateString()}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <CreditCard className="h-4 w-4 mr-1" />
                            €{subscription.price}/mo
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => navigate(`/marketplace/solutions/${subscription.id}`)}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleCancelSubscription(subscription.id)}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Billing Information */}
      <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Billing Information</h3>
          <button
            onClick={() => navigate('/settings/billing')}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Update
          </button>
        </div>
        
        <div className="flex items-center justify-between py-4 border-t border-gray-200">
          <div className="flex items-center">
            <CreditCard className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                •••• •••• •••• 4242
              </p>
              <p className="text-sm text-gray-500">
                Expires 12/24
              </p>
            </div>
          </div>
          <span className="px-2.5 py-0.5 text-xs font-medium text-green-800 bg-green-100 rounded-full">
            Active
          </span>
        </div>

        <div className="mt-4">
          <div className="flex items-center text-sm text-yellow-800">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Your next billing date is {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionManager;