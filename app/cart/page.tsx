"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Trash2, Plus, Minus } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, subtotal, clearCart } = useCart()
  const { toast } = useToast()
  const [promoCode, setPromoCode] = useState("")
  const [isApplyingPromo, setIsApplyingPromo] = useState(false)
  const [discount, setDiscount] = useState(0)

  const shipping = subtotal > 75 ? 0 : 5.99
  const tax = subtotal * 0.07
  const total = subtotal + shipping + tax - discount

  const handleApplyPromo = async () => {
    setIsApplyingPromo(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (promoCode.toUpperCase() === "EARTH15") {
      const discountAmount = subtotal * 0.15
      setDiscount(discountAmount)
      toast({
        title: "Promo code applied!",
        description: `You saved $${discountAmount.toFixed(2)} with code EARTH15.`,
      })
    } else {
      toast({
        title: "Invalid promo code",
        description: "Please check your code and try again.",
        variant: "destructive",
      })
    }

    setIsApplyingPromo(false)
  }

  const handleCheckout = () => {
    // Navigate to checkout page
    window.location.href = "/checkout"
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <p className="text-lg text-gray-600 mb-6">Your cart is empty</p>
          <Link href="/shop">
            <Button className="bg-emerald-800 hover:bg-emerald-700">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-8">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-medium text-gray-900">Items ({cartItems.length})</h2>
            </div>

            <ul className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li key={item.id} className="px-6 py-6 flex items-center">
                  <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-center object-cover"
                    />
                  </div>

                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <h3 className="text-base font-medium text-gray-900">
                        <Link href={`/product/${item.id}`}>{item.name}</Link>
                      </h3>
                      <p className="ml-4 text-base font-medium text-gray-900">${item.price.toFixed(2)}</p>
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex items-center border rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 text-gray-600 hover:text-gray-900"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 py-1">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 text-gray-600 hover:text-gray-900"
                          aria-label="Increase quantity"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                        aria-label="Remove item"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-gray-200 px-6 py-4 flex justify-between">
              <Button variant="outline" onClick={clearCart} className="text-red-500 border-red-500 hover:bg-red-50">
                Clear Cart
              </Button>
              <Link href="/shop">
                <Button variant="outline">Continue Shopping</Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 lg:mt-0 lg:col-span-4">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
            </div>

            <div className="px-6 py-4 space-y-4">
              <div className="flex justify-between">
                <p className="text-base text-gray-600">Subtotal</p>
                <p className="text-base font-medium text-gray-900">${subtotal.toFixed(2)}</p>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-800">
                  <p className="text-base">Discount (EARTH15)</p>
                  <p className="text-base font-medium">-${discount.toFixed(2)}</p>
                </div>
              )}

              <div className="flex justify-between">
                <p className="text-base text-gray-600">Shipping</p>
                <p className="text-base font-medium text-gray-900">
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-base text-gray-600">Tax (7%)</p>
                <p className="text-base font-medium text-gray-900">${tax.toFixed(2)}</p>
              </div>

              <div className="border-t border-gray-200 pt-4 flex justify-between">
                <p className="text-lg font-medium text-gray-900">Total</p>
                <p className="text-lg font-bold text-gray-900">${total.toFixed(2)}</p>
              </div>

              <div className="mt-6">
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleApplyPromo} disabled={isApplyingPromo || !promoCode} variant="outline">
                    {isApplyingPromo ? "Applying..." : "Apply"}
                  </Button>
                </div>
                {shipping > 0 && <p className="mt-2 text-sm text-gray-500">Free shipping on orders over $75</p>}
              </div>

              <Button onClick={handleCheckout} className="w-full bg-emerald-800 hover:bg-emerald-700 text-white py-3">
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
