"use client";
import { motion } from "framer-motion";

import { handleDeletePosts } from "./functions";

export default function DeletePostsButton({ id }) {
  return (
    <motion.button
      onClick={() => handleDeletePosts(id)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="delete-btn"
    >
      Delete Post
    </motion.button>
  );
}
