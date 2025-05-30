import { supabase, createServerSupabaseClient } from "../supabase"
import type { Destination } from "../database-schema"

export async function getDestinations() {
  const { data, error } = await supabase.from("destinations").select("*").order("name")

  if (error) {
    console.error("Error fetching destinations:", error)
    return []
  }

  return data as Destination[]
}

export async function getPopularDestinations() {
  const { data, error } = await supabase.from("destinations").select("*").eq("popular", true).order("name")

  if (error) {
    console.error("Error fetching popular destinations:", error)
    return []
  }

  return data as Destination[]
}

export async function getDestinationByCode(code: string) {
  const { data, error } = await supabase.from("destinations").select("*").eq("code", code).single()

  if (error) {
    console.error(`Error fetching destination with code ${code}:`, error)
    return null
  }

  return data as Destination
}

export async function getDestinationById(id: string) {
  const { data, error } = await supabase.from("destinations").select("*").eq("id", id).single()

  if (error) {
    console.error(`Error fetching destination with id ${id}:`, error)
    return null
  }

  return data as Destination
}

// Admin functions (server-side only)
export async function createDestination(destination: Omit<Destination, "id" | "created_at">) {
  const supabaseAdmin = createServerSupabaseClient()

  const { data, error } = await supabaseAdmin.from("destinations").insert([destination]).select()

  if (error) {
    console.error("Error creating destination:", error)
    return null
  }

  return data[0] as Destination
}

export async function updateDestination(id: string, updates: Partial<Destination>) {
  const supabaseAdmin = createServerSupabaseClient()

  const { data, error } = await supabaseAdmin.from("destinations").update(updates).eq("id", id).select()

  if (error) {
    console.error(`Error updating destination with id ${id}:`, error)
    return null
  }

  return data[0] as Destination
}

export async function deleteDestination(id: string) {
  const supabaseAdmin = createServerSupabaseClient()

  const { error } = await supabaseAdmin.from("destinations").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting destination with id ${id}:`, error)
    return false
  }

  return true
}
