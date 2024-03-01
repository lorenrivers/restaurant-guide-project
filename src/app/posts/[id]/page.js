import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function PostIdPage({ params }) {
  //displays the information related to the specific post id from the posts table. Have to use this to display the post content for the specific post id.
  const post = (await sql`SELECT * FROM posts WHERE id = ${params.id}`).rows[0];

  //join posts and comments together to map through all comments related to post id.
  const postsAndComments =
    await sql`SELECT posts.id, posts.name, posts.description, posts.location, posts.resType_id, comments.postIdRespondedTo, comments.comment, comments.comment_id
FROM posts JOIN comments ON posts.id = comments.postIdRespondedTo WHERE id = ${params.id}`;

  //join posts and categories (resTypes) together to display the category for the specific post.
  const postsAndCategories = (
    await sql`SELECT posts.id, posts.name, posts.description, posts.location, posts.resType_id, resTypes.type_id, resTypes.resType
FROM posts JOIN resTypes ON posts.resType_id = resTypes.type_id WHERE id = ${params.id}`
  ).rows[0];

  //function to handle inserting and displaying comments into the commments table (linked to post id).
  async function handleSaveComment(formData) {
    "use server";

    const comment = formData.get("comment");

    await sql`INSERT INTO comments (postIdRespondedTo, comment) VALUES (${params.id}, ${comment})`;

    revalidatePath(`/posts/${params.id}`);
    redirect(`/posts/${params.id}`);
  }

  return (
    <div>
      <h2>{post.name}</h2>
      <p>{post.description}</p>
      <p>{post.location}</p>
      <p>{postsAndCategories.restype}</p>
      <form action={handleSaveComment}>
        <label htmlFor="comment">Add comment:</label>
        <textarea
          id="comment"
          name="comment"
          placeholder="Any thoughts? Share here!"
        />
        <button type="submit">Upload</button>
        <h3>Comments</h3>
        {postsAndComments.rows.map((postsAndComment) => (
          <div key={postsAndComment.comment_id}>
            <p>{postsAndComment.comment}</p>
          </div>
        ))}
      </form>
    </div>
  );
}
