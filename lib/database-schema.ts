// Database schema types for AirDreamFly airline system

export interface Destination {
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

export interface Aircraft {
  id: string
  model: string
  manufacturer: string
  capacity: number
  seat_configuration: string
  created_at: string
}

export interface Flight {
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

export interface Seat {
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

export interface InFlightService {
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

export interface GuestProfile {
  id: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  date_of_birth?: string
  nationality?: string
  passport_number?: string
  passport_expiry?: string
  created_at: string
}

export interface Booking {
  id: string
  booking_reference: string
  guest_id: string
  flight_id: string
  booking_status: string
  total_amount: number
  payment_status: string
  created_at: string
}

export interface BookingPassenger {
  id: string
  booking_id: string
  guest_id: string
  seat_id?: string
  passenger_type: "adult" | "child" | "infant"
  created_at: string
}

export interface BookingService {
  id: string
  booking_id: string
  service_id: string
  quantity: number
  total_price: number
  created_at: string
}

export interface PaymentMethod {
  id: string
  booking_id: string
  payment_type: "credit_card" | "paypal" | "apple_pay"
  card_last_four?: string
  card_type?: string
  payment_amount: number
  payment_date: string
  transaction_id?: string
  status: string
}
