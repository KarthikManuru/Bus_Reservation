import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { MessageCircle, AlertTriangle, Users, FileText, Settings } from 'lucide-react';

export function SupportDashboard() {
  const location = useLocation();

  const navigation = [
    { name: 'Tickets', href: '/support', icon: MessageCircle },
    { name: 'Issues', href: '/support/issues', icon: AlertTriangle },
    { name: 'Customers', href: '/support/customers', icon: Users },
    { name: 'Knowledge Base', href: '/support/kb', icon: FileText },
    { name: 'Settings', href: '/support/settings', icon: Settings },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Support Panel</h2>
            <nav className="space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<SupportOverview />} />
            <Route path="/issues" element={<IssueManagement />} />
            <Route path="/customers" element={<CustomerSupport />} />
            <Route path="/kb" element={<KnowledgeBase />} />
            <Route path="/settings" element={<SupportSettings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function SupportOverview() {
  const stats = [
    { title: 'Open Tickets', value: '23', color: 'text-red-600' },
    { title: 'Pending Issues', value: '8', color: 'text-yellow-600' },
    { title: 'Resolved Today', value: '15', color: 'text-green-600' },
    { title: 'Customer Rating', value: '4.8', color: 'text-blue-600' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Support Dashboard</h1>
        <p className="text-gray-600">Manage customer support and resolve issues</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg shadow-md p-6">
            <div>
              <p className="text-sm text-gray-600">{stat.title}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Support Requests</h3>
        <p className="text-gray-600">Support dashboard features will be fully implemented here.</p>
      </div>
    </div>
  );
}

function IssueManagement() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Issue Management</h2>
      <p className="text-gray-600">Issue tracking and management features will be implemented here.</p>
    </div>
  );
}

function CustomerSupport() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Customer Support</h2>
      <p className="text-gray-600">Customer support features will be implemented here.</p>
    </div>
  );
}

function KnowledgeBase() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Knowledge Base</h2>
      <p className="text-gray-600">Knowledge base management will be implemented here.</p>
    </div>
  );
}

function SupportSettings() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Support Settings</h2>
      <p className="text-gray-600">Support settings will be implemented here.</p>
    </div>
  );
}