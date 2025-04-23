import { Leaf, Recycle, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SustainabilitySection() {
  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Commitment to Sustainability</h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            We carefully curate products that are better for you and the planet.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="pt-6">
            <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
              <div className="-mt-6">
                <div>
                  <span className="inline-flex items-center justify-center p-3 bg-emerald-800 rounded-md shadow-lg">
                    <Leaf className="h-6 w-6 text-white" aria-hidden="true" />
                  </span>
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Eco-Friendly Materials</h3>
                <p className="mt-5 text-base text-gray-500">
                  All our products are made from sustainable, renewable, or recycled materials to minimize environmental
                  impact.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
              <div className="-mt-6">
                <div>
                  <span className="inline-flex items-center justify-center p-3 bg-emerald-800 rounded-md shadow-lg">
                    <Recycle className="h-6 w-6 text-white" aria-hidden="true" />
                  </span>
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Zero Waste Packaging</h3>
                <p className="mt-5 text-base text-gray-500">
                  We're committed to minimizing packaging waste with compostable, recyclable, or reusable packaging
                  solutions.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
              <div className="-mt-6">
                <div>
                  <span className="inline-flex items-center justify-center p-3 bg-emerald-800 rounded-md shadow-lg">
                    <ShieldCheck className="h-6 w-6 text-white" aria-hidden="true" />
                  </span>
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Ethical Sourcing</h3>
                <p className="mt-5 text-base text-gray-500">
                  We partner with brands that prioritize fair labor practices and ethical manufacturing processes.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link href="/about/sustainability">
            <Button
              variant="outline"
              className="text-emerald-800 border-emerald-800 hover:bg-emerald-800 hover:text-white"
            >
              Learn More About Our Mission
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
