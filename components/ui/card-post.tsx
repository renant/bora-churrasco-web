import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Post } from "@/models/post-content";
import Image from "next/image";
import Link from "next/link";

interface CardPostProps {
  post: Post | undefined;
}

export async function CardPost({ post }: CardPostProps) {
  if (!post) return null;

  return (
    <Link href={`post/${post.slug}`}>
      <Card>
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <CardDescription>{post.resume}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative z-0 h-64 w-full">
            <Image
              fill
              src={post.thumbWebp}
              alt={`Imagem do post ${post.title}`}
              className="rounded-md object-cover"
              sizes="100vw"
              loading="lazy"
              unoptimized
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
