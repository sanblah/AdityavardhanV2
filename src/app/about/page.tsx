import Image from "next/image";
import { BrandStory } from "@/components/about/BrandStory";
import { FounderVision } from "@/components/about/FounderVision";
import { ParallaxImage } from "@/components/shared/ParallaxImage";

export const metadata = {
    title: "About | ADITYAVARDHAN",
    description: "Discover the heritage and craftsmanship behind AdityaVardhan bespoke tailoring.",
};

export default function AboutPage() {
    return (
        <main className="relative">
            {/* Hero */}
            <section className="relative h-screen w-full overflow-hidden">
                <ParallaxImage
                    src="/images/group/group-1.jpg"
                    alt="AdityaVardhan Heritage"
                    className="absolute inset-0 h-full w-full"
                    speed={0.2}
                />
                <div className="absolute inset-0 bg-brand-black/50" />
                <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
                    <p className="font-heading text-xs uppercase tracking-[0.4em] text-brand-gold">
                        Est. 2024
                    </p>
                    <h1 className="mt-4 font-logo text-[clamp(2rem,8vw,5rem)] uppercase tracking-[0.15em] text-brand-white">
                        Our Story
                    </h1>
                    <p className="mt-6 max-w-lg font-body text-sm font-book leading-relaxed text-brand-white/60">
                        A narrative of heritage, precision, and the relentless pursuit of sartorial excellence.
                    </p>
                </div>
            </section>

            {/* Brand Story Blocks */}
            <BrandStory />

            {/* Founder Vision (Pinned) */}
            <FounderVision />
        </main>
    );
}
