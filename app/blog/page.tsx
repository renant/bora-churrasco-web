import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { getPosts } from "@/services/notion-blog-service";
import Link from "next/link";

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen md:container md:mx-auto md:pt-20 bg-white shadow-xl px-9">
      <div className="grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Link href={`post/${post.slugId}`} key={post.id}>
            <Card>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.resume}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center items-center w-full h-64 z-0 overflow-hidden rounded-md">
                  <img src={post.coverImage} className=" object-cover flex-shrink-0 min-h-full min-w-full" alt={`Image do post ${post.title}`} />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );


}