import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CalendarDays } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "10 Simple Swaps for a Plastic-Free Kitchen",
    excerpt:
      "Discover easy and affordable ways to reduce plastic waste in your kitchen with these sustainable alternatives.",
    date: "April 15, 2023",
    image: "/placeholder.svg?height=400&width=600",
    href: "/blog/plastic-free-kitchen",
    category: "Sustainable Living",
  },
  {
    id: 2,
    title: "The Truth About 'Biodegradable' Plastics",
    excerpt:
      "Not all biodegradable products are created equal. Learn what to look for and which options are truly eco-friendly.",
    date: "March 28, 2023",
    image: "/placeholder.svg?height=400&width=600",
    href: "/blog/biodegradable-plastics",
    category: "Education",
  },
  {
    id: 3,
    title: "How to Create a Zero-Waste Bathroom",
    excerpt:
      "Transform your bathroom routine with these sustainable swaps that reduce waste without sacrificing quality.",
    date: "March 10, 2023",
    image: "/placeholder.svg?height=400&width=600",
    href: "/blog/zero-waste-bathroom",
    category: "Zero Waste",
  },
]

export default function BlogPreview() {
  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Latest from Our Blog</h2>
          <Link href="/blog">
            <Button variant="link" className="text-emerald-800 hover:text-emerald-700">
              View All Posts
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <div key={post.id} className="flex flex-col overflow-hidden rounded-lg shadow-sm">
              <div className="flex-shrink-0">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  width={600}
                  height={400}
                  className="h-48 w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between bg-white p-6">
                <div className="flex-1">
                  <p className="text-sm font-medium text-emerald-800">{post.category}</p>
                  <Link href={post.href} className="mt-2 block">
                    <h3 className="text-xl font-semibold text-gray-900 hover:underline">{post.title}</h3>
                    <p className="mt-3 text-base text-gray-500 line-clamp-3">{post.excerpt}</p>
                  </Link>
                </div>
                <div className="mt-6 flex items-center">
                  <CalendarDays className="h-4 w-4 text-gray-400" />
                  <div className="ml-2 text-sm text-gray-500">{post.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
