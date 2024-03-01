import Image from "next/image";
import modernRestaurant from "@/../public/modernrestaurant.avif";

export default function HomePage() {
  return (
    <div>
      <h2>Welcome!</h2>

      <Image
        src={modernRestaurant}
        alt="image of a modern restaurant"
        className="homepage-image"
      />
    </div>
  );
}
