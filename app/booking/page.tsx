"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Clock, CreditCard, PlaneTakeoff, Search, Users } from "lucide-react"

export default function BookingPage() {
  const [departureDate, setDepartureDate] = useState<Date>()
  const [returnDate, setReturnDate] = useState<Date>()
  const [passengers, setPassengers] = useState("1")
  const [cabinClass, setCabinClass] = useState("economy")

  return (
    <div className="center-layout min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[300px] overflow-hidden">
        <Image
          src="/placeholder.svg?height=300&width=1920"
          alt="Airplane flying over clouds"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="section-container">
            <div className="content-center max-w-2xl space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Book Your Flight
              </h1>
              <p className="text-white/90 md:text-xl">Find the perfect flight for your next journey with AirDreamFly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12">
        <div className="section-container">
          <div className="center-layout">
            <Card className="shadow-lg w-full max-w-4xl">
              <CardHeader>
                <CardTitle className="text-center">Search Flights</CardTitle>
              </CardHeader>
              <CardContent>
              <Tabs defaultValue="round-trip">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="round-trip">Round Trip</TabsTrigger>
                  <TabsTrigger value="one-way">One Way</TabsTrigger>
                  <TabsTrigger value="multi-city">Multi-City</TabsTrigger>
                </TabsList>
                <TabsContent value="round-trip">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="from">From</Label>
                        <Select>
                          <SelectTrigger id="from">
                            <SelectValue placeholder="Select departure city" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="nyc">New York (JFK)</SelectItem>
                            <SelectItem value="lax">Los Angeles (LAX)</SelectItem>
                            <SelectItem value="lon">London (LHR)</SelectItem>
                            <SelectItem value="par">Paris (CDG)</SelectItem>
                            <SelectItem value="tok">Tokyo (HND)</SelectItem>
                            <SelectItem value="dub">Dubai (DXB)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="to">To</Label>
                        <Select>
                          <SelectTrigger id="to">
                            <SelectValue placeholder="Select destination city" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="nyc">New York (JFK)</SelectItem>
                            <SelectItem value="lax">Los Angeles (LAX)</SelectItem>
                            <SelectItem value="lon">London (LHR)</SelectItem>
                            <SelectItem value="par">Paris (CDG)</SelectItem>
                            <SelectItem value="tok">Tokyo (HND)</SelectItem>
                            <SelectItem value="dub">Dubai (DXB)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="departure">Departure Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                              id="departure"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {departureDate ? format(departureDate, "PPP") : <span>Select date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={departureDate} onSelect={setDepartureDate} initialFocus />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="return">Return Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                              id="return"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {returnDate ? format(returnDate, "PPP") : <span>Select date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={returnDate} onSelect={setReturnDate} initialFocus />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="passengers">Passengers</Label>
                        <Select value={passengers} onValueChange={setPassengers}>
                          <SelectTrigger id="passengers">
                            <SelectValue placeholder="Select number of passengers" />
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
                        <Label htmlFor="class">Class</Label>
                        <Select value={cabinClass} onValueChange={setCabinClass}>
                          <SelectTrigger id="class">
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
                    </div>
                    <div className="flex justify-end">
                      <Button size="lg" asChild>
                        <Link href="/booking/search">
                          <Search className="mr-2 h-4 w-4" />
                          Search Flights
                        </Link>
                      </Button>
                    </div>
                  </form>
                </TabsContent>
                <TabsContent value="one-way">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="from-one-way">From</Label>
                        <Select>
                          <SelectTrigger id="from-one-way">
                            <SelectValue placeholder="Select departure city" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="nyc">New York (JFK)</SelectItem>
                            <SelectItem value="lax">Los Angeles (LAX)</SelectItem>
                            <SelectItem value="lon">London (LHR)</SelectItem>
                            <SelectItem value="par">Paris (CDG)</SelectItem>
                            <SelectItem value="tok">Tokyo (HND)</SelectItem>
                            <SelectItem value="dub">Dubai (DXB)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="to-one-way">To</Label>
                        <Select>
                          <SelectTrigger id="to-one-way">
                            <SelectValue placeholder="Select destination city" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="nyc">New York (JFK)</SelectItem>
                            <SelectItem value="lax">Los Angeles (LAX)</SelectItem>
                            <SelectItem value="lon">London (LHR)</SelectItem>
                            <SelectItem value="par">Paris (CDG)</SelectItem>
                            <SelectItem value="tok">Tokyo (HND)</SelectItem>
                            <SelectItem value="dub">Dubai (DXB)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="departure-one-way">Departure Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                              id="departure-one-way"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {departureDate ? format(departureDate, "PPP") : <span>Select date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={departureDate} onSelect={setDepartureDate} initialFocus />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="passengers-one-way">Passengers</Label>
                        <Select value={passengers} onValueChange={setPassengers}>
                          <SelectTrigger id="passengers-one-way">
                            <SelectValue placeholder="Select number of passengers" />
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
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="class-one-way">Class</Label>
                        <Select value={cabinClass} onValueChange={setCabinClass}>
                          <SelectTrigger id="class-one-way">
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
                    </div>
                    <div className="flex justify-end">
                      <Button size="lg" asChild>
                        <Link href="/booking/search">
                          <Search className="mr-2 h-4 w-4" />
                          Search Flights
                        </Link>
                      </Button>
                    </div>
                  </form>
                </TabsContent>
                <TabsContent value="multi-city">
                  <div className="text-center py-8">
                    <h3 className="text-xl font-bold mb-2">Plan a Complex Itinerary</h3>
                    <p className="text-muted-foreground mb-6">
                      For multi-city bookings with multiple stops, use our advanced search tool
                    </p>
                    <Button size="lg" asChild>
                      <Link href="/booking/multi-city">
                        <PlaneTakeoff className="mr-2 h-4 w-4" />
                        Advanced Multi-City Search
                      </Link>
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          </div>
        </div>
      </section>

      {/* Booking Process */}
      <section className="py-12 bg-muted">
        <div className="section-container">
          <div className="content-center space-y-4 mb-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">How to Book</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">Simple steps to book your perfect flight</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 justify-items-center">
            {[
              {
                title: "Search",
                description:
                  "Enter your travel details, including origin, destination, dates, and number of passengers.",
                icon: <Search className="h-10 w-10 text-primary" />,
              },
              {
                title: "Select",
                description: "Choose from available flights based on price, schedule, and cabin class preferences.",
                icon: <PlaneTakeoff className="h-10 w-10 text-primary" />,
              },
              {
                title: "Customize",
                description: "Add extras like seat selection, baggage, and in-flight services to enhance your journey.",
                icon: <Users className="h-10 w-10 text-primary" />,
              },
              {
                title: "Pay",
                description: "Complete your booking with our secure payment system and receive instant confirmation.",
                icon: <CreditCard className="h-10 w-10 text-primary" />,
              },
            ].map((step, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="rounded-full bg-primary/10 p-3 mb-4">{step.icon}</div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Special Offers</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Exclusive deals and limited-time promotions
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Early Bird Discount",
                description: "Book at least 60 days in advance and save up to 20% on selected routes.",
                image: "/placeholder.svg?height=200&width=400",
                code: "EARLY20",
                expires: "Valid until December 31, 2023",
              },
              {
                title: "Family Package",
                description: "Special rates for family bookings with children under 12 flying at 50% off.",
                image: "/placeholder.svg?height=200&width=400",
                code: "FAMILY50",
                expires: "Valid for travel between June 1 - August 31, 2023",
              },
              {
                title: "Business Class Upgrade",
                description: "Upgrade to Business Class for just $299 on selected long-haul routes.",
                image: "/placeholder.svg?height=200&width=400",
                code: "UPGRADE299",
                expires: "Limited availability, book now",
              },
            ].map((offer, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative h-48">
                  <Image src={offer.image || "/placeholder.svg"} alt={offer.title} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{offer.description}</p>
                  <div className="bg-muted p-3 rounded-md mb-4">
                    <p className="text-sm font-medium">Promo Code: {offer.code}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      {offer.expires}
                    </div>
                    <Button size="sm" asChild>
                      <Link href="/booking">Book Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Tips */}
      <section className="py-12 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Travel Tips</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Helpful advice for a smooth and enjoyable journey
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Best Time to Book",
                content:
                  "Studies show that booking 6-8 weeks before domestic flights and 3-4 months before international flights often yields the best prices. Tuesday and Wednesday are typically the cheapest days to fly.",
              },
              {
                title: "Packing Essentials",
                content:
                  "Always pack a change of clothes in your carry-on, along with any medications, valuable items, and essential toiletries. Consider packing a travel pillow, eye mask, and noise-canceling headphones for long flights.",
              },
              {
                title: "Airport Arrival",
                content:
                  "Arrive at least 2 hours before domestic flights and 3 hours before international flights. This allows time for check-in, security screening, and any unexpected delays.",
              },
              {
                title: "Stay Hydrated",
                content:
                  "The cabin air on planes is very dry. Drink plenty of water before and during your flight to stay hydrated. Limit alcohol and caffeine as they can contribute to dehydration.",
              },
            ].map((tip, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{tip.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{tip.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Booking FAQs</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Answers to common questions about booking with AirDreamFly
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                question: "Can I change my flight after booking?",
                answer:
                  "Yes, you can change your flight through our website or mobile app. Go to 'Manage Booking' and select the flight you wish to change. Change fees and fare differences may apply depending on your ticket type.",
              },
              {
                question: "What payment methods do you accept?",
                answer:
                  "We accept all major credit and debit cards, PayPal, Apple Pay, Google Pay, and bank transfers for certain markets. Some routes also offer the option to pay in installments through our partner payment providers.",
              },
              {
                question: "How can I select my seat?",
                answer:
                  "Seat selection is available during the booking process or later through 'Manage Booking'. Some fare types include complimentary seat selection, while others may require an additional fee.",
              },
              {
                question: "Do I need to print my boarding pass?",
                answer:
                  "No, you can use our mobile app to access your digital boarding pass. Simply check in online between 24-48 hours before your flight and save your boarding pass to your phone. Paper boarding passes are also available at airport kiosks.",
              },
              {
                question: "What is your cancellation policy?",
                answer:
                  "Cancellation policies vary by fare type. Fully flexible fares can be cancelled with a full refund, while other fares may offer partial refunds or travel credits. Check your fare conditions at the time of booking for specific details.",
              },
              {
                question: "Can I book for someone else?",
                answer:
                  "Yes, you can book flights for other passengers. During the booking process, you'll be asked to enter the passenger details. Make sure to use their name exactly as it appears on their ID or passport.",
              },
            ].map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">Ready to Take Off?</h2>
          <p className="max-w-[700px] mx-auto mb-6 md:text-xl">
            Book your flight today and experience the AirDreamFly difference.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="#top">Search Flights Now</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
