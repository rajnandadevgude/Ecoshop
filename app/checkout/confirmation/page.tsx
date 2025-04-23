"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function ConfirmationPage() {
  const router = useRouter()
  const [orderNumber, setOrderNumber] = useState("")

  useEffect(() => {
    // Generate a random order number
    const randomOrderNumber = Math.floor(100000 + Math.random() * 900000).toString()
    setOrderNumber(randomOrderNumber)

    // If user navigates directly to this page without placing an order, redirect to home
    const hasPlacedOrder = localStorage.getItem("hasPlacedOrder")
    if (!hasPlacedOrder) {
      router.push("/")
    } else {
      localStorage.removeItem("hasPlacedOrder")
    }
  }, [router])

  return (
    <div className="bg-white">
      <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center">
            <CheckCircle className="h-16 w-16 text-emerald-800" />
          </div>
          <h1 className="mt-4 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
            Thank you for your order!
          </h1>
          <p className="mt-2 text-lg text-gray-600">Your order #{orderNumber} has been placed successfully.</p>
          <p className="mt-1 text-base text-gray-600">We've sent you a confirmation email with all the details.</p>
        </div>

        <div className="mt-12 bg-gray-50 rounded-lg p-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">What happens next?</h2>
          <div className="space-y-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-emerald-800 text-white">1</div>
              </div>
              <div className="ml-4">
                <h3 className="text-base font-medium text-gray-900">Order processing</h3>
                <p className="mt-1 text-sm text-gray-600">
                  We're preparing your order for shipment. You'll receive an email when it's on its way.
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-emerald-800 text-white">2</div>
              </div>
              <div className="ml-4">
                <h3 className="text-base font-medium text-gray-900">Shipping</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Your order will be shipped within 1-2 business days. Delivery typically takes 3-5 business days.
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-emerald-800 text-white">3</div>
              </div>
              <div className="ml-4">
                <h3 className="text-base font-medium text-gray-900">Delivery</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Once your order is delivered, we'd love to hear your feedback. Please consider leaving a review!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-base text-gray-600 mb-4">
            Have questions about your order? Visit our{" "}
            <Link href="/faq" className="text-emerald-800 hover:text-emerald-700 underline">
              FAQ page
            </Link>{" "}
            or{" "}
            <Link href="/contact" className="text-emerald-800 hover:text-emerald-700 underline">
              contact us
            </Link>
            .
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/account/orders">
              <Button variant="outline" className="border-emerald-800 text-emerald-800 hover:bg-emerald-50">
                View Order
              </Button>
            </Link>
            <Link href="/shop">
              <Button className="bg-emerald-800 hover:bg-emerald-700">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
