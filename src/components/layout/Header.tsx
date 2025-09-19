import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bus, User, LogOut, Settings, Bell } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';
import { useBooking } from '../../contexts/BookingContext';
import { Button } from '../ui/Button';

export function Header() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const { resetBooking } = useBooking();

  const handleSignOut = async () => {
    try {
      await signOut();
      resetBooking();
      toast.success('Signed out');
      navigate('/login');
    } catch (e: any) {
      toast.error(e?.message || 'Failed to sign out');
    }
  };

  const getRoleBasedPath = () => {
    switch (profile?.role) {
      case 'admin': return '/admin';
      case 'operator': return '/operator';
      case 'support': return '/support';
      default: return '/profile';
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Bus className="h-8 w-8 text-blue-600" />
            <span className="font-bold text-xl text-gray-900">BusTicket Pro</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/search" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Search Buses
            </Link>
            <Link to="/routes" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Routes
            </Link>
            <Link to="/help" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Help
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                  <User className="h-5 w-5" />
                  <span className="font-medium">{profile?.full_name}</span>
                </button>
                
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link to={getRoleBasedPath()} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Settings className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                  <Link to="/profile?tab=bookings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Bell className="h-4 w-4 mr-2" />
                    My Bookings
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="outline" size="sm">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}