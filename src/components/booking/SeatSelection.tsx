import React, { useState } from 'react';

interface SeatSelectionProps {
  bus: any;
  onSeatSelect: (seats: string[]) => void;
  selectedSeats: string[];
}

// Mock seat layout - in real app, this would come from the bus data
const generateSeatLayout = (totalSeats: number) => {
  const seats = [];
  const seatsPerRow = 4; // 2-2 configuration
  const rows = Math.ceil(totalSeats / seatsPerRow);
  
  // Some seats are already booked (demo)
  const bookedSeats = ['A1', 'A3', 'C2', 'D4', 'F1'];
  const ladiesSeats = ['A2', 'A4', 'B2', 'B4']; // Front rows for ladies
  
  for (let row = 0; row < rows; row++) {
    const rowLetter = String.fromCharCode(65 + row); // A, B, C, etc.
    const rowSeats = [];
    
    for (let seat = 1; seat <= seatsPerRow; seat++) {
      const seatId = `${rowLetter}${seat}`;
      const isBooked = bookedSeats.includes(seatId);
      const isLadiesSeat = ladiesSeats.includes(seatId);
      
      rowSeats.push({
        id: seatId,
        isBooked,
        isLadiesSeat,
        isSelected: false
      });
    }
    
    seats.push(rowSeats);
  }
  
  return seats;
};

export function SeatSelection({ bus, onSeatSelect, selectedSeats }: SeatSelectionProps) {
  const [seatLayout] = useState(() => generateSeatLayout(bus.total_seats || 40));

  const handleSeatClick = (seatId: string, isBooked: boolean, isLadiesSeat: boolean) => {
    if (isBooked) return;
    
    // For ladies seats, you might want to add gender-based restriction
    // This is a simplified implementation
    
    let newSelectedSeats;
    if (selectedSeats.includes(seatId)) {
      newSelectedSeats = selectedSeats.filter(id => id !== seatId);
    } else {
      if (selectedSeats.length >= 6) { // Max 6 seats per booking
        alert('Maximum 6 seats can be selected');
        return;
      }
      newSelectedSeats = [...selectedSeats, seatId];
    }
    
    onSeatSelect(newSelectedSeats);
  };

  const getSeatClass = (seat: any) => {
    const base = 'w-8 h-8 rounded-md border-2 cursor-pointer transition-all duration-200 flex items-center justify-center text-xs font-medium';
    
    if (seat.isBooked) {
      return `${base} bg-gray-300 border-gray-400 text-gray-600 cursor-not-allowed`;
    }
    
    if (selectedSeats.includes(seat.id)) {
      return `${base} bg-green-500 border-green-600 text-white`;
    }
    
    if (seat.isLadiesSeat) {
      return `${base} bg-pink-100 border-pink-300 text-pink-700 hover:bg-pink-200`;
    }
    
    return `${base} bg-white border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-50`;
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Driver Section */}
      <div className="mb-6">
        <div className="bg-gray-100 rounded-lg p-2 mb-4">
          <div className="text-center text-sm text-gray-600 mb-2">Driver</div>
          <div className="w-12 h-8 bg-gray-400 rounded mx-auto"></div>
        </div>
      </div>

      {/* Seat Layout */}
      <div className="space-y-3">
        {seatLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center space-x-6">
            {/* Left Side Seats (2 seats) */}
            <div className="flex space-x-1">
              {row.slice(0, 2).map((seat) => (
                <button
                  key={seat.id}
                  className={getSeatClass(seat)}
                  onClick={() => handleSeatClick(seat.id, seat.isBooked, seat.isLadiesSeat)}
                  disabled={seat.isBooked}
                  title={seat.isLadiesSeat ? 'Ladies Seat' : seat.isBooked ? 'Booked' : 'Available'}
                >
                  {seat.id}
                </button>
              ))}
            </div>

            {/* Aisle */}
            <div className="w-4"></div>

            {/* Right Side Seats (2 seats) */}
            <div className="flex space-x-1">
              {row.slice(2, 4).map((seat) => (
                <button
                  key={seat.id}
                  className={getSeatClass(seat)}
                  onClick={() => handleSeatClick(seat.id, seat.isBooked, seat.isLadiesSeat)}
                  disabled={seat.isBooked}
                  title={seat.isLadiesSeat ? 'Ladies Seat' : seat.isBooked ? 'Booked' : 'Available'}
                >
                  {seat.id}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-300 rounded"></div>
          <span>Booked</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-pink-100 border-2 border-pink-300 rounded"></div>
          <span>Ladies</span>
        </div>
      </div>

      {/* Selection Summary */}
      {selectedSeats.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="text-center">
            <div className="font-medium">Selected Seats: {selectedSeats.join(', ')}</div>
            <div className="text-sm text-gray-600 mt-1">
              {selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''} • ${bus.price * selectedSeats.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}