"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

const brands = [
  { name: "EcoSmile", logo: "/placeholder.svg?height=100&width=200", href: "/brands/ecosmile" },
  { name: "Pure Home", logo: "/placeholder.svg?height=100&width=200", href: "/brands/pure-home" },
  { name: "Gaia Beauty", logo: "/placeholder.svg?height=100&width=200", href: "/brands/gaia-beauty" },
  { name: "Green Kitchen", logo: "/placeholder.svg?height=100&width=200", href: "/brands/green-kitchen" },
  { name: "EcoWear", logo: "/placeholder.svg?height=100&width=200", href: "/brands/ecowear" },
  { name: "Terra Clean", logo: "/placeholder.svg?height=100&width=200", href: "/brands/terra-clean" },
  { name: "Bamboo Life", logo: "/placeholder.svg?height=100&width=200", href: "/brands/bamboo-life" },
  { name: "Ocean Friendly", logo: "/placeholder.svg?height=100&width=200", href: "/brands/ocean-friendly" },
]

export default function BrandsCarousel() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const container = containerRef.current
      const scrollAmount = container.clientWidth / 2
      const newPosition = direction === "left" ? scrollPosition - scrollAmount : scrollPosition + scrollAmount

      container.scrollTo({
        left: newPosition,
        behavior: "smooth",
      })

      setScrollPosition(newPosition)
    }
  }

  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Our Sustainable Brands</h2>

        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} className="text-emerald-800" />
          </button>

          <div
            ref={containerRef}
            className="flex overflow-x-auto scrollbar-hide space-x-8 py-4 px-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {brands.map((brand) => (
              <Link
                key={brand.name}
                href={brand.href}
                className="flex-shrink-0 flex flex-col items-center space-y-2 group"
              >
                <div className="w-40 h-20 bg-gray-100 rounded-lg flex items-center justify-center p-4 group-hover:bg-gray-200 transition-colors">
                  <Image
                    src={brand.logo || "/placeholder.svg"}
                    alt={brand.name}
                    width={200}
                    height={100}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <span className="text-sm text-gray-600 group-hover:text-emerald-800">{brand.name}</span>
              </Link>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} className="text-emerald-800" />
          </button>
        </div>
      </div>
    </div>
  )
}
