"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, PlaneTakeoff } from "lucide-react"
import Link from "next/link"
import { useBooking } from "@/lib/booking-context"
import { getDestinations } from "@/lib/services/destinations"
import type { Destination } from "@/lib/database-schema"

interface FlightSearchFormProps {
  isOneWay?: boolean
}

export default function FlightSearchForm({ isOneWay = false }: FlightSearchFormProps) {
  const [departureDate, setDepartureDate] = useState<Date>()
  const [returnDate, setReturnDate] = useState<Date>()
  const [fromDestination, setFromDestination] = useState<string>("")
  const [toDestination, setToDestination] = useState<string>("")
  const [destinations, setDestinations] = useState<Destination[]>([])
  const { dispatch } = useBooking()

  // Fallback destinations if database is not available
  const fallbackDestinations = [
    { id: "1", code: "NYC", name: "New York", airport_code: "JFK" },
    { id: "2", code: "LON", name: "London", airport_code: "LHR" },
    { id: "3", code: "SGN", name: "Ho Chi Minh City", airport_code: "SGN" },
    { id: "4", code: "CTS", name: "Hokkaido", airport_code: "CTS" },
    { id: "5", code: "PER", name: "Perth", airport_code: "PER" },
    { id: "6", code: "SAN", name: "California", airport_code: "SAN" },
    { id: "7", code: "DPS", name: "Bali", airport_code: "DPS" },
    { id: "8", code: "YYZ", name: "Toronto", airport_code: "YYZ" },
  ]

  useEffect(() => {
    async function fetchDestinations() {
      try {
        const data = await getDestinations()
        setDestinations(data.length > 0 ? data : fallbackDestinations)
      } catch (error) {
        console.log("Using fallback destinations")
        setDestinations(fallbackDestinations)
      }
    }

    fetchDestinations()
  }, [])

  const handleSearch = () => {
    // Set destinations in booking context
    const depDest = destinations.find((d) => d.code === fromDestination)
    const arrDest = destinations.find((d) => d.code === toDestination)

    if (depDest) {
      dispatch({ type: "SET_DEPARTURE_DESTINATION", payload: depDest })
    }
    if (arrDest) {
      dispatch({ type: "SET_ARRIVAL_DESTINATION", payload: arrDest })
    }
  }

  const searchUrl = `/booking/search?${new URLSearchParams({
    ...(fromDestination && { from: fromDestination }),
    ...(toDestination && { to: toDestination }),
    ...(departureDate && { departureDate: format(departureDate, "yyyy-MM-dd") }),
    ...(returnDate && !isOneWay && { returnDate: format(returnDate, "yyyy-MM-dd") }),
    passengers: "1",
    class: "economy",
  }).toString()}`

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Origin and Destination */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-2">
          <Label htmlFor="from" className="text-sm font-medium">
            From
          </Label>
          <Select value={fromDestination} onValueChange={setFromDestination}>
            <SelectTrigger id="from" className="h-10 sm:h-11 md:h-12">
              <SelectValue placeholder="Select departure city" />
            </SelectTrigger>
            <SelectContent>
              {destinations.map((dest) => (
                <SelectItem key={dest.id} value={dest.code}>
                  <span className="text-sm sm:text-base">
                    {dest.name} ({dest.airport_code})
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="to" className="text-sm font-medium">
            To
          </Label>
          <Select value={toDestination} onValueChange={setToDestination}>
            <SelectTrigger id="to" className="h-10 sm:h-11 md:h-12">
              <SelectValue placeholder="Select destination city" />
            </SelectTrigger>
            <SelectContent>
              {destinations.map((dest) => (
                <SelectItem key={dest.id} value={dest.code}>
                  <span className="text-sm sm:text-base">
                    {dest.name} ({dest.airport_code})
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-2">
          <Label htmlFor="departure" className="text-sm font-medium">
            Departure Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal h-10 sm:h-11 md:h-12 text-sm sm:text-base"
                id="departure"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {departureDate ? format(departureDate, "PPP") : <span>Select date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={departureDate} onSelect={setDepartureDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
        {!isOneWay && (
          <div className="space-y-2">
            <Label htmlFor="return" className="text-sm font-medium">
              Return Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal h-10 sm:h-11 md:h-12 text-sm sm:text-base"
                  id="return"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {returnDate ? format(returnDate, "PPP") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={returnDate} onSelect={setReturnDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>

      {/* Passengers and Class */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="space-y-2">
          <Label htmlFor="passengers" className="text-sm font-medium">
            Passengers
          </Label>
          <Select defaultValue="1">
            <SelectTrigger id="passengers" className="h-10 sm:h-11 md:h-12">
              <SelectValue placeholder="Select passengers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Passenger</SelectItem>
              <SelectItem value="2">2 Passengers</SelectItem>
              <SelectItem value="3">3 Passengers</SelectItem>
              <SelectItem value="4">4 Passengers</SelectItem>
              <SelectItem value="5">5+ Passengers</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="class" className="text-sm font-medium">
            Class
          </Label>
          <Select defaultValue="economy">
            <SelectTrigger id="class" className="h-10 sm:h-11 md:h-12">
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="economy">Economy</SelectItem>
              <SelectItem value="premium">Premium Economy</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="first">First Class</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end sm:col-span-2 lg:col-span-1">
          <Button
            className="w-full h-10 sm:h-11 md:h-12 text-sm sm:text-base"
            size="lg"
            asChild
            onClick={handleSearch}
            disabled={!fromDestination || !toDestination}
          >
            <Link href={searchUrl}>
              <PlaneTakeoff className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Search Flights</span>
              <span className="sm:hidden">Search</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
