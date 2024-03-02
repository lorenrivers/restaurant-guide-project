import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import UploadButton from "@/app/Components/UploadButton";
import "@/app/posts/[id]/postIdPage.css";
// import DeleteCommentsButton from "@/app/Components/DeleteCommentsButton";

export default async function PostIdPage({ params }) {
  //displays the information related to the specific post id from the posts table.
  const post = (await sql`SELECT * FROM posts WHERE id = ${params.id}`).rows[0];

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
    <div>
      <h2 className="u">{post.name}</h2>
      <p className="u border category">{postsAndCategories.restype}</p>
      <p className="u">{post.description}</p>
      <p className="u ">📍 {post.location}</p>

      <form action={handleSaveComment} className="u comments-form">
        <label htmlFor="comment">Add comment:</label>
        <textarea
          id="comment"
          name="comment"
          placeholder="Any thoughts? Reviews? Share here!"
        />
        <UploadButton />
      </form>
      <h3 className="u">Comments</h3>
      {postsAndComments.rows.map((postsAndComment) => (
        <div key={postsAndComment.comment_id} className="u border">
          <p>{postsAndComment.comment}</p>
          {/* <DeleteCommentsButton
              commentId={postsAndComment.comment_id}
              params={params.id}
            /> */}
        </div>
      ))}
    </div>
  );
}
