import { sql } from "@vercel/postgres";
import Link from "next/link";
import DeleteButton from "@/app/Components/DeleteButton";

export default async function PostsPage() {
  const posts = await sql`SELECT * FROM posts`;

  return (
    <div>
      <h2>Posts</h2>
      {posts.rows.map((post) => (
        <div key={post.id}>
          <h3>{post.name}</h3>
          <Link href={`/posts/${post.id}`}>Read more</Link>
          <DeleteButton id={post.id} />
        </div>
      ))}
    </div>
  );
}
