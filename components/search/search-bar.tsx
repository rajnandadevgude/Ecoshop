"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { SearchIcon, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { searchProducts } from "@/lib/data/products"
import Link from "next/link"
import Image from "next/image"

export interface SearchBarProps {
  className?: string
  onSearch?: (query: string) => void
}

export default function SearchBar({ className, onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState<ReturnType<typeof searchProducts>>([])
  const router = useRouter()
  const searchParams = useSearchParams()
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize query from URL if present
    const urlQuery = searchParams.get("q")
    if (urlQuery) {
      setQuery(urlQuery)
    }
  }, [searchParams])

  useEffect(() => {
    // Close search results when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    // Search as you type, but only if query has at least 2 characters
    if (query.length >= 2) {
      const searchResults = searchProducts(query, { sortBy: "best-selling" })
      setResults(searchResults.slice(0, 5)) // Limit to 5 results for quick search
      setIsOpen(true)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }, [query])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      if (onSearch) {
        onSearch(query)
      } else {
        router.push(`/search?q=${encodeURIComponent(query)}`)
      }
      setIsOpen(false)
    }
  }

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <Input
          type="search"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pr-10"
          onFocus={() => query.length >= 2 && setIsOpen(true)}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          ) : (
            <SearchIcon size={18} className="text-gray-400" />
          )}
        </div>
      </form>

      {/* Quick search results dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute z-50 mt-2 w-full bg-white rounded-md shadow-lg max-h-96 overflow-auto">
          <div className="p-2">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Quick Results</h3>
            <ul className="space-y-2">
              {results.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/product/${product.slug}`}
                    className="flex items-center p-2 hover:bg-gray-50 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <Image
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-sm font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-3 pt-3 border-t border-gray-200">
              <Button
                variant="link"
                className="w-full text-emerald-800 hover:text-emerald-700 justify-center"
                onClick={handleSubmit}
              >
                See all results for "{query}"
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
