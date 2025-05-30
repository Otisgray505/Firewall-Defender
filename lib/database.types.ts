export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      destinations: {
        Row: {
          id: string
          code: string
          name: string
          city: string
          country: string
          airport_code: string
          image_url: string
          description: string
          popular: boolean
          created_at: string
        }
        Insert: {
          id?: string
          code: string
          name: string
          city: string
          country: string
          airport_code: string
          image_url: string
          description: string
          popular?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          code?: string
          name?: string
          city?: string
          country?: string
          airport_code?: string
          image_url?: string
          description?: string
          popular?: boolean
          created_at?: string
        }
      }
      aircraft: {
        Row: {
          id: string
          model: string
          manufacturer: string
          capacity: number
          seat_configuration: string
          created_at: string
        }
        Insert: {
          id?: string
          model: string
          manufacturer: string
          capacity: number
          seat_configuration: string
          created_at?: string
        }
        Update: {
          id?: string
          model?: string
          manufacturer?: string
          capacity?: number
          seat_configuration?: string
          created_at?: string
        }
      }
      flights: {
        Row: {
          id: string
          flight_number: string
          airline: string
          aircraft_id: string
          departure_destination_id: string
          arrival_destination_id: string
          departure_time: string
          arrival_time: string
          departure_date: string
          arrival_date: string
          duration: string
          stops: number
          base_price: number
          cabin_class: string
          seats_available: number
          total_seats: number
          amenities: string[]
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          flight_number: string
          airline: string
          aircraft_id: string
          departure_destination_id: string
          arrival_destination_id: string
          departure_time: string
          arrival_time: string
          departure_date: string
          arrival_date: string
          duration: string
          stops?: number
          base_price: number
          cabin_class: string
          seats_available: number
          total_seats: number
          amenities?: string[]
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          flight_number?: string
          airline?: string
          aircraft_id?: string
          departure_destination_id?: string
          arrival_destination_id?: string
          departure_time?: string
          arrival_time?: string
          departure_date?: string
          arrival_date?: string
          duration?: string
          stops?: number
          base_price?: number
          cabin_class?: string
          seats_available?: number
          total_seats?: number
          amenities?: string[]
          status?: string
          created_at?: string
        }
      }
      seats: {
        Row: {
          id: string
          aircraft_id: string
          seat_number: string
          row_number: number
          seat_letter: string
          seat_type: "window" | "middle" | "aisle"
          is_exit_row: boolean
          price_modifier: number
          created_at: string
        }
        Insert: {
          id?: string
          aircraft_id: string
          seat_number: string
          row_number: number
          seat_letter: string
          seat_type: "window" | "middle" | "aisle"
          is_exit_row?: boolean
          price_modifier?: number
          created_at?: string
        }
        Update: {
          id?: string
          aircraft_id?: string
          seat_number?: string
          row_number?: number
          seat_letter?: string
          seat_type?: "window" | "middle" | "aisle"
          is_exit_row?: boolean
          price_modifier?: number
          created_at?: string
        }
      }
      inflight_services: {
        Row: {
          id: string
          type: "meal" | "beverage" | "entertainment"
          name: string
          description: string
          price: number
          dietary_info: string[]
          image_url: string
          available: boolean
          created_at: string
        }
        Insert: {
          id?: string
          type: "meal" | "beverage" | "entertainment"
          name: string
          description: string
          price: number
          dietary_info?: string[]
          image_url: string
          available?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          type?: "meal" | "beverage" | "entertainment"
          name?: string
          description?: string
          price?: number
          dietary_info?: string[]
          image_url?: string
          available?: boolean
          created_at?: string
        }
      }
      guest_profiles: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string
          phone: string | null
          date_of_birth: string | null
          nationality: string | null
          passport_number: string | null
          passport_expiry: string | null
          created_at: string
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          email: string
          phone?: string | null
          date_of_birth?: string | null
          nationality?: string | null
          passport_number?: string | null
          passport_expiry?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string | null
          date_of_birth?: string | null
          nationality?: string | null
          passport_number?: string | null
          passport_expiry?: string | null
          created_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          booking_reference: string
          guest_id: string
          flight_id: string
          booking_status: string
          total_amount: number
          payment_status: string
          created_at: string
        }
        Insert: {
          id?: string
          booking_reference: string
          guest_id: string
          flight_id: string
          booking_status?: string
          total_amount: number
          payment_status?: string
          created_at?: string
        }
        Update: {
          id?: string
          booking_reference?: string
          guest_id?: string
          flight_id?: string
          booking_status?: string
          total_amount?: number
          payment_status?: string
          created_at?: string
        }
      }
      booking_passengers: {
        Row: {
          id: string
          booking_id: string
          guest_id: string
          seat_id: string | null
          passenger_type: "adult" | "child" | "infant"
          created_at: string
        }
        Insert: {
          id?: string
          booking_id: string
          guest_id: string
          seat_id?: string | null
          passenger_type?: "adult" | "child" | "infant"
          created_at?: string
        }
        Update: {
          id?: string
          booking_id?: string
          guest_id?: string
          seat_id?: string | null
          passenger_type?: "adult" | "child" | "infant"
          created_at?: string
        }
      }
      booking_services: {
        Row: {
          id: string
          booking_id: string
          service_id: string
          quantity: number
          total_price: number
          created_at: string
        }
        Insert: {
          id?: string
          booking_id: string
          service_id: string
          quantity?: number
          total_price: number
          created_at?: string
        }
        Update: {
          id?: string
          booking_id?: string
          service_id?: string
          quantity?: number
          total_price?: number
          created_at?: string
        }
      }
      payment_methods: {
        Row: {
          id: string
          booking_id: string
          payment_type: "credit_card" | "paypal" | "apple_pay"
          card_last_four: string | null
          card_type: string | null
          payment_amount: number
          payment_date: string
          transaction_id: string | null
          status: string
        }
        Insert: {
          id?: string
          booking_id: string
          payment_type: "credit_card" | "paypal" | "apple_pay"
          card_last_four?: string | null
          card_type?: string | null
          payment_amount: number
          payment_date?: string
          transaction_id?: string | null
          status?: string
        }
        Update: {
          id?: string
          booking_id?: string
          payment_type?: "credit_card" | "paypal" | "apple_pay"
          card_last_four?: string | null
          card_type?: string | null
          payment_amount?: number
          payment_date?: string
          transaction_id?: string | null
          status?: string
        }
      }
    }
  }
}
