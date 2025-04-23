"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const faqs = [
  {
    category: "Orders & Shipping",
    questions: [
      {
        question: "How long will it take to receive my order?",
        answer:
          "Most orders ship within 1-2 business days. Delivery typically takes 3-5 business days depending on your location. You'll receive a shipping confirmation email with tracking information once your order ships.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Yes, we ship to select international destinations. International shipping rates and delivery times vary by location. Please note that customers are responsible for any customs fees or import taxes that may apply.",
      },
      {
        question: "Is shipping free?",
        answer:
          "We offer free standard shipping on all U.S. orders over $75. Orders under $75 have a flat shipping rate of $5.99.",
      },
      {
        question: "Can I change or cancel my order?",
        answer:
          "We process orders quickly to ensure fast delivery. If you need to change or cancel your order, please contact us immediately at support@ecohero.com. We'll do our best to accommodate your request, but we cannot guarantee changes once an order has been placed.",
      },
    ],
  },
  {
    category: "Returns & Refunds",
    questions: [
      {
        question: "What is your return policy?",
        answer:
          "We accept returns within 30 days of delivery for unused items in their original packaging. Some products, such as personal care items, may not be eligible for return once opened due to hygiene reasons.",
      },
      {
        question: "How do I initiate a return?",
        answer:
          "To start a return, log into your account and go to your order history, or contact our customer service team at support@ecohero.com. We'll provide you with a return shipping label and instructions.",
      },
      {
        question: "When will I receive my refund?",
        answer:
          "Once we receive and inspect your return, we'll process your refund within 3-5 business days. It may take an additional 5-10 business days for the refund to appear on your original payment method.",
      },
      {
        question: "Do I have to pay for return shipping?",
        answer:
          "For returns due to our error (wrong item, defective product, etc.), we'll cover the return shipping cost. For other returns, a $5.99 return shipping fee will be deducted from your refund.",
      },
    ],
  },
  {
    category: "Products & Sustainability",
    questions: [
      {
        question: "How do you select your products?",
        answer:
          "We have a rigorous selection process that evaluates products based on sustainability, effectiveness, and ethical production. We look for items made from renewable or recycled materials, with minimal packaging, and produced by companies with strong environmental and social commitments.",
      },
      {
        question: "Are all your products vegan and cruelty-free?",
        answer:
          "The majority of our products are vegan and cruelty-free. Each product page clearly indicates whether a product is vegan. We never sell products tested on animals.",
      },
      {
        question: "What does 'biodegradable' mean for your products?",
        answer:
          "When we label a product as biodegradable, it means it will break down naturally in the environment within a reasonable timeframe, typically less than a year. We verify biodegradability claims with manufacturers and prioritize products with third-party certifications.",
      },
      {
        question: "How do you minimize packaging waste?",
        answer:
          "We use minimal, recyclable or compostable packaging for shipping. Many of our products come in plastic-free packaging, and we're constantly working with our brand partners to reduce packaging waste further.",
      },
    ],
  },
  {
    category: "Account & Orders",
    questions: [
      {
        question: "How do I create an account?",
        answer:
          "You can create an account by clicking the 'Account' icon in the top right corner of our website and selecting 'Register'. You'll need to provide your email address and create a password.",
      },
      {
        question: "Can I place an order without creating an account?",
        answer:
          "Yes, we offer guest checkout for your convenience. However, creating an account allows you to track orders, save favorite products, and earn rewards.",
      },
      {
        question: "How can I track my order?",
        answer:
          "Once your order ships, you'll receive a shipping confirmation email with tracking information. You can also log into your account and view your order status under 'Order History'.",
      },
      {
        question: "Do you have a loyalty or rewards program?",
        answer:
          "Yes! Our EcoRewards program lets you earn points on purchases that can be redeemed for discounts on future orders. You also earn points for referring friends, writing reviews, and recycling product packaging through our mail-back program.",
      },
    ],
  },
]

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const filteredFaqs = searchQuery
    ? faqs
        .map((category) => ({
          ...category,
          questions: category.questions.filter(
            (q) =>
              q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        }))
        .filter((category) => category.questions.length > 0)
    : faqs

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative bg-emerald-800 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-6 text-xl text-emerald-100 max-w-3xl mx-auto">
            Find answers to common questions about our products, shipping, returns, and more.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        {/* Search */}
        <div className="mb-12">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* FAQ Categories */}
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((category) => (
            <div key={category.category} className="mb-10">
              <h2
                className="text-2xl font-bold text-gray-900 mb-6 cursor-pointer flex items-center"
                onClick={() => toggleCategory(category.category)}
              >
                {category.category}
                <span className="ml-2 text-emerald-800">
                  {expandedCategories.includes(category.category) ? "−" : "+"}
                </span>
              </h2>

              {(expandedCategories.includes(category.category) || searchQuery) && (
                <Accordion type="single" collapsible className="space-y-4">
                  {category.questions.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg p-2">
                      <AccordionTrigger className="text-left font-medium text-gray-900 hover:text-emerald-800">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 pt-2">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any FAQs matching your search. Please try different keywords or browse our categories.
            </p>
            <Button onClick={() => setSearchQuery("")} className="bg-emerald-800 hover:bg-emerald-700">
              Clear Search
            </Button>
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Still have questions?</h3>
          <p className="text-gray-600 mb-6">
            If you couldn't find the answer you were looking for, our team is here to help.
          </p>
          <Link href="/contact">
            <Button className="bg-emerald-800 hover:bg-emerald-700">Contact Us</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
