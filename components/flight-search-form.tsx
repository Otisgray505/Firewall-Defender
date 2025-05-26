"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, PlaneTakeoff } from "lucide-react"
import Link from "next/link"

interface FlightSearchFormProps {
  isOneWay?: boolean
}

export default function FlightSearchForm({ isOneWay = false }: FlightSearchFormProps) {
  const [departureDate, setDepartureDate] = useState<Date>()
  const [returnDate, setReturnDate] = useState<Date>()

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
      <div className="space-y-2">
        <Label htmlFor="departure">Departure Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal" id="departure">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {departureDate ? format(departureDate, "PPP") : <span>Select date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={departureDate} onSelect={setDepartureDate} initialFocus />
          </PopoverContent>
        </Popover>
      </div>
      {!isOneWay && (
        <div className="space-y-2">
          <Label htmlFor="return">Return Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal" id="return">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {returnDate ? format(returnDate, "PPP") : <span>Select date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={returnDate} onSelect={setReturnDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
      )}
      {isOneWay && (
        <div className="space-y-2">
          <Label htmlFor="passengers">Passengers</Label>
          <Select defaultValue="1">
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
      )}
      <div className="space-y-2 md:col-span-2 lg:col-span-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="passengers">Passengers</Label>
            <Select defaultValue="1">
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
            <Select defaultValue="economy">
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
          <div className="flex items-end">
            <Button className="w-full" size="lg" asChild>
              <Link href="/booking/search">
                <PlaneTakeoff className="mr-2 h-4 w-4" />
                Search Flights
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
