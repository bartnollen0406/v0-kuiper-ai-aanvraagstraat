import { Shield } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-blue-900">Kuiper Verzekeringen</span>
          </div>
          <Skeleton className="h-6 w-32" />
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6 flex flex-col">
        <div className="mb-4">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-2 w-full" />
        </div>

        <div className="flex-1 bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div>
                <Skeleton className="h-4 w-32 mb-1" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          </div>

          <div className="flex-1 p-4">
            <div className="space-y-4">
              <div className="flex items-start">
                <Skeleton className="h-8 w-8 rounded-full mr-2" />
                <Skeleton className="h-20 w-2/3 rounded-lg" />
              </div>

              <div className="flex items-start justify-end">
                <Skeleton className="h-12 w-1/2 rounded-lg mr-2" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>

              <div className="flex items-start">
                <Skeleton className="h-8 w-8 rounded-full mr-2" />
                <Skeleton className="h-16 w-3/5 rounded-lg" />
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <Skeleton className="h-10 flex-1 rounded-md" />
              <Skeleton className="h-10 w-10 rounded-md" />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Skeleton className="h-4 w-64 mx-auto" />
          </div>
        </div>
      </footer>
    </div>
  )
}
