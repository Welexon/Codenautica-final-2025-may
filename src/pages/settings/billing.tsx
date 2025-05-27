import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, DollarSign, FileText, AlertTriangle, Loader, CheckCircle, XCircle } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const BillingSettings = () => {
  const navigate = useNavigate();
  const { user, updateBilling } = useAuthStore();
  const [selectedPlan, setSelectedPlan] = useState(user?.billing?.plan || 'starter');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: '€49',
      description: 'Perfect for small businesses',
      features: ['Up to 5 users', 'Basic analytics', 'Standard support']
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '€99',
      description: 'Ideal for growing businesses',
      features: ['Up to 20 users', 'Advanced analytics', 'Priority support', 'API access']
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations',
      features: ['Unlimited users', 'Custom features', '24/7 support', 'Custom development']
    }
  ];

  const handleUpdatePlan = async () => {
    setLoading(true);
    setError('');
    setSuccess(false);
    
    if (selectedPlan === user?.billing?.plan) {
      setError('You are already on this plan');
      setLoading(false);
      return;
    }
    
    try {
      console.log('Updating billing plan to:', selectedPlan);
      // Update user billing plan
      await updateBilling({
        plan: selectedPlan,
        nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      });
      
      setSuccess(true);
    } catch (err) {
      console.error('Failed to update billing plan:', err);
      setError(err instanceof Error ? err.message : 'Failed to update billing plan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Billing Settings</h1>
        <p className="text-gray-600">Manage your subscription and payment methods</p>
      </div>

      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          Billing settings updated successfully!
        </div>
      )}

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative flex items-center">
          <XCircle className="h-5 w-5 mr-2" />
          {error}
        </div>
      )}

      {/* Current Plan */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center mb-4">
          <DollarSign className="h-6 w-6 text-blue-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Current Plan</h2>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {plans.map((plan) => (
            <label
              key={plan.id}
              className={`relative flex cursor-pointer rounded-lg border p-4 ${
                selectedPlan === plan.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="plan"
                value={plan.id}
                checked={selectedPlan === plan.id}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="sr-only"
              />
              <div className="flex flex-1">
                <div className="flex flex-col">
                  <span className="block text-sm font-medium text-gray-900">
                    {plan.name}
                  </span>
                  <span className="mt-1 flex items-center text-sm text-gray-500">
                    {plan.description}
                  </span>
                  <span className="mt-2 text-sm font-medium text-gray-900">
                    {plan.price}/month
                  </span>
                </div>
              </div>
              <div className={`h-5 w-5 text-blue-600 ${
                selectedPlan === plan.id ? 'block' : 'hidden'
              }`}>
                <CheckIcon className="h-5 w-5" />
              </div>
            </label>
          ))}
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleUpdatePlan}
            disabled={loading || selectedPlan === user?.billing?.plan}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-live="polite"
          >
            {loading ? (
              <>
                <Loader className="animate-spin h-4 w-4 mr-2 inline" />
                Updating...
              </>
            ) : (
              'Update Plan'
            )}
          </button>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <CreditCard className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Payment Methods</h2>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Add New Card
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <img
                src="/visa-logo.svg"
                alt="Visa"
                className="h-8 w-12 object-contain"
              />
              <span className="ml-4">•••• •••• •••• 4242</span>
            </div>
            <button className="text-sm text-red-600 hover:text-red-700">
              Remove
            </button>
          </div>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <FileText className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Billing History</h2>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Download All
          </button>
        </div>

        <div className="space-y-4">
          {[
            {
              date: 'Mar 1, 2024',
              amount: '€99.00',
              status: 'Paid',
              invoice: 'INV-2024-001'
            },
            {
              date: 'Feb 1, 2024',
              amount: '€99.00',
              status: 'Paid',
              invoice: 'INV-2024-002'
            }
          ].map((invoice) => (
            <div
              key={invoice.invoice}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-900">{invoice.date}</p>
                <p className="text-sm text-gray-500">{invoice.invoice}</p>
              </div>
              <div className="flex items-center">
                <span className="mr-4 text-gray-900">{invoice.amount}</span>
                <span className="px-2 py-1 text-sm text-green-700 bg-green-100 rounded-full">
                  {invoice.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CheckIcon = ({ className = 'h-5 w-5' }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

export default BillingSettings;