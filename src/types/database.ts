export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          phone: string | null;
          full_name: string;
          date_of_birth: string | null;
          gender: 'male' | 'female' | 'other';
          role: 'passenger' | 'admin' | 'operator' | 'support';
          created_at: string;
          updated_at: string;
          preferences: any | null;
        };
        Insert: {
          id?: string;
          email: string;
          phone?: string | null;
          full_name: string;
          date_of_birth?: string | null;
          gender: 'male' | 'female' | 'other';
          role?: 'passenger' | 'admin' | 'operator' | 'support';
          created_at?: string;
          updated_at?: string;
          preferences?: any | null;
        };
        Update: {
          id?: string;
          email?: string;
          phone?: string | null;
          full_name?: string;
          date_of_birth?: string | null;
          gender?: 'male' | 'female' | 'other';
          role?: 'passenger' | 'admin' | 'operator' | 'support';
          created_at?: string;
          updated_at?: string;
          preferences?: any | null;
        };
      };
      operators: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          license_number: string;
          status: 'active' | 'suspended' | 'pending';
          rating: number;
          total_buses: number;
          total_routes: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone: string;
          license_number: string;
          status?: 'active' | 'suspended' | 'pending';
          rating?: number;
          total_buses?: number;
          total_routes?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string;
          license_number?: string;
          status?: 'active' | 'suspended' | 'pending';
          rating?: number;
          total_buses?: number;
          total_routes?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      buses: {
        Row: {
          id: string;
          operator_id: string;
          bus_number: string;
          bus_type: 'ac' | 'non_ac' | 'sleeper' | 'semi_sleeper';
          total_seats: number;
          seat_layout: any;
          amenities: string[];
          status: 'active' | 'maintenance' | 'retired';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          operator_id: string;
          bus_number: string;
          bus_type: 'ac' | 'non_ac' | 'sleeper' | 'semi_sleeper';
          total_seats: number;
          seat_layout: any;
          amenities?: string[];
          status?: 'active' | 'maintenance' | 'retired';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          operator_id?: string;
          bus_number?: string;
          bus_type?: 'ac' | 'non_ac' | 'sleeper' | 'semi_sleeper';
          total_seats?: number;
          seat_layout?: any;
          amenities?: string[];
          status?: 'active' | 'maintenance' | 'retired';
          created_at?: string;
          updated_at?: string;
        };
      };
      routes: {
        Row: {
          id: string;
          operator_id: string;
          from_city: string;
          to_city: string;
          distance: number;
          duration: number;
          pickup_points: any[];
          drop_points: any[];
          status: 'active' | 'inactive';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          operator_id: string;
          from_city: string;
          to_city: string;
          distance: number;
          duration: number;
          pickup_points: any[];
          drop_points: any[];
          status?: 'active' | 'inactive';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          operator_id?: string;
          from_city?: string;
          to_city?: string;
          distance?: number;
          duration?: number;
          pickup_points?: any[];
          drop_points?: any[];
          status?: 'active' | 'inactive';
          created_at?: string;
          updated_at?: string;
        };
      };
      schedules: {
        Row: {
          id: string;
          bus_id: string;
          route_id: string;
          departure_time: string;
          arrival_time: string;
          price: number;
          date: string;
          available_seats: number;
          status: 'scheduled' | 'cancelled' | 'completed';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          bus_id: string;
          route_id: string;
          departure_time: string;
          arrival_time: string;
          price: number;
          date: string;
          available_seats: number;
          status?: 'scheduled' | 'cancelled' | 'completed';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          bus_id?: string;
          route_id?: string;
          departure_time?: string;
          arrival_time?: string;
          price?: number;
          date?: string;
          available_seats?: number;
          status?: 'scheduled' | 'cancelled' | 'completed';
          created_at?: string;
          updated_at?: string;
        };
      };
      bookings: {
        Row: {
          id: string;
          user_id: string;
          schedule_id: string;
          seats: string[];
          passenger_details: any[];
          pickup_point: string;
          drop_point: string;
          total_amount: number;
          booking_status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
          payment_status: 'pending' | 'paid' | 'refunded' | 'failed';
          booking_reference: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          schedule_id: string;
          seats: string[];
          passenger_details: any[];
          pickup_point: string;
          drop_point: string;
          total_amount: number;
          booking_status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
          payment_status?: 'pending' | 'paid' | 'refunded' | 'failed';
          booking_reference: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          schedule_id?: string;
          seats?: string[];
          passenger_details?: any[];
          pickup_point?: string;
          drop_point?: string;
          total_amount?: number;
          booking_status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
          payment_status?: 'pending' | 'paid' | 'refunded' | 'failed';
          booking_reference?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
};