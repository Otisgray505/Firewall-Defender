"use client"

import React from "react"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Mail, MapPin, Phone, Send, CheckCircle } from "lucide-react"

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setFormSubmitted(true)
    }, 1000)
  }

  return (
    <div className="center-layout min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[300px] overflow-hidden">
        <Image
          src="/placeholder.svg?height=300&width=1920"
          alt="AirDreamFly customer service"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="section-container">
            <div className="content-center max-w-2xl space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">Contact Us</h1>
              <p className="text-white/90 md:text-xl">
                We're here to help with any questions or concerns about your travel experience
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-12">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 justify-items-center">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-primary" />
                  Call Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium">Customer Service</p>
                <p className="text-muted-foreground mb-2">24/7 Support</p>
                <p className="font-medium">+1 (800) 123-4567</p>
                <div className="mt-4">
                  <p className="text-lg font-medium">Reservations</p>
                  <p className="text-muted-foreground mb-2">Daily 6AM - 10PM</p>
                  <p className="font-medium">+1 (800) 987-6543</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-primary" />
                  Email Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium">Customer Support</p>
                <p className="text-muted-foreground mb-2">Response within 24 hours</p>
                <p className="font-medium">support@airdreamfly.com</p>
                <div className="mt-4">
                  <p className="text-lg font-medium">Business Inquiries</p>
                  <p className="text-muted-foreground mb-2">Response within 48 hours</p>
                  <p className="font-medium">business@airdreamfly.com</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-primary" />
                  Live Chat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium">Instant Support</p>
                <p className="text-muted-foreground mb-4">Available 24/7 for immediate assistance</p>
                <Button className="w-full">Start Chat</Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl mb-6">Send Us a Message</h2>

              {formSubmitted ? (
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center p-4">
                      <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                      <h3 className="text-xl font-bold mb-2">Message Sent Successfully!</h3>
                      <p className="text-muted-foreground mb-4">
                        Thank you for contacting AirDreamFly. Our team will get back to you shortly.
                      </p>
                      <Button onClick={() => setFormSubmitted(false)}>Send Another Message</Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="inquiry-type">Inquiry Type</Label>
                    <Select>
                      <SelectTrigger id="inquiry-type">
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="booking">Booking Assistance</SelectItem>
                        <SelectItem value="refund">Refund Request</SelectItem>
                        <SelectItem value="baggage">Baggage Inquiry</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" rows={5} required />
                  </div>
                  <Button type="submit" className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              )}
            </div>

            {/* Office Locations */}
            <div>
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl mb-6">Our Offices</h2>
              <Tabs defaultValue="headquarters">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="headquarters">Headquarters</TabsTrigger>
                  <TabsTrigger value="regional">Regional</TabsTrigger>
                  <TabsTrigger value="international">International</TabsTrigger>
                </TabsList>
                <TabsContent value="headquarters" className="pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Global Headquarters</CardTitle>
                      <CardDescription>New York, United States</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="relative h-[200px] rounded-md overflow-hidden">
                        <Image
                          src="/placeholder.svg?height=200&width=500"
                          alt="AirDreamFly Headquarters"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 mr-2 text-primary mt-0.5" />
                        <p>
                          AirDreamFly Tower
                          <br />
                          123 Aviation Boulevard
                          <br />
                          New York, NY 10001
                          <br />
                          United States
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 mr-2 text-primary" />
                        <p>+1 (212) 555-1234</p>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 mr-2 text-primary" />
                        <p>Monday - Friday: 9AM - 6PM EST</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="regional" className="pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Regional Office</CardTitle>
                      <CardDescription>Los Angeles, United States</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="relative h-[200px] rounded-md overflow-hidden">
                        <Image
                          src="/placeholder.svg?height=200&width=500"
                          alt="AirDreamFly LA Office"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 mr-2 text-primary mt-0.5" />
                        <p>
                          Pacific Aviation Center
                          <br />
                          456 Sunset Boulevard
                          <br />
                          Los Angeles, CA 90001
                          <br />
                          United States
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 mr-2 text-primary" />
                        <p>+1 (310) 555-6789</p>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 mr-2 text-primary" />
                        <p>Monday - Friday: 9AM - 6PM PST</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="international" className="pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>International Office</CardTitle>
                      <CardDescription>London, United Kingdom</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="relative h-[200px] rounded-md overflow-hidden">
                        <Image
                          src="/placeholder.svg?height=200&width=500"
                          alt="AirDreamFly London Office"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 mr-2 text-primary mt-0.5" />
                        <p>
                          Skyline Tower
                          <br />
                          789 Thames Street
                          <br />
                          London, EC4R 3TE
                          <br />
                          United Kingdom
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 mr-2 text-primary" />
                        <p>+44 20 7946 0123</p>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 mr-2 text-primary" />
                        <p>Monday - Friday: 9AM - 6PM GMT</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Frequently Asked Questions</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">Quick answers to common inquiries</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                question: "How can I change or cancel my flight?",
                answer:
                  "You can change or cancel your flight through our website by logging into your account and going to 'Manage Booking'. Alternatively, you can contact our customer service team for assistance.",
              },
              {
                question: "What is your baggage policy?",
                answer:
                  "Baggage allowances vary by fare type and route. Generally, economy passengers are allowed one carry-on bag and one personal item, with checked baggage available for purchase. Premium and business class passengers receive increased allowances.",
              },
              {
                question: "How early should I arrive at the airport?",
                answer:
                  "We recommend arriving at least 2 hours before domestic flights and 3 hours before international flights to allow time for check-in, security screening, and boarding procedures.",
              },
              {
                question: "How can I request special assistance?",
                answer:
                  "Special assistance for passengers with disabilities, medical conditions, or other needs can be requested during booking or by contacting our customer service team at least 48 hours before your flight.",
              },
              {
                question: "What is your refund policy?",
                answer:
                  "Refund eligibility depends on your fare type. Fully refundable tickets can be refunded to the original payment method, while non-refundable tickets may be eligible for partial refunds or travel credits depending on circumstances.",
              },
              {
                question: "How do I join your frequent flyer program?",
                answer:
                  "You can join our AirDreamFly Rewards program by registering on our website or mobile app. Membership is free and allows you to earn miles on flights and partner services that can be redeemed for future travel.",
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
          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">Can't find what you're looking for?</p>
            <Button asChild>
              <a href="#top">Contact Our Team</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=400&width=1200"
              alt="Map of AirDreamFly global locations"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="bg-background/80 px-4 py-2 rounded-md">Interactive Map Placeholder</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
