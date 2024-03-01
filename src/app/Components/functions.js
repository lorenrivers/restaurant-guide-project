"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

//delete posts
export async function handleDeletePosts(id) {
  await sql`DELETE FROM posts WHERE id = ${id}`;
  revalidatePath(`/posts`);
}

//delete comments
export async function handleDeleteComments(comment_id, params) {
  await sql`DELETE FROM comments WHERE comment_id = ${comment_id}`;
  revalidatePath(`/posts/${params.id}`);
}
