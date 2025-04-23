"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { searchProducts, categories, brands, type Product } from "@/lib/data/products"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Heart, Star, Filter, SlidersHorizontal, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    minPrice: 0,
    maxPrice: 100,
    sustainabilityFeatures: [] as string[],
    inStock: true,
    sortBy: "best-selling" as "price-asc" | "price-desc" | "newest" | "rating" | "best-selling",
  })
  const [priceRange, setPriceRange] = useState([0, 100])
  const [wishlist, setWishlist] = useState<number[]>([])

  // Get all unique sustainability features
  const allSustainabilityFeatures = Array.from(new Set(results.flatMap((product) => product.sustainabilityFeatures)))

  useEffect(() => {
    // Get query from URL
    const urlQuery = searchParams.get("q") || ""
    setQuery(urlQuery)

    // Get category from URL if present
    const urlCategory = searchParams.get("category") || ""
    if (urlCategory) {
      setFilters((prev) => ({ ...prev, category: urlCategory }))
    }

    // Get brand from URL if present
    const urlBrand = searchParams.get("brand") || ""
    if (urlBrand) {
      setFilters((prev) => ({ ...prev, brand: urlBrand }))
    }

    // Get sort from URL if present
    const urlSort = searchParams.get("sort") as typeof filters.sortBy
    if (urlSort) {
      setFilters((prev) => ({ ...prev, sortBy: urlSort }))
    }
  }, [searchParams])

  useEffect(() => {
    // Search with current query and filters
    setLoading(true)
    const searchResults = searchProducts(query, filters)
    setResults(searchResults)
    setLoading(false)
  }, [query, filters])

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value)
  }

  const applyPriceRange = () => {
    setFilters((prev) => ({
      ...prev,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    }))
  }

  const toggleSustainabilityFeature = (feature: string) => {
    setFilters((prev) => {
      const features = [...prev.sustainabilityFeatures]
      const index = features.indexOf(feature)

      if (index === -1) {
        features.push(feature)
      } else {
        features.splice(index, 1)
      }

      return {
        ...prev,
        sustainabilityFeatures: features,
      }
    })
  }

  const resetFilters = () => {
    setFilters({
      category: "",
      brand: "",
      minPrice: 0,
      maxPrice: 100,
      sustainabilityFeatures: [],
      inStock: true,
      sortBy: "best-selling",
    })
    setPriceRange([0, 100])
  }

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId)
      } else {
        return [...prev, productId]
      }
    })
  }

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Filters</h2>
        <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 text-sm">
          Reset
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["category", "brand", "price"]}>
        <AccordionItem value="category">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center">
                <Checkbox
                  id="all-categories"
                  checked={filters.category === ""}
                  onCheckedChange={() => setFilters((prev) => ({ ...prev, category: "" }))}
                />
                <Label htmlFor="all-categories" className="ml-2 text-sm">
                  All Categories
                </Label>
              </div>
              {categories.map((category) => (
                <div key={category.slug} className="flex items-center">
                  <Checkbox
                    id={`category-${category.slug}`}
                    checked={filters.category === category.slug}
                    onCheckedChange={() => setFilters((prev) => ({ ...prev, category: category.slug }))}
                  />
                  <Label htmlFor={`category-${category.slug}`} className="ml-2 text-sm">
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brand">
          <AccordionTrigger>Brands</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center">
                <Checkbox
                  id="all-brands"
                  checked={filters.brand === ""}
                  onCheckedChange={() => setFilters((prev) => ({ ...prev, brand: "" }))}
                />
                <Label htmlFor="all-brands" className="ml-2 text-sm">
                  All Brands
                </Label>
              </div>
              {brands.map((brand) => (
                <div key={brand.slug} className="flex items-center">
                  <Checkbox
                    id={`brand-${brand.slug}`}
                    checked={filters.brand === brand.slug}
                    onCheckedChange={() => setFilters((prev) => ({ ...prev, brand: brand.slug }))}
                  />
                  <Label htmlFor={`brand-${brand.slug}`} className="ml-2 text-sm">
                    {brand.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider defaultValue={[0, 100]} max={100} step={1} value={priceRange} onValueChange={handlePriceChange} />
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">$</span>
                  <Input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceChange([Number.parseInt(e.target.value), priceRange[1]])}
                    className="w-20 h-8"
                  />
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">$</span>
                  <Input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange([priceRange[0], Number.parseInt(e.target.value)])}
                    className="w-20 h-8"
                  />
                </div>
              </div>
              <Button onClick={applyPriceRange} size="sm" className="w-full">
                Apply
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="sustainability">
          <AccordionTrigger>Sustainability</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {allSustainabilityFeatures.map((feature) => (
                <div key={feature} className="flex items-center">
                  <Checkbox
                    id={`feature-${feature}`}
                    checked={filters.sustainabilityFeatures.includes(feature)}
                    onCheckedChange={() => toggleSustainabilityFeature(feature)}
                  />
                  <Label htmlFor={`feature-${feature}`} className="ml-2 text-sm">
                    {feature}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="availability">
          <AccordionTrigger>Availability</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center">
              <Checkbox
                id="in-stock"
                checked={filters.inStock}
                onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, inStock: !!checked }))}
              />
              <Label htmlFor="in-stock" className="ml-2 text-sm">
                In Stock Only
              </Label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {query ? `Search results for "${query}"` : "All Products"}
          </h1>
          <p className="mt-2 text-gray-600">
            {results.length} {results.length === 1 ? "product" : "products"} found
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          {/* Filters - Desktop */}
          <div className="hidden lg:block lg:col-span-3">
            <FilterSidebar />
          </div>

          {/* Product grid */}
          <div className="lg:col-span-9">
            {/* Sort and filter buttons */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                {/* Mobile filter button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden mr-2">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                    <FilterSidebar />
                  </SheetContent>
                </Sheet>

                {/* Active filters */}
                <div className="flex flex-wrap gap-2">
                  {filters.category && (
                    <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                      <span>Category: {categories.find((c) => c.slug === filters.category)?.name}</span>
                      <button
                        onClick={() => setFilters((prev) => ({ ...prev, category: "" }))}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                  {filters.brand && (
                    <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                      <span>Brand: {brands.find((b) => b.slug === filters.brand)?.name}</span>
                      <button
                        onClick={() => setFilters((prev) => ({ ...prev, brand: "" }))}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                  {(filters.minPrice > 0 || filters.maxPrice < 100) && (
                    <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                      <span>
                        Price: ${filters.minPrice} - ${filters.maxPrice}
                      </span>
                      <button
                        onClick={() => {
                          setFilters((prev) => ({ ...prev, minPrice: 0, maxPrice: 100 }))
                          setPriceRange([0, 100])
                        }}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                  {filters.sustainabilityFeatures.map((feature) => (
                    <div key={feature} className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                      <span>{feature}</span>
                      <button
                        onClick={() => toggleSustainabilityFeature(feature)}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sort dropdown */}
              <div className="flex items-center">
                <SlidersHorizontal className="h-4 w-4 mr-2 text-gray-500" />
                <Select
                  value={filters.sortBy}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, sortBy: value as typeof filters.sortBy }))}
                >
                  <SelectTrigger className="w-[180px] h-9">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="best-selling">Best Selling</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6 xl:gap-x-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-w-1 aspect-h-1 w-full bg-gray-200 rounded-md mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6 xl:gap-x-8">
                {results.map((product) => (
                  <div key={product.id} className="group relative bg-white p-4 rounded-lg shadow-sm">
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
                      <Image
                        src={product.images[0] || "/placeholder.svg"}
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
                    <div className="mt-2">
                      <p className="text-xs text-gray-500">{product.brand.name}</p>
                      <h3 className="text-sm font-medium text-gray-900">
                        <Link href={`/product/${product.slug}`}>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {product.name}
                        </Link>
                      </h3>
                    </div>
                    <div className="mt-1 flex items-center">
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <Star
                            key={rating}
                            className={`h-4 w-4 flex-shrink-0 ${
                              product.rating > rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="ml-1 text-xs text-gray-500">({product.reviewCount})</p>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      {product.salePrice ? (
                        <div>
                          <span className="text-sm font-medium text-gray-900">${product.salePrice.toFixed(2)}</span>
                          <span className="ml-2 text-xs text-gray-500 line-through">${product.price.toFixed(2)}</span>
                        </div>
                      ) : (
                        <p className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</p>
                      )}
                    </div>
                    <div className="mt-3">
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
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <Button onClick={resetFilters} className="bg-emerald-800 hover:bg-emerald-700">
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
