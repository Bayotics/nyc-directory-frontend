import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import Link from "next/link"
import Image from "next/image"
import MobileNav from "@/components/mobile-nav"



const inter = Poppins ({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900' ]
})

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: "NY Business Directory | Find Local New York Businesses",
    template: "%s | NY Business Directory",
  },
  description:
    "Discover and connect with thousands of local businesses across New York City. Find restaurants, retail shops, professional services and more in your neighborhood.",
  keywords: [
    "New York businesses",
    "NYC business directory",
    "local businesses",
    "New York City",
    "business listings",
    "find businesses",
    "NY businesses",
  ],
  authors: [{ name: "NY Business Directory" }],
  creator: "NY Business Directory",
  publisher: "NY Business Directory",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://nybusinessdirectory.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "NY Business Directory | Find Local New York Businesses",
    description:
      "Discover and connect with thousands of local businesses across New York City. Find restaurants, retail shops, professional services and more in your neighborhood.",
    url: "https://nybusinessdirectory.com",
    siteName: "NY Business Directory",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NY Business Directory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NY Business Directory | Find Local New York Businesses",
    description:
      "Discover and connect with thousands of local businesses across New York City. Find restaurants, retail shops, professional services and more in your neighborhood.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code", // Replace with your actual verification code
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <header className="border-b sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="NY Business Directory Logo"
                width={180}
                height={50}
                className="h-auto w-auto max-w-[140px] md:max-w-[180px]"
                priority
              />
            </Link>
            <nav className="hidden md:block" aria-label="Main Navigation">
              <ul className="flex items-center gap-6">
                <li>
                  <Link href="/" className="hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/add-business" className="hover:text-primary transition-colors">
                    Add Business
                  </Link>
                </li>
                <li>
                  <Link href="/businesses" className="hover:text-primary transition-colors">
                    Businesses
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="hover:text-primary transition-colors">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
            <MobileNav />
          </div>
        </header>
        <main id="main-content">{children}</main>
        <footer className="bg-muted py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="mb-4">
                  <Image
                    src="/images/logo.png"
                    alt="NY Business Directory Logo"
                    width={160}
                    height={45}
                    className="h-auto"
                  />
                </div>
                <p className="text-muted-foreground">Connecting New Yorkers with local businesses since 2010.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4 mt-4 md:mt-0">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/add-business" className="text-muted-foreground hover:text-primary transition-colors">
                      Add Business
                    </Link>
                  </li>
                  <li>
                    <Link href="/categories" className="text-muted-foreground hover:text-primary transition-colors">
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4 mt-4 md:mt-0">Contact Us</h3>
                <address className="not-italic text-muted-foreground">
                  123 Business Ave
                  <br />
                  New York, NY 10001
                  <br />
                  info@nybusinessdirectory.com
                  <br />
                  (212) 555-1234
                </address>
              </div>
            </div>
            <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} NY Business Directory. All rights reserved.</p>
            </div>
          </div>
        </footer>
        <Toaster />
      </body>
    </html>
  )
}

