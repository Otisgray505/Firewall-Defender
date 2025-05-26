import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { MapPin, Plane, Shield, Star, Utensils } from "lucide-react"
import FlightSearchForm from "@/components/flight-search-form"

export default function Home() {
  return (
    <div className="center-layout min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] overflow-hidden">
        <Image
          src="/placeholder.svg?height=600&width=1920"
          alt="Airplane flying over beautiful landscape"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center justify-center">
          <div className="section-container">
            <div className="content-center max-w-2xl space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-white">
                Soar Beyond Expectations
              </h1>
              <p className="text-white/90 md:text-xl">
                Experience premium comfort, exceptional service, and unforgettable journeys with AirDreamFly.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" asChild>
                  <Link href="/booking">Book Now</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20"
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
      <section className="relative z-10 -mt-16 mb-12 section-container">
        <div className="center-layout">
          <Card className="shadow-lg w-full max-w-4xl">
            <CardContent className="p-6">
              <Tabs defaultValue="round-trip">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="round-trip">Round Trip</TabsTrigger>
                  <TabsTrigger value="one-way">One Way</TabsTrigger>
                  <TabsTrigger value="multi-city">Multi-City</TabsTrigger>
                </TabsList>
                <TabsContent value="round-trip">
                  <FlightSearchForm />
                </TabsContent>
                <TabsContent value="one-way">
                  <FlightSearchForm isOneWay />
                </TabsContent>
                <TabsContent value="multi-city">
                  <div className="text-center py-4">
                    <p>For multi-city bookings, please use our advanced search option.</p>
                    <Button className="mt-2" asChild>
                      <Link href="/booking/multi-city">Advanced Search</Link>
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-12 bg-muted/50">
        <div className="section-container">
          <div className="content-center space-y-4 mb-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Popular Destinations</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Discover our most sought-after destinations and special offers
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {[
              { name: "Paris", image: "/placeholder.svg?height=300&width=400", price: "299" },
              { name: "Tokyo", image: "/placeholder.svg?height=300&width=400", price: "799" },
              { name: "New York", image: "/placeholder.svg?height=300&width=400", price: "349" },
              { name: "Sydney", image: "/placeholder.svg?height=300&width=400", price: "899" },
              { name: "Dubai", image: "/placeholder.svg?height=300&width=400", price: "499" },
              { name: "Rome", image: "/placeholder.svg?height=300&width=400", price: "329" },
            ].map((destination, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={destination.image || "/placeholder.svg"}
                    alt={`${destination.name} cityscape`}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold">{destination.name}</h3>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Popular</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">Experience the magic of {destination.name}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm text-muted-foreground">From</span>
                      <p className="text-lg font-bold">${destination.price}</p>
                    </div>
                    <Button size="sm" asChild>
                      <Link href={`/booking?destination=${destination.name}`}>Book Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Button variant="outline" asChild>
              <Link href="/destinations">View All Destinations</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Fly With Us</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Experience the AirDreamFly difference with our premium services
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {[
              {
                title: "Premium Comfort",
                description: "Spacious seating and luxurious amenities for a comfortable journey",
                icon: <Plane className="h-10 w-10 text-primary" />,
              },
              {
                title: "Gourmet Dining",
                description: "Exquisite meals prepared by top chefs using fresh ingredients",
                icon: <Utensils className="h-10 w-10 text-primary" />,
              },
              {
                title: "Safety First",
                description: "State-of-the-art aircraft and rigorous safety protocols",
                icon: <Shield className="h-10 w-10 text-primary" />,
              },
              {
                title: "Award-Winning Service",
                description: "Attentive and personalized service from our dedicated crew",
                icon: <Star className="h-10 w-10 text-primary" />,
              },
            ].map((service, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Loyalty Program */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Join Our Loyalty Program</h2>
              <p className="md:text-xl">
                Earn miles with every flight and enjoy exclusive benefits, upgrades, and rewards.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="mr-2 h-4 w-4 rounded-full bg-primary-foreground flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  Priority boarding and check-in
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-4 w-4 rounded-full bg-primary-foreground flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  Access to exclusive lounges
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-4 w-4 rounded-full bg-primary-foreground flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  Free upgrades and bonus miles
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-4 w-4 rounded-full bg-primary-foreground flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  Partner discounts on hotels and car rentals
                </li>
              </ul>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/loyalty">Join Now</Link>
              </Button>
            </div>
            <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Loyalty program benefits"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Passengers Say</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Hear from travelers who have experienced the AirDreamFly difference
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              {
                name: "Sarah Johnson",
                location: "New York",
                quote:
                  "The service was impeccable, and the comfort level exceeded my expectations. Will definitely fly with AirDreamFly again!",
                rating: 5,
              },
              {
                name: "Michael Chen",
                location: "Singapore",
                quote:
                  "The in-flight dining was a culinary delight. The attention to detail in every aspect of the journey was impressive.",
                rating: 5,
              },
              {
                name: "Emma Rodriguez",
                location: "London",
                quote:
                  "From booking to landing, everything was seamless. The cabin crew was attentive and made the long-haul flight enjoyable.",
                rating: 4,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"
                          }`}
                        />
                      ))}
                  </div>
                  <p className="italic mb-4">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mr-3">
                      <span className="text-sm font-medium">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* App Download */}
      <section className="py-12 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Download Our Mobile App</h2>
              <p className="md:text-xl text-muted-foreground">
                Manage your bookings, check in, access boarding passes, and more with our convenient mobile app.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="flex items-center gap-2" asChild>
                  <Link href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M12 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.5" />
                      <path d="M16 19h6" />
                      <path d="M19 16v6" />
                    </svg>
                    App Store
                  </Link>
                </Button>
                <Button className="flex items-center gap-2" asChild>
                  <Link href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M3 6.5h.003M6 6.5h12M19 6.5h.003M5 12.5h.003M8 12.5h9M18 12.5h.003M10 18.5h.003M13 18.5h.003M16 18.5h.003" />
                    </svg>
                    Google Play
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] md:h-[500px]">
              <Image
                src="/placeholder.svg?height=500&width=300"
                alt="AirDreamFly mobile app"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="rounded-lg bg-muted p-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Stay Updated with Special Offers</h2>
                <p className="text-muted-foreground">
                  Subscribe to our newsletter and be the first to know about exclusive deals and promotions.
                </p>
              </div>
              <div className="w-full max-w-md space-y-2">
                <form className="flex space-x-2">
                  <Input type="email" placeholder="Enter your email" className="max-w-lg flex-1" />
                  <Button type="submit">Subscribe</Button>
                </form>
                <p className="text-xs text-muted-foreground">
                  By subscribing, you agree to our{" "}
                  <Link href="/terms" className="underline underline-offset-2">
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="underline underline-offset-2">
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
