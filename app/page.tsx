import Hero from "@/components/hero"
import FeaturedProducts from "@/components/featured-products"
import CategoryGrid from "@/components/category-grid"
import SustainabilitySection from "@/components/sustainability-section"
import Newsletter from "@/components/newsletter"
import BrandsCarousel from "@/components/brands-carousel"
import TestimonialsSection from "@/components/testimonials-section"
import BlogPreview from "@/components/blog-preview"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <CategoryGrid />
      <FeaturedProducts title="Best Sellers" />
      <SustainabilitySection />
      <FeaturedProducts title="New Arrivals" />
      <BrandsCarousel />
      <TestimonialsSection />
      <BlogPreview />
      <Newsletter />
    </div>
  )
}
