import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import modernRestaurant from "@/../public/modernrestaurant.avif";

const playfairDisplay500 = Playfair_Display({
  weight: "500",
  subsets: ["latin"],
});

export default function HomePage() {
  return (
    <div>
      <h2 className={playfairDisplay500.className}>Welcome!</h2>

      <Image
        src={modernRestaurant}
        alt="image of a modern restaurant"
        className="homepage-image"
      />
    </div>
  );
}
