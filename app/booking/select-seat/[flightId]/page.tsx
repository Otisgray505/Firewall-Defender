"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, ChevronLeft, ChevronRight, Info, Plane, Utensils, Users } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useBooking } from "@/lib/booking-context"
import { flights, inFlightServices, generateSeats, destinations } from "@/lib/mock-data"

export default function SeatSelection({ params }: { params: { flightId: string } }) {
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null)
  const [selectedMeals, setSelectedMeals] = useState<string[]>([])
  const [selectedBeverages, setSelectedBeverages] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState(1)
  const [passengerDetails, setPassengerDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    nationality: "",
    passportNumber: "",
    passportExpiry: "",
  })

  const { state, dispatch } = useBooking()

  // Get flight details
  const flightDetails = state.selectedFlight || flights.find((f) => f.id === params.flightId) || flights[0]
  const seats = generateSeats("aircraft-1")
  const availableSeats = seats.filter(() => Math.random() > 0.3) // Simulate availability

  const mealOptions = inFlightServices.filter((service) => service.type === "meal")
  const beverageOptions = inFlightServices.filter((service) => service.type === "beverage")

  // Get destination details
  const departureDestination = destinations.find((d) => d.id === flightDetails.departure_destination_id)
  const arrivalDestination = destinations.find((d) => d.id === flightDetails.arrival_destination_id)

  useEffect(() => {
    if (flightDetails && !state.selectedFlight) {
      dispatch({ type: "SET_FLIGHT", payload: flightDetails })
    }
  }, [flightDetails, state.selectedFlight, dispatch])

  const handleSeatSelect = (seatId: string) => {
    setSelectedSeat(seatId)
    const seat = seats.find((s) => s.id === seatId)
    if (seat) {
      dispatch({ type: "SET_SEAT", payload: seat })
    }
  }

  const handleMealToggle = (mealId: string) => {
    const meal = mealOptions.find((m) => m.id === mealId)
    if (!meal) return

    if (selectedMeals.includes(mealId)) {
      setSelectedMeals((prev) => prev.filter((id) => id !== mealId))
      dispatch({ type: "REMOVE_MEAL", payload: mealId })
    } else {
      setSelectedMeals((prev) => [...prev, mealId])
      dispatch({ type: "ADD_MEAL", payload: meal })
    }
  }

  const handleBeverageToggle = (bevId: string) => {
    const beverage = beverageOptions.find((b) => b.id === bevId)
    if (!beverage) return

    if (selectedBeverages.includes(bevId)) {
      setSelectedBeverages((prev) => prev.filter((id) => id !== bevId))
      dispatch({ type: "REMOVE_BEVERAGE", payload: bevId })
    } else {
      setSelectedBeverages((prev) => [...prev, bevId])
      dispatch({ type: "ADD_BEVERAGE", payload: beverage })
    }
  }

  const calculateTotal = () => {
    let total = flightDetails.base_price

    // Add seat price
    if (selectedSeat) {
      const seat = seats.find((s) => s.id === selectedSeat)
      if (seat) total += seat.price_modifier
    }

    // Add meal prices
    selectedMeals.forEach((mealId) => {
      const meal = mealOptions.find((m) => m.id === mealId)
      if (meal) total += meal.price
    })

    // Add beverage prices
    selectedBeverages.forEach((bevId) => {
      const beverage = beverageOptions.find((b) => b.id === bevId)
      if (beverage) total += beverage.price
    })

    return total.toFixed(2)
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1)
      if (currentStep === 2) {
        dispatch({ type: "CALCULATE_TOTAL" })
      }
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handlePassengerDetailsChange = (field: string, value: string) => {
    setPassengerDetails((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Flight Summary */}
      <section className="bg-subtlePurple/30 py-4 border-b">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-accentPurple">Flight {flightDetails.flight_number}</h1>
              <p className="text-muted-foreground">
                {departureDestination?.name} ({departureDestination?.airport_code}) to {arrivalDestination?.name} (
                {arrivalDestination?.airport_code}) | {flightDetails.departure_date}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="border-primaryBlue text-primaryBlue hover:bg-primaryBlue hover:text-white"
            >
              <Link href="/booking/search">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Search Results
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="border-b">
        <div className="container px-4 md:px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div
                className={`rounded-full w-8 h-8 flex items-center justify-center ${currentStep >= 1 ? "bg-primaryBlue text-white" : "bg-muted text-muted-foreground"}`}
              >
                1
              </div>
              <div className={`h-1 w-12 mx-2 ${currentStep >= 2 ? "bg-primaryBlue" : "bg-muted"}`}></div>
              <div
                className={`rounded-full w-8 h-8 flex items-center justify-center ${currentStep >= 2 ? "bg-primaryBlue text-white" : "bg-muted text-muted-foreground"}`}
              >
                2
              </div>
              <div className={`h-1 w-12 mx-2 ${currentStep >= 3 ? "bg-primaryBlue" : "bg-muted"}`}></div>
              <div
                className={`rounded-full w-8 h-8 flex items-center justify-center ${currentStep >= 3 ? "bg-primaryBlue text-white" : "bg-muted text-muted-foreground"}`}
              >
                3
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <span className={currentStep >= 1 ? "font-medium text-primaryBlue" : "text-muted-foreground"}>
                Seat Selection
              </span>
              <span className={currentStep >= 2 ? "font-medium text-primaryBlue" : "text-muted-foreground"}>
                In-flight Services
              </span>
              <span className={currentStep >= 3 ? "font-medium text-primaryBlue" : "text-muted-foreground"}>
                Review & Pay
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="container px-4 md:px-6 py-8">
        {currentStep === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
            {/* Seat Map */}
            <Card>
              <CardHeader>
                <CardTitle className="text-accentPurple">Select Your Seat</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-6">
                  <div className="flex items-center space-x-8">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded border border-primaryBlue bg-primaryBlue/20 mr-2"></div>
                      <span className="text-sm">Available</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded border border-primaryBlue bg-primaryBlue mr-2"></div>
                      <span className="text-sm">Selected</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded bg-muted mr-2"></div>
                      <span className="text-sm">Unavailable</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded border border-yellow-500 bg-yellow-100 mr-2"></div>
                      <span className="text-sm">Exit Row</span>
                    </div>
                  </div>
                </div>

                <div className="relative w-full overflow-x-auto pb-6">
                  <div className="min-w-[500px] max-w-2xl mx-auto">
                    {/* Plane nose */}
                    <div className="flex justify-center mb-8">
                      <div className="w-20 h-20 rounded-t-full border-2 border-b-0 border-gray-300 flex items-center justify-center">
                        <Plane className="h-10 w-10 text-primaryBlue" />
                      </div>
                    </div>

                    {/* Column headers */}
                    <div className="flex justify-center mb-4">
                      <div className="flex items-center justify-between w-full max-w-sm">
                        <div className="flex space-x-2">
                          <div className="text-center font-medium w-8">A</div>
                          <div className="text-center font-medium w-8">B</div>
                          <div className="text-center font-medium w-8">C</div>
                        </div>
                        <div className="w-8"></div>
                        <div className="flex space-x-2">
                          <div className="text-center font-medium w-8">D</div>
                          <div className="text-center font-medium w-8">E</div>
                          <div className="text-center font-medium w-8">F</div>
                        </div>
                      </div>
                    </div>

                    {/* Seat grid */}
                    <div className="space-y-2">
                      {Array.from({ length: 30 }, (_, rowIndex) => rowIndex + 1).map((row) => (
                        <div key={row} className="flex items-center justify-center">
                          <div className="flex items-center justify-between w-full max-w-sm">
                            {/* Row number */}
                            <div className="w-6 text-center font-medium text-sm">{row}</div>

                            {/* Left side seats (A, B, C) */}
                            <div className="flex space-x-2">
                              {["A", "B", "C"].map((col) => {
                                const seatId = `aircraft-1-${row}${col}`
                                const seat = seats.find((s) => s.seat_number === `${row}${col}`)
                                const isAvailable = availableSeats.some((s) => s.id === seatId)

                                if (!seat) return null

                                return (
                                  <TooltipProvider key={col}>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <button
                                          className={`w-8 h-8 rounded flex items-center justify-center text-xs font-medium transition-colors
                                            ${
                                              !isAvailable
                                                ? "bg-muted cursor-not-allowed text-muted-foreground"
                                                : selectedSeat === seatId
                                                  ? "bg-primaryBlue text-white border border-primaryBlue"
                                                  : seat.is_exit_row
                                                    ? "bg-yellow-100 border border-yellow-500 hover:bg-yellow-200 text-yellow-800"
                                                    : "border border-primaryBlue bg-primaryBlue/20 hover:bg-primaryBlue/30 text-primaryBlue"
                                            }`}
                                          onClick={() => isAvailable && handleSeatSelect(seatId)}
                                          disabled={!isAvailable}
                                        >
                                          {col}
                                        </button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <div className="text-sm">
                                          <p>Seat {seat.seat_number}</p>
                                          <p>
                                            {seat.seat_type === "window"
                                              ? "Window"
                                              : seat.seat_type === "aisle"
                                                ? "Aisle"
                                                : "Middle"}
                                          </p>
                                          {seat.is_exit_row && <p>Exit Row - Extra Legroom</p>}
                                          <p className="font-medium">${seat.price_modifier}</p>
                                        </div>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                )
                              })}
                            </div>

                            {/* Aisle space */}
                            <div className="w-8"></div>

                            {/* Right side seats (D, E, F) */}
                            <div className="flex space-x-2">
                              {["D", "E", "F"].map((col) => {
                                const seatId = `aircraft-1-${row}${col}`
                                const seat = seats.find((s) => s.seat_number === `${row}${col}`)
                                const isAvailable = availableSeats.some((s) => s.id === seatId)

                                if (!seat) return null

                                return (
                                  <TooltipProvider key={col}>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <button
                                          className={`w-8 h-8 rounded flex items-center justify-center text-xs font-medium transition-colors
                                            ${
                                              !isAvailable
                                                ? "bg-muted cursor-not-allowed text-muted-foreground"
                                                : selectedSeat === seatId
                                                  ? "bg-primaryBlue text-white border border-primaryBlue"
                                                  : seat.is_exit_row
                                                    ? "bg-yellow-100 border border-yellow-500 hover:bg-yellow-200 text-yellow-800"
                                                    : "border border-primaryBlue bg-primaryBlue/20 hover:bg-primaryBlue/30 text-primaryBlue"
                                            }`}
                                          onClick={() => isAvailable && handleSeatSelect(seatId)}
                                          disabled={!isAvailable}
                                        >
                                          {col}
                                        </button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <div className="text-sm">
                                          <p>Seat {seat.seat_number}</p>
                                          <p>
                                            {seat.seat_type === "window"
                                              ? "Window"
                                              : seat.seat_type === "aisle"
                                                ? "Aisle"
                                                : "Middle"}
                                          </p>
                                          {seat.is_exit_row && <p>Exit Row - Extra Legroom</p>}
                                          <p className="font-medium">${seat.price_modifier}</p>
                                        </div>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                )
                              })}
                            </div>

                            {/* Row number */}
                            <div className="w-6 text-center font-medium text-sm">{row}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Plane tail */}
                    <div className="flex justify-center mt-8">
                      <div className="w-20 h-20 rounded-b-full border-2 border-t-0 border-gray-300"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Flight Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-accentPurple">Flight Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-subtlePurple flex items-center justify-center mr-3">
                      <Plane className="h-5 w-5 text-primaryBlue" />
                    </div>
                    <div>
                      <p className="font-medium">{flightDetails.airline}</p>
                      <p className="text-sm text-muted-foreground">{flightDetails.flight_number}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-[auto_1fr_auto] gap-2 items-center">
                    <div>
                      <p className="text-lg font-bold text-primaryBlue">{flightDetails.departure_time}</p>
                      <p className="text-sm text-muted-foreground">{flightDetails.departure_date}</p>
                    </div>
                    <div className="flex flex-col items-center px-2">
                      <p className="text-xs text-muted-foreground">{flightDetails.duration}</p>
                      <div className="relative w-full h-px bg-border my-1">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primaryBlue"></div>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primaryBlue"></div>
                      </div>
                      <p className="text-xs text-muted-foreground">Nonstop</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-primaryBlue">{flightDetails.arrival_time}</p>
                      <p className="text-sm text-muted-foreground">{flightDetails.arrival_date}</p>
                    </div>
                  </div>

                  <div className="flex justify-between pt-2">
                    <div>
                      <p className="text-sm font-medium">
                        {departureDestination?.name} ({departureDestination?.airport_code})
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {arrivalDestination?.name} ({arrivalDestination?.airport_code})
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex justify-between mb-1">
                      <span>Base fare</span>
                      <span>${flightDetails.base_price.toFixed(2)}</span>
                    </div>
                    {selectedSeat && (
                      <div className="flex justify-between mb-1">
                        <span>Seat {seats.find((s) => s.id === selectedSeat)?.seat_number}</span>
                        <span>${seats.find((s) => s.id === selectedSeat)?.price_modifier.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold pt-2 border-t mt-2">
                      <span>Total</span>
                      <span className="text-primaryBlue">${calculateTotal()}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-primaryBlue hover:bg-secondaryBlue"
                    onClick={nextStep}
                    disabled={!selectedSeat}
                  >
                    Continue
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    If you need special assistance or have questions about seat selection, our customer service team is
                    here to help.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-primaryBlue text-primaryBlue hover:bg-primaryBlue hover:text-white"
                  >
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
            {/* In-flight Services */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-accentPurple">Select In-flight Meals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mealOptions.map((meal) => (
                      <div
                        key={meal.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors
                          ${selectedMeals.includes(meal.id) ? "border-primaryBlue bg-subtlePurple/50" : "hover:border-primaryBlue/50"}`}
                        onClick={() => handleMealToggle(meal.id)}
                      >
                        <div className="flex">
                          <div className="relative w-20 h-20 rounded overflow-hidden mr-4">
                            <Image
                              src={meal.image_url || "/placeholder.svg"}
                              alt={meal.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium text-accentPurple">{meal.name}</h3>
                              <div
                                className={`w-5 h-5 rounded-full border flex items-center justify-center
                                ${selectedMeals.includes(meal.id) ? "bg-primaryBlue border-primaryBlue text-white" : "border-muted-foreground"}`}
                              >
                                {selectedMeals.includes(meal.id) && <Check className="h-3 w-3" />}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{meal.description}</p>
                            <div className="flex justify-between items-center">
                              <div className="flex gap-1">
                                {meal.dietary_info.map((diet) => (
                                  <Badge
                                    key={diet}
                                    variant="outline"
                                    className="text-xs border-primaryBlue text-primaryBlue"
                                  >
                                    {diet}
                                  </Badge>
                                ))}
                              </div>
                              <p className="font-medium text-primaryBlue">${meal.price.toFixed(2)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-accentPurple">Select Beverages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {beverageOptions.map((beverage) => (
                      <div
                        key={beverage.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors
                          ${selectedBeverages.includes(beverage.id) ? "border-primaryBlue bg-subtlePurple/50" : "hover:border-primaryBlue/50"}`}
                        onClick={() => handleBeverageToggle(beverage.id)}
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className="relative w-16 h-16 rounded-full overflow-hidden mb-3">
                            <Image
                              src={beverage.image_url || "/placeholder.svg"}
                              alt={beverage.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <h3 className="font-medium mb-1 text-accentPurple">{beverage.name}</h3>
                          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{beverage.description}</p>
                          <p className="font-medium text-primaryBlue">${beverage.price.toFixed(2)}</p>
                          <div
                            className={`mt-2 w-5 h-5 rounded-full border flex items-center justify-center
                            ${selectedBeverages.includes(beverage.id) ? "bg-primaryBlue border-primaryBlue text-white" : "border-muted-foreground"}`}
                          >
                            {selectedBeverages.includes(beverage.id) && <Check className="h-3 w-3" />}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-accentPurple">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-subtlePurple flex items-center justify-center mr-3">
                      <Plane className="h-5 w-5 text-primaryBlue" />
                    </div>
                    <div>
                      <p className="font-medium">{flightDetails.airline}</p>
                      <p className="text-sm text-muted-foreground">{flightDetails.flight_number}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex justify-between mb-1">
                      <span>Base fare</span>
                      <span>${flightDetails.base_price.toFixed(2)}</span>
                    </div>
                    {selectedSeat && (
                      <div className="flex justify-between mb-1">
                        <span>Seat {seats.find((s) => s.id === selectedSeat)?.seat_number}</span>
                        <span>${seats.find((s) => s.id === selectedSeat)?.price_modifier.toFixed(2)}</span>
                      </div>
                    )}

                    {selectedMeals.length > 0 && (
                      <>
                        <div className="flex justify-between mb-1 font-medium pt-2">
                          <span>Meals</span>
                          <span></span>
                        </div>
                        {selectedMeals.map((mealId) => {
                          const meal = mealOptions.find((m) => m.id === mealId)
                          return meal ? (
                            <div key={mealId} className="flex justify-between mb-1 text-sm pl-2">
                              <span>{meal.name}</span>
                              <span>${meal.price.toFixed(2)}</span>
                            </div>
                          ) : null
                        })}
                      </>
                    )}

                    {selectedBeverages.length > 0 && (
                      <>
                        <div className="flex justify-between mb-1 font-medium pt-2">
                          <span>Beverages</span>
                          <span></span>
                        </div>
                        {selectedBeverages.map((bevId) => {
                          const beverage = beverageOptions.find((b) => b.id === bevId)
                          return beverage ? (
                            <div key={bevId} className="flex justify-between mb-1 text-sm pl-2">
                              <span>{beverage.name}</span>
                              <span>${beverage.price.toFixed(2)}</span>
                            </div>
                          ) : null
                        })}
                      </>
                    )}

                    <div className="flex justify-between font-bold pt-2 border-t mt-2">
                      <span>Total</span>
                      <span className="text-primaryBlue">${calculateTotal()}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                  <Button className="w-full bg-primaryBlue hover:bg-secondaryBlue" onClick={nextStep}>
                    Continue to Payment
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-primaryBlue text-primaryBlue hover:bg-primaryBlue hover:text-white"
                    onClick={prevStep}
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back to Seat Selection
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center">
                    <Info className="h-4 w-4 mr-2 text-primaryBlue" />
                    About In-flight Services
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Pre-ordering meals and beverages ensures availability and priority service during your flight.
                    Complimentary water, tea, and coffee are provided to all passengers.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
            {/* Payment Form */}
            <div className="space-y-8">
              {/* Passenger Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-accentPurple">Passenger Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={passengerDetails.firstName}
                        onChange={(e) => handlePassengerDetailsChange("firstName", e.target.value)}
                        placeholder="John"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={passengerDetails.lastName}
                        onChange={(e) => handlePassengerDetailsChange("lastName", e.target.value)}
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={passengerDetails.email}
                        onChange={(e) => handlePassengerDetailsChange("email", e.target.value)}
                        placeholder="john.doe@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={passengerDetails.phone}
                        onChange={(e) => handlePassengerDetailsChange("phone", e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={passengerDetails.dateOfBirth}
                        onChange={(e) => handlePassengerDetailsChange("dateOfBirth", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nationality">Nationality</Label>
                      <Input
                        id="nationality"
                        value={passengerDetails.nationality}
                        onChange={(e) => handlePassengerDetailsChange("nationality", e.target.value)}
                        placeholder="United States"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="passportNumber">Passport Number</Label>
                      <Input
                        id="passportNumber"
                        value={passengerDetails.passportNumber}
                        onChange={(e) => handlePassengerDetailsChange("passportNumber", e.target.value)}
                        placeholder="123456789"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="passportExpiry">Passport Expiry</Label>
                      <Input
                        id="passportExpiry"
                        type="date"
                        value={passengerDetails.passportExpiry}
                        onChange={(e) => handlePassengerDetailsChange("passportExpiry", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-accentPurple">Review Your Booking</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-subtlePurple/30 p-4 rounded-lg">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center mr-3">
                        <Plane className="h-5 w-5 text-primaryBlue" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {flightDetails.airline} {flightDetails.flight_number}
                        </p>
                        <p className="text-sm text-muted-foreground">{flightDetails.departure_date}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-[auto_1fr_auto] gap-2 items-center">
                      <div>
                        <p className="text-lg font-bold text-primaryBlue">{flightDetails.departure_time}</p>
                        <p className="text-sm font-medium">{departureDestination?.name}</p>
                        <p className="text-xs text-muted-foreground">{departureDestination?.airport_code}</p>
                      </div>
                      <div className="flex flex-col items-center px-2">
                        <p className="text-xs text-muted-foreground">{flightDetails.duration}</p>
                        <div className="relative w-full h-px bg-border my-1">
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primaryBlue"></div>
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primaryBlue"></div>
                        </div>
                        <p className="text-xs text-muted-foreground">Nonstop</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-primaryBlue">{flightDetails.arrival_time}</p>
                        <p className="text-sm font-medium">{arrivalDestination?.name}</p>
                        <p className="text-xs text-muted-foreground">{arrivalDestination?.airport_code}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2 flex items-center text-accentPurple">
                        <Users className="h-4 w-4 mr-2" />
                        Passenger
                      </h3>
                      <p className="text-sm">
                        {passengerDetails.firstName} {passengerDetails.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground">Adult</p>
                    </div>

                    {selectedSeat && (
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium mb-2 flex items-center text-accentPurple">
                          <Plane className="h-4 w-4 mr-2" />
                          Seat
                        </h3>
                        <p className="text-sm">Seat {seats.find((s) => s.id === selectedSeat)?.seat_number}</p>
                        <p className="text-xs text-muted-foreground">
                          {seats.find((s) => s.id === selectedSeat)?.seat_type === "window"
                            ? "Window"
                            : seats.find((s) => s.id === selectedSeat)?.seat_type === "aisle"
                              ? "Aisle"
                              : "Middle"}
                        </p>
                      </div>
                    )}

                    {(selectedMeals.length > 0 || selectedBeverages.length > 0) && (
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium mb-2 flex items-center text-accentPurple">
                          <Utensils className="h-4 w-4 mr-2" />
                          In-flight Services
                        </h3>
                        <p className="text-sm">
                          {selectedMeals.length} meals, {selectedBeverages.length} beverages
                        </p>
                        <p className="text-xs text-muted-foreground">Pre-ordered</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="font-medium mb-4 text-accentPurple">Payment Method</h3>
                    <Tabs defaultValue="card">
                      <TabsList className="grid w-full grid-cols-3 mb-4">
                        <TabsTrigger
                          value="card"
                          className="data-[state=active]:bg-primaryBlue data-[state=active]:text-white"
                        >
                          Credit Card
                        </TabsTrigger>
                        <TabsTrigger
                          value="paypal"
                          className="data-[state=active]:bg-primaryBlue data-[state=active]:text-white"
                        >
                          PayPal
                        </TabsTrigger>
                        <TabsTrigger
                          value="apple"
                          className="data-[state=active]:bg-primaryBlue data-[state=active]:text-white"
                        >
                          Apple Pay
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="card" className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="col-span-2">
                            <Label htmlFor="card-number">Card Number</Label>
                            <Input id="card-number" placeholder="1234 5678 9012 3456" />
                          </div>
                          <div>
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" />
                          </div>
                          <div>
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="123" />
                          </div>
                          <div className="col-span-2">
                            <Label htmlFor="name">Cardholder Name</Label>
                            <Input id="name" placeholder="John Doe" />
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="paypal" className="text-center py-6">
                        <p className="mb-4">You will be redirected to PayPal to complete your payment.</p>
                        <Button className="bg-primaryBlue hover:bg-secondaryBlue">Continue with PayPal</Button>
                      </TabsContent>
                      <TabsContent value="apple" className="text-center py-6">
                        <p className="mb-4">You will be redirected to Apple Pay to complete your payment.</p>
                        <Button className="bg-primaryBlue hover:bg-secondaryBlue">Continue with Apple Pay</Button>
                      </TabsContent>
                    </Tabs>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-accentPurple">Price Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="pt-2">
                    <div className="flex justify-between mb-1">
                      <span>Base fare</span>
                      <span>${flightDetails.base_price.toFixed(2)}</span>
                    </div>
                    {selectedSeat && (
                      <div className="flex justify-between mb-1">
                        <span>Seat {seats.find((s) => s.id === selectedSeat)?.seat_number}</span>
                        <span>${seats.find((s) => s.id === selectedSeat)?.price_modifier.toFixed(2)}</span>
                      </div>
                    )}

                    {selectedMeals.length > 0 && (
                      <>
                        <div className="flex justify-between mb-1 font-medium pt-2">
                          <span>Meals</span>
                          <span></span>
                        </div>
                        {selectedMeals.map((mealId) => {
                          const meal = mealOptions.find((m) => m.id === mealId)
                          return meal ? (
                            <div key={mealId} className="flex justify-between mb-1 text-sm pl-2">
                              <span>{meal.name}</span>
                              <span>${meal.price.toFixed(2)}</span>
                            </div>
                          ) : null
                        })}
                      </>
                    )}

                    {selectedBeverages.length > 0 && (
                      <>
                        <div className="flex justify-between mb-1 font-medium pt-2">
                          <span>Beverages</span>
                          <span></span>
                        </div>
                        {selectedBeverages.map((bevId) => {
                          const beverage = beverageOptions.find((b) => b.id === bevId)
                          return beverage ? (
                            <div key={bevId} className="flex justify-between mb-1 text-sm pl-2">
                              <span>{beverage.name}</span>
                              <span>${beverage.price.toFixed(2)}</span>
                            </div>
                          ) : null
                        })}
                      </>
                    )}

                    <div className="flex justify-between font-bold pt-2 border-t mt-2">
                      <span>Total</span>
                      <span className="text-primaryBlue">${calculateTotal()}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                  <Button className="w-full bg-primaryBlue hover:bg-secondaryBlue">
                    Confirm and Pay ${calculateTotal()}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-primaryBlue text-primaryBlue hover:bg-primaryBlue hover:text-white"
                    onClick={prevStep}
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back to In-flight Services
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
