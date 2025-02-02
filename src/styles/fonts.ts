import { Inter, Oswald, Kanit } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--InterFont",
});
const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
  variable: "--OsvaldFont",
});

const kanit = Kanit({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--KanitFont",
});

export { inter, oswald, kanit };
