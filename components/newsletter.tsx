"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    setIsSubmitted(true)
    toast({
      title: "Subscription successful!",
      description: "Thank you for subscribing to our newsletter.",
    })
  }

  return (
    <div className="bg-emerald-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="px-6 py-6 md:py-12 md:px-12 lg:py-16 lg:px-16 xl:flex xl:items-center">
          <div className="xl:w-0 xl:flex-1">
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Join our sustainable community
            </h2>
            <p className="mt-3 max-w-3xl text-lg leading-6 text-emerald-100">
              Sign up for our newsletter to receive eco-tips, new product alerts, and exclusive offers.
            </p>
          </div>
          <div className="mt-8 sm:w-full sm:max-w-md xl:mt-0 xl:ml-8">
            {isSubmitted ? (
              <div className="bg-white py-4 px-6 rounded-md">
                <p className="text-emerald-800 font-medium">Thanks for subscribing!</p>
                <p className="text-gray-600 text-sm mt-1">Check your inbox for a confirmation email.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="sm:flex">
                <Input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-emerald-700 focus:ring-white"
                  disabled={isLoading}
                />
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                  <Button
                    type="submit"
                    className="w-full bg-white text-emerald-800 hover:bg-emerald-100"
                    disabled={isLoading}
                  >
                    {isLoading ? "Subscribing..." : "Subscribe"}
                  </Button>
                </div>
              </form>
            )}
            <p className="mt-3 text-sm text-emerald-100">
              We care about your data. Read our{" "}
              <a href="/privacy" className="text-white font-medium underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
