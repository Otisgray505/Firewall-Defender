"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "New York",
    quote:
      "The service was impeccable, and the comfort level exceeded my expectations. Will definitely fly with FlyDreamAir again!",
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
]

export default function TestimonialsSection() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Don't render anything on the server
  if (!isMounted) {
    return null
  }

  return (
    <section className="py-8 sm:py-12 md:py-16">
      <div className="container px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 sm:mb-12 md:mb-16">
          <div className="space-y-2 max-w-4xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-accentPurple">
              What Our Passengers Say
            </h2>
            <p className="max-w-[700px] text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl mx-auto">
              Hear from travelers who have experienced the FlyDreamAir difference
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="overflow-hidden h-full">
              <CardContent className="p-4 sm:p-6 h-full flex flex-col">
                <div className="flex items-center mb-4">
                  {Array(5)
                    .fill(null)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 sm:h-5 sm:w-5 ${
                          i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                </div>
                <p className="italic mb-4 flex-grow text-sm sm:text-base">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-subtlePurple flex items-center justify-center mr-3">
                    <span className="text-xs sm:text-sm font-medium text-accentPurple">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-sm sm:text-base">{testimonial.name}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
