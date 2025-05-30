import { supabase, createServerSupabaseClient } from "../supabase"
import type { Seat } from "../database-schema"

export async function getSeatsByAircraftId(aircraftId: string) {
  const { data, error } = await supabase
    .from("seats")
    .select("*")
    .eq("aircraft_id", aircraftId)
    .order("row_number")
    .order("seat_letter")

  if (error) {
    console.error(`Error fetching seats for aircraft ${aircraftId}:`, error)
    return []
  }

  return data as Seat[]
}

export async function getSeatById(id: string) {
  const { data, error } = await supabase.from("seats").select("*").eq("id", id).single()

  if (error) {
    console.error(`Error fetching seat with id ${id}:`, error)
    return null
  }

  return data as Seat
}

// Admin functions (server-side only)
export async function createSeat(seat: Omit<Seat, "id" | "created_at">) {
  const supabaseAdmin = createServerSupabaseClient()

  const { data, error } = await supabaseAdmin.from("seats").insert([seat]).select()

  if (error) {
    console.error("Error creating seat:", error)
    return null
  }

  return data[0] as Seat
}

export async function updateSeat(id: string, updates: Partial<Seat>) {
  const supabaseAdmin = createServerSupabaseClient()

  const { data, error } = await supabaseAdmin.from("seats").update(updates).eq("id", id).select()

  if (error) {
    console.error(`Error updating seat with id ${id}:`, error)
    return null
  }

  return data[0] as Seat
}

export async function deleteSeat(id: string) {
  const supabaseAdmin = createServerSupabaseClient()

  const { error } = await supabaseAdmin.from("seats").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting seat with id ${id}:`, error)
    return false
  }

  return true
}

// Bulk create seats for an aircraft
export async function createSeatsForAircraft(aircraftId: string, seatConfiguration: string) {
  const supabaseAdmin = createServerSupabaseClient()

  // Parse seat configuration (e.g., "3-3" for 3 seats on each side)
  const [leftSeats, rightSeats] = seatConfiguration.split("-").map(Number)

  const rows = 30 // Standard number of rows
  const seats: Omit<Seat, "id" | "created_at">[] = []

  // Generate seat letters based on configuration
  const leftSideLetters = Array.from({ length: leftSeats }, (_, i) => String.fromCharCode(65 + i)) // A, B, C, ...
  const rightSideLetters = Array.from({ length: rightSeats }, (_, i) => String.fromCharCode(65 + leftSeats + i)) // D, E, F, ...

  for (let row = 1; row <= rows; row++) {
    const isExitRow = row === 10 || row === 20

    // Left side seats
    leftSideLetters.forEach((letter, index) => {
      const isWindow = index === 0
      const isAisle = index === leftSeats - 1
      const isMiddle = !isWindow && !isAisle

      let priceModifier = 0
      if (isWindow) priceModifier = 25
      else if (isAisle) priceModifier = 20
      else priceModifier = 15

      if (isExitRow) priceModifier += 30

      seats.push({
        aircraft_id: aircraftId,
        seat_number: `${row}${letter}`,
        row_number: row,
        seat_letter: letter,
        seat_type: isWindow ? "window" : isAisle ? "aisle" : "middle",
        is_exit_row: isExitRow,
        price_modifier: priceModifier,
      })
    })

    // Right side seats
    rightSideLetters.forEach((letter, index) => {
      const isWindow = index === rightSeats - 1
      const isAisle = index === 0
      const isMiddle = !isWindow && !isAisle

      let priceModifier = 0
      if (isWindow) priceModifier = 25
      else if (isAisle) priceModifier = 20
      else priceModifier = 15

      if (isExitRow) priceModifier += 30

      seats.push({
        aircraft_id: aircraftId,
        seat_number: `${row}${letter}`,
        row_number: row,
        seat_letter: letter,
        seat_type: isWindow ? "window" : isAisle ? "aisle" : "middle",
        is_exit_row: isExitRow,
        price_modifier: priceModifier,
      })
    })
  }

  // Insert all seats in batches
  const batchSize = 100
  for (let i = 0; i < seats.length; i += batchSize) {
    const batch = seats.slice(i, i + batchSize)
    const { error } = await supabaseAdmin.from("seats").insert(batch)

    if (error) {
      console.error(`Error creating seats batch ${i / batchSize + 1}:`, error)
      return false
    }
  }

  return true
}
