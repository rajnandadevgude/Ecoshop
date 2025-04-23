"use client"

import type React from "react"

import { useState } from "react"
import { Star, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/context/auth-context"
import { getReviewsByProductId, addReview, markReviewHelpful, type Review } from "@/lib/data/reviews"
import Image from "next/image"

interface ProductReviewsProps {
  productId: number
  initialReviews?: Review[]
}

export default function ProductReviews({ productId, initialReviews }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews || getReviewsByProductId(productId))
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    title: "",
    content: "",
  })
  const [helpfulReviews, setHelpfulReviews] = useState<number[]>([])
  const { toast } = useToast()
  const { user } = useAuth()

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to leave a review.",
        variant: "destructive",
      })
      return
    }

    if (!reviewForm.title || !reviewForm.content) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields.",
        variant: "destructive",
      })
      return
    }

    const newReview = addReview({
      productId,
      userId: user.id,
      userName: user.name,
      rating: reviewForm.rating,
      title: reviewForm.title,
      content: reviewForm.content,
      verified: true,
    })

    setReviews([newReview, ...reviews])
    setReviewForm({ rating: 5, title: "", content: "" })
    setShowReviewForm(false)

    toast({
      title: "Review submitted",
      description: "Thank you for your review!",
    })
  }

  const handleHelpfulClick = (reviewId: number) => {
    if (helpfulReviews.includes(reviewId)) return

    markReviewHelpful(reviewId)
    setHelpfulReviews([...helpfulReviews, reviewId])

    // Update the review in the local state
    setReviews(reviews.map((review) => (review.id === reviewId ? { ...review, helpful: review.helpful + 1 } : review)))

    toast({
      title: "Marked as helpful",
      description: "Thank you for your feedback!",
    })
  }

  // Calculate average rating
  const averageRating =
    reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0

  // Calculate rating distribution
  const ratingCounts = [0, 0, 0, 0, 0]
  reviews.forEach((review) => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingCounts[review.rating - 1]++
    }
  })

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">Customer Reviews</h3>
        <Button
          variant="outline"
          className="text-emerald-800 border-emerald-800 hover:bg-emerald-50"
          onClick={() => setShowReviewForm(!showReviewForm)}
        >
          Write a Review
        </Button>
      </div>

      {/* Review summary */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-4">
            <div className="flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <Star
                    key={rating}
                    className={`h-5 w-5 flex-shrink-0 ${
                      averageRating > rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="ml-3 text-sm text-gray-700">
                Based on {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
              </p>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-900">Rating distribution</h4>

              <div className="mt-2 space-y-3">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center text-sm">
                    <div className="flex items-center">
                      {rating} <Star className="h-4 w-4 ml-1 text-yellow-400 fill-yellow-400" />
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 ml-3">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{
                          width: reviews.length > 0 ? `${(ratingCounts[rating - 1] / reviews.length) * 100}%` : "0%",
                        }}
                      ></div>
                    </div>
                    <span className="ml-3 text-gray-500">{ratingCounts[rating - 1]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 lg:mt-0 lg:col-span-8">
            <h4 className="text-sm font-medium text-gray-900">Share your thoughts</h4>
            <p className="mt-1 text-sm text-gray-600">
              If you've used this product, share your thoughts with other customers
            </p>

            {showReviewForm && (
              <form onSubmit={handleReviewSubmit} className="mt-6 space-y-6 bg-white p-6 rounded-lg shadow-sm">
                <div>
                  <Label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                    Rating
                  </Label>
                  <div className="flex items-center mt-1">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        className="p-1"
                        onClick={() => setReviewForm({ ...reviewForm, rating })}
                      >
                        <Star
                          className={`h-6 w-6 ${
                            reviewForm.rating >= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Review Title
                  </Label>
                  <Input
                    id="title"
                    value={reviewForm.title}
                    onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="content" className="block text-sm font-medium text-gray-700">
                    Review Content
                  </Label>
                  <Textarea
                    id="content"
                    value={reviewForm.content}
                    onChange={(e) => setReviewForm({ ...reviewForm, content: e.target.value })}
                    rows={4}
                    className="mt-1"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setShowReviewForm(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-emerald-800 hover:bg-emerald-700">
                    Submit Review
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Reviews list */}
      <div className="space-y-8">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-8">
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <Star
                      key={rating}
                      className={`h-4 w-4 flex-shrink-0 ${
                        review.rating > rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <div className="ml-2 flex items-center">
                  {review.userAvatar ? (
                    <Image
                      src={review.userAvatar || "/placeholder.svg"}
                      alt={review.userName}
                      width={24}
                      height={24}
                      className="h-6 w-6 rounded-full mr-2"
                    />
                  ) : (
                    <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-medium mr-2">
                      {review.userName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <p className="text-sm font-medium text-gray-900">{review.userName}</p>
                  {review.verified && (
                    <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">
                      Verified Purchase
                    </span>
                  )}
                </div>
                <p className="ml-auto text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
              </div>

              <h4 className="text-base font-medium text-gray-900 mb-2">{review.title}</h4>
              <p className="text-gray-600 mb-4">{review.content}</p>

              <div className="flex items-center">
                <button
                  onClick={() => handleHelpfulClick(review.id)}
                  className={`flex items-center text-sm ${
                    helpfulReviews.includes(review.id) ? "text-emerald-800" : "text-gray-500 hover:text-gray-700"
                  }`}
                  disabled={helpfulReviews.includes(review.id)}
                >
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  Helpful ({review.helpful})
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
          </div>
        )}
      </div>
    </div>
  )
}
