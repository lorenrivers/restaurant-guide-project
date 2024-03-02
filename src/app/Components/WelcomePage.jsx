"use client";
import { motion } from "framer-motion";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import modernRestaurant from "../../../public/modernrestaurant.avif";

const playfairDisplay500 = Playfair_Display({
  weight: "500",
  subsets: ["latin"],
});

export default function WelcomePage() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className={playfairDisplay500.className}>Welcome!</h2>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
      >
        <Image
          src={modernRestaurant}
          alt="image of a modern restaurant"
          className="homepage-image"
        />
      </motion.div>
    </>
  );
}
