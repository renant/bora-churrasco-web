import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function WizardSkeleton() {
  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center pt-10 md:pt-20">
      <div className="w-full max-w-xl px-4">
        <Card className="border-red-200 bg-white/5 shadow-lg backdrop-blur">
          <CardHeader className="space-y-2 pb-8">
            <Skeleton className="h-8 w-3/4 mx-auto bg-red-100/50" />
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="aspect-square rounded-md bg-red-50/50"
                />
              ))}
            </div>
            <div className="flex justify-center pt-6">
              <Skeleton className="h-14 w-40 rounded-md bg-red-100/50" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
