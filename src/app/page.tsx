import { Closing, Footer } from "@/components/closing";
import { Compare } from "@/components/compare";
import { Details } from "@/components/details";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { Pricing } from "@/components/pricing";
import { Questions } from "@/components/questions";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Compare />
        <HowItWorks />
        <Details />
        <Pricing />
        <Questions />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
