import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Users, Star, Shield, Clock, Award } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useBooking } from '../contexts/BookingContext';

const popularRoutes = [
  { from: 'New York', to: 'Washington DC', price: '$45', duration: '4h 30m' },
  { from: 'Los Angeles', to: 'San Francisco', price: '$65', duration: '6h 15m' },
  { from: 'Chicago', to: 'Detroit', price: '$35', duration: '5h 00m' },
  { from: 'Miami', to: 'Orlando', price: '$25', duration: '3h 45m' },
];

const features = [
  {
    icon: Shield,
    title: 'Safe & Secure',
    description: 'All buses are regularly sanitized with verified drivers'
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock customer support for all your queries'
  },
  {
    icon: Award,
    title: 'Best Prices',
    description: 'Compare prices across operators and get the best deals'
  },
  {
    icon: Star,
    title: 'Rated Service',
    description: 'Choose from highly rated buses with verified reviews'
  }
];

export function HomePage() {
  const navigate = useNavigate();
  const { updateSearchParams } = useBooking();
  const [searchForm, setSearchForm] = useState({
    from: '',
    to: '',
    date: '',
    passengers: 1
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchForm.from || !searchForm.to || !searchForm.date) return;
    
    updateSearchParams(searchForm);
    navigate('/search');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Book Your Bus Tickets
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Safe, comfortable, and affordable travel across the country
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Input
                  icon={<MapPin className="h-5 w-5 text-gray-400" />}
                  placeholder="From city"
                  value={searchForm.from}
                  onChange={(e) => setSearchForm({...searchForm, from: e.target.value})}
                  className="text-gray-900"
                />
                <Input
                  icon={<MapPin className="h-5 w-5 text-gray-400" />}
                  placeholder="To city"
                  value={searchForm.to}
                  onChange={(e) => setSearchForm({...searchForm, to: e.target.value})}
                  className="text-gray-900"
                />
                <Input
                  icon={<Calendar className="h-5 w-5 text-gray-400" />}
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={searchForm.date}
                  onChange={(e) => setSearchForm({...searchForm, date: e.target.value})}
                  className="text-gray-900"
                />
                <Input
                  icon={<Users className="h-5 w-5 text-gray-400" />}
                  type="number"
                  min="1"
                  max="6"
                  placeholder="Passengers"
                  value={searchForm.passengers}
                  onChange={(e) => setSearchForm({...searchForm, passengers: parseInt(e.target.value)})}
                  className="text-gray-900"
                />
              </div>
              <div className="mt-6 text-center">
                <Button type="submit" size="lg" className="px-12">
                  <Search className="h-5 w-5 mr-2" />
                  Search Buses
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-gray-600 text-lg">Experience the best in bus travel with our premium services</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Routes */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Routes</h2>
            <p className="text-gray-600 text-lg">Discover the most traveled routes with the best prices</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularRoutes.map((route, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">{route.from}</span>
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="font-semibold text-gray-900">{route.to}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{route.duration}</span>
                  <span className="font-bold text-blue-600">{route.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-blue-200">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">200+</div>
              <div className="text-blue-200">Bus Operators</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-blue-200">Routes Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-200">Customer Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}