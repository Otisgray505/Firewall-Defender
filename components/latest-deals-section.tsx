[⚠️ Suspicious Content] "use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plane, Clock, TrendingDown } from "lucide-react"
import Link from "next/link"

interface Deal {
  id: string
  title: string
  description: string
  originalPrice: number
  salePrice: number
  discount: number
  destination: string
  validUntil: string
  featured: boolean
}

export default function LatestDealsSection() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    async function fetchDeals() {
      try {
        setLoading(true)
        // Use a try-catch block for fetch to avoid uncaught errors
        try {
          const response = await fetch("/api/latest-deals")
          if (!response.ok) {
            throw new Error("Failed to fetch deals")
          }
          const data = await response.json()
          setDeals(data.deals || [])
        } catch (err) {
          console.log("Using fallback deals data")
          // Fallback deals data
          const fallbackDeals: Deal[] = [
            {
              id: "1",
              title: "Flash Sale",
              description: "Limited time offer on selected routes",
              originalPrice: 599,
              salePrice: 399,
              discount: 33,
              destination: "Singapore",
              validUntil: "2024-12-31",
              featured: true,
            },
            {
              id: "2",
              title: "Family Package",
              description: "Special rates for family bookings",
              originalPrice: 1200,
              salePrice: 899,
              discount: 25,
              destination: "Sydney",
              validUntil: "2024-12-25",
              featured: false,
            },
          ]
          setDeals(fallbackDeals)
        }
      } finally {
        setLoading(false)
      }
    }

    if (isMounted) {
      fetchDeals()
    }
  }, [isMounted])

  // Don't render anything on the server
  if (!isMounted) {
    return (
      <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-r from-primaryBlue/5 to-accentPurple/5">
        <div className="container px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="h-8 sm:h-10 bg-muted rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-muted rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-4">
                    <div className="h-6 bg-muted rounded animate-pulse"></div>
                    <div className="h-4 bg-muted rounded animate-pulse"></div>
                    <div className="h-8 bg-muted rounded animate-pulse"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (loading) {
    return (
      <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-r from-primaryBlue/5 to-accentPurple/5">
        <div className="container px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="h-8 sm:h-10 bg-muted rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-muted rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-4">
                    <div className="h-6 bg-muted rounded animate-pulse"></div>
                    <div className="h-4 bg-muted rounded animate-pulse"></div>
                    <div className="h-8 bg-muted rounded animate-pulse"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error || deals.length === 0) {
    return null // Don't show section if there's an error or no deals
  }

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-r from-primaryBlue/5 to-accentPurple/5">
      <div className="container px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 sm:mb-12 md:mb-16">
          <div className="space-y-2 max-w-4xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-accentPurple">
              Latest Flight Deals
            </h2>
            <p className="max-w-[700px] text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl mx-auto">
              Exclusive offers updated in real-time for the best travel experiences
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
          {deals.map((deal) => (
            <Card
              key={deal.id}
              className={`overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
                deal.featured ? "ring-2 ring-primaryBlue/20 shadow-lg" : ""
              }`}
            >
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-4">
                  {deal.featured && (
                    <Badge className="bg-primaryBlue text-white text-xs sm:text-sm">
                      <TrendingDown className="w-3 h-3 mr-1" />
                      Featured Deal
                    </Badge>
                  )}

                  <div className="space-y-2">
                    <h3 className="text-lg sm:text-xl font-bold text-accentPurple">{deal.title}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">{deal.description}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Plane className="w-4 h-4 text-primaryBlue" />
                      <span className="text-sm sm:text-base font-medium">{deal.destination}</span>
                    </div>
                    <Badge variant="outline" className="text-xs sm:text-sm">
                      {deal.discount}% OFF
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-xs sm:text-sm text-muted-foreground line-through">${deal.originalPrice}</p>
                        <p className="text-xl sm:text-2xl font-bold text-primaryBlue">${deal.salePrice}</p>
                      </div>
                      <Button size="sm" className="bg-primaryBlue hover:bg-secondaryBlue text-xs sm:text-sm" asChild>
                        <Link href={`/booking?destination=${deal.destination}`}>Book Now</Link>
                      </Button>
                    </div>

                    <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                      <Clock className="w-3 h-3 mr-1" />
                      Valid until {new Date(deal.validUntil).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <Button
            variant="outline"
            size="lg"
            asChild
            className="border-primaryBlue text-primaryBlue hover:bg-primaryBlue hover:text-white text-sm sm:text-base"
          >
            <Link href="/deals">View All Deals</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
