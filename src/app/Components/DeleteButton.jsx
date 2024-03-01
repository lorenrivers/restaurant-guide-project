"use client";

import { handleDeletePosts } from "./functions";

export default function DeleteButton({ id }) {
  return <button onClick={() => handleDeletePosts(id)}>Delete</button>;
}
