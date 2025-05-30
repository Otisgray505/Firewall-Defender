import type { Destination, Flight, InFlightService, Seat } from "./database-schema"

export const destinations: Destination[] = [
  {
    id: "dest-1",
    code: "NYC",
    name: "New York",
    city: "New York",
    country: "United States",
    airport_code: "JFK",
    image_url: "/images/airplane-hero.jpg",
    description: "The city that never sleeps",
    popular: true,
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "dest-2",
    code: "LAX",
    name: "Los Angeles",
    city: "Los Angeles",
    country: "United States",
    airport_code: "LAX",
    image_url: "/images/airplane-hero.jpg",
    description: "City of Angels",
    popular: true,
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "dest-3",
    code: "LON",
    name: "London",
    city: "London",
    country: "United Kingdom",
    airport_code: "LHR",
    image_url: "/images/airplane-hero.jpg",
    description: "Historic capital city",
    popular: true,
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "dest-4",
    code: "PAR",
    name: "Paris",
    city: "Paris",
    country: "France",
    airport_code: "CDG",
    image_url: "/images/airplane-hero.jpg",
    description: "City of Light",
    popular: true,
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "dest-5",
    code: "TOK",
    name: "Tokyo",
    city: "Tokyo",
    country: "Japan",
    airport_code: "HND",
    image_url: "/images/airplane-hero.jpg",
    description: "Modern metropolis",
    popular: true,
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "dest-6",
    code: "DUB",
    name: "Dubai",
    city: "Dubai",
    country: "UAE",
    airport_code: "DXB",
    image_url: "/images/airplane-hero.jpg",
    description: "Luxury destination",
    popular: true,
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "dest-7",
    code: "SGN",
    name: "Ho Chi Minh City",
    city: "Ho Chi Minh City",
    country: "Vietnam",
    airport_code: "SGN",
    image_url:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ho%20Chi%20Minh.png-KqGC6M8cteHUG8KZR7shY8cjRtDRAy.jpeg",
    description: "Vibrant Vietnamese city with rich culture and delicious cuisine",
    popular: true,
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "dest-8",
    code: "CTS",
    name: "Hokkaido",
    city: "Sapporo",
    country: "Japan",
    airport_code: "CTS",
    image_url:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hokkaido.png-E9pEEI75VP4ztrtOlmwywu2YPxFkbu.jpeg",
    description: "Beautiful Japanese island with stunning natural landscapes",
    popular: true,
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "dest-9",
    code: "DPS",
    name: "Bali",
    city: "Denpasar",
    country: "Indonesia",
    airport_code: "DPS",
    image_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bali.png-LixO5flVXiVFPFhqZM2Xo0KrKFviBS.jpeg",
    description: "Tropical paradise with ancient temples and pristine beaches",
    popular: true,
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "dest-10",
    code: "PER",
    name: "Perth",
    city: "Perth",
    country: "Australia",
    airport_code: "PER",
    image_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Perth.png-VrSvNlqBnuIdkTkdXJ0ciAD0BgFVyu.jpeg",
    description: "Western Australian gem with beautiful parks and modern architecture",
    popular: true,
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "dest-11",
    code: "SAN",
    name: "California",
    city: "San Diego",
    country: "United States",
    airport_code: "SAN",
    image_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/California-fiQCWL8P17X6yNuMnm4ht2xJaLtcSF.png",
    description: "Sunny California coast with perfect weather year-round",
    popular: true,
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "dest-12",
    code: "YYZ",
    name: "Toronto",
    city: "Toronto",
    country: "Canada",
    airport_code: "YYZ",
    image_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Toronto-GPX7NwolidRoWxv0If6JS1UKr7JfOn.png",
    description: "Canadian cultural hub with iconic CN Tower and diverse neighborhoods",
    popular: true,
    created_at: "2023-01-01T00:00:00Z",
  },
]

export const flights: Flight[] = [
  {
    id: "fl-001",
    flight_number: "DF1234",
    airline: "AirDreamFly",
    aircraft_id: "aircraft-1",
    departure_destination_id: "dest-1",
    arrival_destination_id: "dest-3",
    departure_time: "08:30",
    arrival_time: "20:45",
    departure_date: "2023-07-15",
    arrival_date: "2023-07-15",
    duration: "7h 15m",
    stops: 0,
    base_price: 649,
    cabin_class: "Economy",
    seats_available: 12,
    total_seats: 256,
    amenities: ["wifi", "power", "entertainment"],
    status: "scheduled",
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "fl-002",
    flight_number: "DF2345",
    airline: "AirDreamFly",
    aircraft_id: "aircraft-1",
    departure_destination_id: "dest-1",
    arrival_destination_id: "dest-3",
    departure_time: "12:15",
    arrival_time: "00:30",
    departure_date: "2023-07-15",
    arrival_date: "2023-07-16",
    duration: "7h 15m",
    stops: 0,
    base_price: 599,
    cabin_class: "Economy",
    seats_available: 8,
    total_seats: 256,
    amenities: ["wifi", "power", "entertainment"],
    status: "scheduled",
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "fl-003",
    flight_number: "DF3456",
    airline: "AirDreamFly",
    aircraft_id: "aircraft-1",
    departure_destination_id: "dest-1",
    arrival_destination_id: "dest-3",
    departure_time: "16:45",
    arrival_time: "04:55",
    departure_date: "2023-07-15",
    arrival_date: "2023-07-16",
    duration: "7h 10m",
    stops: 0,
    base_price: 579,
    cabin_class: "Economy",
    seats_available: 5,
    total_seats: 256,
    amenities: ["wifi", "power", "entertainment"],
    status: "scheduled",
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "fl-004",
    flight_number: "DF4567",
    airline: "AirDreamFly",
    aircraft_id: "aircraft-1",
    departure_destination_id: "dest-1",
    arrival_destination_id: "dest-7",
    departure_time: "19:30",
    arrival_time: "07:45",
    departure_date: "2023-07-15",
    arrival_date: "2023-07-16",
    duration: "15h 15m",
    stops: 0,
    base_price: 899,
    cabin_class: "Economy",
    seats_available: 15,
    total_seats: 256,
    amenities: ["wifi", "power", "entertainment"],
    status: "scheduled",
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "fl-005",
    flight_number: "DF5678",
    airline: "AirDreamFly",
    aircraft_id: "aircraft-1",
    departure_destination_id: "dest-1",
    arrival_destination_id: "dest-12",
    departure_time: "10:20",
    arrival_time: "13:35",
    departure_date: "2023-07-15",
    arrival_date: "2023-07-15",
    duration: "1h 15m",
    stops: 0,
    base_price: 299,
    cabin_class: "Economy",
    seats_available: 3,
    total_seats: 256,
    amenities: ["wifi", "power", "entertainment"],
    status: "scheduled",
    created_at: "2023-01-01T00:00:00Z",
  },
]

export const inFlightServices: InFlightService[] = [
  {
    id: "meal-1",
    type: "meal",
    name: "Asian Fusion Salmon",
    description: "Pan-seared salmon with teriyaki glaze, jasmine rice, and steamed bok choy.",
    price: 18.99,
    dietary_info: ["protein-rich", "gluten-free"],
    image_url: "/placeholder.svg?height=100&width=150",
    available: true,
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "meal-2",
    type: "meal",
    name: "Mediterranean Quinoa Bowl",
    description: "Quinoa salad with roasted vegetables, feta cheese, olives, and lemon herb dressing.",
    price: 15.99,
    dietary_info: ["vegetarian", "gluten-free"],
    image_url: "/placeholder.svg?height=100&width=150",
    available: true,
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "meal-3",
    type: "meal",
    name: "Classic Beef Tenderloin",
    description: "Tender beef with roasted potatoes, seasonal vegetables, and red wine jus.",
    price: 22.99,
    dietary_info: ["protein-rich"],
    image_url: "/placeholder.svg?height=100&width=150",
    available: true,
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "meal-4",
    type: "meal",
    name: "Thai Green Curry",
    description: "Aromatic green curry with coconut milk, vegetables, and fragrant jasmine rice.",
    price: 16.99,
    dietary_info: ["vegan", "spicy"],
    image_url: "/placeholder.svg?height=100&width=150",
    available: true,
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "bev-1",
    type: "beverage",
    name: "Coca-Cola",
    description: "Classic refreshing cola drink.",
    price: 3.99,
    dietary_info: [],
    image_url: "/placeholder.svg?height=100&width=100",
    available: true,
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "bev-2",
    type: "beverage",
    name: "7UP",
    description: "Crisp lemon-lime soda.",
    price: 3.99,
    dietary_info: [],
    image_url: "/placeholder.svg?height=100&width=100",
    available: true,
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "bev-3",
    type: "beverage",
    name: "Orange Juice",
    description: "Fresh squeezed orange juice.",
    price: 4.99,
    dietary_info: [],
    image_url: "/placeholder.svg?height=100&width=100",
    available: true,
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "bev-4",
    type: "beverage",
    name: "Premium Coffee",
    description: "Freshly brewed specialty coffee.",
    price: 4.99,
    dietary_info: [],
    image_url: "/placeholder.svg?height=100&width=100",
    available: true,
    created_at: "2023-01-01T00:00:00Z",
  },
]

// Generate seats for aircraft
export const generateSeats = (aircraftId: string): Seat[] => {
  const seats: Seat[] = []
  const rows = 30

  for (let row = 1; row <= rows; row++) {
    // Left side: A, B, C
    for (const col of ["A", "B", "C"]) {
      const seatId = `${aircraftId}-${row}${col}`
      const isExit = row === 10 || row === 20
      const isWindow = col === "A"
      const isMiddle = col === "B"
      const isAisle = col === "C"

      let priceModifier = 0
      if (isWindow) priceModifier = 25
      else if (isAisle) priceModifier = 20
      else priceModifier = 15

      if (isExit) priceModifier += 30

      seats.push({
        id: seatId,
        aircraft_id: aircraftId,
        seat_number: `${row}${col}`,
        row_number: row,
        seat_letter: col,
        seat_type: isWindow ? "window" : isAisle ? "aisle" : "middle",
        is_exit_row: isExit,
        price_modifier: priceModifier,
        created_at: "2023-01-01T00:00:00Z",
      })
    }

    // Right side: D, E, F
    for (const col of ["D", "E", "F"]) {
      const seatId = `${aircraftId}-${row}${col}`
      const isExit = row === 10 || row === 20
      const isWindow = col === "F"
      const isMiddle = col === "E"
      const isAisle = col === "D"

      let priceModifier = 0
      if (isWindow) priceModifier = 25
      else if (isAisle) priceModifier = 20
      else priceModifier = 15

      if (isExit) priceModifier += 30

      seats.push({
        id: seatId,
        aircraft_id: aircraftId,
        seat_number: `${row}${col}`,
        row_number: row,
        seat_letter: col,
        seat_type: isWindow ? "window" : isAisle ? "aisle" : "middle",
        is_exit_row: isExit,
        price_modifier: priceModifier,
        created_at: "2023-01-01T00:00:00Z",
      })
    }
  }

  return seats
}
