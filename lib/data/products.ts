export interface Product {
  id: number
  slug: string
  name: string
  price: number
  salePrice?: number
  images: string[]
  description: string
  shortDescription: string
  features: string[]
  specifications: Record<string, string>
  brand: {
    name: string
    slug: string
    logo: string
  }
  category: {
    name: string
    slug: string
  }
  tags: string[]
  inStock: boolean
  rating: number
  reviewCount: number
  sustainabilityFeatures: string[]
  isNew?: boolean
  isBestSeller?: boolean
  createdAt: string
}

export const products: Product[] = [
  {
    id: 1,
    slug: "bamboo-toothbrush",
    name: "Bamboo Toothbrush",
    price: 4.99,
    images: [
      "/images/products/bamboo-toothbrush.png",
      "/images/products/bamboo-toothbrush.png",
      "/images/products/bamboo-toothbrush.png",
    ],
    description:
      "Our bamboo toothbrush is made from sustainably harvested bamboo with BPA-free nylon bristles. It's biodegradable, eco-friendly, and comes in plastic-free packaging. By switching to a bamboo toothbrush, you're preventing plastic toothbrushes from ending up in landfills and oceans.",
    shortDescription: "Eco-friendly bamboo toothbrush with BPA-free nylon bristles.",
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
    brand: {
      name: "EcoSmile",
      slug: "ecosmile",
      logo: "/images/brands/ecosmile.png",
    },
    category: {
      name: "Bathroom",
      slug: "bathroom",
    },
    tags: ["oral care", "bathroom", "plastic-free"],
    inStock: true,
    rating: 4.5,
    reviewCount: 38,
    sustainabilityFeatures: ["Plastic-Free", "Biodegradable", "Sustainable Materials"],
    isBestSeller: true,
    createdAt: "2023-01-15",
  },
  {
    id: 2,
    slug: "organic-cotton-towels",
    name: "Organic Cotton Towels",
    price: 24.99,
    images: [
      "/images/products/cotton-towels.png",
      "/images/products/cotton-towels.png",
      "/images/products/cotton-towels.png",
    ],
    description:
      "Our premium organic cotton towels are soft, absorbent, and free from harmful chemicals. Made with 100% GOTS-certified organic cotton and eco-friendly dyes. These towels are not only better for your skin but also better for the environment and the farmers who grow the cotton.",
    shortDescription: "Soft, absorbent towels made from 100% GOTS-certified organic cotton.",
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
    brand: {
      name: "Pure Home",
      slug: "pure-home",
      logo: "/images/brands/pure-home.png",
    },
    category: {
      name: "Home & Kitchen",
      slug: "home-kitchen",
    },
    tags: ["bathroom", "home", "organic"],
    inStock: true,
    rating: 5,
    reviewCount: 12,
    sustainabilityFeatures: ["Organic", "Chemical-Free", "Sustainable Materials"],
    createdAt: "2023-02-20",
  },
  {
    id: 3,
    slug: "natural-moisturizer",
    name: "Natural Moisturizer",
    price: 18.99,
    images: [
      "/images/products/natural-moisturizer.png",
      "/images/products/natural-moisturizer.png",
      "/images/products/natural-moisturizer.png",
    ],
    description:
      "Our natural moisturizer is made with organic ingredients like shea butter, coconut oil, and aloe vera to hydrate and nourish your skin. Free from parabens, synthetic fragrances, and other harmful chemicals. Packaged in a recyclable glass jar with a metal lid.",
    shortDescription: "Hydrating moisturizer made with organic ingredients in recyclable packaging.",
    features: [
      "Made with organic ingredients",
      "Free from parabens and synthetic fragrances",
      "Suitable for all skin types",
      "Recyclable glass packaging",
      "Not tested on animals",
    ],
    specifications: {
      Size: "4 oz",
      Ingredients: "Shea butter, coconut oil, aloe vera, essential oils",
      "Shelf Life": "12 months",
      "Country of Origin": "Made in USA",
      Storage: "Store in a cool, dry place",
    },
    brand: {
      name: "Gaia Beauty",
      slug: "gaia-beauty",
      logo: "/images/brands/gaia-beauty.png",
    },
    category: {
      name: "Beauty",
      slug: "beauty",
    },
    tags: ["skincare", "beauty", "organic"],
    inStock: true,
    rating: 4,
    reviewCount: 24,
    sustainabilityFeatures: ["Organic", "Cruelty-Free", "Recyclable Packaging"],
    createdAt: "2023-03-10",
  },
  {
    id: 4,
    slug: "reusable-food-wraps",
    name: "Reusable Food Wraps",
    price: 15.99,
    salePrice: 12.99,
    images: ["/images/products/food-wraps.png", "/images/products/food-wraps.png", "/images/products/food-wraps.png"],
    description:
      "Say goodbye to plastic wrap with our reusable food wraps. Made with organic cotton, beeswax, tree resin, and jojoba oil, these wraps are a sustainable alternative for food storage. They're washable, reusable for up to a year, and fully compostable at the end of their life.",
    shortDescription: "Sustainable alternative to plastic wrap for food storage.",
    features: [
      "Made with organic cotton and beeswax",
      "Washable and reusable for up to a year",
      "Compostable at end of life",
      "Comes in various sizes",
      "Plastic-free packaging",
    ],
    specifications: {
      Material: "Organic cotton, beeswax, tree resin, jojoba oil",
      Sizes: 'Small (7x8"), Medium (10x11"), Large (13x14")',
      "Pack Contents": "3 wraps (1 of each size)",
      "Care Instructions": "Wash with cold water and mild soap, air dry",
      "Country of Origin": "Made in Canada",
    },
    brand: {
      name: "Green Kitchen",
      slug: "green-kitchen",
      logo: "/images/brands/green-kitchen.png",
    },
    category: {
      name: "Home & Kitchen",
      slug: "home-kitchen",
    },
    tags: ["kitchen", "food storage", "plastic-free"],
    inStock: true,
    rating: 4.5,
    reviewCount: 42,
    sustainabilityFeatures: ["Plastic-Free", "Reusable", "Compostable"],
    isBestSeller: true,
    createdAt: "2023-01-05",
  },
  {
    id: 5,
    slug: "stainless-steel-water-bottle",
    name: "Stainless Steel Water Bottle",
    price: 29.99,
    images: [
      "/images/products/water-bottle.png",
      "/images/products/water-bottle.png",
      "/images/products/water-bottle.png",
    ],
    description:
      "Our double-walled stainless steel water bottle keeps drinks cold for 24 hours or hot for 12 hours. It's durable, leak-proof, and free from BPA and other harmful chemicals. By using this bottle, you're helping reduce the number of single-use plastic bottles that end up in landfills and oceans.",
    shortDescription: "Double-walled insulated bottle that keeps drinks cold for 24 hours or hot for 12 hours.",
    features: [
      "Made from 18/8 food-grade stainless steel",
      "Double-walled vacuum insulation",
      "BPA-free and non-toxic",
      "Leak-proof design",
      "Available in multiple colors",
    ],
    specifications: {
      Material: "18/8 stainless steel",
      Capacity: "24 oz",
      Dimensions: '10.5" H x 2.9" W',
      Weight: "12.8 oz",
      "Care Instructions": "Hand wash recommended",
    },
    brand: {
      name: "Green Kitchen",
      slug: "green-kitchen",
      logo: "/images/brands/green-kitchen.png",
    },
    category: {
      name: "Home & Kitchen",
      slug: "home-kitchen",
    },
    tags: ["hydration", "kitchen", "plastic-free"],
    inStock: true,
    rating: 4.8,
    reviewCount: 56,
    sustainabilityFeatures: ["Plastic-Free", "Reusable", "Durable"],
    isNew: true,
    createdAt: "2023-04-15",
  },
  {
    id: 6,
    slug: "natural-laundry-detergent",
    name: "Natural Laundry Detergent",
    price: 12.99,
    images: [
      "/images/products/laundry-detergent.png",
      "/images/products/laundry-detergent.png",
      "/images/products/laundry-detergent.png",
    ],
    description:
      "Our plant-based laundry detergent is tough on stains but gentle on your clothes and the environment. Free from synthetic fragrances, dyes, and optical brighteners. The concentrated formula comes in a recyclable cardboard box, reducing plastic waste.",
    shortDescription: "Plant-based laundry detergent in plastic-free packaging.",
    features: [
      "Plant-based ingredients",
      "Free from synthetic fragrances and dyes",
      "Biodegradable formula",
      "Plastic-free packaging",
      "Works in all washing machines",
    ],
    specifications: {
      Size: "36 oz (72 loads)",
      Ingredients: "Sodium carbonate, sodium bicarbonate, plant-based surfactants, enzymes",
      Scent: "Lavender (from essential oils)",
      "Country of Origin": "Made in USA",
      Storage: "Keep in a dry place",
    },
    brand: {
      name: "Pure Home",
      slug: "pure-home",
      logo: "/images/brands/pure-home.png",
    },
    category: {
      name: "Cleaning",
      slug: "cleaning",
    },
    tags: ["laundry", "cleaning", "plastic-free"],
    inStock: true,
    rating: 4.2,
    reviewCount: 31,
    sustainabilityFeatures: ["Plant-Based", "Biodegradable", "Plastic-Free Packaging"],
    createdAt: "2023-02-28",
  },
]

export const categories = [
  {
    name: "Home & Kitchen",
    slug: "home-kitchen",
    image: "/images/categories/home-kitchen.png",
    description: "Sustainable products for your kitchen and home.",
  },
  {
    name: "Cleaning",
    slug: "cleaning",
    image: "/images/categories/cleaning.png",
    description: "Eco-friendly cleaning products for a healthier home.",
  },
  {
    name: "Bathroom",
    slug: "bathroom",
    image: "/images/categories/bathroom.png",
    description: "Sustainable alternatives for your bathroom routine.",
  },
  {
    name: "Beauty",
    slug: "beauty",
    image: "/images/categories/beauty.png",
    description: "Natural and cruelty-free beauty products.",
  },
  {
    name: "Kids & Pets",
    slug: "kids-pets",
    image: "/images/categories/kids-pets.png",
    description: "Eco-friendly products for the little ones and furry friends.",
  },
  {
    name: "On Sale",
    slug: "sale",
    image: "/images/categories/sale.png",
    description: "Great deals on sustainable products.",
  },
]

export const brands = [
  {
    name: "EcoSmile",
    slug: "ecosmile",
    logo: "/images/brands/ecosmile.png",
    description: "Sustainable oral care products.",
  },
  {
    name: "Pure Home",
    slug: "pure-home",
    logo: "/images/brands/pure-home.png",
    description: "Eco-friendly home and cleaning products.",
  },
  {
    name: "Gaia Beauty",
    slug: "gaia-beauty",
    logo: "/images/brands/gaia-beauty.png",
    description: "Natural and organic beauty products.",
  },
  {
    name: "Green Kitchen",
    slug: "green-kitchen",
    logo: "/images/brands/green-kitchen.png",
    description: "Sustainable kitchen and food storage solutions.",
  },
]

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((product) => product.category.slug === categorySlug)
}

export function getProductsByBrand(brandSlug: string): Product[] {
  return products.filter((product) => product.brand.slug === brandSlug)
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  // Get products in the same category, excluding the current product
  const categoryProducts = products.filter((p) => p.category.slug === product.category.slug && p.id !== product.id)

  // If we have enough products in the same category, return them
  if (categoryProducts.length >= limit) {
    return categoryProducts.slice(0, limit)
  }

  // Otherwise, get products with the same tags
  const productTags = new Set(product.tags)
  const tagProducts = products.filter((p) => p.id !== product.id && p.tags.some((tag) => productTags.has(tag)))

  // Combine unique products from both lists
  const combined = [...categoryProducts]
  for (const tagProduct of tagProducts) {
    if (!combined.some((p) => p.id === tagProduct.id)) {
      combined.push(tagProduct)
      if (combined.length >= limit) break
    }
  }

  // If we still don't have enough, add random products
  if (combined.length < limit) {
    const remainingProducts = products.filter((p) => p.id !== product.id && !combined.some((cp) => cp.id === p.id))

    const randomProducts = remainingProducts.sort(() => 0.5 - Math.random()).slice(0, limit - combined.length)

    combined.push(...randomProducts)
  }

  return combined.slice(0, limit)
}

export function searchProducts(
  query: string,
  filters?: {
    category?: string
    brand?: string
    minPrice?: number
    maxPrice?: number
    sustainabilityFeatures?: string[]
    inStock?: boolean
    sortBy?: "price-asc" | "price-desc" | "newest" | "rating" | "best-selling"
  },
): Product[] {
  // Start with all products
  let results = [...products]

  // Apply text search if query is provided
  if (query && query.trim() !== "") {
    const searchTerms = query.toLowerCase().split(" ")
    results = results.filter((product) => {
      // Check if any search term is in the product name, description, or tags
      return searchTerms.some(
        (term) =>
          product.name.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term) ||
          product.tags.some((tag) => tag.toLowerCase().includes(term)),
      )
    })
  }

  // Apply filters if provided
  if (filters) {
    // Filter by category
    if (filters.category) {
      results = results.filter((product) => product.category.slug === filters.category)
    }

    // Filter by brand
    if (filters.brand) {
      results = results.filter((product) => product.brand.slug === filters.brand)
    }

    // Filter by price range
    if (filters.minPrice !== undefined) {
      results = results.filter((product) => {
        const price = product.salePrice || product.price
        return price >= filters.minPrice!
      })
    }

    if (filters.maxPrice !== undefined) {
      results = results.filter((product) => {
        const price = product.salePrice || product.price
        return price <= filters.maxPrice!
      })
    }

    // Filter by sustainability features
    if (filters.sustainabilityFeatures && filters.sustainabilityFeatures.length > 0) {
      results = results.filter((product) =>
        filters.sustainabilityFeatures!.some((feature) => product.sustainabilityFeatures.includes(feature)),
      )
    }

    // Filter by stock status
    if (filters.inStock !== undefined) {
      results = results.filter((product) => product.inStock === filters.inStock)
    }

    // Apply sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "price-asc":
          results.sort((a, b) => {
            const priceA = a.salePrice || a.price
            const priceB = b.salePrice || b.price
            return priceA - priceB
          })
          break
        case "price-desc":
          results.sort((a, b) => {
            const priceA = a.salePrice || a.price
            const priceB = b.salePrice || b.price
            return priceB - priceA
          })
          break
        case "newest":
          results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          break
        case "rating":
          results.sort((a, b) => b.rating - a.rating)
          break
        case "best-selling":
          // In a real app, this would use actual sales data
          // Here we'll just prioritize products marked as best sellers
          results.sort((a, b) => {
            if (a.isBestSeller && !b.isBestSeller) return -1
            if (!a.isBestSeller && b.isBestSeller) return 1
            return b.rating * b.reviewCount - a.rating * a.reviewCount
          })
          break
      }
    }
  }

  return results
}
