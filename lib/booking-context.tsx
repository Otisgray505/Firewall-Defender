"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"
import type { Flight, Destination, Seat, InFlightService, GuestProfile } from "./database-schema"

interface BookingState {
  selectedFlight: Flight | null
  departureDestination: Destination | null
  arrivalDestination: Destination | null
  selectedSeat: Seat | null
  selectedMeals: InFlightService[]
  selectedBeverages: InFlightService[]
  passengerDetails: GuestProfile | null
  totalAmount: number
}

type BookingAction =
  | { type: "SET_FLIGHT"; payload: Flight }
  | { type: "SET_DEPARTURE_DESTINATION"; payload: Destination }
  | { type: "SET_ARRIVAL_DESTINATION"; payload: Destination }
  | { type: "SET_SEAT"; payload: Seat }
  | { type: "ADD_MEAL"; payload: InFlightService }
  | { type: "REMOVE_MEAL"; payload: string }
  | { type: "ADD_BEVERAGE"; payload: InFlightService }
  | { type: "REMOVE_BEVERAGE"; payload: string }
  | { type: "SET_PASSENGER_DETAILS"; payload: GuestProfile }
  | { type: "CALCULATE_TOTAL" }
  | { type: "RESET_BOOKING" }

const initialState: BookingState = {
  selectedFlight: null,
  departureDestination: null,
  arrivalDestination: null,
  selectedSeat: null,
  selectedMeals: [],
  selectedBeverages: [],
  passengerDetails: null,
  totalAmount: 0,
}

function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case "SET_FLIGHT":
      return { ...state, selectedFlight: action.payload }
    case "SET_DEPARTURE_DESTINATION":
      return { ...state, departureDestination: action.payload }
    case "SET_ARRIVAL_DESTINATION":
      return { ...state, arrivalDestination: action.payload }
    case "SET_SEAT":
      return { ...state, selectedSeat: action.payload }
    case "ADD_MEAL":
      return {
        ...state,
        selectedMeals: [...state.selectedMeals, action.payload],
      }
    case "REMOVE_MEAL":
      return {
        ...state,
        selectedMeals: state.selectedMeals.filter((meal) => meal.id !== action.payload),
      }
    case "ADD_BEVERAGE":
      return {
        ...state,
        selectedBeverages: [...state.selectedBeverages, action.payload],
      }
    case "REMOVE_BEVERAGE":
      return {
        ...state,
        selectedBeverages: state.selectedBeverages.filter((bev) => bev.id !== action.payload),
      }
    case "SET_PASSENGER_DETAILS":
      return { ...state, passengerDetails: action.payload }
    case "CALCULATE_TOTAL":
      let total = state.selectedFlight?.base_price || 0
      if (state.selectedSeat) {
        total += state.selectedSeat.price_modifier
      }
      total += state.selectedMeals.reduce((sum, meal) => sum + meal.price, 0)
      total += state.selectedBeverages.reduce((sum, bev) => sum + bev.price, 0)
      return { ...state, totalAmount: total }
    case "RESET_BOOKING":
      return initialState
    default:
      return state
  }
}

const BookingContext = createContext<{
  state: BookingState
  dispatch: React.Dispatch<BookingAction>
} | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState)

  return <BookingContext.Provider value={{ state, dispatch }}>{children}</BookingContext.Provider>
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider")
  }
  return context
}
