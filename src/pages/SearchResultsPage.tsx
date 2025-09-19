import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, MapPin, Clock, Star, Wifi, Coffee, Power, AirVent as Air } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';
import { Button } from '../components/ui/Button';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

// Mock data for demonstration
const mockBuses = [
  {
    id: '1',
    operator: 'Premium Express',
    busType: 'AC Sleeper',
    rating: 4.5,
    totalRatings: 328,
    departureTime: '22:30',
    arrivalTime: '06:30',
    duration: '8h 00m',
    price: 45,
    seatsAvailable: 12,
    amenities: ['wifi', 'charging', 'ac', 'meals'],
    pickupPoints: ['Downtown Terminal', 'Airport', 'Mall Center'],
    dropPoints: ['Central Station', 'City Plaza', 'Bus Terminal']
  },
  {
    id: '2',
    operator: 'Comfort Travel',
    busType: 'AC Semi-Sleeper',
    rating: 4.2,
    totalRatings: 256,
    departureTime: '23:45',
    arrivalTime: '07:15',
    duration: '7h 30m',
    price: 38,
    seatsAvailable: 8,
    amenities: ['wifi', 'charging', 'ac'],
    pickupPoints: ['Main Station', 'Tech Park'],
    dropPoints: ['Downtown', 'University Area']
  },
  {
    id: '3',
    operator: 'City Express',
    busType: 'Non-AC',
    rating: 3.8,
    totalRatings: 124,
    departureTime: '06:00',
    arrivalTime: '12:00',
    duration: '6h 00m',
    price: 25,
    seatsAvailable: 20,
    amenities: ['charging'],
    pickupPoints: ['Bus Stand', 'Market Square'],
    dropPoints: ['Central Hub', 'Station Road']
  }
];

const amenityIcons = {
  wifi: Wifi,
  charging: Power,
  ac: Air,
  meals: Coffee
};

export function SearchResultsPage() {
  const navigate = useNavigate();
  const { bookingState, selectBus } = useBooking();
  const [buses, setBuses] = useState(mockBuses);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    busType: '',
    priceRange: [0, 100],
    departure: '',
    amenities: []
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleBookNow = (bus: any) => {
    selectBus(bus);
    navigate(`/booking/${bus.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Summary */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              <span className="font-medium">{bookingState.searchParams.from}</span>
              <span className="text-gray-400">→</span>
              <span className="font-medium">{bookingState.searchParams.to}</span>
            </div>
            <div className="text-gray-600">
              {bookingState.searchParams.date} • {bookingState.searchParams.passengers} passenger(s)
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        {showFilters && (
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h3 className="font-semibold text-lg mb-4">Filters</h3>
              
              {/* Bus Type Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-2">Bus Type</h4>
                <div className="space-y-2">
                  {['AC Sleeper', 'AC Semi-Sleeper', 'Non-AC'].map(type => (
                    <label key={type} className="flex items-center">
                      <input
                        type="radio"
                        name="busType"
                        value={type}
                        className="mr-2"
                        onChange={(e) => setFilters({...filters, busType: e.target.value})}
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-2">Price Range</h4>
                <div className="flex items-center space-x-2">
                  <span>${filters.priceRange[0]}</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={filters.priceRange[1]}
                    className="flex-1"
                    onChange={(e) => setFilters({
                      ...filters,
                      priceRange: [filters.priceRange[0], parseInt(e.target.value)]
                    })}
                  />
                  <span>${filters.priceRange[1]}</span>
                </div>
              </div>

              {/* Departure Time */}
              <div className="mb-6">
                <h4 className="font-medium mb-2">Departure Time</h4>
                <div className="space-y-2">
                  {[
                    { label: 'Morning (6AM - 12PM)', value: 'morning' },
                    { label: 'Afternoon (12PM - 6PM)', value: 'afternoon' },
                    { label: 'Evening (6PM - 12AM)', value: 'evening' },
                    { label: 'Night (12AM - 6AM)', value: 'night' }
                  ].map(time => (
                    <label key={time.value} className="flex items-center">
                      <input
                        type="radio"
                        name="departure"
                        value={time.value}
                        className="mr-2"
                        onChange={(e) => setFilters({...filters, departure: e.target.value})}
                      />
                      {time.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bus Results */}
        <div className={showFilters ? "lg:w-3/4" : "w-full"}>
          <div className="space-y-4">
            {buses.map(bus => (
              <div key={bus.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{bus.operator}</h3>
                        <p className="text-gray-600">{bus.busType}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{bus.rating}</span>
                        <span className="text-gray-600 text-sm">({bus.totalRatings})</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">{bus.departureTime}</span>
                        </div>
                        <p className="text-sm text-gray-600">Departure</p>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">{bus.duration}</div>
                        <div className="w-full h-px bg-gray-300 relative">
                          <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-400 rounded-full -mt-0.5"></div>
                        </div>
                      </div>
                      <div className="text-right md:text-left">
                        <div className="flex items-center justify-end md:justify-start space-x-2 mb-1">
                          <span className="font-medium">{bus.arrivalTime}</span>
                          <Clock className="h-4 w-4 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-600">Arrival</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex space-x-2">
                        {bus.amenities.map(amenity => {
                          const Icon = amenityIcons[amenity as keyof typeof amenityIcons];
                          return Icon ? (
                            <Icon key={amenity} className="h-4 w-4 text-gray-400" title={amenity} />
                          ) : null;
                        })}
                      </div>
                      <span className="text-sm text-green-600">{bus.seatsAvailable} seats available</span>
                    </div>
                  </div>

                  <div className="md:ml-8 flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center">
                    <div className="text-right mb-4">
                      <div className="text-2xl font-bold text-gray-900">${bus.price}</div>
                      <div className="text-sm text-gray-600">per passenger</div>
                    </div>
                    <Button onClick={() => handleBookNow(bus)}>
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {buses.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">No buses found for your search criteria</div>
              <p className="text-gray-400 mt-2">Try adjusting your filters or search for a different route</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}