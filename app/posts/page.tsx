import { getPosts } from "@/services/notion-blog-service";

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="pt-10">
      <h1>Blog</h1>

      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.resume}</p>
          </div>
        ))}
      </div>
    </div>
  );


}