"use server"

import { createServerSupabaseClient } from "@/lib/supabase"

export async function initializeDatabase() {
  const supabase = createServerSupabaseClient()

  try {
    // Insert destinations with specific UUIDs for consistency
    const destinationsData = [
      {
        id: "550e8400-e29b-41d4-a716-446655440001",
        code: "SGN",
        name: "Ho Chi Minh City",
        city: "Ho Chi Minh City",
        country: "Vietnam",
        airport_code: "SGN",
        image_url:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ho%20Chi%20Minh.png-KqGC6M8cteHUG8KZR7shY8cjRtDRAy.jpeg",
        description: "Vibrant Vietnamese city with rich culture and delicious cuisine",
        popular: true,
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440002",
        code: "CTS",
        name: "Hokkaido",
        city: "Sapporo",
        country: "Japan",
        airport_code: "CTS",
        image_url:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hokkaido.png-E9pEEI75VP4ztrtOlmwywu2YPxFkbu.jpeg",
        description: "Beautiful Japanese island with stunning natural landscapes",
        popular: true,
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440003",
        code: "PER",
        name: "Perth",
        city: "Perth",
        country: "Australia",
        airport_code: "PER",
        image_url:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Perth.png-VrSvNlqBnuIdkTkdXJ0ciAD0BgFVyu.jpeg",
        description: "Western Australian gem with beautiful parks and modern architecture",
        popular: true,
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440004",
        code: "SAN",
        name: "California",
        city: "San Diego",
        country: "United States",
        airport_code: "SAN",
        image_url:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/California-fiQCWL8P17X6yNuMnm4ht2xJaLtcSF.png",
        description: "Sunny California coast with perfect weather year-round",
        popular: true,
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440005",
        code: "DPS",
        name: "Bali",
        city: "Denpasar",
        country: "Indonesia",
        airport_code: "DPS",
        image_url:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bali.png-LixO5flVXiVFPFhqZM2Xo0KrKFviBS.jpeg",
        description: "Tropical paradise with ancient temples and pristine beaches",
        popular: true,
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440006",
        code: "YYZ",
        name: "Toronto",
        city: "Toronto",
        country: "Canada",
        airport_code: "YYZ",
        image_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Toronto-GPX7NwolidRoWxv0If6JS1UKr7JfOn.png",
        description: "Canadian cultural hub with iconic CN Tower and diverse neighborhoods",
        popular: true,
      },
      // Add some additional destinations for variety
      {
        id: "550e8400-e29b-41d4-a716-446655440007",
        code: "NYC",
        name: "New York",
        city: "New York",
        country: "United States",
        airport_code: "JFK",
        image_url: "/images/airplane-hero.jpg",
        description: "The city that never sleeps",
        popular: false,
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440008",
        code: "LON",
        name: "London",
        city: "London",
        country: "United Kingdom",
        airport_code: "LHR",
        image_url: "/images/airplane-hero.jpg",
        description: "Historic capital city",
        popular: false,
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440009",
        code: "LAX",
        name: "Los Angeles",
        city: "Los Angeles",
        country: "United States",
        airport_code: "LAX",
        image_url: "/images/airplane-hero.jpg",
        description: "City of Angels",
        popular: false,
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440010",
        code: "PAR",
        name: "Paris",
        city: "Paris",
        country: "France",
        airport_code: "CDG",
        image_url: "/images/airplane-hero.jpg",
        description: "City of Light",
        popular: false,
      },
    ]

    const { error: destinationsError } = await supabase.from("destinations").upsert(destinationsData, {
      onConflict: "id",
    })

    if (destinationsError) {
      throw new Error(`Error inserting destinations: ${destinationsError.message}`)
    }

    // Insert aircraft
    const aircraftData = [
      {
        id: "550e8400-e29b-41d4-a716-446655440101",
        model: "Boeing 787-9",
        manufacturer: "Boeing",
        capacity: 256,
        seat_configuration: "3-3",
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440102",
        model: "Airbus A350",
        manufacturer: "Airbus",
        capacity: 325,
        seat_configuration: "3-3",
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440103",
        model: "Boeing 737 MAX",
        manufacturer: "Boeing",
        capacity: 180,
        seat_configuration: "3-3",
      },
    ]

    const { error: aircraftError } = await supabase.from("aircraft").upsert(aircraftData, {
      onConflict: "id",
    })

    if (aircraftError) {
      throw new Error(`Error inserting aircraft: ${aircraftError.message}`)
    }

    // Generate and insert seats for the first aircraft
    const aircraftId = "550e8400-e29b-41d4-a716-446655440101"
    const seats = []
    const rows = 30

    for (let row = 1; row <= rows; row++) {
      // Left side: A, B, C
      for (const col of ["A", "B", "C"]) {
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
          aircraft_id: aircraftId,
          seat_number: `${row}${col}`,
          row_number: row,
          seat_letter: col,
          seat_type: isWindow ? "window" : isAisle ? "aisle" : "middle",
          is_exit_row: isExit,
          price_modifier: priceModifier,
        })
      }

      // Right side: D, E, F
      for (const col of ["D", "E", "F"]) {
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
          aircraft_id: aircraftId,
          seat_number: `${row}${col}`,
          row_number: row,
          seat_letter: col,
          seat_type: isWindow ? "window" : isAisle ? "aisle" : "middle",
          is_exit_row: isExit,
          price_modifier: priceModifier,
        })
      }
    }

    // Insert seats in batches
    const batchSize = 100
    for (let i = 0; i < seats.length; i += batchSize) {
      const batch = seats.slice(i, i + batchSize)
      const { error: seatsError } = await supabase.from("seats").upsert(batch, {
        onConflict: "aircraft_id,seat_number",
      })

      if (seatsError) {
        throw new Error(`Error inserting seats batch ${i / batchSize + 1}: ${seatsError.message}`)
      }
    }

    // Insert comprehensive sample flights covering multiple routes and dates
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    const dayAfter = new Date(today)
    dayAfter.setDate(today.getDate() + 2)

    const formatDate = (date: Date) => date.toISOString().split("T")[0]

    const flightsData = [
      // NYC to popular destinations
      {
        id: "550e8400-e29b-41d4-a716-446655440201",
        flight_number: "DF1001",
        airline: "AirDreamFly",
        aircraft_id: aircraftId,
        departure_destination_id: "550e8400-e29b-41d4-a716-446655440007", // NYC
        arrival_destination_id: "550e8400-e29b-41d4-a716-446655440001", // SGN
        departure_time: "08:30:00",
        arrival_time: "07:45:00",
        departure_date: formatDate(tomorrow),
        arrival_date: formatDate(dayAfter),
        duration: "15h 15m",
        stops: 0,
        base_price: 899.0,
        cabin_class: "Economy",
        seats_available: 15,
        total_seats: 256,
        amenities: ["wifi", "power", "entertainment"],
        status: "scheduled",
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440202",
        flight_number: "DF1002",
        airline: "AirDreamFly",
        aircraft_id: aircraftId,
        departure_destination_id: "550e8400-e29b-41d4-a716-446655440007", // NYC
        arrival_destination_id: "550e8400-e29b-41d4-a716-446655440002", // CTS (Hokkaido)
        departure_time: "14:20:00",
        arrival_time: "18:35:00",
        departure_date: formatDate(tomorrow),
        arrival_date: formatDate(dayAfter),
        duration: "13h 15m",
        stops: 0,
        base_price: 1299.0,
        cabin_class: "Economy",
        seats_available: 8,
        total_seats: 256,
        amenities: ["wifi", "power", "entertainment"],
        status: "scheduled",
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440203",
        flight_number: "DF1003",
        airline: "AirDreamFly",
        aircraft_id: aircraftId,
        departure_destination_id: "550e8400-e29b-41d4-a716-446655440007", // NYC
        arrival_destination_id: "550e8400-e29b-41d4-a716-446655440003", // PER (Perth)
        departure_time: "22:15:00",
        arrival_time: "06:30:00",
        departure_date: formatDate(tomorrow),
        arrival_date: formatDate(dayAfter),
        duration: "19h 15m",
        stops: 1,
        base_price: 1599.0,
        cabin_class: "Economy",
        seats_available: 12,
        total_seats: 256,
        amenities: ["wifi", "power", "entertainment"],
        status: "scheduled",
      },
      // SGN to other destinations
      {
        id: "550e8400-e29b-41d4-a716-446655440204",
        flight_number: "DF2001",
        airline: "AirDreamFly",
        aircraft_id: aircraftId,
        departure_destination_id: "550e8400-e29b-41d4-a716-446655440001", // SGN
        arrival_destination_id: "550e8400-e29b-41d4-a716-446655440005", // DPS (Bali)
        departure_time: "09:45:00",
        arrival_time: "12:30:00",
        departure_date: formatDate(tomorrow),
        arrival_date: formatDate(tomorrow),
        duration: "2h 45m",
        stops: 0,
        base_price: 299.0,
        cabin_class: "Economy",
        seats_available: 25,
        total_seats: 256,
        amenities: ["wifi", "power", "entertainment"],
        status: "scheduled",
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440205",
        flight_number: "DF2002",
        airline: "AirDreamFly",
        aircraft_id: aircraftId,
        departure_destination_id: "550e8400-e29b-41d4-a716-446655440001", // SGN
        arrival_destination_id: "550e8400-e29b-41d4-a716-446655440006", // YYZ (Toronto)
        departure_time: "16:20:00",
        arrival_time: "19:45:00",
        departure_date: formatDate(tomorrow),
        arrival_date: formatDate(dayAfter),
        duration: "18h 25m",
        stops: 1,
        base_price: 1199.0,
        cabin_class: "Economy",
        seats_available: 18,
        total_seats: 256,
        amenities: ["wifi", "power", "entertainment"],
        status: "scheduled",
      },
      // California routes
      {
        id: "550e8400-e29b-41d4-a716-446655440206",
        flight_number: "DF3001",
        airline: "AirDreamFly",
        aircraft_id: aircraftId,
        departure_destination_id: "550e8400-e29b-41d4-a716-446655440004", // SAN (California)
        arrival_destination_id: "550e8400-e29b-41d4-a716-446655440002", // CTS (Hokkaido)
        departure_time: "11:30:00",
        arrival_time: "16:45:00",
        departure_date: formatDate(tomorrow),
        arrival_date: formatDate(dayAfter),
        duration: "11h 15m",
        stops: 0,
        base_price: 999.0,
        cabin_class: "Economy",
        seats_available: 22,
        total_seats: 256,
        amenities: ["wifi", "power", "entertainment"],
        status: "scheduled",
      },
      // Bali routes
      {
        id: "550e8400-e29b-41d4-a716-446655440207",
        flight_number: "DF4001",
        airline: "AirDreamFly",
        aircraft_id: aircraftId,
        departure_destination_id: "550e8400-e29b-41d4-a716-446655440005", // DPS (Bali)
        arrival_destination_id: "550e8400-e29b-41d4-a716-446655440003", // PER (Perth)
        departure_time: "13:15:00",
        arrival_time: "16:30:00",
        departure_date: formatDate(tomorrow),
        arrival_date: formatDate(tomorrow),
        duration: "3h 15m",
        stops: 0,
        base_price: 399.0,
        cabin_class: "Economy",
        seats_available: 30,
        total_seats: 256,
        amenities: ["wifi", "power", "entertainment"],
        status: "scheduled",
      },
      // Toronto routes
      {
        id: "550e8400-e29b-41d4-a716-446655440208",
        flight_number: "DF5001",
        airline: "AirDreamFly",
        aircraft_id: aircraftId,
        departure_destination_id: "550e8400-e29b-41d4-a716-446655440006", // YYZ (Toronto)
        arrival_destination_id: "550e8400-e29b-41d4-a716-446655440004", // SAN (California)
        departure_time: "07:45:00",
        arrival_time: "10:30:00",
        departure_date: formatDate(tomorrow),
        arrival_date: formatDate(tomorrow),
        duration: "5h 45m",
        stops: 0,
        base_price: 599.0,
        cabin_class: "Economy",
        seats_available: 16,
        total_seats: 256,
        amenities: ["wifi", "power", "entertainment"],
        status: "scheduled",
      },
      // Return flights for popular routes
      {
        id: "550e8400-e29b-41d4-a716-446655440209",
        flight_number: "DF1101",
        airline: "AirDreamFly",
        aircraft_id: aircraftId,
        departure_destination_id: "550e8400-e29b-41d4-a716-446655440001", // SGN
        arrival_destination_id: "550e8400-e29b-41d4-a716-446655440007", // NYC
        departure_time: "23:30:00",
        arrival_time: "06:45:00",
        departure_date: formatDate(dayAfter),
        arrival_date: formatDate(dayAfter),
        duration: "16h 15m",
        stops: 0,
        base_price: 949.0,
        cabin_class: "Economy",
        seats_available: 20,
        total_seats: 256,
        amenities: ["wifi", "power", "entertainment"],
        status: "scheduled",
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440210",
        flight_number: "DF1102",
        airline: "AirDreamFly",
        aircraft_id: aircraftId,
        departure_destination_id: "550e8400-e29b-41d4-a716-446655440002", // CTS (Hokkaido)
        arrival_destination_id: "550e8400-e29b-41d4-a716-446655440007", // NYC
        departure_time: "20:20:00",
        arrival_time: "18:35:00",
        departure_date: formatDate(dayAfter),
        arrival_date: formatDate(dayAfter),
        duration: "12h 15m",
        stops: 0,
        base_price: 1349.0,
        cabin_class: "Economy",
        seats_available: 14,
        total_seats: 256,
        amenities: ["wifi", "power", "entertainment"],
        status: "scheduled",
      },
    ]

    const { error: flightsError } = await supabase.from("flights").upsert(flightsData, {
      onConflict: "id",
    })

    if (flightsError) {
      throw new Error(`Error inserting flights: ${flightsError.message}`)
    }

    // Insert in-flight services
    const servicesData = [
      {
        id: "550e8400-e29b-41d4-a716-446655440301",
        type: "meal",
        name: "Asian Fusion Salmon",
        description: "Pan-seared salmon with teriyaki glaze, jasmine rice, and steamed bok choy.",
        price: 18.99,
        dietary_info: ["protein-rich", "gluten-free"],
        image_url: "/placeholder.svg?height=100&width=150",
        available: true,
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440302",
        type: "meal",
        name: "Mediterranean Quinoa Bowl",
        description: "Quinoa salad with roasted vegetables, feta cheese, olives, and lemon herb dressing.",
        price: 15.99,
        dietary_info: ["vegetarian", "gluten-free"],
        image_url: "/placeholder.svg?height=100&width=150",
        available: true,
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440303",
        type: "meal",
        name: "Classic Beef Tenderloin",
        description: "Tender beef with roasted potatoes, seasonal vegetables, and red wine jus.",
        price: 22.99,
        dietary_info: ["protein-rich"],
        image_url: "/placeholder.svg?height=100&width=150",
        available: true,
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440304",
        type: "meal",
        name: "Thai Green Curry",
        description: "Aromatic green curry with coconut milk, vegetables, and fragrant jasmine rice.",
        price: 16.99,
        dietary_info: ["vegan", "spicy"],
        image_url: "/placeholder.svg?height=100&width=150",
        available: true,
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440305",
        type: "beverage",
        name: "Coca-Cola",
        description: "Classic refreshing cola drink.",
        price: 3.99,
        dietary_info: [],
        image_url: "/placeholder.svg?height=100&width=100",
        available: true,
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440306",
        type: "beverage",
        name: "7UP",
        description: "Crisp lemon-lime soda.",
        price: 3.99,
        dietary_info: [],
        image_url: "/placeholder.svg?height=100&width=100",
        available: true,
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440307",
        type: "beverage",
        name: "Orange Juice",
        description: "Fresh squeezed orange juice.",
        price: 4.99,
        dietary_info: [],
        image_url: "/placeholder.svg?height=100&width=100",
        available: true,
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440308",
        type: "beverage",
        name: "Premium Coffee",
        description: "Freshly brewed specialty coffee.",
        price: 4.99,
        dietary_info: [],
        image_url: "/placeholder.svg?height=100&width=100",
        available: true,
      },
    ]

    const { error: servicesError } = await supabase.from("inflight_services").upsert(servicesData, {
      onConflict: "id",
    })

    if (servicesError) {
      throw new Error(`Error inserting in-flight services: ${servicesError.message}`)
    }

    return {
      success: true,
      message:
        "Database initialized successfully with comprehensive sample data including flights for tomorrow and the day after",
    }
  } catch (error) {
    console.error("Error initializing database:", error)
    return { success: false, error: error.message }
  }
}
