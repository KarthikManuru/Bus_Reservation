import React, { createContext, useContext, useState } from 'react';

interface BookingState {
  searchParams: {
    from: string;
    to: string;
    date: string;
    passengers: number;
  };
  selectedBus: any;
  selectedSeats: string[];
  passengerDetails: any[];
  pickupPoint: string;
  dropPoint: string;
  totalAmount: number;
}

interface BookingContextType {
  bookingState: BookingState;
  updateSearchParams: (params: Partial<BookingState['searchParams']>) => void;
  selectBus: (bus: any) => void;
  selectSeats: (seats: string[]) => void;
  updatePassengerDetails: (details: any[]) => void;
  updatePoints: (pickup: string, drop: string) => void;
  calculateTotal: (amount: number) => void;
  resetBooking: () => void;
}

const initialState: BookingState = {
  searchParams: {
    from: '',
    to: '',
    date: '',
    passengers: 1,
  },
  selectedBus: null,
  selectedSeats: [],
  passengerDetails: [],
  pickupPoint: '',
  dropPoint: '',
  totalAmount: 0,
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [bookingState, setBookingState] = useState<BookingState>(initialState);

  const updateSearchParams = (params: Partial<BookingState['searchParams']>) => {
    setBookingState(prev => ({
      ...prev,
      searchParams: { ...prev.searchParams, ...params }
    }));
  };

  const selectBus = (bus: any) => {
    setBookingState(prev => ({ ...prev, selectedBus: bus }));
  };

  const selectSeats = (seats: string[]) => {
    setBookingState(prev => ({ ...prev, selectedSeats: seats }));
  };

  const updatePassengerDetails = (details: any[]) => {
    setBookingState(prev => ({ ...prev, passengerDetails: details }));
  };

  const updatePoints = (pickup: string, drop: string) => {
    setBookingState(prev => ({ ...prev, pickupPoint: pickup, dropPoint: drop }));
  };

  const calculateTotal = (amount: number) => {
    setBookingState(prev => ({ ...prev, totalAmount: amount }));
  };

  const resetBooking = () => {
    setBookingState(initialState);
  };

  const value = {
    bookingState,
    updateSearchParams,
    selectBus,
    selectSeats,
    updatePassengerDetails,
    updatePoints,
    calculateTotal,
    resetBooking,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}