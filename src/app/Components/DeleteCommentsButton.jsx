"use client";

import { handleDeleteComments } from "./functions";

export default function DeleteCommentsButton({ comment_id, params }) {
  return (
    <button onClick={() => handleDeleteComments(comment_id, params)}>
      Delete Post
    </button>
  );
}
