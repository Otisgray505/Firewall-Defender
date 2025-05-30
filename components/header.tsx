"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

const mainNavItems = [{ title: "Home", href: "/" }]

const travelNavItems = [
  { title: "Book Flights", href: "/booking" },
  { title: "Manage Booking", href: "/manage-booking" },
  { title: "Check-in", href: "/check-in" },
]

export default function Header() {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 sm:h-16 md:h-18 items-center justify-between px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/placeholder.svg?height=32&width=32"
              alt="FlyDreamAir Logo"
              width={32}
              height={32}
              className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8"
            />
            <span className="hidden font-bold sm:inline-block text-xs sm:text-sm md:text-base text-primaryBlue">
              FlyDreamAir
            </span>
          </Link>
        </div>

        {isMobile ? (
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden h-8 w-8 sm:h-9 sm:w-9">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px] md:w-[350px]">
              <nav className="flex flex-col gap-4 mt-6">
                {mainNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-sm sm:text-base font-medium transition-colors hover:text-primaryBlue py-2",
                      pathname === item.href ? "text-primaryBlue" : "text-muted-foreground",
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
                <div className="h-px bg-border my-2" />
                <p className="text-sm font-medium text-accentPurple">Travel</p>
                {travelNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-sm sm:text-base font-medium transition-colors hover:text-primaryBlue py-2 pl-4",
                      pathname === item.href ? "text-primaryBlue" : "text-muted-foreground",
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        ) : (
          // Desktop navigation with better responsive text sizing
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {mainNavItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "text-sm md:text-base transition-colors hover:text-primaryBlue",
                        pathname === item.href ? "text-primaryBlue" : "text-muted-foreground",
                      )}
                    >
                      {item.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm md:text-base hover:text-primaryBlue">
                  Travel
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] sm:w-[350px] md:w-[450px] lg:w-[500px] gap-3 p-4 md:grid-cols-1">
                    {travelNavItems.map((item) => (
                      <li key={item.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-subtlePurple hover:text-accentPurple focus:bg-subtlePurple focus:text-accentPurple"
                          >
                            <div className="text-sm md:text-base font-medium leading-none">{item.title}</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        )}

        <div className="flex items-center gap-1 sm:gap-2">
          <Link href="/login">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs sm:text-sm px-2 sm:px-3 md:px-4 hover:text-primaryBlue"
            >
              Log in
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm" className="text-xs sm:text-sm px-2 sm:px-3 md:px-4 bg-primaryBlue hover:bg-secondaryBlue">
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
