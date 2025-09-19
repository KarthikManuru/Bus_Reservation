import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User, MapPin, Clock, CreditCard } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { SeatSelection } from '../components/booking/SeatSelection';
import { PassengerDetails } from '../components/booking/PassengerDetails';

export function BookingPage() {
  const { busId } = useParams();
  const navigate = useNavigate();
  const { bookingState, selectSeats, updatePassengerDetails, updatePoints, calculateTotal } = useBooking();
  const { profile } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPickup, setSelectedPickup] = useState('');
  const [selectedDrop, setSelectedDrop] = useState('');

  const { selectedBus } = bookingState;

  if (!selectedBus) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Bus not found</h2>
          <Button onClick={() => navigate('/search')}>Back to Search</Button>
        </div>
      </div>
    );
  }

  const handleSeatSelection = (seats: string[]) => {
    selectSeats(seats);
    const total = seats.length * selectedBus.price;
    calculateTotal(total);
  };

  const handlePassengerDetails = (details: any[]) => {
    updatePassengerDetails(details);
  };

  const proceedToPayment = () => {
    if (!selectedPickup || !selectedDrop) {
      alert('Please select pickup and drop points');
      return;
    }
    
    updatePoints(selectedPickup, selectedDrop);
    navigate('/payment');
  };

  const steps = [
    { number: 1, title: 'Select Seats', completed: bookingState.selectedSeats.length > 0 },
    { number: 2, title: 'Passenger Details', completed: bookingState.passengerDetails.length > 0 },
    { number: 3, title: 'Boarding Points', completed: selectedPickup && selectedDrop },
    { number: 4, title: 'Payment', completed: false },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                ${step.completed ? 'bg-green-500 text-white' : 
                  currentStep === step.number ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}
              `}>
                {step.number}
              </div>
              <span className={`ml-2 text-sm font-medium ${step.completed ? 'text-green-600' : 'text-gray-600'}`}>
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div className="mx-4 flex-1 h-px bg-gray-200"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {currentStep === 1 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Select Your Seats</h2>
              <SeatSelection
                bus={selectedBus}
                onSeatSelect={handleSeatSelection}
                selectedSeats={bookingState.selectedSeats}
              />
              {bookingState.selectedSeats.length > 0 && (
                <div className="mt-6 flex justify-end">
                  <Button onClick={() => setCurrentStep(2)}>
                    Continue to Passenger Details
                  </Button>
                </div>
              )}
            </div>
          )}

          {currentStep === 2 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Passenger Details</h2>
              <PassengerDetails
                seats={bookingState.selectedSeats}
                onDetailsUpdate={handlePassengerDetails}
                userProfile={profile}
              />
              {bookingState.passengerDetails.length === bookingState.selectedSeats.length && (
                <div className="mt-6 flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    Back to Seats
                  </Button>
                  <Button onClick={() => setCurrentStep(3)}>
                    Continue to Boarding Points
                  </Button>
                </div>
              )}
            </div>
          )}

          {currentStep === 3 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Select Boarding Points</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pickup Point
                  </label>
                  <select
                    value={selectedPickup}
                    onChange={(e) => setSelectedPickup(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select pickup point</option>
                    {selectedBus.pickupPoints.map((point: string) => (
                      <option key={point} value={point}>{point}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Drop Point
                  </label>
                  <select
                    value={selectedDrop}
                    onChange={(e) => setSelectedDrop(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select drop point</option>
                    {selectedBus.dropPoints.map((point: string) => (
                      <option key={point} value={point}>{point}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(2)}>
                  Back to Details
                </Button>
                <Button onClick={proceedToPayment}>
                  Proceed to Payment
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Booking Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
            <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="font-medium">{bookingState.searchParams.from}</div>
                  <div className="text-sm text-gray-600">to {bookingState.searchParams.to}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="font-medium">{selectedBus.departureTime} - {selectedBus.arrivalTime}</div>
                  <div className="text-sm text-gray-600">{bookingState.searchParams.date}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="font-medium">{selectedBus.operator}</div>
                  <div className="text-sm text-gray-600">{selectedBus.busType}</div>
                </div>
              </div>
            </div>

            {bookingState.selectedSeats.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Selected Seats:</span>
                    <span className="font-medium">{bookingState.selectedSeats.join(', ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Passengers:</span>
                    <span>{bookingState.selectedSeats.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price per seat:</span>
                    <span>${selectedBus.price}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total Amount:</span>
                    <span>${bookingState.totalAmount}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}