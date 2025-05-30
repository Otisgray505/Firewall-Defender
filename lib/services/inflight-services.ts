import { supabase, createServerSupabaseClient } from "../supabase"
import type { InFlightService } from "../database-schema"

export async function getInflightServices() {
  const { data, error } = await supabase.from("inflight_services").select("*").order("type").order("name")

  if (error) {
    console.error("Error fetching in-flight services:", error)
    return []
  }

  return data as InFlightService[]
}

export async function getInflightServicesByType(type: "meal" | "beverage" | "entertainment") {
  const { data, error } = await supabase
    .from("inflight_services")
    .select("*")
    .eq("type", type)
    .eq("available", true)
    .order("name")

  if (error) {
    console.error(`Error fetching in-flight services of type ${type}:`, error)
    return []
  }

  return data as InFlightService[]
}

export async function getInflightServiceById(id: string) {
  const { data, error } = await supabase.from("inflight_services").select("*").eq("id", id).single()

  if (error) {
    console.error(`Error fetching in-flight service with id ${id}:`, error)
    return null
  }

  return data as InFlightService
}

// Admin functions (server-side only)
export async function createInflightService(service: Omit<InFlightService, "id" | "created_at">) {
  const supabaseAdmin = createServerSupabaseClient()

  const { data, error } = await supabaseAdmin.from("inflight_services").insert([service]).select()

  if (error) {
    console.error("Error creating in-flight service:", error)
    return null
  }

  return data[0] as InFlightService
}

export async function updateInflightService(id: string, updates: Partial<InFlightService>) {
  const supabaseAdmin = createServerSupabaseClient()

  const { data, error } = await supabaseAdmin.from("inflight_services").update(updates).eq("id", id).select()

  if (error) {
    console.error(`Error updating in-flight service with id ${id}:`, error)
    return null
  }

  return data[0] as InFlightService
}

export async function deleteInflightService(id: string) {
  const supabaseAdmin = createServerSupabaseClient()

  const { error } = await supabaseAdmin.from("inflight_services").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting in-flight service with id ${id}:`, error)
    return false
  }

  return true
}
