import { supabase, createServerSupabaseClient } from "../supabase"
import type { Flight } from "../database-schema"

export async function getFlights() {
  const { data, error } = await supabase.from("flights").select("*").order("departure_time")

  if (error) {
    console.error("Error fetching flights:", error)
    return []
  }

  return data as Flight[]
}

export async function searchFlights(params: {
  departureDestinationId?: string
  arrivalDestinationId?: string
  departureDate?: string
  cabinClass?: string
}) {
  let query = supabase.from("flights").select("*")

  if (params.departureDestinationId) {
    query = query.eq("departure_destination_id", params.departureDestinationId)
  }

  if (params.arrivalDestinationId) {
    query = query.eq("arrival_destination_id", params.arrivalDestinationId)
  }

  if (params.departureDate) {
    query = query.eq("departure_date", params.departureDate)
  }

  if (params.cabinClass) {
    query = query.eq("cabin_class", params.cabinClass)
  }

  const { data, error } = await query.order("departure_time")

  if (error) {
    console.error("Error searching flights:", error)
    return []
  }

  return data as Flight[]
}

export async function getFlightById(id: string) {
  const { data, error } = await supabase.from("flights").select("*").eq("id", id).single()

  if (error) {
    console.error(`Error fetching flight with id ${id}:`, error)
    return null
  }

  return data as Flight
}

// Admin functions (server-side only)
export async function createFlight(flight: Omit<Flight, "id" | "created_at">) {
  const supabaseAdmin = createServerSupabaseClient()

  const { data, error } = await supabaseAdmin.from("flights").insert([flight]).select()

  if (error) {
    console.error("Error creating flight:", error)
    return null
  }

  return data[0] as Flight
}

export async function updateFlight(id: string, updates: Partial<Flight>) {
  const supabaseAdmin = createServerSupabaseClient()

  const { data, error } = await supabaseAdmin.from("flights").update(updates).eq("id", id).select()

  if (error) {
    console.error(`Error updating flight with id ${id}:`, error)
    return null
  }

  return data[0] as Flight
}

export async function deleteFlight(id: string) {
  const supabaseAdmin = createServerSupabaseClient()

  const { error } = await supabaseAdmin.from("flights").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting flight with id ${id}:`, error)
    return false
  }

  return true
}
