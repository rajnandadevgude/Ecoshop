"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function AnnouncementBar() {
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0)

  const announcements = [
    {
      text: "🌎 Earth Month is here! 🌱 Enjoy 15% off sitewide all month long w/ code EARTH15 💚",
      link: "/shop",
      linkText: "Shop Now!",
    },
    {
      text: "Free shipping on orders over $75",
      link: "/shipping",
      linkText: "Learn More",
    },
  ]

  const nextAnnouncement = () => {
    setCurrentAnnouncement((prev) => (prev + 1) % announcements.length)
  }

  const prevAnnouncement = () => {
    setCurrentAnnouncement((prev) => (prev - 1 + announcements.length) % announcements.length)
  }

  return (
    <div className="bg-emerald-800 text-white py-3 px-4 flex items-center justify-center relative">
      <button onClick={prevAnnouncement} className="absolute left-4 text-white" aria-label="Previous announcement">
        <ChevronLeft size={20} />
      </button>

      <div className="text-center text-sm md:text-base">
        {announcements[currentAnnouncement].text}{" "}
        <Link href={announcements[currentAnnouncement].link} className="underline font-medium">
          {announcements[currentAnnouncement].linkText}
        </Link>
      </div>

      <button onClick={nextAnnouncement} className="absolute right-4 text-white" aria-label="Next announcement">
        <ChevronRight size={20} />
      </button>
    </div>
  )
}
