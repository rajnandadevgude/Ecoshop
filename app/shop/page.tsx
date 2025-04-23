import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Image from "next/image"
import LiveChat from "@/components/live-chat"

const products = [
  {
    id: 1,
    name: "Bamboo Toothbrush",
    price: 4.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Bathroom",
    href: "/product/bamboo-toothbrush",
  },
  {
    id: 2,
    name: "Organic Cotton Towels",
    price: 24.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Home & Kitchen",
    href: "/product/organic-cotton-towels",
  },
  {
    id: 3,
    name: "Natural Moisturizer",
    price: 18.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Beauty",
    href: "/product/natural-moisturizer",
  },
  {
    id: 4,
    name: "Reusable Food Wraps",
    price: 15.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Home & Kitchen",
    href: "/product/reusable-food-wraps",
  },
  {
    id: 5,
    name: "Stainless Steel Water Bottle",
    price: 29.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Home & Kitchen",
    href: "/product/stainless-steel-water-bottle",
  },
  {
    id: 6,
    name: "Natural Laundry Detergent",
    price: 12.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Cleaning",
    href: "/product/natural-laundry-detergent",
  },
  {
    id: 7,
    name: "Bamboo Dish Brush",
    price: 8.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Cleaning",
    href: "/product/bamboo-dish-brush",
  },
  {
    id: 8,
    name: "Organic Cotton Produce Bags",
    price: 14.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Home & Kitchen",
    href: "/product/organic-cotton-produce-bags",
  },
]

export default function ShopPage() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-6 pb-24">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Shop All Products</h1>
            <p className="mt-4 max-w-3xl mx-auto text-base text-gray-500">
              Browse our collection of sustainable, eco-friendly products for everyday living.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10 mt-12">
            {/* Filters */}
            <div className="hidden lg:block">
              <div className="divide-y divide-gray-200 space-y-6">
                {/* Search */}
                <div className="pt-6">
                  <h3 className="text-sm font-medium text-gray-900">Search</h3>
                  <div className="mt-2">
                    <Input type="text" placeholder="Search products..." className="w-full" />
                  </div>
                </div>

                {/* Categories */}
                <div className="pt-6">
                  <h3 className="text-sm font-medium text-gray-900">Categories</h3>
                  <div className="mt-2 space-y-2">
                    {["All", "Home & Kitchen", "Bathroom", "Cleaning", "Beauty", "Kids & Pets"].map((category) => (
                      <div key={category} className="flex items-center">
                        <Checkbox id={`category-${category}`} />
                        <Label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-600">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="pt-6">
                  <h3 className="text-sm font-medium text-gray-900">Price Range</h3>
                  <div className="mt-4">
                    <Slider defaultValue={[0, 100]} max={100} step={1} />
                    <div className="flex justify-between mt-2">
                      <span className="text-sm text-gray-500">$0</span>
                      <span className="text-sm text-gray-500">$100+</span>
                    </div>
                  </div>
                </div>

                {/* Sustainability */}
                <div className="pt-6">
                  <h3 className="text-sm font-medium text-gray-900">Sustainability</h3>
                  <div className="mt-2 space-y-2">
                    {["Plastic-Free", "Compostable", "Organic", "Recycled", "Biodegradable"].map((feature) => (
                      <div key={feature} className="flex items-center">
                        <Checkbox id={`feature-${feature}`} />
                        <Label htmlFor={`feature-${feature}`} className="ml-2 text-sm text-gray-600">
                          {feature}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Product grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6 xl:gap-x-8">
                {products.map((product) => (
                  <div key={product.id} className="group relative">
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <Link href={product.href}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.name}
                          </Link>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</p>
                    </div>
                    <div className="mt-2">
                      <Button
                        variant="outline"
                        className="w-full text-emerald-800 border-emerald-800 hover:bg-emerald-800 hover:text-white"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <LiveChat />
    </div>
  )
}
