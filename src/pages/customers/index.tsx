import React from 'react';
import { Users, Mail, Phone, Building2 } from 'lucide-react';

const Customers = () => {
  // Mock customer data - in a real app, this would come from an API
  const customers = [
    {
      id: '1',
      name: 'TechCorp AS',
      contact: 'John Doe',
      email: 'john@techcorp.com',
      phone: '+47 123 456 789',
      solutions: ['Inventory Management', 'Analytics Dashboard'],
      status: 'active',
    },
    {
      id: '2',
      name: 'DataNordic',
      contact: 'Jane Smith',
      email: 'jane@datanordic.com',
      phone: '+47 987 654 321',
      solutions: ['HR Suite'],
      status: 'active',
    },
    // Add more mock customers as needed
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600">Manage your customer relationships</p>
        </div>
        <button className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
          Add Customer
        </button>
      </div>

      {/* Customer List */}
      <div className="bg-white shadow rounded-lg">
        <div className="divide-y divide-gray-200">
          {customers.map((customer) => (
            <div key={customer.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Building2 className="h-10 w-10 text-blue-600" />
                  <div className="ml-4">
                    <h2 className="text-lg font-medium text-gray-900">{customer.name}</h2>
                    <p className="text-sm text-gray-500">{customer.contact}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  customer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center text-sm text-gray-500">
                  <Mail className="h-5 w-5 text-gray-400 mr-2" />
                  {customer.email}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Phone className="h-5 w-5 text-gray-400 mr-2" />
                  {customer.phone}
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-900">Active Solutions</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {customer.solutions.map((solution) => (
                    <span
                      key={solution}
                      className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {solution}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex justify-end space-x-4">
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View Details
                </button>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Contact
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Customers;