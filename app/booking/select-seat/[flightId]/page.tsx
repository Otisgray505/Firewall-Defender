"use client"

import { useState } from "react"
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

// Mock flight data
const flightDetails = {
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
}

// Mock seat data
const generateSeats = () => {
  const rows = 30
  const columns = ["A", "B", "C", "", "D", "E", "F"]
  const seats = []

  for (let row = 1; row <= rows; row++) {
    for (let col = 0; col < columns.length; col++) {
      if (columns[col] === "") continue

      const seatId = `${row}${columns[col]}`
      const isExit = row === 10 || row === 20
      const isWindow = columns[col] === "A" || columns[col] === "F"
      const isMiddle = columns[col] === "B" || columns[col] === "E"
      const isAisle = columns[col] === "C" || columns[col] === "D"

      // Randomly mark some seats as unavailable
      const isAvailable = Math.random() > 0.3

      // Determine price based on seat type
      let price = 0
      if (isWindow) price = 25
      else if (isAisle) price = 20
      else price = 15

      // Extra legroom for exit rows
      if (isExit) price += 30

      seats.push({
        id: seatId,
        row,
        column: columns[col],
        isExit,
        isWindow,
        isMiddle,
        isAisle,
        isAvailable,
        price,
      })
    }
  }

  return seats
}

const seats = generateSeats()

// Mock meal options
const mealOptions = [
  {
    id: "meal-1",
    name: "Grilled Chicken with Vegetables",
    description: "Tender grilled chicken breast served with seasonal vegetables and mashed potatoes.",
    price: 15.99,
    dietary: ["protein-rich", "gluten-free"],
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: "meal-2",
    name: "Vegetarian Pasta",
    description: "Penne pasta with roasted vegetables in a tomato basil sauce, topped with parmesan cheese.",
    price: 13.99,
    dietary: ["vegetarian"],
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: "meal-3",
    name: "Beef Stir Fry",
    description: "Sliced beef with mixed vegetables in a savory sauce, served with steamed rice.",
    price: 16.99,
    dietary: ["protein-rich"],
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: "meal-4",
    name: "Vegan Buddha Bowl",
    description: "Quinoa, roasted sweet potatoes, chickpeas, avocado, and mixed greens with tahini dressing.",
    price: 14.99,
    dietary: ["vegan", "gluten-free"],
    image: "/placeholder.svg?height=100&width=150",
  },
]

// Mock beverage options
const beverageOptions = [
  {
    id: "bev-1",
    name: "Premium Wine Selection",
    description: "Choice of red or white wine from our curated collection.",
    price: 8.99,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "bev-2",
    name: "Craft Beer",
    description: "Selection of local and international craft beers.",
    price: 7.99,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "bev-3",
    name: "Signature Cocktail",
    description: "Handcrafted cocktails prepared by our onboard mixologists.",
    price: 9.99,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "bev-4",
    name: "Premium Coffee",
    description: "Freshly brewed specialty coffee.",
    price: 4.99,
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function SeatSelection({ params }: { params: { flightId: string } }) {
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null)
  const [selectedMeals, setSelectedMeals] = useState<string[]>([])
  const [selectedBeverages, setSelectedBeverages] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState(1)

  const handleSeatSelect = (seatId: string) => {
    setSelectedSeat(seatId)
  }

  const handleMealToggle = (mealId: string) => {
    setSelectedMeals((prev) => (prev.includes(mealId) ? prev.filter((id) => id !== mealId) : [...prev, mealId]))
  }

  const handleBeverageToggle = (bevId: string) => {
    setSelectedBeverages((prev) => (prev.includes(bevId) ? prev.filter((id) => id !== bevId) : [...prev, bevId]))
  }

  const calculateTotal = () => {
    let total = flightDetails.price

    // Add seat price
    if (selectedSeat) {
      const seat = seats.find((s) => s.id === selectedSeat)
      if (seat) total += seat.price
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
    setCurrentStep((prev) => Math.min(prev + 1, 3))
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Flight Summary */}
      <section className="bg-muted py-4 border-b">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">Flight {flightDetails.flightNumber}</h1>
              <p className="text-muted-foreground">
                {flightDetails.departure.city} ({flightDetails.departure.airport}) to {flightDetails.arrival.city} (
                {flightDetails.arrival.airport}) | {flightDetails.departure.date}
              </p>
            </div>
            <Button variant="outline" size="sm" asChild>
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
                className={`rounded-full w-8 h-8 flex items-center justify-center ${currentStep >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                1
              </div>
              <div className={`h-1 w-12 mx-2 ${currentStep >= 2 ? "bg-primary" : "bg-muted"}`}></div>
              <div
                className={`rounded-full w-8 h-8 flex items-center justify-center ${currentStep >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                2
              </div>
              <div className={`h-1 w-12 mx-2 ${currentStep >= 3 ? "bg-primary" : "bg-muted"}`}></div>
              <div
                className={`rounded-full w-8 h-8 flex items-center justify-center ${currentStep >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                3
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <span className={currentStep >= 1 ? "font-medium" : "text-muted-foreground"}>Seat Selection</span>
              <span className={currentStep >= 2 ? "font-medium" : "text-muted-foreground"}>In-flight Services</span>
              <span className={currentStep >= 3 ? "font-medium" : "text-muted-foreground"}>Review & Pay</span>
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
                <CardTitle>Select Your Seat</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-6">
                  <div className="flex items-center space-x-8">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded border border-primary bg-primary/20 mr-2"></div>
                      <span className="text-sm">Available</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded border border-primary bg-primary mr-2"></div>
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
                  <div className="min-w-[600px]">
                    {/* Plane nose */}
                    <div className="flex justify-center mb-8">
                      <div className="w-24 h-24 rounded-t-full border-2 border-b-0 border-gray-300 flex items-center justify-center">
                        <Plane className="h-12 w-12 text-muted-foreground" />
                      </div>
                    </div>

                    {/* Column headers */}
                    <div className="flex justify-center mb-4">
                      <div className="grid grid-cols-7 w-full max-w-md">
                        <div className="text-center font-medium">A</div>
                        <div className="text-center font-medium">B</div>
                        <div className="text-center font-medium">C</div>
                        <div className="text-center"></div>
                        <div className="text-center font-medium">D</div>
                        <div className="text-center font-medium">E</div>
                        <div className="text-center font-medium">F</div>
                      </div>
                    </div>

                    {/* Seat grid */}
                    <div className="space-y-2">
                      {Array.from({ length: 30 }, (_, rowIndex) => rowIndex + 1).map((row) => (
                        <div key={row} className="flex items-center">
                          <div className="w-8 text-center font-medium">{row}</div>
                          <div className="grid grid-cols-7 gap-2 w-full max-w-md">
                            {["A", "B", "C", "", "D", "E", "F"].map((col, colIndex) => {
                              if (col === "") return <div key={colIndex} className="w-6"></div>

                              const seatId = `${row}${col}`
                              const seat = seats.find((s) => s.id === seatId)

                              if (!seat) return null

                              return (
                                <TooltipProvider key={colIndex}>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <button
                                        className={`w-8 h-8 rounded flex items-center justify-center text-xs
                                          ${
                                            !seat.isAvailable
                                              ? "bg-muted cursor-not-allowed"
                                              : selectedSeat === seatId
                                                ? "bg-primary text-primary-foreground border border-primary"
                                                : seat.isExit
                                                  ? "bg-yellow-100 border border-yellow-500 hover:bg-yellow-200"
                                                  : "border border-primary bg-primary/20 hover:bg-primary/30"
                                          }`}
                                        onClick={() => seat.isAvailable && handleSeatSelect(seatId)}
                                        disabled={!seat.isAvailable}
                                      >
                                        {col}
                                      </button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <div className="text-sm">
                                        <p>Seat {seatId}</p>
                                        <p>{seat.isWindow ? "Window" : seat.isAisle ? "Aisle" : "Middle"}</p>
                                        {seat.isExit && <p>Exit Row</p>}
                                        <p className="font-medium">${seat.price}</p>
                                      </div>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )
                            })}
                          </div>
                          <div className="w-8 text-center font-medium">{row}</div>
                        </div>
                      ))}
                    </div>

                    {/* Plane tail */}
                    <div className="flex justify-center mt-8">
                      <div className="w-24 h-24 rounded-b-full border-2 border-t-0 border-gray-300"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Flight Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Flight Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                      <Plane className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{flightDetails.airline}</p>
                      <p className="text-sm text-muted-foreground">{flightDetails.flightNumber}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-[auto_1fr_auto] gap-2 items-center">
                    <div>
                      <p className="text-lg font-bold">{flightDetails.departure.time}</p>
                      <p className="text-sm text-muted-foreground">{flightDetails.departure.date}</p>
                    </div>
                    <div className="flex flex-col items-center px-2">
                      <p className="text-xs text-muted-foreground">{flightDetails.duration}</p>
                      <div className="relative w-full h-px bg-border my-1">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary"></div>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary"></div>
                      </div>
                      <p className="text-xs text-muted-foreground">Nonstop</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold">{flightDetails.arrival.time}</p>
                      <p className="text-sm text-muted-foreground">{flightDetails.arrival.date}</p>
                    </div>
                  </div>

                  <div className="flex justify-between pt-2">
                    <div>
                      <p className="text-sm font-medium">
                        {flightDetails.departure.city} ({flightDetails.departure.airport})
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {flightDetails.arrival.city} ({flightDetails.arrival.airport})
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex justify-between mb-1">
                      <span>Base fare</span>
                      <span>${flightDetails.price.toFixed(2)}</span>
                    </div>
                    {selectedSeat && (
                      <div className="flex justify-between mb-1">
                        <span>Seat {selectedSeat}</span>
                        <span>${seats.find((s) => s.id === selectedSeat)?.price.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold pt-2 border-t mt-2">
                      <span>Total</span>
                      <span>${calculateTotal()}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={nextStep} disabled={!selectedSeat}>
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
                  <Button variant="outline" size="sm" className="w-full">
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
                  <CardTitle>Select In-flight Meals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mealOptions.map((meal) => (
                      <div
                        key={meal.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors
                          ${selectedMeals.includes(meal.id) ? "border-primary bg-primary/5" : "hover:border-primary/50"}`}
                        onClick={() => handleMealToggle(meal.id)}
                      >
                        <div className="flex">
                          <div className="relative w-20 h-20 rounded overflow-hidden mr-4">
                            <Image
                              src={meal.image || "/placeholder.svg"}
                              alt={meal.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium">{meal.name}</h3>
                              <div
                                className={`w-5 h-5 rounded-full border flex items-center justify-center
                                ${selectedMeals.includes(meal.id) ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground"}`}
                              >
                                {selectedMeals.includes(meal.id) && <Check className="h-3 w-3" />}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{meal.description}</p>
                            <div className="flex justify-between items-center">
                              <div className="flex gap-1">
                                {meal.dietary.map((diet) => (
                                  <Badge key={diet} variant="outline" className="text-xs">
                                    {diet}
                                  </Badge>
                                ))}
                              </div>
                              <p className="font-medium">${meal.price.toFixed(2)}</p>
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
                  <CardTitle>Select Beverages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {beverageOptions.map((beverage) => (
                      <div
                        key={beverage.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors
                          ${selectedBeverages.includes(beverage.id) ? "border-primary bg-primary/5" : "hover:border-primary/50"}`}
                        onClick={() => handleBeverageToggle(beverage.id)}
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className="relative w-16 h-16 rounded-full overflow-hidden mb-3">
                            <Image
                              src={beverage.image || "/placeholder.svg"}
                              alt={beverage.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <h3 className="font-medium mb-1">{beverage.name}</h3>
                          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{beverage.description}</p>
                          <p className="font-medium">${beverage.price.toFixed(2)}</p>
                          <div
                            className={`mt-2 w-5 h-5 rounded-full border flex items-center justify-center
                            ${selectedBeverages.includes(beverage.id) ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground"}`}
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
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                      <Plane className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{flightDetails.airline}</p>
                      <p className="text-sm text-muted-foreground">{flightDetails.flightNumber}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex justify-between mb-1">
                      <span>Base fare</span>
                      <span>${flightDetails.price.toFixed(2)}</span>
                    </div>
                    {selectedSeat && (
                      <div className="flex justify-between mb-1">
                        <span>Seat {selectedSeat}</span>
                        <span>${seats.find((s) => s.id === selectedSeat)?.price.toFixed(2)}</span>
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
                      <span>${calculateTotal()}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                  <Button className="w-full" onClick={nextStep}>
                    Continue to Payment
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="w-full" onClick={prevStep}>
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back to Seat Selection
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center">
                    <Info className="h-4 w-4 mr-2" />
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
              <Card>
                <CardHeader>
                  <CardTitle>Review Your Booking</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center mr-3">
                        <Plane className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {flightDetails.airline} {flightDetails.flightNumber}
                        </p>
                        <p className="text-sm text-muted-foreground">{flightDetails.departure.date}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-[auto_1fr_auto] gap-2 items-center">
                      <div>
                        <p className="text-lg font-bold">{flightDetails.departure.time}</p>
                        <p className="text-sm font-medium">{flightDetails.departure.city}</p>
                        <p className="text-xs text-muted-foreground">{flightDetails.departure.airport}</p>
                      </div>
                      <div className="flex flex-col items-center px-2">
                        <p className="text-xs text-muted-foreground">{flightDetails.duration}</p>
                        <div className="relative w-full h-px bg-border my-1">
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary"></div>
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary"></div>
                        </div>
                        <p className="text-xs text-muted-foreground">Nonstop</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold">{flightDetails.arrival.time}</p>
                        <p className="text-sm font-medium">{flightDetails.arrival.city}</p>
                        <p className="text-xs text-muted-foreground">{flightDetails.arrival.airport}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2 flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        Passenger
                      </h3>
                      <p className="text-sm">John Doe</p>
                      <p className="text-xs text-muted-foreground">Adult</p>
                    </div>

                    {selectedSeat && (
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium mb-2 flex items-center">
                          <Plane className="h-4 w-4 mr-2" />
                          Seat
                        </h3>
                        <p className="text-sm">Seat {selectedSeat}</p>
                        <p className="text-xs text-muted-foreground">
                          {seats.find((s) => s.id === selectedSeat)?.isWindow
                            ? "Window"
                            : seats.find((s) => s.id === selectedSeat)?.isAisle
                              ? "Aisle"
                              : "Middle"}
                        </p>
                      </div>
                    )}

                    {(selectedMeals.length > 0 || selectedBeverages.length > 0) && (
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium mb-2 flex items-center">
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
                    <h3 className="font-medium mb-4">Payment Method</h3>
                    <Tabs defaultValue="card">
                      <TabsList className="grid w-full grid-cols-3 mb-4">
                        <TabsTrigger value="card">Credit Card</TabsTrigger>
                        <TabsTrigger value="paypal">PayPal</TabsTrigger>
                        <TabsTrigger value="apple">Apple Pay</TabsTrigger>
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
                        <Button>Continue with PayPal</Button>
                      </TabsContent>
                      <TabsContent value="apple" className="text-center py-6">
                        <p className="mb-4">You will be redirected to Apple Pay to complete your payment.</p>
                        <Button>Continue with Apple Pay</Button>
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
                  <CardTitle>Price Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="pt-2">
                    <div className="flex justify-between mb-1">
                      <span>Base fare</span>
                      <span>${flightDetails.price.toFixed(2)}</span>
                    </div>
                    {selectedSeat && (
                      <div className="flex justify-between mb-1">
                        <span>Seat {selectedSeat}</span>
                        <span>${seats.find((s) => s.id === selectedSeat)?.price.toFixed(2)}</span>
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
                      <span>${calculateTotal()}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                  <Button className="w-full">Confirm and Pay ${calculateTotal()}</Button>
                  <Button variant="outline" className="w-full" onClick={prevStep}>
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
