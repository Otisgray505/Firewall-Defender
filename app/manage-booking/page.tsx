"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowRight, Calendar, Check, FileText, Plane, Search, Ticket, User } from "lucide-react"

// Mock booking data
const bookings = [
  {
    id: "BK12345",
    status: "confirmed",
    flights: [
      {
        id: "FL001",
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
      },
      {
        id: "FL002",
        flightNumber: "DF5678",
        departure: {
          airport: "LHR",
          city: "London",
          time: "10:15",
          date: "2023-07-22",
        },
        arrival: {
          airport: "JFK",
          city: "New York",
          time: "13:30",
          date: "2023-07-22",
        },
        duration: "8h 15m",
      },
    ],
    passengers: [
      {
        name: "John Doe",
        type: "Adult",
      },
    ],
    totalPrice: 1298.0,
  },
]

export default function ManageBookingPage() {
  const [bookingReference, setBookingReference] = useState("")
  const [lastName, setLastName] = useState("")
  const [searchResult, setSearchResult] = useState<(typeof bookings)[0] | null>(null)
  const [searchAttempted, setSearchAttempted] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchAttempted(true)

    // Simulate booking search
    if (bookingReference.toUpperCase() === "BK12345" && lastName.toLowerCase() === "doe") {
      setSearchResult(bookings[0])
    } else {
      setSearchResult(null)
    }
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
                Manage Your Booking
              </h1>
              <p className="text-white/90 md:text-xl">View, change, or cancel your reservations with ease</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          {/* Booking Retrieval Form */}
          <Card>
            <CardHeader>
              <CardTitle>Retrieve Your Booking</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="reference">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="reference">Booking Reference</TabsTrigger>
                  <TabsTrigger value="ticket">E-Ticket Number</TabsTrigger>
                </TabsList>
                <TabsContent value="reference">
                  <form onSubmit={handleSearch} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="booking-reference">Booking Reference</Label>
                        <Input
                          id="booking-reference"
                          placeholder="e.g. BK12345"
                          value={bookingReference}
                          onChange={(e) => setBookingReference(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input
                          id="last-name"
                          placeholder="e.g. Smith"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full md:w-auto">
                      <Search className="mr-2 h-4 w-4" />
                      Search
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="ticket">
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="ticket-number">E-Ticket Number</Label>
                        <Input id="ticket-number" placeholder="e.g. 012 3456789012" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ticket-last-name">Last Name</Label>
                        <Input id="ticket-last-name" placeholder="e.g. Smith" required />
                      </div>
                    </div>
                    <Button type="submit" className="w-full md:w-auto">
                      <Search className="mr-2 h-4 w-4" />
                      Search
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              {searchAttempted && (
                <div className="mt-8">
                  {searchResult ? (
                    <div className="space-y-6">
                      <div className="flex items-center text-green-600 bg-green-50 p-3 rounded-md">
                        <Check className="h-5 w-5 mr-2" />
                        <p>Booking found! Details are shown below.</p>
                      </div>

                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-bold">Booking Reference: {searchResult.id}</h3>
                            <p className="text-sm text-muted-foreground">
                              Status: <span className="text-green-600 font-medium">Confirmed</span>
                            </p>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/manage-booking/${searchResult.id}`}>
                              View Details
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>

                        <div className="space-y-4">
                          {searchResult.flights.map((flight, index) => (
                            <div key={flight.id} className="border-t pt-4">
                              <p className="text-sm text-muted-foreground mb-2">
                                {index === 0 ? "Outbound" : "Return"} Flight • {flight.flightNumber}
                              </p>
                              <div className="grid grid-cols-[auto_1fr_auto] gap-2 items-center">
                                <div>
                                  <p className="text-lg font-bold">{flight.departure.time}</p>
                                  <p className="text-sm">{flight.departure.date}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {flight.departure.city} ({flight.departure.airport})
                                  </p>
                                </div>
                                <div className="flex flex-col items-center px-2">
                                  <p className="text-xs text-muted-foreground">{flight.duration}</p>
                                  <div className="relative w-full h-px bg-border my-1">
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary"></div>
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary"></div>
                                  </div>
                                  <p className="text-xs text-muted-foreground">Nonstop</p>
                                </div>
                                <div>
                                  <p className="text-lg font-bold">{flight.arrival.time}</p>
                                  <p className="text-sm">{flight.arrival.date}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {flight.arrival.city} ({flight.arrival.airport})
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="border-t mt-4 pt-4">
                          <p className="text-sm text-muted-foreground mb-2">Passengers</p>
                          <div className="space-y-2">
                            {searchResult.passengers.map((passenger, index) => (
                              <div key={index} className="flex items-center">
                                <User className="h-4 w-4 mr-2 text-muted-foreground" />
                                <p>
                                  {passenger.name} ({passenger.type})
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Button variant="outline" className="flex items-center justify-center" asChild>
                          <Link href={`/manage-booking/${searchResult.id}/change`}>
                            <Calendar className="mr-2 h-4 w-4" />
                            Change Flight
                          </Link>
                        </Button>
                        <Button variant="outline" className="flex items-center justify-center" asChild>
                          <Link href={`/manage-booking/${searchResult.id}/seats`}>
                            <Plane className="mr-2 h-4 w-4" />
                            Select Seats
                          </Link>
                        </Button>
                        <Button variant="outline" className="flex items-center justify-center" asChild>
                          <Link href="/check-in">
                            <Ticket className="mr-2 h-4 w-4" />
                            Check-in
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-600 bg-red-50 p-3 rounded-md">
                      <p>No booking found with the provided details. Please check and try again.</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Where can I find my booking reference?</AccordionTrigger>
                    <AccordionContent>
                      Your booking reference is a 6-character code (letters and numbers) that was included in your
                      confirmation email when you made your reservation. It can also be found in your e-ticket.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How can I change my flight?</AccordionTrigger>
                    <AccordionContent>
                      To change your flight, retrieve your booking using your booking reference and last name, then
                      select "Change Flight" option. Changes are subject to fare differences and change fees depending
                      on your ticket type.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>What is the cancellation policy?</AccordionTrigger>
                    <AccordionContent>
                      Cancellation policies vary based on your fare type. After retrieving your booking, you can view
                      the specific cancellation terms that apply to your ticket. Some fares offer full refunds, while
                      others may provide partial refunds or travel credits.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>When can I check in online?</AccordionTrigger>
                    <AccordionContent>
                      Online check-in opens 24 hours before your scheduled departure time and closes 2 hours before
                      departure. After checking in, you can download your boarding pass or have it sent to your email.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger>Can I select my seat after booking?</AccordionTrigger>
                    <AccordionContent>
                      Yes, you can select or change your seat through the "Manage Booking" section. Some fare types
                      include complimentary seat selection, while others may require an additional fee. Premium seats
                      and extra legroom seats are available for an additional charge.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-6">
                    <AccordionTrigger>What if I need to travel with special assistance?</AccordionTrigger>
                    <AccordionContent>
                      If you require special assistance such as wheelchair support, dietary requirements, or traveling
                      with medical equipment, please contact our customer service team at least 48 hours before your
                      flight. We'll ensure all necessary arrangements are made for your comfort and safety.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Travel Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Make sure you have all the necessary travel documents for your journey:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-600" />
                    Valid passport or ID
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-600" />
                    Visa (if required)
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-600" />
                    Boarding pass
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-600" />
                    Travel insurance details
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="w-full" asChild>
                  <Link href="/travel-requirements">View Travel Requirements</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
