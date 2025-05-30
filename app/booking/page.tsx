"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, PlaneTakeoff, Search, Users, MapPin } from "lucide-react"
import FlightSearchForm from "@/components/flight-search-form"
import { getPopularDestinations } from "@/lib/services/destinations"
import type { Destination } from "@/lib/database-schema"

// Fallback destinations data
const fallbackDestinations = [
  {
    id: "dest-7",
    code: "SGN",
    name: "Ho Chi Minh City",
    city: "Ho Chi Minh City",
    country: "Vietnam",
    airport_code: "SGN",
    image_url:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ho%20Chi%20Minh.png-KqGC6M8cteHUG8KZR7shY8cjRtDRAy.jpeg",
    description: "Vibrant Vietnamese city with rich culture and delicious cuisine",
    popular: true,
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "dest-8",
    code: "CTS",
    name: "Hokkaido",
    city: "Sapporo",
    country: "Japan",
    airport_code: "CTS",
    image_url:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hokkaido.png-E9pEEI75VP4ztrtOlmwywu2YPxFkbu.jpeg",
    description: "Beautiful Japanese island with stunning natural landscapes",
    popular: true,
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "dest-10",
    code: "PER",
    name: "Perth",
    city: "Perth",
    country: "Australia",
    airport_code: "PER",
    image_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Perth.png-VrSvNlqBnuIdkTkdXJ0ciAD0BgFVyu.jpeg",
    description: "Western Australian gem with beautiful parks and modern architecture",
    popular: true,
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "dest-11",
    code: "SAN",
    name: "California",
    city: "San Diego",
    country: "United States",
    airport_code: "SAN",
    image_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/California-fiQCWL8P17X6yNuMnm4ht2xJaLtcSF.png",
    description: "Sunny California coast with perfect weather year-round",
    popular: true,
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "dest-9",
    code: "DPS",
    name: "Bali",
    city: "Denpasar",
    country: "Indonesia",
    airport_code: "DPS",
    image_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bali.png-LixO5flVXiVFPFhqZM2Xo0KrKFviBS.jpeg",
    description: "Tropical paradise with ancient temples and pristine beaches",
    popular: true,
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "dest-12",
    code: "YYZ",
    name: "Toronto",
    city: "Toronto",
    country: "Canada",
    airport_code: "YYZ",
    image_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Toronto-GPX7NwolidRoWxv0If6JS1UKr7JfOn.png",
    description: "Canadian cultural hub with iconic CN Tower and diverse neighborhoods",
    popular: true,
    created_at: "2023-01-01T00:00:00Z",
  },
]

export default function BookingPage() {
  const [popularDestinations, setPopularDestinations] = useState<Destination[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [usingFallbackData, setUsingFallbackData] = useState(false)

  useEffect(() => {
    async function fetchDestinations() {
      setIsLoading(true)
      try {
        const destinations = await getPopularDestinations()
        if (destinations.length > 0) {
          setPopularDestinations(destinations.slice(0, 6))
          setUsingFallbackData(false)
        } else {
          setPopularDestinations(fallbackDestinations)
          setUsingFallbackData(true)
        }
      } catch (error) {
        console.log("Database not initialized, using fallback data")
        setPopularDestinations(fallbackDestinations)
        setUsingFallbackData(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDestinations()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] overflow-hidden">
        <Image
          src="/images/airplane-hero.jpg"
          alt="Airplane flying over clouds"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="container px-4 sm:px-6 md:px-8 text-center">
            <div className="max-w-2xl mx-auto space-y-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-white">
                Book Your Flight
              </h1>
              <p className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl">
                Find the perfect flight for your next journey with FlyDreamAir
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Database Initialization Notice */}
      {usingFallbackData && (
        <section className="py-4 bg-yellow-50 border-b">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                <p className="text-sm text-yellow-800">
                  Database not initialized. Visit the{" "}
                  <Link href="/admin" className="underline font-medium">
                    admin panel
                  </Link>{" "}
                  to set up the database with sample data.
                </p>
              </div>
              <Button size="sm" variant="outline" asChild className="border-yellow-500 text-yellow-700">
                <Link href="/admin">Initialize Database</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Booking Form */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="container px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-xl sm:text-2xl md:text-3xl">Search Flights</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 md:p-8">
              <Tabs defaultValue="round-trip">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger
                    value="round-trip"
                    className="data-[state=active]:bg-primaryBlue data-[state=active]:text-white"
                  >
                    Round Trip
                  </TabsTrigger>
                  <TabsTrigger
                    value="one-way"
                    className="data-[state=active]:bg-primaryBlue data-[state=active]:text-white"
                  >
                    One Way
                  </TabsTrigger>
                  <TabsTrigger
                    value="multi-city"
                    className="data-[state=active]:bg-primaryBlue data-[state=active]:text-white"
                  >
                    Multi-City
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="round-trip">
                  <FlightSearchForm />
                </TabsContent>
                <TabsContent value="one-way">
                  <FlightSearchForm isOneWay />
                </TabsContent>
                <TabsContent value="multi-city">
                  <div className="text-center py-8">
                    <h3 className="text-xl font-bold mb-2">Plan a Complex Itinerary</h3>
                    <p className="text-muted-foreground mb-6">
                      For multi-city bookings with multiple stops, use our advanced search tool
                    </p>
                    <Button size="lg" asChild className="bg-primaryBlue hover:bg-secondaryBlue">
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
      </section>

      {/* Popular Destinations */}
      <section className="py-8 sm:py-12 md:py-16 bg-subtlePurple/30">
        <div className="container px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 sm:mb-12 md:mb-16">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-accentPurple">
                Popular Destinations
              </h2>
              <p className="max-w-[700px] text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl mx-auto">
                Discover our most sought-after destinations and book your next adventure
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="relative h-48 sm:h-52 md:h-56 bg-muted animate-pulse"></div>
                  <CardContent className="p-4 sm:p-6">
                    <div className="space-y-2">
                      <div className="h-6 bg-muted rounded animate-pulse"></div>
                      <div className="h-4 bg-muted rounded animate-pulse"></div>
                      <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
              {popularDestinations.map((destination) => (
                <Card key={destination.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48 sm:h-52 md:h-56">
                    <Image
                      src={destination.image_url || "/placeholder.svg"}
                      alt={`${destination.name} cityscape`}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-accentPurple">
                        {destination.name}
                      </h3>
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-primaryBlue" />
                        <span className="text-xs sm:text-sm text-muted-foreground">{destination.country}</span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-4">{destination.description}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-xs sm:text-sm text-muted-foreground">From</span>
                        <p className="text-base sm:text-lg md:text-xl font-bold text-primaryBlue">$399</p>
                      </div>
                      <Button size="sm" asChild className="bg-primaryBlue hover:bg-secondaryBlue text-xs sm:text-sm">
                        <Link href={`/booking/search?to=${destination.code}`}>Book Now</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Booking Process */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-accentPurple">How to Book</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">Simple steps to book your perfect flight</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                title: "Search",
                description:
                  "Enter your travel details, including origin, destination, dates, and number of passengers.",
                icon: <Search className="h-10 w-10 text-primaryBlue" />,
              },
              {
                title: "Select",
                description: "Choose from available flights based on price, schedule, and cabin class preferences.",
                icon: <PlaneTakeoff className="h-10 w-10 text-primaryBlue" />,
              },
              {
                title: "Customize",
                description: "Add extras like seat selection, baggage, and in-flight services to enhance your journey.",
                icon: <Users className="h-10 w-10 text-primaryBlue" />,
              },
              {
                title: "Pay",
                description: "Complete your booking with our secure payment system and receive instant confirmation.",
                icon: <CreditCard className="h-10 w-10 text-primaryBlue" />,
              },
            ].map((step, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="rounded-full bg-subtlePurple p-3 mb-4">{step.icon}</div>
                  <h3 className="text-lg font-bold mb-2 text-accentPurple">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-primaryBlue text-white">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">Ready to Take Off?</h2>
          <p className="max-w-[700px] mx-auto mb-6 md:text-xl">
            Book your flight today and experience the FlyDreamAir difference.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="#top">Search Flights Now</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
