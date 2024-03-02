import Link from "next/link";
import "@/app/Components/navLinksStyling.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function NavBar() {
  return (
    <nav className={inter.className}>
      <Link href="/">Home</Link>
      <Link href="/posts">Posts</Link>
      <Link href="/upload">Upload a Restaurant</Link>
    </nav>
  );
}
