import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AgeSection from "@/components/AgeSection";
import QuoteSection from "@/components/QuoteSection";
import OurStory from "@/components/OurStory";
import GalleryPreview from "@/components/GalleryPreview";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AgeSection />
        <QuoteSection />
        <OurStory />
        <GalleryPreview />
      </main>

      <footer
        className="py-10 text-center border-t"
        style={{
          borderColor: "var(--color-cream-dark)",
          color: "var(--color-muted)",
          fontSize: "0.75rem",
          letterSpacing: "0.1em",
        }}
      >
        Made with care &nbsp;·&nbsp; Happy Birthday, Zya
      </footer>
    </>
  );
}
