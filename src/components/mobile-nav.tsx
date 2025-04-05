"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  }

  const links = [
    { href: "/", label: "Home" },
    { href: "/add-business", label: "Add Business" },
    { href: "/businesses", label: "Businesses" },
    { href: "/categories", label: "Categories" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        className="relative z-50"
        onClick={toggleMenu}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-40 flex flex-col"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <Link href="/" onClick={closeMenu}>
                <Image
                  src="/images/logo.png"
                  alt="NY Business Directory Logo"
                  width={160}
                  height={45}
                  className="h-auto"
                />
              </Link>
              <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Close menu">
                <X className="h-6 w-6" />
              </Button>
            </div>

            <nav className="flex-1 overflow-auto p-6 text-black min-h-[300px] ">
              <ul className="space-y-8 text-lg bg-white">
                {links.map((link, i) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block py-3 ${
                        pathname === link.href ? "text-primary font-medium" : "text-foreground"
                      }`}
                      onClick={closeMenu}
                    >
                      {link.label}
                    </Link>
                    <div className="h-px bg-muted mt-3"></div>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

