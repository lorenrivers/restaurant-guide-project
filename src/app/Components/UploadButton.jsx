"use client";
import { useFormStatus } from "react-dom";
import { motion } from "framer-motion";

export default function UploadButton() {
  const { formStatus } = useFormStatus();

  return (
    <motion.button
      type="submit"
      disabled={formStatus}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="upload-btn"
    >
      {formStatus ? "Uploading post..." : "Upload"}{" "}
    </motion.button>
  );
}
