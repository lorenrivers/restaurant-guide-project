import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import UploadButton from "@/app/Components/UploadButton";
import { Playfair_Display } from "next/font/google";
import { notFound } from "next/navigation";
import "@/app/posts/[id]/postIdPage.css";

const playfairDisplay500 = Playfair_Display({
  weight: "500",
  subsets: ["latin"],
});

export default async function PostIdPage({ params }) {
  //displays the information related to the specific post id from the posts table.
  const post = (await sql`SELECT * FROM posts WHERE id = ${params.id}`).rows[0];

  if (!post) {
    notFound();
  }

  //map through all comments related to post id.
  const postsAndComments =
    await sql`SELECT posts.id, posts.name, posts.description, posts.location, posts.resType_id, comments.postIdRespondedTo, comments.comment, comments.comment_id
FROM posts JOIN comments ON posts.id = comments.postIdRespondedTo WHERE id = ${params.id}`;

  //display the category for the specific post.
  const postsAndCategories = (
    await sql`SELECT posts.id, posts.name, posts.description, posts.location, posts.resType_id, resTypes.type_id, resTypes.resType
FROM posts JOIN resTypes ON posts.resType_id = resTypes.type_id WHERE id = ${params.id}`
  ).rows[0];

  async function handleSaveComment(formData) {
    "use server";

    const comment = formData.get("comment");

    await sql`INSERT INTO comments (postIdRespondedTo, comment) VALUES (${params.id}, ${comment})`; //inserts the post id to the comments table to link comment

    revalidatePath(`/posts/${params.id}`);
    redirect(`/posts/${params.id}`);
  }

  return (
    <div className="page-container">
      <div className="u id-info">
        <h2 className={playfairDisplay500.className}>{post.name}</h2>
        <p className="border category">{postsAndCategories.restype}</p>
        <p>{post.description}</p>
        <p>📍 {post.location}</p>
      </div>
      <form action={handleSaveComment} className="u comments-form">
        <label htmlFor="comment">Add comment:</label>
        <textarea
          id="comment"
          name="comment"
          placeholder="Any thoughts? Reviews? Share here!"
        />
        <UploadButton />
      </form>
      <div className="u comments-container">
        <h3 className={playfairDisplay500.className}>Comments</h3>
        {postsAndComments.rows.map((postsAndComment) => (
          <div key={postsAndComment.comment_id} className="border">
            <p>{postsAndComment.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
