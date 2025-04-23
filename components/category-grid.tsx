import Link from "next/link"
import Image from "next/image"

const categories = [
  {
    name: "Home & Kitchen",
    image: "/placeholder.svg?height=300&width=300",
    href: "/category/home-kitchen",
  },
  {
    name: "Cleaning",
    image: "/placeholder.svg?height=300&width=300",
    href: "/category/cleaning",
  },
  {
    name: "Bathroom",
    image: "/placeholder.svg?height=300&width=300",
    href: "/category/bathroom",
  },
  {
    name: "Beauty",
    image: "/placeholder.svg?height=300&width=300",
    href: "/category/beauty",
  },
  {
    name: "Kids & Pets",
    image: "/placeholder.svg?height=300&width=300",
    href: "/category/kids-pets",
  },
  {
    name: "On Sale",
    image: "/placeholder.svg?height=300&width=300",
    href: "/sale",
  },
]

export default function CategoryGrid() {
  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Shop By Category</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <Link key={category.name} href={category.href} className="group">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  width={300}
                  height={300}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-center text-sm font-medium text-gray-900">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
