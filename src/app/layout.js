import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Taste Trekkers Guide",
  description: "A guide to restaurants in your local area!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <h1>Taste Trekkers Guide</h1>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/posts">Posts</Link>
          </nav>
        </header>
        {children}
        <footer>© Taste Trekkers 2024</footer>
      </body>
    </html>
  );
}
