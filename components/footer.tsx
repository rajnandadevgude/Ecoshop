import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" className="flex items-center">
              <div className="relative h-10 w-10 mr-2">
                <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10 text-emerald-800">
                  <path d="M12 3L4 9V21H20V9L12 3Z" fill="currentColor" />
                  <path d="M12 6L7 10V18H17V10L12 6Z" fill="white" />
                  <path d="M12 9L10 11V15H14V11L12 9Z" fill="currentColor" />
                </svg>
              </div>
              <span className="text-emerald-800 text-xl font-bold">EcoHero</span>
            </Link>
            <p className="text-gray-500 text-base">
              Making sustainability accessible to everyone through carefully curated eco-friendly products.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Shop</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/category/home-kitchen" className="text-base text-gray-500 hover:text-gray-900">
                      Home & Kitchen
                    </Link>
                  </li>
                  <li>
                    <Link href="/category/cleaning" className="text-base text-gray-500 hover:text-gray-900">
                      Cleaning
                    </Link>
                  </li>
                  <li>
                    <Link href="/category/bathroom" className="text-base text-gray-500 hover:text-gray-900">
                      Bathroom
                    </Link>
                  </li>
                  <li>
                    <Link href="/category/beauty" className="text-base text-gray-500 hover:text-gray-900">
                      Beauty
                    </Link>
                  </li>
                  <li>
                    <Link href="/category/kids-pets" className="text-base text-gray-500 hover:text-gray-900">
                      Kids & Pets
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/about" className="text-base text-gray-500 hover:text-gray-900">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="text-base text-gray-500 hover:text-gray-900">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/sustainability" className="text-base text-gray-500 hover:text-gray-900">
                      Sustainability
                    </Link>
                  </li>
                  <li>
                    <Link href="/careers" className="text-base text-gray-500 hover:text-gray-900">
                      Careers
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/contact" className="text-base text-gray-500 hover:text-gray-900">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="text-base text-gray-500 hover:text-gray-900">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="/shipping" className="text-base text-gray-500 hover:text-gray-900">
                      Shipping
                    </Link>
                  </li>
                  <li>
                    <Link href="/returns" className="text-base text-gray-500 hover:text-gray-900">
                      Returns
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/privacy" className="text-base text-gray-500 hover:text-gray-900">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-base text-gray-500 hover:text-gray-900">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="/accessibility" className="text-base text-gray-500 hover:text-gray-900">
                      Accessibility
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; {new Date().getFullYear()} EcoHero. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
