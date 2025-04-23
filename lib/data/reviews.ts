export interface Review {
  id: number
  productId: number
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  title: string
  content: string
  createdAt: string
  helpful: number
  verified: boolean
}

export const reviews: Review[] = [
  {
    id: 1,
    productId: 1,
    userId: "user1",
    userName: "Sarah J.",
    userAvatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
    title: "Great sustainable option!",
    content:
      "I've been searching for eco-friendly products that actually work, and this bamboo toothbrush is perfect. It's comfortable to hold, the bristles are just the right firmness, and it looks nice too!",
    createdAt: "2023-01-20",
    helpful: 12,
    verified: true,
  },
  {
    id: 2,
    productId: 1,
    userId: "user2",
    userName: "Michael T.",
    userAvatar: "/placeholder.svg?height=100&width=100",
    rating: 4,
    title: "Good but bristles wear quickly",
    content:
      "I like the concept and the handle is great, but I found the bristles started to wear out faster than my regular toothbrush. Still, I'll keep buying them to avoid plastic waste.",
    createdAt: "2023-02-15",
    helpful: 8,
    verified: true,
  },
  {
    id: 3,
    productId: 1,
    userId: "user3",
    userName: "Emma L.",
    rating: 5,
    title: "Love this toothbrush!",
    content:
      "This is my third bamboo toothbrush from EcoSmile and I'm still impressed. The quality is consistent and I love knowing I'm reducing plastic waste.",
    createdAt: "2023-03-05",
    helpful: 5,
    verified: true,
  },
  {
    id: 4,
    productId: 2,
    userId: "user4",
    userName: "David K.",
    rating: 5,
    title: "Luxurious and sustainable",
    content:
      "These towels are incredibly soft and absorbent. They're a bit pricier than regular towels, but the quality and sustainability aspects make them worth it.",
    createdAt: "2023-02-25",
    helpful: 10,
    verified: true,
  },
  {
    id: 5,
    productId: 2,
    userId: "user5",
    userName: "Olivia P.",
    userAvatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
    title: "Best towels I've ever owned",
    content:
      "These towels are amazing! Super soft, absorbent, and they dry quickly. I also love that they're made from organic cotton. Will definitely buy more.",
    createdAt: "2023-03-10",
    helpful: 7,
    verified: true,
  },
  {
    id: 6,
    productId: 3,
    userId: "user6",
    userName: "James W.",
    rating: 4,
    title: "Great for sensitive skin",
    content:
      "I have very sensitive skin and this moisturizer works perfectly for me. No irritation and it keeps my skin hydrated all day. The only reason I'm giving 4 stars instead of 5 is that I wish the jar was a bit larger for the price.",
    createdAt: "2023-03-15",
    helpful: 9,
    verified: true,
  },
  {
    id: 7,
    productId: 3,
    userId: "user7",
    userName: "Sophia R.",
    userAvatar: "/placeholder.svg?height=100&width=100",
    rating: 3,
    title: "Good but not great",
    content:
      "The moisturizer itself is good quality and I like that it's all natural, but I found it a bit too heavy for my combination skin. Might be better for those with dry skin.",
    createdAt: "2023-03-20",
    helpful: 4,
    verified: true,
  },
  {
    id: 8,
    productId: 4,
    userId: "user8",
    userName: "Liam T.",
    rating: 5,
    title: "Game changer for food storage",
    content:
      "These food wraps are amazing! They work just as well as plastic wrap but are reusable and better for the environment. I've already recommended them to all my friends.",
    createdAt: "2023-01-30",
    helpful: 15,
    verified: true,
  },
  {
    id: 9,
    productId: 4,
    userId: "user9",
    userName: "Ava M.",
    rating: 4,
    title: "Great product with a learning curve",
    content:
      "These work really well once you get the hang of them. The warmth of your hands helps them stick. They're not quite as clingy as plastic wrap, but they do the job and I feel good about not using plastic.",
    createdAt: "2023-02-10",
    helpful: 11,
    verified: true,
  },
  {
    id: 10,
    productId: 5,
    userId: "user10",
    userName: "Noah C.",
    userAvatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
    title: "Best water bottle I've owned",
    content:
      "This water bottle is fantastic! It really does keep water cold for 24 hours (I tested it!). The design is sleek and it doesn't leak at all. Worth every penny.",
    createdAt: "2023-04-20",
    helpful: 6,
    verified: true,
  },
]

export function getReviewsByProductId(productId: number): Review[] {
  return reviews.filter((review) => review.productId === productId)
}

export function getAverageRating(productId: number): number {
  const productReviews = getReviewsByProductId(productId)
  if (productReviews.length === 0) return 0

  const sum = productReviews.reduce((total, review) => total + review.rating, 0)
  return sum / productReviews.length
}

export function addReview(review: Omit<Review, "id" | "createdAt" | "helpful">): Review {
  const newReview: Review = {
    id: reviews.length + 1,
    ...review,
    createdAt: new Date().toISOString().split("T")[0],
    helpful: 0,
  }

  reviews.push(newReview)
  return newReview
}

export function markReviewHelpful(reviewId: number): boolean {
  const review = reviews.find((r) => r.id === reviewId)
  if (!review) return false

  review.helpful += 1
  return true
}
