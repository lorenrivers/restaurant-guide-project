"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

//delete posts
export async function handleDeletePosts(id) {
  await sql`DELETE FROM posts WHERE id = ${id}`;
  revalidatePath(`/posts`);
}
