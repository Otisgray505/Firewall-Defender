"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Clock, Filter, Plane, Users, Wifi, Zap, Monitor, ChevronLeft } from "lucide-react"
import { useBooking } from "@/lib/booking-context"
import { supabase } from "@/lib/supabase"
import type { Flight, Destination } from "@/lib/database-schema"

// Fallback flight data for when database is empty
const fallbackFlights = [
  {
    id: "fl-001",
    flight_number: "DF1001",
    airline: "AirDreamFly",
    aircraft_id: "aircraft-1",
    departure_destination_id: "dest-7", // NYC
    arrival_destination_id: "dest-1", // SGN
    departure_time: "08:30",
    arrival_time: "07:45",
    departure_date: "2024-12-02",
    arrival_date: "2024-12-03",
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
    id: "fl-002",
    flight_number: "DF1002",
    airline: "AirDreamFly",
    aircraft_id: "aircraft-1",
    departure_destination_id: "dest-7", // NYC
    arrival_destination_id: "dest-2", // CTS
    departure_time: "14:20",
    arrival_time: "18:35",
    departure_date: "2024-12-02",
    arrival_date: "2024-12-03",
    duration: "13h 15m",
    stops: 0,
    base_price: 1299,
    cabin_class: "Economy",
    seats_available: 8,
    total_seats: 256,
    amenities: ["wifi", "power", "entertainment"],
    status: "scheduled",
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "fl-003",
    flight_number: "DF2001",
    airline: "AirDreamFly",
    aircraft_id: "aircraft-1",
    departure_destination_id: "dest-1", // SGN
    arrival_destination_id: "dest-5", // DPS
    departure_time: "09:45",
    arrival_time: "12:30",
    departure_date: "2024-12-02",
    arrival_date: "2024-12-02",
    duration: "2h 45m",
    stops: 0,
    base_price: 299,
    cabin_class: "Economy",
    seats_available: 25,
    total_seats: 256,
    amenities: ["wifi", "power", "entertainment"],
    status: "scheduled",
    created_at: "2023-01-01T00:00:00Z",
  },
]

const fallbackDestinations = [
  { id: "dest-1", code: "SGN", name: "Ho Chi Minh City", airport_code: "SGN" },
  { id: "dest-2", code: "CTS", name: "Hokkaido", airport_code: "CTS" },
  { id: "dest-3", code: "PER", name: "Perth", airport_code: "PER" },
  { id: "dest-4", code: "SAN", name: "California", airport_code: "SAN" },
  { id: "dest-5", code: "DPS", name: "Bali", airport_code: "DPS" },
  { id: "dest-6", code: "YYZ", name: "Toronto", airport_code: "YYZ" },
  { id: "dest-7", code: "NYC", name: "New York", airport_code: "JFK" },
  { id: "dest-8", code: "LON", name: "London", airport_code: "LHR" },
]

export default function FlightSearchResults() {
  const [sortBy, setSortBy] = useState("price")
  const [flights, setFlights] = useState<Flight[]>([])
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([])
  const [priceRange, setPriceRange] = useState([200, 2000])
  const [showFilters, setShowFilters] = useState(false)
  const [selectedStops, setSelectedStops] = useState<number[]>([])
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [usingFallbackData, setUsingFallbackData] = useState(false)

  const searchParams = useSearchParams()
  const { state, dispatch } = useBooking()

  // Get search parameters
  const fromCode = searchParams.get("from")
  const toCode = searchParams.get("to")
  const departureDate = searchParams.get("departureDate")
  const passengers = searchParams.get("passengers") || "1"
  const cabinClass = searchParams.get("class") || "economy"

  // Fetch data from Supabase
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)

      try {
        // Fetch destinations
        const { data: destinationsData, error: destinationsError } = await supabase.from("destinations").select("*")

        if (destinationsError) throw destinationsError

        const dbDestinations = destinationsData as Destination[]
        setDestinations(dbDestinations.length > 0 ? dbDestinations : fallbackDestinations)

        // Fetch flights
        let query = supabase.from("flights").select("*")

        // Apply filters from search params if we have destinations
        const fromDest = (dbDestinations.length > 0 ? dbDestinations : fallbackDestinations).find(
          (d) => d.code === fromCode,
        )
        const toDest = (dbDestinations.length > 0 ? dbDestinations : fallbackDestinations).find(
          (d) => d.code === toCode,
        )

        if (fromDest && toDest) {
          query = query.eq("departure_destination_id", fromDest.id).eq("arrival_destination_id", toDest.id)

          if (departureDate) {
            query = query.eq("departure_date", departureDate)
          }

          if (cabinClass) {
            query = query.eq("cabin_class", cabinClass.charAt(0).toUpperCase() + cabinClass.slice(1))
          }
        }

        const { data: flightsData, error: flightsError } = await query.order("departure_time")

        if (flightsError) throw flightsError

        const dbFlights = flightsData as Flight[]

        // If no flights found in database, use fallback data
        if (dbFlights.length === 0) {
          console.log("No flights found in database, using fallback data")
          setFlights(fallbackFlights)
          setFilteredFlights(fallbackFlights)
          setUsingFallbackData(true)
        } else {
          setFlights(dbFlights)
          setFilteredFlights(dbFlights)
          setUsingFallbackData(false)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        // If there's an error, use fallback data
        console.log("Database error, using fallback data")
        setFlights(fallbackFlights)
        setFilteredFlights(fallbackFlights)
        setDestinations(fallbackDestinations)
        setUsingFallbackData(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [fromCode, toCode, departureDate, cabinClass])

  // Filter flights based on criteria
  useEffect(() => {
    const filtered = flights.filter((flight) => {
      // Price filter
      if (flight.base_price < priceRange[0] || flight.base_price > priceRange[1]) {
        return false
      }

      // Stops filter
      if (selectedStops.length > 0 && !selectedStops.includes(flight.stops)) {
        return false
      }

      // Time slot filter
      if (selectedTimeSlots.length > 0) {
        const hour = Number.parseInt(flight.departure_time.split(":")[0])
        let timeSlot = ""
        if (hour >= 6 && hour < 12) timeSlot = "morning"
        else if (hour >= 12 && hour < 18) timeSlot = "afternoon"
        else if (hour >= 18 && hour < 24) timeSlot = "evening"
        else timeSlot = "night"

        if (!selectedTimeSlots.includes(timeSlot)) {
          return false
        }
      }

      return true
    })

    // Sort flights
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price":
          return a.base_price - b.base_price
        case "duration":
          return Number.parseInt(a.duration.split("h")[0]) - Number.parseInt(b.duration.split("h")[0])
        case "departure":
          return a.departure_time.localeCompare(b.departure_time)
        default:
          return 0
      }
    })

    setFilteredFlights(sorted)
  }, [flights, priceRange, selectedStops, selectedTimeSlots, sortBy])

  const getDestinationInfo = (destinationId: string) => {
    return destinations.find((d) => d.id === destinationId) || { name: "Unknown", airport_code: "XXX" }
  }

  const handleFlightSelect = (flight: Flight) => {
    dispatch({ type: "SET_FLIGHT", payload: flight })
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "wifi":
        return <Wifi className="h-4 w-4" />
      case "power":
        return <Zap className="h-4 w-4" />
      case "entertainment":
        return <Monitor className="h-4 w-4" />
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="container px-4 md:px-6 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primaryBlue mx-auto mb-4"></div>
              <p className="text-muted-foreground">Searching for flights...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="bg-subtlePurple/30 py-6 border-b">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-accentPurple">Flight Search Results</h1>
              <p className="text-muted-foreground">
                {fromCode && toCode ? `${fromCode} to ${toCode}` : "All available flights"}
                {departureDate && ` | ${departureDate}`}
                {usingFallbackData && " | Sample Data"}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="border-primaryBlue text-primaryBlue hover:bg-primaryBlue hover:text-white"
            >
              <Link href="/booking">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Modify Search
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Database Notice */}
      {usingFallbackData && (
        <section className="py-3 bg-yellow-50 border-b">
          <div className="container px-4 md:px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                <p className="text-sm text-yellow-800">
                  Showing sample flight data. Visit the{" "}
                  <Link href="/admin" className="underline font-medium">
                    admin panel
                  </Link>{" "}
                  to initialize the database with real data.
                </p>
              </div>
              <Button size="sm" variant="outline" asChild className="border-yellow-500 text-yellow-700">
                <Link href="/admin">Initialize Database</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      <div className="container px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          {/* Filters Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-accentPurple">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Price Range */}
                <div>
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={2000}
                    min={200}
                    step={50}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                <Separator />

                {/* Stops */}
                <div>
                  <h3 className="font-medium mb-3">Stops</h3>
                  <div className="space-y-2">
                    {[
                      { value: 0, label: "Nonstop" },
                      { value: 1, label: "1 Stop" },
                      { value: 2, label: "2+ Stops" },
                    ].map((stop) => (
                      <div key={stop.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`stop-${stop.value}`}
                          checked={selectedStops.includes(stop.value)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedStops([...selectedStops, stop.value])
                            } else {
                              setSelectedStops(selectedStops.filter((s) => s !== stop.value))
                            }
                          }}
                        />
                        <label htmlFor={`stop-${stop.value}`} className="text-sm">
                          {stop.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Departure Time */}
                <div>
                  <h3 className="font-medium mb-3">Departure Time</h3>
                  <div className="space-y-2">
                    {[
                      { value: "morning", label: "Morning (6AM - 12PM)" },
                      { value: "afternoon", label: "Afternoon (12PM - 6PM)" },
                      { value: "evening", label: "Evening (6PM - 12AM)" },
                      { value: "night", label: "Night (12AM - 6AM)" },
                    ].map((time) => (
                      <div key={time.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`time-${time.value}`}
                          checked={selectedTimeSlots.includes(time.value)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedTimeSlots([...selectedTimeSlots, time.value])
                            } else {
                              setSelectedTimeSlots(selectedTimeSlots.filter((t) => t !== time.value))
                            }
                          }}
                        />
                        <label htmlFor={`time-${time.value}`} className="text-sm">
                          {time.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Flight Results */}
          <div className="space-y-6">
            {/* Sort and Results Count */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <p className="text-muted-foreground">
                {filteredFlights.length} flight{filteredFlights.length !== 1 ? "s" : ""} found
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="duration">Duration</SelectItem>
                    <SelectItem value="departure">Departure Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Flight Cards */}
            <div className="space-y-4">
              {filteredFlights.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Plane className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No flights found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your filters or search criteria to find more flights.
                    </p>
                    <Button asChild>
                      <Link href="/booking">Modify Search</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                filteredFlights.map((flight) => {
                  const departureInfo = getDestinationInfo(flight.departure_destination_id)
                  const arrivalInfo = getDestinationInfo(flight.arrival_destination_id)

                  return (
                    <Card key={flight.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-center">
                          <div className="space-y-4">
                            {/* Flight Info Header */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-subtlePurple flex items-center justify-center">
                                  <Plane className="h-5 w-5 text-primaryBlue" />
                                </div>
                                <div>
                                  <p className="font-medium">{flight.airline}</p>
                                  <p className="text-sm text-muted-foreground">{flight.flight_number}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {flight.amenities?.map((amenity) => (
                                  <div key={amenity} className="text-muted-foreground">
                                    {getAmenityIcon(amenity)}
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Flight Route */}
                            <div className="grid grid-cols-[auto_1fr_auto] gap-4 items-center">
                              <div className="text-center">
                                <p className="text-2xl font-bold text-primaryBlue">{flight.departure_time}</p>
                                <p className="text-sm font-medium">{departureInfo.name}</p>
                                <p className="text-xs text-muted-foreground">{departureInfo.airport_code}</p>
                              </div>

                              <div className="flex flex-col items-center px-4">
                                <p className="text-xs text-muted-foreground mb-1">{flight.duration}</p>
                                <div className="relative w-full h-px bg-border">
                                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primaryBlue"></div>
                                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primaryBlue"></div>
                                  <ArrowRight className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-primaryBlue" />
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {flight.stops === 0
                                    ? "Nonstop"
                                    : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`}
                                </p>
                              </div>

                              <div className="text-center">
                                <p className="text-2xl font-bold text-primaryBlue">{flight.arrival_time}</p>
                                <p className="text-sm font-medium">{arrivalInfo.name}</p>
                                <p className="text-xs text-muted-foreground">{arrivalInfo.airport_code}</p>
                              </div>
                            </div>

                            {/* Flight Details */}
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                <span>{flight.seats_available} seats left</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{flight.cabin_class}</span>
                              </div>
                              <Badge variant="outline" className="border-green-500 text-green-700">
                                {flight.status}
                              </Badge>
                            </div>
                          </div>

                          {/* Price and Book Button */}
                          <div className="text-center lg:text-right space-y-3">
                            <div>
                              <p className="text-sm text-muted-foreground">From</p>
                              <p className="text-3xl font-bold text-primaryBlue">${flight.base_price}</p>
                              <p className="text-xs text-muted-foreground">per person</p>
                            </div>
                            <Button
                              className="w-full lg:w-auto bg-primaryBlue hover:bg-secondaryBlue"
                              onClick={() => handleFlightSelect(flight)}
                              asChild
                            >
                              <Link href={`/booking/select-seat/${flight.id}`}>Select Flight</Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
