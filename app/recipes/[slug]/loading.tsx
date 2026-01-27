import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-16">
        {/* Recipe Image Skeleton */}
        <div className="relative w-full overflow-hidden rounded-lg shadow-lg mb-8 md:mb-12">
          <Skeleton className="h-80 w-full lg:h-[500px] rounded-lg bg-red-100/50" />
        </div>

        {/* Title and Meta Skeleton */}
        <div className="text-center mb-8 md:mb-12">
          <Skeleton className="h-12 w-3/4 mx-auto mb-6 bg-red-100/50" />
          <Skeleton className="h-10 w-48 mx-auto bg-gray-100/50" />
        </div>

        {/* Content Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-4 w-full bg-gray-100/50" />
          <Skeleton className="h-4 w-5/6 bg-gray-100/50" />
          <Skeleton className="h-4 w-4/5 bg-gray-100/50" />
          <Skeleton className="h-4 w-full bg-gray-100/50" />
          <Skeleton className="h-4 w-3/4 bg-gray-100/50" />
        </div>
      </div>
    </div>
  );
}

