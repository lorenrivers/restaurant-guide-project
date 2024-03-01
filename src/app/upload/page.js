import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import "@/app/upload/upload.css";

export default async function UploadPage() {
  //fetch categories data to display in drop down
  let restaurantTypes = await sql`SELECT * FROM resTypes`;

  async function handleSavePost(formData) {
    "use server";

    const name = formData.get("name");
    const description = formData.get("description");
    const location = formData.get("location");

    const restaurantType = formData.get("resType");

    const postResult =
      await sql`INSERT INTO posts (name, description, location, resType_id) VALUES (${name}, ${description}, ${location}, ${restaurantType})`;

    revalidatePath("/posts");
    redirect("/posts");
  }

  return (
    <div>
      <h2>Upload a Restaurant</h2>
      <form action={handleSavePost} className="form-container">
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
        <label htmlFor="resType">Type of Restaurant:</label>
        <select id="resType" name="resType">
          {restaurantTypes.rows.map((restaurantType) => (
            <option value={restaurantType.type_id} key={restaurantType.type_id}>
              {restaurantType.restype}
            </option>
          ))}
        </select>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
