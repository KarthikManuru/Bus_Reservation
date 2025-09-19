import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  Bus, 
  MapPin, 
  Settings, 
  AlertCircle,
  TrendingUp,
  CreditCard
} from 'lucide-react';

// Mock data for demonstration
const stats = [
  { title: 'Total Bookings', value: '12,485', change: '+12.5%', icon: BarChart3, color: 'text-blue-600' },
  { title: 'Active Users', value: '8,549', change: '+5.2%', icon: Users, color: 'text-green-600' },
  { title: 'Bus Operators', value: '47', change: '+8.1%', icon: Bus, color: 'text-purple-600' },
  { title: 'Total Revenue', value: '$125,450', change: '+15.3%', icon: CreditCard, color: 'text-teal-600' },
];

const recentBookings = [
  { id: '1', user: 'John Doe', route: 'NYC → DC', date: '2024-02-15', amount: '$45', status: 'confirmed' },
  { id: '2', user: 'Jane Smith', route: 'LA → SF', date: '2024-02-15', amount: '$65', status: 'pending' },
  { id: '3', user: 'Mike Johnson', route: 'CHI → DET', date: '2024-02-14', amount: '$35', status: 'completed' },
  { id: '4', user: 'Sarah Wilson', route: 'MIA → ORL', date: '2024-02-14', amount: '$25', status: 'cancelled' },
];

export function AdminDashboard() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');

  const navigation = [
    { name: 'Overview', href: '/admin', icon: BarChart3, id: 'overview' },
    { name: 'Users', href: '/admin/users', icon: Users, id: 'users' },
    { name: 'Operators', href: '/admin/operators', icon: Bus, id: 'operators' },
    { name: 'Routes', href: '/admin/routes', icon: MapPin, id: 'routes' },
    { name: 'Settings', href: '/admin/settings', icon: Settings, id: 'settings' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Admin Panel</h2>
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
                    onClick={() => setActiveTab(item.id)}
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
            <Route path="/" element={<AdminOverview />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/operators" element={<OperatorManagement />} />
            <Route path="/routes" element={<RouteManagement />} />
            <Route path="/settings" element={<SystemSettings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function AdminOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">Monitor your bus ticket system performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from last month
                </p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
          <div className="space-y-3">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{booking.user}</p>
                  <p className="text-sm text-gray-600">{booking.route} • {booking.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{booking.amount}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">System Alerts</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
              <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-800">High Traffic Alert</p>
                <p className="text-sm text-yellow-700">NYC-DC route experiencing 90% booking capacity</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-blue-800">Revenue Milestone</p>
                <p className="text-sm text-blue-700">Monthly revenue target achieved 5 days early</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
              <Users className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-green-800">New Operator Registered</p>
                <p className="text-sm text-green-700">Express Travel Co. completed verification</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserManagement() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">User Management</h2>
      <p className="text-gray-600">User management features will be implemented here.</p>
    </div>
  );
}

function OperatorManagement() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Operator Management</h2>
      <p className="text-gray-600">Operator management features will be implemented here.</p>
    </div>
  );
}

function RouteManagement() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Route Management</h2>
      <p className="text-gray-600">Route management features will be implemented here.</p>
    </div>
  );
}

function SystemSettings() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">System Settings</h2>
      <p className="text-gray-600">System configuration options will be implemented here.</p>
    </div>
  );
}