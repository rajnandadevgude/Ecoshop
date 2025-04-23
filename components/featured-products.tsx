"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/hooks/use-toast"
import { Heart } from "lucide-react"
import { useState } from "react"

interface Product {
  id: number
  name: string
  price: number
  image: string
  href: string
  brand?: string
  rating?: number
  reviewCount?: number
}

interface FeaturedProductsProps {
  title: string
  viewAllLink?: string
}

export default function FeaturedProducts({ title, viewAllLink = "/shop" }: FeaturedProductsProps) {
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [wishlist, setWishlist] = useState<number[]>([])

  const products: Product[] = [
    {
      id: 1,
      name: "Bamboo Toothbrush",
      price: 4.99,
      image: "/placeholder.svg?height=400&width=400",
      href: "/product/bamboo-toothbrush",
      brand: "EcoSmile",
      rating: 4.5,
      reviewCount: 38,
    },
    {
      id: 2,
      name: "Organic Cotton Towels",
      price: 24.99,
      image: "/placeholder.svg?height=400&width=400",
      href: "/product/organic-cotton-towels",
      brand: "Pure Home",
      rating: 5,
      reviewCount: 12,
    },
    {
      id: 3,
      name: "Natural Moisturizer",
      price: 18.99,
      image: "/placeholder.svg?height=400&width=400",
      href: "/product/natural-moisturizer",
      brand: "Gaia Beauty",
      rating: 4,
      reviewCount: 24,
    },
    {
      id: 4,
      name: "Reusable Food Wraps",
      price: 15.99,
      image: "/placeholder.svg?height=400&width=400",
      href: "/product/reusable-food-wraps",
      brand: "Green Kitchen",
      rating: 4.5,
      reviewCount: 42,
    },
  ]

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  return (
    <div className="bg-gray-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <Link href={viewAllLink}>
            <Button variant="link" className="text-emerald-800 hover:text-emerald-700">
              View All
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative bg-white p-4 rounded-lg shadow-sm">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="h-full w-full object-cover object-center"
                />
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm z-10"
                  aria-label={wishlist.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart
                    size={20}
                    className={wishlist.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-400"}
                  />
                </button>
              </div>
              {product.brand && <p className="mt-2 text-xs text-gray-500">{product.brand}</p>}
              <div className="mt-2">
                <h3 className="text-sm font-medium text-gray-900">
                  <Link href={product.href}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </Link>
                </h3>
              </div>
              {product.rating && (
                <div className="mt-1 flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <svg
                        key={rating}
                        className={`h-4 w-4 flex-shrink-0 ${
                          product.rating! > rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="ml-1 text-xs text-gray-500">({product.reviewCount})</p>
                </div>
              )}
              <div className="mt-2 flex justify-between items-center">
                <p className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</p>
              </div>
              <div className="mt-3">
                <Button
                  onClick={() => handleAddToCart(product)}
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
  )
}
