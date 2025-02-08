import React from "react";
import gsap from "gsap";
import "@/styles/globals.css";
import { useGSAP } from "@gsap/react";
import MotionPathPlugin from "gsap/dist/MotionPathPlugin";
import ScrollToPlugin from "gsap/dist/ScrollToPlugin";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(MotionPathPlugin, useGSAP, ScrollToPlugin, ScrollTrigger);
}

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
