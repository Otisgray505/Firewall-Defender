import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Award, Clock, Globe, Shield, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="center-layout min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[400px] overflow-hidden">
        <Image
          src="/placeholder.svg?height=400&width=1920"
          alt="AirDreamFly team and aircraft"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="section-container">
            <div className="content-center max-w-2xl space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                About AirDreamFly
              </h1>
              <p className="text-white/90 md:text-xl">Committed to excellence in air travel since 2005</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-12">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-items-center">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Story</h2>
              <p className="text-muted-foreground">
                Founded in 2005, AirDreamFly began with a vision to transform air travel into an extraordinary
                experience. What started as a small regional airline with just three aircraft has grown into a global
                carrier connecting over 150 destinations across six continents.
              </p>
              <p className="text-muted-foreground">
                Our journey has been defined by a relentless pursuit of excellence, innovation, and customer
                satisfaction. We've continuously invested in modern aircraft, cutting-edge technology, and comprehensive
                training for our team to ensure we deliver the highest standards of safety, comfort, and service.
              </p>
              <p className="text-muted-foreground">
                Today, AirDreamFly stands as a symbol of premium air travel, recognized for our commitment to creating
                memorable journeys for millions of passengers each year.
              </p>
            </div>
            <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden w-full max-w-md">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="AirDreamFly history timeline"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-12 bg-muted">
        <div className="section-container">
          <div className="content-center space-y-4 mb-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Values</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                The principles that guide everything we do
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {[
              {
                title: "Safety First",
                description:
                  "Safety is our top priority. We maintain rigorous standards and invest in state-of-the-art technology to ensure the well-being of our passengers and crew.",
                icon: <Shield className="h-10 w-10 text-primary" />,
              },
              {
                title: "Excellence in Service",
                description:
                  "We strive to exceed expectations with personalized, attentive service that makes every journey special and memorable.",
                icon: <Award className="h-10 w-10 text-primary" />,
              },
              {
                title: "Global Responsibility",
                description:
                  "We're committed to sustainable practices, reducing our environmental footprint, and contributing positively to the communities we serve.",
                icon: <Globe className="h-10 w-10 text-primary" />,
              },
              {
                title: "Innovation",
                description:
                  "We continuously seek new ways to enhance the travel experience through technology, comfort innovations, and service improvements.",
                icon: <Clock className="h-10 w-10 text-primary" />,
              },
              {
                title: "Diversity & Inclusion",
                description:
                  "We celebrate diversity in our team and passengers, creating an inclusive environment where everyone feels welcome and respected.",
                icon: <Users className="h-10 w-10 text-primary" />,
              },
              {
                title: "Integrity",
                description:
                  "We operate with transparency, honesty, and ethical standards in all our interactions with passengers, partners, and stakeholders.",
                icon: <Shield className="h-10 w-10 text-primary" />,
              },
            ].map((value, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm"
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Leadership Team</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Meet the experienced professionals guiding AirDreamFly's journey
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Sarah Johnson",
                position: "Chief Executive Officer",
                bio: "With over 25 years in aviation, Sarah has led AirDreamFly's global expansion since 2010.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Michael Chen",
                position: "Chief Operations Officer",
                bio: "Michael ensures operational excellence across our global network with his 20 years of industry expertise.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Elena Rodriguez",
                position: "Chief Customer Officer",
                bio: "Elena is dedicated to elevating the passenger experience at every touchpoint of the journey.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "James Wilson",
                position: "Chief Technology Officer",
                bio: "James leads our digital transformation, implementing innovative solutions to enhance travel experiences.",
                image: "/placeholder.svg?height=300&width=300",
              },
            ].map((leader, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="relative h-40 w-40 rounded-full overflow-hidden mb-4">
                  <Image src={leader.image || "/placeholder.svg"} alt={leader.name} fill className="object-cover" />
                </div>
                <h3 className="text-xl font-bold">{leader.name}</h3>
                <p className="text-primary font-medium mb-2">{leader.position}</p>
                <p className="text-sm text-muted-foreground">{leader.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Fleet */}
      <section className="py-12 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Modern Fleet</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Experience comfort and efficiency with our state-of-the-art aircraft
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                model: "Dreamliner 787",
                description:
                  "Our flagship long-haul aircraft featuring spacious cabins, larger windows, and advanced air filtration systems for maximum comfort on international routes.",
                image: "/placeholder.svg?height=200&width=400",
                specs: "Capacity: 256 passengers | Range: 14,800 km",
              },
              {
                model: "Airbus A350",
                description:
                  "Ultra-modern wide-body aircraft with quiet cabins, ambient lighting, and superior fuel efficiency for a more sustainable journey.",
                image: "/placeholder.svg?height=200&width=400",
                specs: "Capacity: 325 passengers | Range: 15,000 km",
              },
              {
                model: "Boeing 737 MAX",
                description:
                  "Our efficient narrow-body aircraft for short to medium-haul routes, featuring the latest technology and enhanced passenger comfort.",
                image: "/placeholder.svg?height=200&width=400",
                specs: "Capacity: 180 passengers | Range: 6,500 km",
              },
            ].map((aircraft, index) => (
              <div key={index} className="bg-background rounded-lg overflow-hidden shadow-sm">
                <div className="relative h-48">
                  <Image
                    src={aircraft.image || "/placeholder.svg"}
                    alt={aircraft.model}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{aircraft.model}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{aircraft.description}</p>
                  <p className="text-sm font-medium">{aircraft.specs}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Button variant="outline" asChild>
              <Link href="/fleet">View Full Fleet Details</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Frequently Asked Questions</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Find answers to common questions about AirDreamFly
              </p>
            </div>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What makes AirDreamFly different from other airlines?</AccordionTrigger>
                <AccordionContent>
                  AirDreamFly stands out with our commitment to personalized service, modern fleet, innovative
                  amenities, and comprehensive global network. We focus on creating memorable experiences rather than
                  just transporting passengers, with attention to detail at every stage of your journey.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How does AirDreamFly ensure passenger safety?</AccordionTrigger>
                <AccordionContent>
                  Safety is our highest priority. We maintain rigorous maintenance schedules exceeding industry
                  standards, invest in the latest safety technology, and provide comprehensive training for our crew.
                  Our safety management system includes continuous monitoring and improvement processes.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>What sustainability initiatives does AirDreamFly have?</AccordionTrigger>
                <AccordionContent>
                  We're committed to reducing our environmental impact through fleet modernization, operational
                  efficiency improvements, sustainable aviation fuel investment, waste reduction programs, and carbon
                  offset options for passengers. Our goal is to achieve net-zero carbon emissions by 2050.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>How can I join the AirDreamFly team?</AccordionTrigger>
                <AccordionContent>
                  We're always looking for talented individuals passionate about aviation and customer service. Visit
                  our Careers page to view current openings across flight operations, customer service, engineering,
                  corporate roles, and more. We offer comprehensive training and development opportunities.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Does AirDreamFly offer corporate travel programs?</AccordionTrigger>
                <AccordionContent>
                  Yes, we offer tailored corporate travel solutions with dedicated account management, flexible booking
                  options, preferential rates, and comprehensive reporting tools. Contact our business travel team to
                  discuss how we can support your organization's travel needs.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">Ready to Experience AirDreamFly?</h2>
          <p className="max-w-[700px] mx-auto mb-6 md:text-xl">
            Join millions of satisfied passengers who choose AirDreamFly for exceptional journeys around the world.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/booking">Book Your Flight</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/20"
              asChild
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
