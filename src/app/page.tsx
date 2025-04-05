import type { Metadata } from "next"
import Link from "next/link"
import FeaturedBusinesses from "@/components/featured-businesses"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import TestimonialsCarousel from "@/components/testimonials-carousel"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { JsonLd } from "@/components/json-ld"

export const metadata: Metadata = {
  title: "NY Business Directory | Find Local New York Businesses",
  description:
    "Discover and connect with thousands of local businesses across New York City. Find restaurants, retail shops, professional services and more in your neighborhood.",
  alternates: {
    canonical: "/",
  },
}

export default function Home() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "NY Business Directory",
    url: "https://nybusinessdirectory.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://nybusinessdirectory.com/businesses?search={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NY Business Directory",
    url: "https://nybusinessdirectory.com",
    logo: "https://nybusinessdirectory.com/images/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-212-555-1234",
      contactType: "customer service",
      areaServed: "New York City",
      availableLanguage: "English",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Business Ave",
      addressLocality: "New York",
      addressRegion: "NY",
      postalCode: "10001",
      addressCountry: "US",
    },
    sameAs: [
      "https://www.facebook.com/nybusinessdirectory",
      "https://www.twitter.com/nybizdir",
      "https://www.instagram.com/nybusinessdirectory",
    ],
  }

  return (
    <>
      <JsonLd data={websiteSchema} />
      <JsonLd data={organizationSchema} />

      <HeroSection />
      <AboutSection />

      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-2 text-center">Featured Businesses</h2>
        <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
          Discover businesses from a diverse range of categories
        </p>

        <FeaturedBusinesses />

        <div className="mt-12 text-center">
          <Button asChild size="lg" className="px-8 group">
            <Link href="/businesses" className="flex items-center">
              See All Businesses
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center">Testimonials</h2>
          <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
            See what our users are saying about businesses they've discovered
          </p>

          <TestimonialsCarousel />
        </div>
      </section>
    </>
  )
}

