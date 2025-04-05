import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function Loading() {
  return (
    <main className="container mx-auto px-4 py-12">
      <Link href="/businesses" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to businesses
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Skeleton className="h-10 w-64 mx-auto mb-4" />
          <Skeleton className="h-5 w-full max-w-2xl mx-auto" />
        </div>

        <div className="grid md:grid-cols-[1fr_2fr] gap-8">
          <Card className="p-6">
            <Skeleton className="h-7 w-40 mb-2" />
            <Skeleton className="h-4 w-full mb-6" />

            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-20 mb-1" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <Skeleton className="h-7 w-40 mb-2" />
            <Skeleton className="h-4 w-full mb-6" />

            <div className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}

              <Skeleton className="h-10 w-full mt-4" />
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}

