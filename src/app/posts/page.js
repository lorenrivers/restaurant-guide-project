import { sql } from "@vercel/postgres";
import Link from "next/link";
import DeletePostsButton from "@/app/Components/DeletePostsButton";
import { Playfair_Display } from "next/font/google";
import "@/app/posts/postsPage.css";

const playfairDisplay500 = Playfair_Display({
  weight: "500",
  subsets: ["latin"],
});

const playfairDisplay400 = Playfair_Display({
  weight: "400",
  subsets: ["latin"],
});

export default async function PostsPage({ searchParams }) {
  const posts = await sql`SELECT * FROM posts`;

  if (searchParams.sort === "desc") {
    posts.rows.reverse();
  }

  return (
    <div>
      <h2 className={playfairDisplay500.className}>Posts</h2>
      <div className="sort-container">
        <Link href="/posts?sort=asc" className="sort-btn">
          Sort ascending
        </Link>
        <Link href="/posts?sort=desc" className="sort-btn">
          Sort descending
        </Link>
      </div>
      {posts.rows.map((post) => (
        <div key={post.id} className="post-container">
          <h3 className={playfairDisplay400.className}>{post.name}</h3>
          <Link href={`/posts/${post.id}`} className="readmore-btn">
            Read more
          </Link>
          <DeletePostsButton id={post.id} />
        </div>
      ))}
    </div>
  );
}
