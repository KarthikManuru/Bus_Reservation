import React, { useState, useEffect } from 'react';
import { Input } from '../ui/Input';

interface PassengerDetailsProps {
  seats: string[];
  onDetailsUpdate: (details: any[]) => void;
  userProfile: any;
}

export function PassengerDetails({ seats, onDetailsUpdate, userProfile }: PassengerDetailsProps) {
  const [passengers, setPassengers] = useState<any[]>([]);

  useEffect(() => {
    // Initialize passenger details array
    const initialPassengers = seats.map((seat, index) => ({
      seatNumber: seat,
      name: index === 0 ? userProfile?.full_name || '' : '',
      age: index === 0 ? (userProfile?.date_of_birth ? calculateAge(userProfile.date_of_birth) : '') : '',
      gender: index === 0 ? userProfile?.gender || '' : '',
      idType: 'aadhar',
      idNumber: ''
    }));
    
    setPassengers(initialPassengers);
  }, [seats, userProfile]);

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age.toString();
  };

  const updatePassenger = (index: number, field: string, value: string) => {
    const updatedPassengers = passengers.map((passenger, i) => 
      i === index ? { ...passenger, [field]: value } : passenger
    );
    
    setPassengers(updatedPassengers);
    
    // Check if all required fields are filled
    const allComplete = updatedPassengers.every(p => 
      p.name && p.age && p.gender && p.idType && p.idNumber
    );
    
    if (allComplete) {
      onDetailsUpdate(updatedPassengers);
    }
  };

  return (
    <div className="space-y-6">
      {passengers.map((passenger, index) => (
        <div key={passenger.seatNumber} className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-lg">
              Passenger {index + 1} - Seat {passenger.seatNumber}
            </h3>
            {index === 0 && (
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                Primary Passenger
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name *"
              placeholder="Enter full name"
              value={passenger.name}
              onChange={(e) => updatePassenger(index, 'name', e.target.value)}
            />

            <Input
              label="Age *"
              type="number"
              placeholder="Enter age"
              min="1"
              max="120"
              value={passenger.age}
              onChange={(e) => updatePassenger(index, 'age', e.target.value)}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender *
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={passenger.gender}
                onChange={(e) => updatePassenger(index, 'gender', e.target.value)}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ID Type *
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={passenger.idType}
                onChange={(e) => updatePassenger(index, 'idType', e.target.value)}
              >
                <option value="aadhar">Aadhar Card</option>
                <option value="passport">Passport</option>
                <option value="driving_license">Driving License</option>
                <option value="voter_id">Voter ID</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <Input
                label="ID Number *"
                placeholder="Enter ID number"
                value={passenger.idNumber}
                onChange={(e) => updatePassenger(index, 'idNumber', e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">!</span>
            </div>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Important Information</h3>
            <div className="mt-1 text-sm text-yellow-700">
              <ul className="list-disc list-inside space-y-1">
                <li>Please carry a valid ID proof during travel</li>
                <li>Passenger names should match the ID proof exactly</li>
                <li>Age should be accurate as per ID proof</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}