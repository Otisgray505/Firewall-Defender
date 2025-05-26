"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ArrowRight, Clock, Filter, Plane, Wifi } from "lucide-react"

// Mock flight data
const flights = [
  {
    id: "fl-001",
    airline: "AirDreamFly",
    flightNumber: "DF1234",
    departure: {
      airport: "JFK",
      city: "New York",
      time: "08:30",
      date: "2023-07-15",
    },
    arrival: {
      airport: "LHR",
      city: "London",
      time: "20:45",
      date: "2023-07-15",
    },
    duration: "7h 15m",
    stops: 0,
    price: 649,
    seatsAvailable: 12,
    aircraft: "Boeing 787-9",
    amenities: ["wifi", "power", "entertainment"],
    cabinClass: "Economy",
  },
  {
    id: "fl-002",
    airline: "AirDreamFly",
    flightNumber: "DF2345",
    departure: {
      airport: "JFK",
      city: "New York",
      time: "12:15",
      date: "2023-07-15",
    },
    arrival: {
      airport: "LHR",
      city: "London",
      time: "00:30",
      date: "2023-07-16",
    },
    duration: "7h 15m",
    stops: 0,
    price: 599,
    seatsAvailable: 8,
    aircraft: "Boeing 787-9",
    amenities: ["wifi", "power", "entertainment"],
    cabinClass: "Economy",
  },
  {
    id: "fl-003",
    airline: "AirDreamFly",
    flightNumber: "DF3456",
    departure: {
      airport: "JFK",
      city: "New York",
      time: "16:45",
      date: "2023-07-15",
    },
    arrival: {
      airport: "LHR",
      city: "London",
      time: "04:55",
      date: "2023-07-16",
    },
    duration: "7h 10m",
    stops: 0,
    price: 579,
    seatsAvailable: 5,
    aircraft: "Boeing 787-9",
    amenities: ["wifi", "power", "entertainment"],
    cabinClass: "Economy",
  },
  {
    id: "fl-004",
    airline: "AirDreamFly",
    flightNumber: "DF4567",
    departure: {
      airport: "JFK",
      city: "New York",
      time: "19:30",
      date: "2023-07-15",
    },
    arrival: {
      airport: "LHR",
      city: "London",
      time: "07:45",
      date: "2023-07-16",
    },
    duration: "7h 15m",
    stops: 0,
    price: 629,
    seatsAvailable: 15,
    aircraft: "Boeing 787-9",
    amenities: ["wifi", "power", "entertainment"],
    cabinClass: "Economy",
  },
  {
    id: "fl-005",
    airline: "AirDreamFly",
    flightNumber: "DF5678",
    departure: {
      airport: "JFK",
      city: "New York",
      time: "10:20",
      date: "2023-07-15",
    },
    arrival: {
      airport: "LHR",
      city: "London",
      time: "22:35",
      date: "2023-07-15",
    },
    duration: "7h 15m",
    stops: 0,
    price: 699,
    seatsAvailable: 3,
    aircraft: "Boeing 787-9",
    amenities: ["wifi", "power", "entertainment"],
    cabinClass: "Economy",
  },
]

export default function FlightSearchResults() {
  const [sortBy, setSortBy] = useState("price")
  const [filteredFlights, setFilteredFlights] = useState(flights)
  const [priceRange, setPriceRange] = useState([500, 800])
  const [showFilters, setShowFilters] = useState(false)

  // Sort flights based on selected criteria
  const sortedFlights = [...filteredFlights].sort((a, b) => {
    if (sortBy === "price") {
      return a.price - b.price
    } else if (sortBy === "duration") {
      return a.duration.localeCompare(b.duration)
    } else if (sortBy === "departure") {
      return a.departure.time.localeCompare(b.departure.time)
    } else if (sortBy === "arrival") {
      return a.arrival.time.localeCompare(b.arrival.time)
    }
    return 0
  })

  return (
    <div className="flex flex-col min-h-screen">
      {/* Search Summary */}
      <section className="bg-muted py-4 border-b">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">New York (JFK) to London (LHR)</h1>
              <p className="text-muted-foreground">July 15, 2023 | 1 Passenger | Economy</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/booking">Modify Search</Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="container px-4 md:px-6 py-6 grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
        {/* Filters - Desktop */}
        <div className="hidden md:block space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">Price Range</h3>
                <div className="space-y-4">
                  <Slider
                    defaultValue={[500, 800]}
                    min={500}
                    max={800}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                  <div className="flex justify-between">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Departure Time</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="morning" />
                    <Label htmlFor="morning">Morning (6AM - 12PM)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="afternoon" />
                    <Label htmlFor="afternoon">Afternoon (12PM - 6PM)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="evening" />
                    <Label htmlFor="evening">Evening (6PM - 12AM)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="night" />
                    <Label htmlFor="night">Night (12AM - 6AM)</Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Stops</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="nonstop" defaultChecked />
                    <Label htmlFor="nonstop">Nonstop</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="1stop" />
                    <Label htmlFor="1stop">1 Stop</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="2plusstops" />
                    <Label htmlFor="2plusstops">2+ Stops</Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Airlines</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="airdreamfly" defaultChecked />
                    <Label htmlFor="airdreamfly">AirDreamFly</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="partner1" />
                    <Label htmlFor="partner1">SkyAlliance</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="partner2" />
                    <Label htmlFor="partner2">GlobalAir</Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Amenities</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="wifi" />
                    <Label htmlFor="wifi">WiFi</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="power" />
                    <Label htmlFor="power">Power Outlets</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="entertainment" />
                    <Label htmlFor="entertainment">In-flight Entertainment</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Apply Filters
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Mobile Filters Toggle */}
        <div className="md:hidden">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="mr-2 h-4 w-4" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>

          {showFilters && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Price Range</h3>
                  <div className="space-y-4">
                    <Slider
                      defaultValue={[500, 800]}
                      min={500}
                      max={800}
                      step={10}
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                    <div className="flex justify-between">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Stops</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="mobile-nonstop" defaultChecked />
                      <Label htmlFor="mobile-nonstop">Nonstop</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="mobile-1stop" />
                      <Label htmlFor="mobile-1stop">1 Stop</Label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Airlines</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="mobile-airdreamfly" defaultChecked />
                      <Label htmlFor="mobile-airdreamfly">AirDreamFly</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Apply Filters
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>

        {/* Flight Results */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground">{sortedFlights.length} flights found</p>
            <div className="flex items-center space-x-2">
              <Label htmlFor="sort-by" className="text-sm">
                Sort by:
              </Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger id="sort-by" className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price">Price (Lowest first)</SelectItem>
                  <SelectItem value="duration">Duration (Shortest first)</SelectItem>
                  <SelectItem value="departure">Departure (Earliest first)</SelectItem>
                  <SelectItem value="arrival">Arrival (Earliest first)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {sortedFlights.map((flight) => (
            <Card key={flight.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mr-4">
                        <Plane className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{flight.airline}</p>
                        <p className="text-sm text-muted-foreground">
                          {flight.flightNumber} • {flight.aircraft}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <div className="flex items-center mr-4">
                        <Wifi className="h-4 w-4 mr-1" />
                        <span>WiFi</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{flight.seatsAvailable} seats left</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto] gap-4 items-center mt-6">
                    <div>
                      <p className="text-2xl font-bold">{flight.departure.time}</p>
                      <p className="text-muted-foreground">{flight.departure.airport}</p>
                      <p className="text-sm text-muted-foreground">{flight.departure.city}</p>
                    </div>
                    <div className="hidden md:flex flex-col items-center">
                      <p className="text-sm text-muted-foreground">{flight.duration}</p>
                      <div className="relative w-32 h-px bg-border my-2">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"></div>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"></div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {flight.stops === 0 ? "Nonstop" : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{flight.arrival.time}</p>
                      <p className="text-muted-foreground">{flight.arrival.airport}</p>
                      <p className="text-sm text-muted-foreground">{flight.arrival.city}</p>
                    </div>
                    <div className="md:text-right">
                      <p className="text-2xl font-bold">${flight.price}</p>
                      <p className="text-sm text-muted-foreground">per person</p>
                    </div>

                    {/* Mobile duration */}
                    <div className="flex md:hidden justify-between items-center col-span-1">
                      <p className="text-sm text-muted-foreground">
                        {flight.duration} •{" "}
                        {flight.stops === 0 ? "Nonstop" : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-muted p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center">
                    <p className="text-sm mr-4">
                      <span className="font-medium">{flight.cabinClass}</span> • {flight.seatsAvailable} seats left
                    </p>
                    <Button variant="link" size="sm" className="p-0">
                      Flight Details
                    </Button>
                  </div>
                  <Button asChild>
                    <Link href={`/booking/select-seat/${flight.id}`}>
                      Select
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
