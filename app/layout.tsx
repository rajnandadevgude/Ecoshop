import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import AnnouncementBar from "@/components/announcement-bar"
import Footer from "@/components/footer"
import { CartProvider } from "@/context/cart-context"
import { AuthProvider } from "@/context/auth-context"
import { Toaster } from "@/components/ui/toaster"
import LiveChat from "@/components/live-chat"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EcoHero - Sustainable Products for a Better Planet",
  description: "Shop eco-friendly and sustainable products for your everyday needs.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <AuthProvider>
            <CartProvider>
              <AnnouncementBar />
              <Navbar />
              <main>{children}</main>
              <Footer />
              <LiveChat />
              <Toaster />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'