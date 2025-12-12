import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-transparent px-9 md:container md:mx-auto md:pt-10">
      <div className="flex justify-center mb-8">
        <Skeleton className="h-8 w-64 bg-red-100/50" />
      </div>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4 bg-red-100/50" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full rounded-md bg-red-50/50" />
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
