import { supabase, createServerSupabaseClient } from "../supabase"
import type { GuestProfile } from "../database-schema"

export async function getBookingByReference(reference: string, lastName: string) {
  // First get the booking
  const { data: booking, error: bookingError } = await supabase
    .from("bookings")
    .select("*")
    .eq("booking_reference", reference)
    .single()

  if (bookingError) {
    console.error(`Error fetching booking with reference ${reference}:`, bookingError)
    return null
  }

  // Then get the guest profile to verify last name
  const { data: guest, error: guestError } = await supabase
    .from("guest_profiles")
    .select("*")
    .eq("id", booking.guest_id)
    .single()

  if (guestError) {
    console.error(`Error fetching guest profile for booking ${reference}:`, guestError)
    return null
  }

  // Verify last name
  if (guest.last_name.toLowerCase() !== lastName.toLowerCase()) {
    console.error("Last name does not match booking reference")
    return null
  }

  // Get all related booking data
  const { data: passengers, error: passengersError } = await supabase
    .from("booking_passengers")
    .select("*, guest_profiles(*), seats(*)")
    .eq("booking_id", booking.id)

  if (passengersError) {
    console.error(`Error fetching passengers for booking ${reference}:`, passengersError)
    return null
  }

  const { data: services, error: servicesError } = await supabase
    .from("booking_services")
    .select("*, inflight_services(*)")
    .eq("booking_id", booking.id)

  if (servicesError) {
    console.error(`Error fetching services for booking ${reference}:`, servicesError)
    return null
  }

  const { data: payment, error: paymentError } = await supabase
    .from("payment_methods")
    .select("*")
    .eq("booking_id", booking.id)
    .single()

  if (paymentError) {
    console.error(`Error fetching payment for booking ${reference}:`, paymentError)
    return null
  }

  // Get flight details
  const { data: flight, error: flightError } = await supabase
    .from("flights")
    .select(
      "*, departure_destination:destinations!departure_destination_id(*), arrival_destination:destinations!arrival_destination_id(*)",
    )
    .eq("id", booking.flight_id)
    .single()

  if (flightError) {
    console.error(`Error fetching flight for booking ${reference}:`, flightError)
    return null
  }

  // Return complete booking data
  return {
    ...booking,
    guest,
    passengers,
    services,
    payment,
    flight,
  }
}

// Create a new booking (server-side only)
export async function createBooking(bookingData: {
  flight_id: string
  guest: Omit<GuestProfile, "id" | "created_at">
  passengers: Array<{
    seat_id?: string
    passenger_type: "adult" | "child" | "infant"
    guest_id?: string
  }>
  services: Array<{
    service_id: string
    quantity: number
    price: number
  }>
  payment: {
    payment_type: "credit_card" | "paypal" | "apple_pay"
    card_last_four?: string
    card_type?: string
    payment_amount: number
    transaction_id?: string
  }
}) {
  const supabaseAdmin = createServerSupabaseClient()

  // Generate a unique booking reference
  const bookingReference = generateBookingReference()

  // Start a transaction
  // Note: Supabase doesn't support true transactions, so we'll handle errors manually

  try {
    // 1. Create guest profile
    const { data: guestData, error: guestError } = await supabaseAdmin
      .from("guest_profiles")
      .insert([bookingData.guest])
      .select()

    if (guestError) throw new Error(`Error creating guest profile: ${guestError.message}`)

    const guestId = guestData[0].id

    // 2. Create booking
    const { data: bookingDataResult, error: bookingError } = await supabaseAdmin
      .from("bookings")
      .insert([
        {
          booking_reference: bookingReference,
          guest_id: guestId,
          flight_id: bookingData.flight_id,
          booking_status: "confirmed",
          total_amount: bookingData.payment.payment_amount,
          payment_status: "completed",
        },
      ])
      .select()

    if (bookingError) throw new Error(`Error creating booking: ${bookingError.message}`)

    const bookingId = bookingDataResult[0].id

    // 3. Create booking passengers
    const passengersToInsert = bookingData.passengers.map((passenger) => ({
      booking_id: bookingId,
      guest_id: passenger.guest_id || guestId, // Use main guest ID if no specific guest ID
      seat_id: passenger.seat_id,
      passenger_type: passenger.passenger_type,
    }))

    const { error: passengersError } = await supabaseAdmin.from("booking_passengers").insert(passengersToInsert)

    if (passengersError) throw new Error(`Error creating booking passengers: ${passengersError.message}`)

    // 4. Create booking services
    if (bookingData.services.length > 0) {
      const servicesToInsert = bookingData.services.map((service) => ({
        booking_id: bookingId,
        service_id: service.service_id,
        quantity: service.quantity,
        total_price: service.price * service.quantity,
      }))

      const { error: servicesError } = await supabaseAdmin.from("booking_services").insert(servicesToInsert)

      if (servicesError) throw new Error(`Error creating booking services: ${servicesError.message}`)
    }

    // 5. Create payment record
    const { error: paymentError } = await supabaseAdmin.from("payment_methods").insert([
      {
        booking_id: bookingId,
        payment_type: bookingData.payment.payment_type,
        card_last_four: bookingData.payment.card_last_four,
        card_type: bookingData.payment.card_type,
        payment_amount: bookingData.payment.payment_amount,
        payment_date: new Date().toISOString(),
        transaction_id: bookingData.payment.transaction_id,
        status: "completed",
      },
    ])

    if (paymentError) throw new Error(`Error creating payment record: ${paymentError.message}`)

    // Return the booking reference
    return { success: true, bookingReference }
  } catch (error) {
    console.error("Error creating booking:", error)
    return { success: false, error: error.message }
  }
}

// Helper function to generate a unique booking reference
function generateBookingReference() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let result = ""
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}
