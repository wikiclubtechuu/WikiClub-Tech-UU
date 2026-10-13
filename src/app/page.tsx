import Hero from "@/components/home/Hero";
import WhoWeAre from "@/components/home/WhoWeAre";
import WhatWeDo from "@/components/home/WhatWeDo";
import Gallery from "@/components/home/Gallery";
import CommunityImpact from "@/components/home/CommunityImpact";
import Socials from "@/components/home/Socials";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  return (
    <main className={inter.className}>
      <Hero />
      <WhoWeAre />
      <WhatWeDo />
      <Gallery />
      <CommunityImpact />
      <Socials />
    </main>
  );
}