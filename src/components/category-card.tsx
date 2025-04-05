"use client"

import { motion } from "framer-motion"
import { Coffee, ShoppingBag, Stethoscope, Briefcase, Cpu, GraduationCap, Film, Dumbbell, Building, Store, Utensils, Car, Shirt, Home, Palette, Music, Heart, type LucideIcon } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

interface CategoryCardProps {
  category: string
  onClick: () => void
}

export default function CategoryCard({ category, onClick }: CategoryCardProps) {
  // Map categories to icons
  const getCategoryIcon = (): LucideIcon => {
    const categoryMap: Record<string, LucideIcon> = {
      "Restaurant": Utensils,
      "Restaurants": Utensils,
      "Cafe": Coffee,
      "Coffee": Coffee,
      "Retail": ShoppingBag,
      "Shopping": Store,
      "Healthcare": Stethoscope,
      "Health": Heart,
      "Professional Services": Briefcase,
      "Services": Briefcase,
      "Technology": Cpu,
      "Tech": Cpu,
      "Education": GraduationCap,
      "School": GraduationCap,
      "Entertainment": Film,
      "Fitness": Dumbbell,
      "Gym": Dumbbell,
      "Real Estate": Home,
      "Housing": Home,
      "Automotive": Car,
      "Fashion": Shirt,
      "Art": Palette,
      "Music": Music,
    }

    // Try to find an exact match
    if (categoryMap[category]) {
      return categoryMap[category]
    }

    // Try to find a partial match
    for (const [key, value] of Object.entries(categoryMap)) {
      if (category.toLowerCase().includes(key.toLowerCase())) {
        return value
      }
    }

    // Default icon
    return Building
  }

  const Icon = getCategoryIcon()
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70 } },
  }

  // Get a consistent color based on the category name
  const getCategoryColor = () => {
    const colors = [
      "bg-red-100 text-red-600",
      "bg-blue-100 text-blue-600",
      "bg-green-100 text-green-600",
      "bg-yellow-100 text-yellow-600",
      "bg-purple-100 text-purple-600",
      "bg-pink-100 text-pink-600",
      "bg-indigo-100 text-indigo-600",
      "bg-orange-100 text-orange-600",
      "bg-teal-100 text-teal-600",
      "bg-cyan-100 text-cyan-600",
    ]
    
    // Use the sum of character codes to get a consistent index
    const sum = category.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return colors[sum % colors.length]
  }

  const iconColor = getCategoryColor()

  return (
    <motion.div variants={item} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
      <Card 
        className="cursor-pointer hover:shadow-md transition-shadow h-full" 
        onClick={onClick}
      >
        <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
          <div className={`p-4 rounded-full ${iconColor.split(" ")[0]}`}>
            <Icon className={`h-8 w-8 ${iconColor.split(" ")[1]}`} />
          </div>
          <h3 className="font-semibold text-lg">{category}</h3>
          <p className="text-sm text-muted-foreground">
            Explore {category.toLowerCase()} businesses in New York City
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
