import React, { useState, useEffect } from 'react';
import { User, MapPin, Clock, CreditCard, Edit, Calendar, Phone, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

// Mock booking data
const mockBookings = [
  {
    id: '1',
    bookingReference: 'BT123456789',
    operator: 'Premium Express',
    route: 'New York → Washington DC',
    date: '2024-02-15',
    time: '22:30 - 06:30',
    seats: ['A1', 'A2'],
    status: 'confirmed',
    amount: 90,
    passengers: [
      { name: 'John Doe', seat: 'A1' },
      { name: 'Jane Doe', seat: 'A2' }
    ]
  },
  {
    id: '2',
    bookingReference: 'BT987654321',
    operator: 'Comfort Travel',
    route: 'Los Angeles → San Francisco',
    date: '2024-01-28',
    time: '23:45 - 07:15',
    seats: ['C3'],
    status: 'completed',
    amount: 65,
    passengers: [
      { name: 'John Doe', seat: 'C3' }
    ]
  }
];

export function ProfilePage() {
  const { profile, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [bookings] = useState(mockBookings);
  const [profileData, setProfileData] = useState({
    full_name: '',
    email: '',
    phone: '',
    date_of_birth: '',
    gender: ''
  });

  useEffect(() => {
    if (profile) {
      setProfileData({
        full_name: profile.full_name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        date_of_birth: profile.date_of_birth || '',
        gender: profile.gender || ''
      });
    }
  }, [profile]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(profileData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{profile?.full_name}</h1>
              <p className="text-gray-600">{profile?.email}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            className={`px-6 py-4 text-sm font-medium ${
              activeTab === 'profile'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('profile')}
          >
            Profile Information
          </button>
          <button
            className={`px-6 py-4 text-sm font-medium ${
              activeTab === 'bookings'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('bookings')}
          >
            My Bookings
          </button>
          <button
            className={`px-6 py-4 text-sm font-medium ${
              activeTab === 'preferences'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('preferences')}
          >
            Preferences
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'profile' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Profile Information</h2>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
              </div>

              {isEditing ? (
                <form onSubmit={handleProfileUpdate} className="max-w-2xl space-y-4">
                  <Input
                    label="Full Name"
                    icon={<User className="h-5 w-5 text-gray-400" />}
                    value={profileData.full_name}
                    onChange={(e) => setProfileData({...profileData, full_name: e.target.value})}
                  />
                  
                  <Input
                    label="Email"
                    type="email"
                    icon={<Mail className="h-5 w-5 text-gray-400" />}
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  />
                  
                  <Input
                    label="Phone Number"
                    type="tel"
                    icon={<Phone className="h-5 w-5 text-gray-400" />}
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  />
                  
                  <Input
                    label="Date of Birth"
                    type="date"
                    value={profileData.date_of_birth}
                    onChange={(e) => setProfileData({...profileData, date_of_birth: e.target.value})}
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={profileData.gender}
                      onChange={(e) => setProfileData({...profileData, gender: e.target.value})}
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="flex space-x-4">
                    <Button type="submit">Save Changes</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="max-w-2xl space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <div className="text-gray-900">{profile?.full_name || 'Not provided'}</div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <div className="text-gray-900">{profile?.email}</div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <div className="text-gray-900">{profile?.phone || 'Not provided'}</div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                      <div className="text-gray-900">{profile?.date_of_birth || 'Not provided'}</div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                      <div className="text-gray-900 capitalize">{profile?.gender || 'Not provided'}</div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                      <div className="text-gray-900">
                        {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'N/A'}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'bookings' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">My Bookings</h2>
              
              {bookings.length > 0 ? (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{booking.operator}</h3>
                          <p className="text-gray-600">{booking.bookingReference}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{booking.route}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{booking.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{booking.time}</span>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">
                            Passengers: {booking.passengers.map(p => `${p.name} (${p.seat})`).join(', ')}
                          </p>
                          <p className="font-medium">Total: ${booking.amount}</p>
                        </div>
                        <div className="flex space-x-2 mt-4 md:mt-0">
                          <Button variant="outline" size="sm">View Details</Button>
                          {booking.status === 'confirmed' && (
                            <Button variant="outline" size="sm">Cancel</Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-500 text-lg mb-2">No bookings found</div>
                  <p className="text-gray-400 mb-4">You haven't made any bookings yet</p>
                  <Button onClick={() => window.location.href = '/'}>
                    Book Your First Trip
                  </Button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'preferences' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Travel Preferences</h2>
              
              <div className="max-w-2xl space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Preferred Bus Types</h3>
                  <div className="space-y-2">
                    {['AC Sleeper', 'AC Semi-Sleeper', 'Non-AC'].map(type => (
                      <label key={type} className="flex items-center">
                        <input type="checkbox" className="mr-3" />
                        {type}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Preferred Departure Times</h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Morning (6AM - 12PM)', value: 'morning' },
                      { label: 'Afternoon (12PM - 6PM)', value: 'afternoon' },
                      { label: 'Evening (6PM - 12AM)', value: 'evening' },
                      { label: 'Night (12AM - 6AM)', value: 'night' }
                    ].map(time => (
                      <label key={time.value} className="flex items-center">
                        <input type="checkbox" className="mr-3" />
                        {time.label}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Notifications</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3" defaultChecked />
                      Email notifications for bookings
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3" defaultChecked />
                      SMS notifications for travel updates
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      Promotional emails
                    </label>
                  </div>
                </div>

                <Button>Save Preferences</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}