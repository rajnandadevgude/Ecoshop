import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative bg-emerald-800 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">About EcoHero</h1>
          <p className="mt-6 text-xl text-emerald-100 max-w-3xl mx-auto">
            We're on a mission to make sustainable living accessible to everyone.
          </p>
        </div>
      </div>

      {/* Our story section */}
      <div className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Story</h2>
              <p className="mt-4 text-lg text-gray-600">
                EcoHero was founded in 2020 with a simple idea: make it easy for people to find sustainable alternatives
                to everyday products. We were tired of spending hours researching products, reading ingredient lists,
                and trying to figure out which companies were truly committed to sustainability.
              </p>
              <p className="mt-4 text-lg text-gray-600">
                We started by curating a small collection of products that met our strict standards for sustainability,
                effectiveness, and ethical production. As word spread, our community grew, and today we offer hundreds
                of products that help people reduce waste, eliminate toxins, and live more sustainably.
              </p>
              <p className="mt-4 text-lg text-gray-600">
                Our team is passionate about environmental conservation and believes that small changes, when adopted by
                many, can create significant positive impact for our planet.
              </p>
            </div>
            <div className="mt-10 lg:mt-0">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="EcoHero team"
                width={800}
                height={600}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Our values section */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Values</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              These core principles guide everything we do, from the products we select to how we operate our business.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-900">Sustainability First</h3>
              <p className="mt-4 text-gray-600">
                We prioritize products made from sustainable, renewable, or recycled materials that minimize
                environmental impact throughout their lifecycle.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-900">Transparency</h3>
              <p className="mt-4 text-gray-600">
                We believe in honest communication about our products, practices, and progress. We share both our
                successes and areas where we're working to improve.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-900">Ethical Production</h3>
              <p className="mt-4 text-gray-600">
                We partner with brands that prioritize fair labor practices, safe working conditions, and ethical
                manufacturing processes.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-900">Quality & Effectiveness</h3>
              <p className="mt-4 text-gray-600">
                Sustainable products should work as well as or better than conventional alternatives. We test everything
                we sell to ensure it meets high standards.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-900">Education</h3>
              <p className="mt-4 text-gray-600">
                We're committed to helping our community understand environmental issues and empowering them to make
                informed choices.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-900">Community</h3>
              <p className="mt-4 text-gray-600">
                We believe in the power of collective action and strive to build a community of like-minded individuals
                working toward a more sustainable future.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team section */}
      <div className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Meet Our Team</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              We're a passionate group of environmentalists, product experts, and business professionals united by our
              commitment to sustainability.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Emma Johnson",
                role: "Founder & CEO",
                image: "/placeholder.svg?height=400&width=400",
              },
              {
                name: "Michael Chen",
                role: "Head of Product",
                image: "/placeholder.svg?height=400&width=400",
              },
              {
                name: "Sophia Rodriguez",
                role: "Sustainability Director",
                image: "/placeholder.svg?height=400&width=400",
              },
              {
                name: "David Kim",
                role: "Operations Manager",
                image: "/placeholder.svg?height=400&width=400",
              },
              {
                name: "Olivia Patel",
                role: "Community Manager",
                image: "/placeholder.svg?height=400&width=400",
              },
              {
                name: "James Wilson",
                role: "Customer Experience Lead",
                image: "/placeholder.svg?height=400&width=400",
              },
            ].map((person) => (
              <div key={person.name} className="text-center">
                <div className="relative h-64 w-64 mx-auto rounded-full overflow-hidden">
                  <Image
                    src={person.image || "/placeholder.svg"}
                    alt={person.name}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-6 text-xl font-medium text-gray-900">{person.name}</h3>
                <p className="text-emerald-800">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-emerald-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to make a difference?</span>
            <span className="block text-emerald-100">Join our sustainable community today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link href="/shop">
                <Button className="bg-white text-emerald-800 hover:bg-emerald-50">Shop Now</Button>
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link href="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-emerald-700">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
