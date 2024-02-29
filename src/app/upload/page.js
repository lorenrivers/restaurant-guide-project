import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function UploadPage() {
  async function handleSavePost(formData) {
    "use server";

    const name = formData.get("name");
    const description = formData.get("description");
    const location = formData.get("location");

    await sql`INSERT INTO posts (name, description, location) VALUES (${name}, ${description}, ${location})`;

    revalidatePath("/posts");
    redirect("/posts");
  }

  return (
    <div>
      <h2>Upload a Restaurant</h2>
      <form action={handleSavePost}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Enter Restaurant Name"
        />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          placeholder="Enter a description of the restaurant"
        />
        <label htmlFor="location">Location:</label>
        <input
          id="location"
          name="location"
          placeholder="Enter the location of the restaurant"
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
