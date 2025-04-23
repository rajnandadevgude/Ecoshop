"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Star, Truck, ShieldCheck, Leaf, ArrowLeft } from "lucide-react"
import FeaturedProducts from "@/components/featured-products"

// Mock product data - in a real app, this would come from an API
const products = {
  "bamboo-toothbrush": {
    id: 1,
    name: "Bamboo Toothbrush",
    price: 4.99,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    description:
      "Our bamboo toothbrush is made from sustainably harvested bamboo with BPA-free nylon bristles. It's biodegradable, eco-friendly, and comes in plastic-free packaging.",
    features: [
      "Made from sustainably harvested bamboo",
      "BPA-free nylon bristles",
      "Biodegradable handle",
      "Plastic-free packaging",
      "Medium bristle firmness",
    ],
    specifications: {
      Material: "Bamboo handle, nylon bristles",
      Dimensions: "7.5 inches long",
      Weight: "0.5 oz",
      "Country of Origin": "Made in USA",
      "Care Instructions": "Rinse after use and store in a dry place",
    },
    brand: "EcoSmile",
    category: "Bathroom",
    inStock: true,
    rating: 4.5,
    reviewCount: 38,
    sustainabilityFeatures: ["Plastic-Free", "Biodegradable", "Sustainable Materials"],
  },
  "organic-cotton-towels": {
    id: 2,
    name: "Organic Cotton Towels",
    price: 24.99,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    description:
      "Our premium organic cotton towels are soft, absorbent, and free from harmful chemicals. Made with 100% GOTS-certified organic cotton and eco-friendly dyes.",
    features: [
      "100% GOTS-certified organic cotton",
      "Free from harmful chemicals",
      "Eco-friendly dyes",
      "Highly absorbent",
      "Quick-drying",
    ],
    specifications: {
      Material: "100% organic cotton",
      Dimensions: "30 x 54 inches",
      Weight: "600 GSM",
      "Country of Origin": "Made in Portugal",
      "Care Instructions": "Machine wash cold, tumble dry low",
    },
    brand: "Pure Home",
    category: "Home & Kitchen",
    inStock: true,
    rating: 5,
    reviewCount: 12,
    sustainabilityFeatures: ["Organic", "Chemical-Free", "Sustainable Materials"],
  },
}

export default function ProductPage() {
  const params = useParams()
  const productId = typeof params.id === "string" ? params.id : ""
  const product = products[productId as keyof typeof products]

  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const { addToCart } = useCart()
  const { toast } = useToast()

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link href="/shop">
          <Button className="bg-emerald-800 hover:bg-emerald-700">Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)

    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} has been ${isWishlisted ? "removed from" : "added to"} your wishlist.`,
    })
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/shop" className="inline-flex items-center text-emerald-800 hover:text-emerald-700 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Shop
        </Link>

        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          {/* Product images */}
          <div>
            <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-center object-cover"
              />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-w-1 aspect-h-1 rounded-md overflow-hidden ${
                    selectedImage === index ? "ring-2 ring-emerald-800" : "ring-1 ring-gray-200"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - Image ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-center object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product details */}
          <div className="mt-10 lg:mt-0">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                <p className="text-sm text-emerald-800 mt-1">{product.brand}</p>
              </div>
              <button
                onClick={toggleWishlist}
                className={`p-2 rounded-full ${isWishlisted ? "bg-red-50 text-red-500" : "bg-gray-100 text-gray-400"}`}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={isWishlisted ? "fill-red-500" : ""} size={20} />
              </button>
            </div>

            {/* Rating */}
            <div className="mt-4 flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <Star
                    key={rating}
                    className={`h-5 w-5 flex-shrink-0 ${
                      product.rating > rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="ml-2 text-sm text-gray-600">{product.reviewCount} reviews</p>
            </div>

            {/* Price */}
            <div className="mt-4">
              <p className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
            </div>

            {/* Sustainability features */}
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {product.sustainabilityFeatures.map((feature) => (
                  <span
                    key={feature}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800"
                  >
                    <Leaf className="h-3 w-3 mr-1" />
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Short description */}
            <div className="mt-6">
              <p className="text-base text-gray-600">{product.description}</p>
            </div>

            {/* Quantity selector */}
            <div className="mt-8">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="p-2 border border-gray-300 rounded-l-md"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(Number.parseInt(e.target.value) || 1)}
                  className="p-2 w-16 text-center border-t border-b border-gray-300"
                />
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="p-2 border border-gray-300 rounded-r-md"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to cart button */}
            <div className="mt-8">
              <Button
                onClick={handleAddToCart}
                className="w-full bg-emerald-800 hover:bg-emerald-700 py-3 text-lg"
                disabled={!product.inStock}
              >
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>

            {/* Shipping and returns */}
            <div className="mt-8 space-y-4">
              <div className="flex items-start">
                <Truck className="h-5 w-5 text-emerald-800 mt-0.5 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Free shipping over $75</h3>
                  <p className="text-sm text-gray-600">Delivery in 3-5 business days</p>
                </div>
              </div>
              <div className="flex items-start">
                <ShieldCheck className="h-5 w-5 text-emerald-800 mt-0.5 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">30-day returns</h3>
                  <p className="text-sm text-gray-600">Shop with confidence</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product tabs */}
        <div className="mt-16">
          <Tabs defaultValue="features">
            <TabsList className="w-full justify-start border-b rounded-none">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="features" className="py-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Product Features</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="specifications" className="py-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Product Specifications</h3>
              <div className="border-t border-gray-200">
                {Object.entries(product.specifications).map(([key, value], index) => (
                  <div
                    key={index}
                    className={`py-3 flex justify-between ${
                      index !== Object.entries(product.specifications).length - 1 ? "border-b border-gray-200" : ""
                    }`}
                  >
                    <dt className="text-sm font-medium text-gray-900">{key}</dt>
                    <dd className="text-sm text-gray-600">{value}</dd>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="py-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">Customer Reviews</h3>
                <Button variant="outline" className="text-emerald-800 border-emerald-800 hover:bg-emerald-50">
                  Write a Review
                </Button>
              </div>
              <div className="space-y-8">
                {/* Sample reviews - in a real app, these would come from an API */}
                <div className="border-b border-gray-200 pb-8">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <Star
                          key={rating}
                          className={`h-4 w-4 flex-shrink-0 ${rating < 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <p className="ml-2 text-sm font-medium text-gray-900">Sarah J.</p>
                    <p className="ml-4 text-sm text-gray-600">3 months ago</p>
                  </div>
                  <h4 className="text-base font-medium text-gray-900 mb-2">Great sustainable option!</h4>
                  <p className="text-gray-600">
                    I've been trying to reduce plastic waste in my bathroom, and this bamboo toothbrush is perfect. It's
                    comfortable to hold, the bristles are just the right firmness, and it looks nice too!
                  </p>
                </div>
                <div className="border-b border-gray-200 pb-8">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[0, 1, 2, 3].map((rating) => (
                        <Star
                          key={rating}
                          className={`h-4 w-4 flex-shrink-0 ${rating < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                      {[0].map((rating) => (
                        <Star key={rating} className="h-4 w-4 flex-shrink-0 text-gray-300" />
                      ))}
                    </div>
                    <p className="ml-2 text-sm font-medium text-gray-900">Michael T.</p>
                    <p className="ml-4 text-sm text-gray-600">1 month ago</p>
                  </div>
                  <h4 className="text-base font-medium text-gray-900 mb-2">Good but bristles wear quickly</h4>
                  <p className="text-gray-600">
                    I like the concept and the handle is great, but I found the bristles started to wear out faster than
                    my regular toothbrush. Still, I'll keep buying them to avoid plastic waste.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related products */}
        <div className="mt-16">
          <FeaturedProducts title="You May Also Like" viewAllLink="/shop" />
        </div>
      </div>
    </div>
  )
}
