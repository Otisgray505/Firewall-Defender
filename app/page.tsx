import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { MapPin } from "lucide-react"
import FlightSearchForm from "@/components/flight-search-form"
import { getPopularDestinations } from "@/lib/services/destinations"
import dynamic from "next/dynamic"

// Add dynamic content component
import LatestDealsSection from "@/components/latest-deals-section"

// Dynamic imports for better performance
const TestimonialsSection = dynamic(() => import("@/components/testimonials-section"), {
  ssr: false,
  loading: () => (
    <section className="py-8 sm:py-12 md:py-16">
      <div className="container px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <div className="h-8 sm:h-10 bg-muted rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-4 bg-muted rounded w-96 mx-auto animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-64 bg-muted rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    </section>
  ),
})

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

export default async function Home() {
  // Try to get popular destinations from database, fallback to static data
  let popularDestinations = []

  try {
    popularDestinations = await getPopularDestinations()
  } catch (error) {
    console.log("Database not initialized, using fallback data")
    popularDestinations = []
  }

  // Use fallback data if database is empty or not available
  const featuredDestinations = popularDestinations.length > 0 ? popularDestinations.slice(0, 6) : fallbackDestinations

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
        <Image
          src="/images/airplane-hero.jpg"
          alt="FlyDreamAir airplane flying through clouds"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center justify-center">
          <div className="container px-4 sm:px-6 md:px-8 max-w-7xl mx-auto text-center sm:text-left">
            <div className="max-w-2xl mx-auto sm:mx-0 space-y-4 sm:space-y-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter text-white text-center sm:text-left">
                Soar Beyond Expectations
              </h1>
              <p className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl max-w-xl mx-auto sm:mx-0 text-center sm:text-left">
                Experience premium comfort, exceptional service, and unforgettable journeys with FlyDreamAir.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center sm:justify-start">
                <Button size="lg" asChild className="w-full sm:w-auto bg-primaryBlue hover:bg-secondaryBlue">
                  <Link href="/booking">Book Now</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20 w-full sm:w-auto"
                  asChild
                >
                  <Link href="/destinations">Explore Destinations</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flight Search Section */}
      <section className="relative z-10 -mt-8 sm:-mt-12 md:-mt-16 mb-8 sm:mb-12">
        <div className="container px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
          <Card className="shadow-lg">
            <CardContent className="p-4 sm:p-6 md:p-8">
              <Tabs defaultValue="round-trip">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger
                    value="round-trip"
                    className="text-xs sm:text-sm data-[state=active]:bg-primaryBlue data-[state=active]:text-white"
                  >
                    Round Trip
                  </TabsTrigger>
                  <TabsTrigger
                    value="one-way"
                    className="text-xs sm:text-sm data-[state=active]:bg-primaryBlue data-[state=active]:text-white"
                  >
                    One Way
                  </TabsTrigger>
                  <TabsTrigger
                    value="multi-city"
                    className="text-xs sm:text-sm data-[state=active]:bg-primaryBlue data-[state=active]:text-white"
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
                  <div className="text-center py-6 md:py-8">
                    <p className="text-sm md:text-base mb-4">
                      For multi-city bookings, please use our advanced search option.
                    </p>
                    <Button className="w-full sm:w-auto bg-primaryBlue hover:bg-secondaryBlue" asChild>
                      <Link href="/booking/multi-city">Advanced Search</Link>
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Database Initialization Notice */}
      {popularDestinations.length === 0 && (
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

      {/* Latest Deals Section */}
      <LatestDealsSection />

      {/* Featured Destinations */}
      <section className="py-8 sm:py-12 md:py-16 bg-subtlePurple/30">
        <div className="container px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 sm:mb-12 md:mb-16">
            <div className="space-y-2 max-w-4xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-accentPurple">
                Popular Destinations
              </h2>
              <p className="max-w-[700px] text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl mx-auto">
                Discover our most sought-after destinations and special offers
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
            {featuredDestinations.map((destination) => (
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
                    <h3 className="text-lg font-bold text-accentPurple">{destination.name}</h3>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-primaryBlue" />
                      <span className="text-sm text-muted-foreground">{destination.country}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{destination.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm text-muted-foreground">From</span>
                      <p className="text-lg font-bold text-primaryBlue">$399</p>
                    </div>
                    <Button size="sm" asChild className="bg-primaryBlue hover:bg-secondaryBlue">
                      <Link href={`/booking?destination=${destination.code}`}>Book Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-6 md:mt-8">
            <Button
              variant="outline"
              asChild
              className="w-full sm:w-auto border-primaryBlue text-primaryBlue hover:bg-primaryBlue hover:text-white"
            >
              <Link href="/destinations">View All Destinations</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Newsletter */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="container px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
          <div className="rounded-lg bg-subtlePurple p-6 sm:p-8 md:p-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tighter text-accentPurple">
                  Stay Updated with Special Offers
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
                  Subscribe to our newsletter and be the first to know about exclusive deals and promotions.
                </p>
              </div>
              <div className="w-full max-w-md space-y-2">
                <form className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 h-10 sm:h-11 text-sm sm:text-base"
                  />
                  <Button
                    type="submit"
                    className="w-full sm:w-auto bg-primaryBlue hover:bg-secondaryBlue h-10 sm:h-11 text-sm sm:text-base"
                  >
                    Subscribe
                  </Button>
                </form>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  By subscribing, you agree to our{" "}
                  <Link href="/terms" className="underline underline-offset-2 text-primaryBlue">
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="underline underline-offset-2 text-primaryBlue">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
