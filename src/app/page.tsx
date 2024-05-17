import Hero from "@/components/Hero";
import LastSection from "@/components/LastSection";
import Stats from "@/components/Stats";
import Testimonial from "@/components/Testimonial";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto ">
      <Hero />
      <Testimonial />
      <Stats />
      <LastSection />
    </div>
  );
}
