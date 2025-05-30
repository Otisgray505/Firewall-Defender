"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Search, Plane, Clock, MapPin, User, Smartphone, Download, CheckCircle, AlertCircle } from "lucide-react"

// Mock flight data for demonstration
const mockFlightData = {
  confirmationNumber: "ABC123",
  passengerName: "John Doe",
  flight: {
    flightNumber: "DF1234",
    airline: "FlyDreamAir",
    departure: {
      airport: "JFK",
      city: "New York",
      time: "08:30",
      date: "2024-12-15",
      terminal: "Terminal 4",
      gate: "A12",
    },
    arrival: {
      airport: "LHR",
      city: "London",
      time: "20:45",
      date: "2024-12-15",
      terminal: "Terminal 5",
    },
    duration: "7h 15m",
    seat: "12A",
    class: "Economy",
  },
  checkInStatus: "available", // available, completed, unavailable
}

export default function CheckInPage() {
  const [confirmationNumber, setConfirmationNumber] = useState("")
  const [fullName, setFullName] = useState("")
  const [flightData, setFlightData] = useState(null)
  const [searchAttempted, setSearchAttempted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [checkedIn, setCheckedIn] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setSearchAttempted(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock validation
    if (confirmationNumber.toUpperCase() === "ABC123" && fullName.toLowerCase().includes("john")) {
      setFlightData(mockFlightData)
    } else {
      setFlightData(null)
    }

    setIsLoading(false)
  }

  const handleCheckIn = async () => {
    setIsLoading(true)
    // Simulate check-in process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setCheckedIn(true)
    setIsLoading(false)
  }

  const canCheckIn = () => {
    if (!flightData) return false
    const now = new Date()
    const flightDate = new Date(`${flightData.flight.departure.date}T${flightData.flight.departure.time}`)
    const hoursUntilFlight = (flightDate - now) / (1000 * 60 * 60)
    return hoursUntilFlight <= 24 && hoursUntilFlight >= 2
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[300px] overflow-hidden">
        <Image
          src="/images/airplane-hero.jpg"
          alt="Airplane flying over clouds"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60 flex items-center">
          <div className="container px-4 md:px-6">
            <div className="max-w-2xl space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Online Check-in
              </h1>
              <p className="text-white/90 md:text-xl">Check in for your flight and get your boarding pass</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container px-4 md:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {!flightData ? (
            /* Search Form */
            <Card>
              <CardHeader>
                <CardTitle className="text-accentPurple">Find Your Flight</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSearch} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="confirmation">Flight Confirmation Number</Label>
                      <Input
                        id="confirmation"
                        placeholder="e.g. ABC123"
                        value={confirmationNumber}
                        onChange={(e) => setConfirmationNumber(e.target.value)}
                        required
                        className="uppercase"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        placeholder="e.g. John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-primaryBlue hover:bg-secondaryBlue" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Find Flight
                      </>
                    )}
                  </Button>
                </form>

                {searchAttempted && !flightData && !isLoading && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                      <p className="text-red-800">
                        No flight found with the provided details. Please check your confirmation number and name.
                      </p>
                    </div>
                  </div>
                )}

                {/* Demo Instructions */}
                <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-md">
                  <h3 className="font-medium text-blue-900 mb-2">Demo Instructions</h3>
                  <p className="text-sm text-blue-800">
                    For demonstration purposes, use confirmation number <strong>ABC123</strong> and name{" "}
                    <strong>John Doe</strong>
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            /* Flight Details and Check-in */
            <div className="space-y-6">
              {/* Flight Information */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-accentPurple">Flight Details</CardTitle>
                    <Badge variant="outline" className="border-green-500 text-green-700">
                      Confirmed
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 items-center">
                    {/* Departure */}
                    <div className="text-center lg:text-left">
                      <div className="flex items-center justify-center lg:justify-start mb-2">
                        <MapPin className="h-4 w-4 mr-1 text-primaryBlue" />
                        <span className="text-sm text-muted-foreground">Departure</span>
                      </div>
                      <p className="text-3xl font-bold text-primaryBlue">{flightData.flight.departure.time}</p>
                      <p className="font-medium">{flightData.flight.departure.city}</p>
                      <p className="text-sm text-muted-foreground">{flightData.flight.departure.airport}</p>
                      <p className="text-sm text-muted-foreground">{flightData.flight.departure.date}</p>
                      {flightData.flight.departure.terminal && (
                        <p className="text-sm font-medium mt-1">{flightData.flight.departure.terminal}</p>
                      )}
                      {flightData.flight.departure.gate && (
                        <p className="text-sm font-medium">Gate: {flightData.flight.departure.gate}</p>
                      )}
                    </div>

                    {/* Flight Info */}
                    <div className="flex flex-col items-center px-4">
                      <div className="w-12 h-12 rounded-full bg-subtlePurple flex items-center justify-center mb-2">
                        <Plane className="h-6 w-6 text-primaryBlue" />
                      </div>
                      <p className="font-medium">{flightData.flight.flightNumber}</p>
                      <p className="text-sm text-muted-foreground">{flightData.flight.duration}</p>
                      <div className="w-24 h-px bg-border my-2"></div>
                      <p className="text-sm text-muted-foreground">Nonstop</p>
                    </div>

                    {/* Arrival */}
                    <div className="text-center lg:text-right">
                      <div className="flex items-center justify-center lg:justify-end mb-2">
                        <span className="text-sm text-muted-foreground">Arrival</span>
                        <MapPin className="h-4 w-4 ml-1 text-primaryBlue" />
                      </div>
                      <p className="text-3xl font-bold text-primaryBlue">{flightData.flight.arrival.time}</p>
                      <p className="font-medium">{flightData.flight.arrival.city}</p>
                      <p className="text-sm text-muted-foreground">{flightData.flight.arrival.airport}</p>
                      <p className="text-sm text-muted-foreground">{flightData.flight.arrival.date}</p>
                      {flightData.flight.arrival.terminal && (
                        <p className="text-sm font-medium mt-1">{flightData.flight.arrival.terminal}</p>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Passenger Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Passenger</p>
                        <p className="font-medium">{flightData.passengerName}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Class</p>
                        <p className="font-medium">{flightData.flight.class}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Plane className="h-4 w-4 mr-2 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Seat</p>
                        <p className="font-medium">{flightData.flight.seat}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Check-in Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-accentPurple">Check-in</CardTitle>
                </CardHeader>
                <CardContent>
                  {checkedIn ? (
                    /* Check-in Complete */
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-green-700">Check-in Complete!</h3>
                      <p className="text-muted-foreground">
                        You're all set for your flight. Your boarding pass is ready.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
                        <Button className="bg-primaryBlue hover:bg-secondaryBlue">
                          <Smartphone className="mr-2 h-4 w-4" />
                          Mobile Pass
                        </Button>
                        <Button variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </Button>
                      </div>

                      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
                        <h4 className="font-medium text-blue-900 mb-2">Important Reminders</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Arrive at the airport at least 2 hours before departure</li>
                          <li>• Have your ID and boarding pass ready</li>
                          <li>• Check baggage drop-off times if needed</li>
                        </ul>
                      </div>
                    </div>
                  ) : canCheckIn() ? (
                    /* Check-in Available */
                    <div className="text-center space-y-4">
                      <h3 className="text-lg font-medium">Ready to Check In</h3>
                      <p className="text-muted-foreground">Online check-in is now available for your flight.</p>
                      <Button
                        onClick={handleCheckIn}
                        className="bg-primaryBlue hover:bg-secondaryBlue"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Checking In...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Check In Now
                          </>
                        )}
                      </Button>
                    </div>
                  ) : (
                    /* Check-in Not Available */
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mx-auto">
                        <Clock className="h-8 w-8 text-yellow-600" />
                      </div>
                      <h3 className="text-lg font-medium">Check-in Not Available</h3>
                      <p className="text-muted-foreground">
                        Online check-in opens 24 hours before departure and closes 2 hours before departure.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  onClick={() => {
                    setFlightData(null)
                    setSearchAttempted(false)
                    setCheckedIn(false)
                    setConfirmationNumber("")
                    setFullName("")
                  }}
                >
                  Search Another Flight
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
