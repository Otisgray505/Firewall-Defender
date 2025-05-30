import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { BookingProvider } from "@/lib/booking-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "AirDreamFly - Soar Beyond Expectations",
  description: "Book flights, manage reservations, select seats, and purchase in-flight services with AirDreamFly.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <BookingProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </BookingProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
