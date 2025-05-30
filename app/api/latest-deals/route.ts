import { NextResponse } from "next/server"

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

// Mock deals data - in a real app, this would come from a database
const mockDeals: Deal[] = [
  {
    id: "1",
    title: "Early Bird Special",
    description: "Book 60 days in advance and save big on international flights",
    originalPrice: 899,
    salePrice: 699,
    discount: 22,
    destination: "Tokyo",
    validUntil: "2024-12-31",
    featured: true,
  },
  {
    id: "2",
    title: "Weekend Getaway",
    description: "Perfect for short trips with flexible dates",
    originalPrice: 299,
    salePrice: 199,
    discount: 33,
    destination: "Bali",
    validUntil: "2024-12-15",
    featured: false,
  },
  {
    id: "3",
    title: "Business Class Upgrade",
    description: "Experience luxury travel at an unbeatable price",
    originalPrice: 1299,
    salePrice: 999,
    discount: 23,
    destination: "London",
    validUntil: "2024-12-20",
    featured: true,
  },
  {
    id: "4",
    title: "Family Package",
    description: "Special rates for family bookings with children",
    originalPrice: 1200,
    salePrice: 899,
    discount: 25,
    destination: "Sydney",
    validUntil: "2024-12-25",
    featured: false,
  },
  {
    id: "5",
    title: "Last Minute Deal",
    description: "Spontaneous travel with amazing savings",
    originalPrice: 599,
    salePrice: 399,
    discount: 33,
    destination: "Singapore",
    validUntil: "2024-12-10",
    featured: true,
  },
]

export async function GET() {
  try {
    // Return featured deals first, then others
    const sortedDeals = [...mockDeals].sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return 0
    })

    return NextResponse.json({
      deals: sortedDeals.slice(0, 3), // Return top 3 deals
      success: true,
    })
  } catch (error) {
    console.error("Error in latest-deals API route:", error)
    return NextResponse.json({ error: "Failed to fetch deals", success: false }, { status: 500 })
  }
}
