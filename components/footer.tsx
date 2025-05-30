import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container py-8 md:py-10 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-8">
          <div className="space-y-3">
            <h3 className="text-base md:text-lg font-medium text-primaryBlue">FlyDreamAir</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-primaryBlue transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-muted-foreground hover:text-primaryBlue transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="text-muted-foreground hover:text-primaryBlue transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link
                  href="/investor-relations"
                  className="text-muted-foreground hover:text-primaryBlue transition-colors"
                >
                  Investor Relations
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-base md:text-lg font-medium text-accentPurple">Travel Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/booking" className="text-muted-foreground hover:text-primaryBlue transition-colors">
                  Book Flights
                </Link>
              </li>
              <li>
                <Link href="/manage-booking" className="text-muted-foreground hover:text-primaryBlue transition-colors">
                  Manage Booking
                </Link>
              </li>
              <li>
                <Link href="/check-in" className="text-muted-foreground hover:text-primaryBlue transition-colors">
                  Online Check-in
                </Link>
              </li>
              <li>
                <Link href="/baggage" className="text-muted-foreground hover:text-primaryBlue transition-colors">
                  Baggage Information
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-base md:text-lg font-medium text-accentPurple">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/customer-service"
                  className="text-muted-foreground hover:text-primaryBlue transition-colors"
                >
                  Customer Service
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primaryBlue transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/refunds" className="text-muted-foreground hover:text-primaryBlue transition-colors">
                  Refunds & Cancellations
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="text-muted-foreground hover:text-primaryBlue transition-colors">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-base md:text-lg font-medium text-accentPurple">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primaryBlue transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primaryBlue transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-primaryBlue transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="text-muted-foreground hover:text-primaryBlue transition-colors">
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3 sm:col-span-2 md:col-span-3 lg:col-span-1">
            <h3 className="text-base md:text-lg font-medium text-accentPurple">Connect with Us</h3>
            <div className="flex space-x-3">
              <Link
                href="https://facebook.com"
                className="text-muted-foreground hover:text-primaryBlue transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://twitter.com"
                className="text-muted-foreground hover:text-primaryBlue transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://instagram.com"
                className="text-muted-foreground hover:text-primaryBlue transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://youtube.com"
                className="text-muted-foreground hover:text-primaryBlue transition-colors"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
            <div className="space-y-2 text-sm">
              <p>Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryBlue focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <button className="rounded-md bg-primaryBlue px-3 py-2 text-sm font-medium text-white hover:bg-secondaryBlue transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 md:mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} FlyDreamAir. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
