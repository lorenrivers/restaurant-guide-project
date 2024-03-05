import Link from "next/link";
import { Playfair_Display } from "next/font/google";

const playfairDisplay500 = Playfair_Display({
  weight: "500",
  subsets: ["latin"],
});

export default function NotFound() {
  return (
    <div>
      <h2 className={playfairDisplay500.className}>Not Found</h2>
      <p>Could not find the requested post!</p>
      <Link href="/">Return to the Homepage</Link>
    </div>
  );
}
