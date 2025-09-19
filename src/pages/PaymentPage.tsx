import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CreditCard, Lock, CheckCircle, User, MapPin, Clock } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { PaymentForm } from '../components/payment/PaymentForm';

// Initialize Stripe (in a real app, use your publishable key)
const stripePromise = loadStripe('pk_test_placeholder');

export function PaymentPage() {
  const navigate = useNavigate();
  const { bookingState, resetBooking } = useBooking();
  const { profile } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const { selectedBus, selectedSeats, passengerDetails, totalAmount, searchParams, pickupPoint, dropPoint } = bookingState;

  if (!selectedBus || selectedSeats.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No booking details found</h2>
          <Button onClick={() => navigate('/search')}>Back to Search</Button>
        </div>
      </div>
    );
  }

  const handlePaymentSuccess = async (paymentIntent: any) => {
    setIsProcessing(true);
    
    // In a real app, you would save the booking to your database
    console.log('Payment successful:', paymentIntent);
    
    // Simulate booking confirmation
    setTimeout(() => {
      setIsProcessing(false);
      resetBooking();
      navigate('/profile'); // Redirect to bookings page
    }, 2000);
  };

  const taxes = Math.round(totalAmount * 0.12); // 12% tax
  const finalAmount = totalAmount + taxes;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Lock className="h-5 w-5 text-green-600" />
              <h2 className="text-xl font-semibold">Secure Payment</h2>
            </div>

            {/* Payment Methods */}
            <div className="mb-6">
              <h3 className="font-medium mb-4">Select Payment Method</h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-blue-600"
                  />
                  <CreditCard className="h-5 w-5 text-gray-400" />
                  <span>Credit/Debit Card</span>
                </label>
                <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-blue-600"
                  />
                  <div className="w-5 h-5 bg-orange-500 rounded text-white text-xs flex items-center justify-center font-bold">
                    U
                  </div>
                  <span>UPI Payment</span>
                </label>
                <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="wallet"
                    checked={paymentMethod === 'wallet'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-blue-600"
                  />
                  <div className="w-5 h-5 bg-purple-500 rounded text-white text-xs flex items-center justify-center font-bold">
                    W
                  </div>
                  <span>Digital Wallet</span>
                </label>
              </div>
            </div>

            {/* Payment Form */}
            {paymentMethod === 'card' && (
              <Elements stripe={stripePromise}>
                <PaymentForm
                  amount={finalAmount}
                  onSuccess={handlePaymentSuccess}
                  isProcessing={isProcessing}
                />
              </Elements>
            )}

            {paymentMethod === 'upi' && (
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <h4 className="font-medium mb-2">UPI Payment</h4>
                <p className="text-sm text-gray-600 mb-4">You will be redirected to your UPI app to complete the payment</p>
                <Button className="w-full" onClick={() => handlePaymentSuccess({ id: 'upi_mock' })}>
                  Pay with UPI - ${finalAmount}
                </Button>
              </div>
            )}

            {paymentMethod === 'wallet' && (
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-medium mb-2">Digital Wallet</h4>
                <p className="text-sm text-gray-600 mb-4">Choose your preferred wallet</p>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" onClick={() => handlePaymentSuccess({ id: 'wallet_mock' })}>
                    PayPal
                  </Button>
                  <Button variant="outline" onClick={() => handlePaymentSuccess({ id: 'wallet_mock' })}>
                    Apple Pay
                  </Button>
                </div>
              </div>
            )}

            {/* Security Notice */}
            <div className="mt-6 flex items-start space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <h4 className="font-medium text-blue-900 mb-1">Secure Payment</h4>
                <p className="text-blue-700">
                  Your payment information is encrypted and secure. We don't store your card details.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
            <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>

            {/* Journey Details */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="font-medium">{searchParams.from}</div>
                  <div className="text-sm text-gray-600">to {searchParams.to}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="font-medium">{selectedBus.departureTime} - {selectedBus.arrivalTime}</div>
                  <div className="text-sm text-gray-600">{searchParams.date}</div>
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

            {/* Passenger Details */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h4 className="font-medium mb-3">Passengers</h4>
              <div className="space-y-2">
                {passengerDetails.map((passenger, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{passenger.name} (Seat {passenger.seatNumber})</span>
                    <span>${selectedBus.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Boarding Points */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h4 className="font-medium mb-3">Boarding Points</h4>
              <div className="text-sm space-y-1">
                <div><span className="font-medium">Pickup:</span> {pickupPoint}</div>
                <div><span className="font-medium">Drop:</span> {dropPoint}</div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Base Fare ({selectedSeats.length} seats)</span>
                <span>${totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & Fees</span>
                <span>${taxes}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-200">
                <span>Total Amount</span>
                <span>${finalAmount}</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-medium mb-2">Contact Information</h4>
              <div className="text-sm text-gray-600">
                <div>{profile?.full_name}</div>
                <div>{profile?.email}</div>
                {profile?.phone && <div>{profile.phone}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}