import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <div className="relative bg-emerald-800 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
          <div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h2 className="text-base font-semibold text-white tracking-wide uppercase">
                Celebrate Earth Month With Us
              </h2>
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block">15% Off Sitewide</span>
                <span className="block">All Month Long</span>
              </h1>
              <div className="mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Button variant="secondary" size="lg" className="w-full px-8 py-3 md:py-4 md:text-lg md:px-10">
                    Use Code EARTH15
                  </Button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link href="/shop">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full bg-sky-200 text-emerald-800 border-sky-200 hover:bg-sky-300 hover:text-emerald-900 px-8 py-3 md:py-4 md:text-lg md:px-10"
                    >
                      Shop Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full bg-gradient-to-r from-emerald-800 to-transparent lg:bg-none relative">
          <div className="absolute inset-0 lg:relative w-full h-full">
            <Image
              src="/placeholder.svg?height=800&width=1200"
              alt="Sustainable bathroom products"
              width={1200}
              height={800}
              className="w-full h-full object-cover lg:rounded-l-[30%] opacity-80 lg:opacity-100"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}
