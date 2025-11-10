import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function SuggestedPostsSkeleton() {
  return (
    <section className="w-full bg-white rounded-lg p-6 md:p-8 shadow-md border border-gray-200 mt-12">
      <div className="text-center mb-8">
        <div className="h-8 w-64 bg-gray-200 rounded-lg mx-auto mb-4 animate-pulse" />
        <div className="h-4 w-96 bg-gray-200 rounded-lg mx-auto animate-pulse" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="h-full bg-white border-gray-200 overflow-hidden">
            <CardHeader className="pb-2">
              <div className="h-6 w-full bg-gray-200 rounded mb-2 animate-pulse" />
              <div className="h-6 w-full bg-gray-200 rounded mb-2 animate-pulse" />
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
            </CardHeader>

            <CardContent className="pt-0">
              <div className="relative w-full overflow-hidden rounded-lg shadow-lg aspect-[16/9] bg-gray-200 animate-pulse" />
              <div className="h-6 w-20 bg-gray-200 rounded-full mt-2 animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <div className="h-12 w-48 bg-gray-200 rounded-lg mx-auto animate-pulse" />
      </div>
    </section>
  );
}

