"use client";
import { useFormStatus } from "react-dom";

export default function UploadButton() {
  const { formStatus } = useFormStatus();

  return (
    <button type="submit" disabled={formStatus}>
      {formStatus ? "Uploading post..." : "Upload"}{" "}
    </button>
  );
}
