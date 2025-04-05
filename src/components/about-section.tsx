"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Users, Search, Building2, Award } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  return (
    <section className="py-16 md:py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About NY Business Directory</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connecting New Yorkers with local businesses since 2010. We're on a mission to help small businesses thrive
            and make it easier for residents to discover the best services in their neighborhood.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image src="/images/nyc-about.jpeg" alt="New York City" fill className="object-cover" />
            </div>
            <motion.div
              className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <p className="text-xl font-bold">10+ Years</p>
              <p>Serving NYC</p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground mb-6">
                We believe in the power of local businesses to create vibrant communities. Our platform connects
                consumers with the businesses that make New York City unique, helping to foster economic growth and
                community connections.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <h4 className="text-xl font-semibold">Why Choose Us</h4>

              <motion.div variants={featureVariants} className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-primary/10 mt-1">
                  <Search className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h5 className="font-medium">Comprehensive Search</h5>
                  <p className="text-muted-foreground">
                    Find exactly what you're looking for with our powerful search and filtering tools.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={featureVariants} className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-primary/10 mt-1">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h5 className="font-medium">Verified Listings</h5>
                  <p className="text-muted-foreground">
                    All businesses are verified to ensure you get accurate, up-to-date information.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={featureVariants} className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-primary/10 mt-1">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h5 className="font-medium">Community Focused</h5>
                  <p className="text-muted-foreground">
                    Built by New Yorkers, for New Yorkers, with local insights and recommendations.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={featureVariants} className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-primary/10 mt-1">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h5 className="font-medium">Quality First</h5>
                  <p className="text-muted-foreground">
                    We highlight businesses known for excellence and outstanding customer service.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4">
              <Button asChild size="lg">
                <Link href="/add-business">Add Your Business</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

