import { getPosts } from "@/services/notion-blog-service";
import Link from "next/link";

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="pt-10">
      <h1>Blog</h1>

      <div>
        {posts.map((post) => (
          <Link href={`post/${post.slugId}`} key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.resume}</p>
          </Link>
        ))}
      </div>
    </div>
  );


}