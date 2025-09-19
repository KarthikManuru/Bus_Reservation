import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Bus, MapPin, Calendar, BarChart3, Settings, Users } from 'lucide-react';

export function OperatorDashboard() {
  const location = useLocation();

  const navigation = [
    { name: 'Overview', href: '/operator', icon: BarChart3 },
    { name: 'My Buses', href: '/operator/buses', icon: Bus },
    { name: 'Routes', href: '/operator/routes', icon: MapPin },
    { name: 'Schedules', href: '/operator/schedules', icon: Calendar },
    { name: 'Bookings', href: '/operator/bookings', icon: Users },
    { name: 'Settings', href: '/operator/settings', icon: Settings },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Operator Panel</h2>
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
            <Route path="/" element={<OperatorOverview />} />
            <Route path="/buses" element={<BusManagement />} />
            <Route path="/routes" element={<OperatorRoutes />} />
            <Route path="/schedules" element={<ScheduleManagement />} />
            <Route path="/bookings" element={<OperatorBookings />} />
            <Route path="/settings" element={<OperatorSettings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function OperatorOverview() {
  const stats = [
    { title: 'Total Buses', value: '12', icon: Bus },
    { title: 'Active Routes', value: '8', icon: MapPin },
    { title: 'Today\'s Bookings', value: '45', icon: Users },
    { title: 'Monthly Revenue', value: '$15,240', icon: BarChart3 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Operator Dashboard</h1>
        <p className="text-gray-600">Manage your bus operations efficiently</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <stat.icon className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <p className="text-gray-600">Operator dashboard features will be fully implemented here.</p>
      </div>
    </div>
  );
}

function BusManagement() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Bus Management</h2>
      <p className="text-gray-600">Bus fleet management features will be implemented here.</p>
    </div>
  );
}

function OperatorRoutes() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Route Management</h2>
      <p className="text-gray-600">Route management features will be implemented here.</p>
    </div>
  );
}

function ScheduleManagement() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Schedule Management</h2>
      <p className="text-gray-600">Schedule management features will be implemented here.</p>
    </div>
  );
}

function OperatorBookings() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Booking Management</h2>
      <p className="text-gray-600">Booking management features will be implemented here.</p>
    </div>
  );
}

function OperatorSettings() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Operator Settings</h2>
      <p className="text-gray-600">Operator settings will be implemented here.</p>
    </div>
  );
}