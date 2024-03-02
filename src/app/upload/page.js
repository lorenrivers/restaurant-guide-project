import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Playfair_Display } from "next/font/google";
import UploadButton from "../Components/UploadButton";
import "@/app/upload/upload.css";

const playfairDisplay500 = Playfair_Display({
  weight: "500",
  subsets: ["latin"],
});
const playfairDisplay400 = Playfair_Display({
  weight: "400",
  subsets: ["latin"],
});

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
      <h2 className={playfairDisplay500.className}>Upload a Restaurant</h2>
      <form action={handleSavePost} className="form-container">
        <label htmlFor="name" className={playfairDisplay400.className}>
          Name:
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Enter the name of the restaurant"
        />
        <label htmlFor="description" className={playfairDisplay400.className}>
          Description:
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Enter a description of the restaurant"
        />
        <label htmlFor="location" className={playfairDisplay400.className}>
          Location:
        </label>
        <input
          id="location"
          name="location"
          placeholder="Enter the location of the restaurant"
        />
        <label htmlFor="resType" className={playfairDisplay400.className}>
          Type of Restaurant:
        </label>
        <select id="resType" name="resType">
          {restaurantTypes.rows.map((restaurantType) => (
            <option value={restaurantType.type_id} key={restaurantType.type_id}>
              {restaurantType.restype}
            </option>
          ))}
        </select>
        <UploadButton />
      </form>
    </div>
  );
}
