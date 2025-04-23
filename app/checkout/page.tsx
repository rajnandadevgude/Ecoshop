"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, CreditCard, Truck, ShieldCheck } from "lucide-react"

export default function CheckoutPage() {
  const { cartItems, subtotal, clearCart } = useCart()
  const { toast } = useToast()
  const router = useRouter()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    phone: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    saveInfo: false,
  })

  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [isProcessing, setIsProcessing] = useState(false)

  const shipping = subtotal > 75 ? 0 : 5.99
  const tax = subtotal * 0.07
  const total = subtotal + shipping + tax

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Order placed successfully!",
      description: "Thank you for your purchase. You will receive a confirmation email shortly.",
    })

    clearCart()
    router.push("/checkout/confirmation")
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
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
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/cart" className="inline-flex items-center text-emerald-800 hover:text-emerald-700 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Cart
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
          {/* Order summary */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              <div className="flow-root">
                <ul className="-my-4 divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item.id} className="flex py-4">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{item.name}</h3>
                            <p className="ml-4">${item.price.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500">Qty {item.quantity}</p>
                          <p className="text-gray-500">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-gray-200 pt-4 mt-6">
                <div className="flex justify-between text-base text-gray-600 mb-2">
                  <p>Subtotal</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-base text-gray-600 mb-2">
                  <p>Shipping</p>
                  <p>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</p>
                </div>
                <div className="flex justify-between text-base text-gray-600 mb-4">
                  <p>Tax</p>
                  <p>${tax.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total</p>
                  <p>${total.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
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
                  <h3 className="text-sm font-medium text-gray-900">Secure checkout</h3>
                  <p className="text-sm text-gray-600">Your data is protected</p>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout form */}
          <div className="mt-10 lg:mt-0 lg:col-span-7 xl:col-span-8">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
              {/* Shipping information */}
              <div className="mb-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Information</h2>
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div>
                    <Label htmlFor="firstName">First name</Label>
                    <Input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last name</Label>
                    <Input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State / Province</Label>
                    <Input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP / Postal code</Label>
                    <Input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Payment method */}
              <div className="border-t border-gray-200 pt-8 mb-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h2>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                  <div className="flex items-center space-x-3 border rounded-md p-4">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card" className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Credit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 border rounded-md p-4">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal">PayPal</Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "credit-card" && (
                  <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <div className="sm:col-span-2">
                      <Label htmlFor="cardNumber">Card number</Label>
                      <Input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="XXXX XXXX XXXX XXXX"
                        required
                        className="mt-1"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="cardName">Name on card</Label>
                      <Input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="expiryDate">Expiry date (MM/YY)</Label>
                      <Input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Save information */}
              <div className="border-t border-gray-200 pt-8 mb-8">
                <div className="flex items-center">
                  <Checkbox
                    id="saveInfo"
                    name="saveInfo"
                    checked={formData.saveInfo}
                    onCheckedChange={(checked) => setFormData({ ...formData, saveInfo: checked as boolean })}
                  />
                  <Label htmlFor="saveInfo" className="ml-2">
                    Save this information for next time
                  </Label>
                </div>
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                className="w-full bg-emerald-800 hover:bg-emerald-700 py-3 text-lg"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Place Order"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
