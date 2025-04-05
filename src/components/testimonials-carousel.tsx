"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

// Sample testimonial data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    business: "The Coffee House",
    rating: 5,
    text: "The NY Business Directory helped me discover The Coffee House when I moved to the neighborhood. Their cappuccino is absolutely divine, and the atmosphere is perfect for both work and casual meetups. I'm now a regular customer!",
    image: "/images/testimonial4.jpeg",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    business: "Tech Solutions Inc.",
    rating: 5,
    text: "I was having computer issues and found Tech Solutions through this directory. They were professional, quick, and reasonably priced. The detailed business profile on the directory gave me confidence in choosing them. Highly recommend!",
    image: "/images/testimonial1.jpeg",
  },
  {
    id: 3,
    name: "Emily Chen",
    business: "Green Thumb Plant Shop",
    rating: 5,
    text: "As a plant enthusiast, finding Green Thumb was a game-changer. Their selection is incredible and the staff is so knowledgeable. I wouldn't have discovered this hidden gem without the NY Business Directory. My apartment is now a jungle paradise!",
    image: "/images/testimonial2.jpeg",
  },
  {
    id: 4,
    name: "David Williams",
    business: "Brooklyn Fitness Center",
    rating: 4,
    text: "After searching for a gym with specific amenities, I found Brooklyn Fitness Center through this directory. The detailed description and photos helped me make the right choice. The trainers are excellent and the equipment is top-notch.",
    image: "/images/testimonial3.jpeg",
  },
  {
    id: 5,
    name: "Olivia Martinez",
    business: "Bella's Italian Restaurant",
    rating: 5,
    text: "I was looking for an authentic Italian restaurant for my anniversary dinner and found Bella's on this directory. The food was incredible - just like my grandmother used to make! The service impeccable and We'll definitely be back!",
    image: "/images/testimonial5.jpeg",
  },
]

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Handle next testimonial
  const nextTestimonial = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  // Handle previous testimonial
  const prevTestimonial = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      nextTestimonial()
    }, 6000)

    return () => clearInterval(interval)
  }, [currentIndex, autoplay])

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false)
  const handleMouseLeave = () => setAutoplay(true)

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  }

  // Background decoration variants
  const decorationVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 0.1,
      scale: 1,
      transition: { duration: 0.8 },
    },
  }

  return (
    <div
      className="relative overflow-hidden py-12 md:py-16 px-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background decorations */}
      <motion.div
        className="absolute top-10 left-10 text-primary opacity-10 hidden md:block"
        variants={decorationVariants}
        initial="initial"
        animate="animate"
      >
        <Quote size={120} />
      </motion.div>
      <motion.div
        className="absolute bottom-10 right-10 text-primary opacity-10 rotate-180 hidden md:block"
        variants={decorationVariants}
        initial="initial"
        animate="animate"
      >
        <Quote size={120} />
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {/* Testimonial carousel */}
        <div className="relative h-[500px] md:h-[500px]">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute inset-0"
            >
              <div className="bg-card border rounded-xl shadow-lg p-6 md:p-10 h-full flex flex-col justify-between">
                <div>
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 md:h-6 md:w-6 text-primary fill-primary" />
                    ))}
                    {[...Array(5 - testimonials[currentIndex].rating)].map((_, i) => (
                      <Star
                        key={i + testimonials[currentIndex].rating}
                        className="h-5 w-5 md:h-6 md:w-6 text-muted-foreground"
                      />
                    ))}
                  </div>
                  <p className="text-base md:text-base lg:text-base italic text-center mb-8">
                    "{testimonials[currentIndex].text}"
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden mb-3 border-2 border-primary">
                    <Image
                      src={testimonials[currentIndex].image || "/placeholder.svg"}
                      alt={testimonials[currentIndex].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-lg">{testimonials[currentIndex].name}</h3>
                  <p className="text-muted-foreground">
                    about <span className="font-medium text-primary">{testimonials[currentIndex].business}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation controls */}
        <div className="flex justify-center gap-4 mt-8">
          <Button variant="outline" size="icon" onClick={prevTestimonial} className="rounded-full h-10 w-10">
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Previous testimonial</span>
          </Button>

          <div className="flex items-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
                className={`h-2.5 rounded-full transition-all ${
                  index === currentIndex ? "w-6 bg-primary" : "w-2.5 bg-muted"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <Button variant="outline" size="icon" onClick={nextTestimonial} className="rounded-full h-10 w-10">
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Next testimonial</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

