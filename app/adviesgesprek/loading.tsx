import { Shield } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="container mx-auto py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-900">Kuiper Verzekeringen</span>
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
      </header>

      <main className="container mx-auto py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <Skeleton className="h-10 w-80 mx-auto mb-2" />
            <Skeleton className="h-5 w-96 mx-auto" />
          </div>

          <Skeleton className="h-8 w-full mb-8" />

          <Skeleton className="h-[400px] w-full rounded-lg" />
        </div>
      </main>
    </div>
  )
}
