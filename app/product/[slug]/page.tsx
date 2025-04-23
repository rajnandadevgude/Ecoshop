"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsList } from "@/components/ui/tabs"
import { Heart, Star, Truck, ShieldCheck, Leaf, ArrowLeft, Share2, Facebook, Twitter, Mail } from "lucide-react"
import { getProductBySlug, getRelatedProducts } from "@/lib/data/products"
import { getReviewsByProductId } from "@/lib/data/reviews"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Head from "next/head"

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const productSlug = typeof params.slug === "string" ? params.slug : ""
  const product = getProductBySlug(productSlug)
  const relatedProducts = product ? getRelatedProducts(product) : []

  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)

  const { addToCart } = useCart()
  const { toast } = useToast()

  // Get product reviews
  const reviews = product ? getReviewsByProductId(product.id) : []

  // Generate share URLs
  const shareUrl = typeof window !== "undefined" ? window.location.href : ""
  const shareTitle = product ? `Check out ${product.name} on EcoHero` : "Check out this product on EcoHero"
  const shareText = product ? product.shortDescription : "Sustainable products for a better planet"

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`
  const emailShareUrl = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`

  // Handle share button click
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: shareTitle,
        text: shareText,
        url: shareUrl,
      }).catch((error) => {
        console.error("Error sharing:", error)
        setIsShareDialogOpen(true)
      })
    } else {
      setIsShareDialogOpen(true)
    }
  }

  useEffect(() => {
    // Reset selected image when product changes
    setSelectedImage(0)
  }, [productSlug])

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
      price: product.salePrice || product.price,
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

  // SEO metadata
  const pageTitle = `${product.name} | EcoHero`
  const pageDescription = product.shortDescription

  return (
    <>
      {/* SEO metadata */}
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={product.images[0]} />
        <meta property="og:type" content="product" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={product.images[0]} />
      </Head>

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
                  priority
                />
                {product.isNew && (
                  <span className="absolute top-2 left-2 bg-emerald-800 text-white text-xs px-2 py-1 rounded">
                    New
                  </span>
                )}
                {product.salePrice && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    Sale
                  </span>
                )}
              </div>
              <div className="mt-4 grid grid-cols-4 gap-4">
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
                  <p className="text-sm text-emerald-800">{product.brand.name}</p>
                  <h1 className="text-3xl font-bold text-gray-900 mt-1">{product.name}</h1>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={toggleWishlist}
                    className={`p-2 rounded-full ${isWishlisted ? "bg-red-50 text-red-500" : "bg-gray-100 text-gray-400"}`}
                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart
                      size={20}
                      className={isWishlisted ? "fill-red-500" : ""}
                    />
                  </button>
                  <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
                    <DialogTrigger asChild>
                      <button
                        onClick={handleShare}
                        className="p-2 rounded-full bg-gray-100 text-gray-400 hover:text-gray-600"
                        aria-label="Share product"
                      >
                        <Share2 size={20} />
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Share this product</DialogTitle>
                        <DialogDescription>
                          Share this product with your friends and family
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-center space-x-4 py-4">
                        <a
                          href={facebookShareUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col items-center"
                        >
                          <div className="p-3 rounded-full bg-blue-100 text-blue-600 mb-2">
                            <Facebook size={24} />
                          </div>
                          <span className="text-sm">Facebook</span>
                        </a>
                        <a
                          href={twitterShareUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col items-center"
                        >
                          <div className="p-3 rounded-full bg-sky-100 text-sky-500 mb-2">
                            <Twitter size={24} />
                          </div>
                          <span className="text-sm">Twitter</span>
                        </a>
                        <a
                          href={emailShareUrl}
                          className="flex flex-col items-center"
                        >
                          <div className="p-3 rounded-full bg-gray-100 text-gray-600 mb-2">
                            <Mail size={24} />
                          </div>
                          <span className="text-sm">Email</span>
                        </a>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 mb-2">Or copy the link</p>
                        <div className="flex">
                          <input
                            type="text"
                            value={shareUrl}
                            readOnly
                            className="flex-1 border rounded-l-md px-3 py-2 text-sm bg-gray-50"
                          />
                          <Button
                            onClick={() => {
                              navigator.clipboard.writeText(shareUrl)
                              toast({
                                title: "Link copied",
                                description: "Product link copied to clipboard",
                              })
                            }}
                            className="rounded-l-none bg-emerald-800 hover:bg-emerald-700"
                          >
                            Copy
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
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
                {product.salePrice ? (
                  <div className="flex items-center">
                    <p className="text-2xl font-bold text-gray-900">${product.salePrice.toFixed(2)}</p>
                    <p className="ml-2 text-lg text-gray-500 line-through">${product.price.toFixed(2)}</p>
                    <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">
                      Save ${(product.price - product.salePrice).toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <p className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
                )}
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
                <p className="text-base text-gray-600">{product.shortDescription}</p>
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
            <Tabs defaultValue="description">
              <TabsList className="w-full justify-start border\
