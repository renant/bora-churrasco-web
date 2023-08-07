import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Post } from '@/services/notion-blog-service'
import Image from 'next/image'
import Link from 'next/link'

interface CardPostProps {
  post: Post | undefined
}

export async function CardPost({ post }: CardPostProps) {
  if (!post) return null

  return (
    <Link href={`post/${post.slugId}`}>
      <Card>
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <CardDescription>{post.resume}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative z-0 h-64 w-full">
            <Image
              fill={true}
              className="rounded-md object-cover"
              src={post.firebaseCoverImageUrl}
              alt={`Image do post ${post.title}`}
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
