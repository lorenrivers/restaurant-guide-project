"use client";

import { handleDeletePosts } from "./functions";

export default function DeletePostsButton({ id }) {
  return <button onClick={() => handleDeletePosts(id)}>Delete</button>;
}
