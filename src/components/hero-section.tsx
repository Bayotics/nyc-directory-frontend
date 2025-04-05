"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, MapPin, Building, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Route to the businesses page with the search query
      router.push(`/businesses?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.6,
      },
    },
  }

  return (
    <section className="relative bg-gradient-to-b from-primary/10 to-background py-12 md:py-16 lg:py-24 overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 left-10 w-32 md:w-64 h-32 md:h-64 rounded-full bg-primary/5"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-48 md:w-96 h-48 md:h-96 rounded-full bg-primary/5"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Discover New York's Finest Businesses
            </h1>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8">
              Your comprehensive guide to businesses across the city that never sleeps
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <form
              onSubmit={handleSearch}
              className="flex flex-col sm:flex-row w-full max-w-2xl mx-auto mb-8 sm:mb-12 relative"
            >
              <div className="relative flex-grow mb-2 sm:mb-0">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search for businesses, categories, or locations..."
                  className="pl-10 pr-4 py-6 rounded-lg sm:rounded-l-lg sm:rounded-r-none border-r-0 text-base md:text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit" size="lg" className="rounded-lg sm:rounded-l-none sm:rounded-r-lg px-6">
                <Search className="mr-2 h-5 w-5" />
                Search
              </Button>
            </form>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12" variants={statsVariants}>
            <div className="bg-background/80 backdrop-blur-sm p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 rounded-full bg-primary/10">
                  <Building className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold">5,000+</h3>
              <p className="text-muted-foreground">Local Businesses</p>
            </div>

            <div className="bg-background/80 backdrop-blur-sm p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 rounded-full bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold">100+</h3>
              <p className="text-muted-foreground">Neighborhoods</p>
            </div>

            <div className="bg-background/80 backdrop-blur-sm p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 rounded-full bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold">50K+</h3>
              <p className="text-muted-foreground">Monthly Visitors</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

