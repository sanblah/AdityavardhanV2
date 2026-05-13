import { ParallaxImage } from "@/components/shared/ParallaxImage";
import { WhyBespoke } from "@/components/bespoke/WhyBespoke";
import { ProcessTimeline } from "@/components/bespoke/ProcessTimeline";
import { Testimonials } from "@/components/bespoke/Testimonials";

export const metadata = {
    title: "Bespoke Experience | ADITYAVARDHAN",
    description: "Discover the personalised journey of crafting an ensemble just for you at Adityavardhan.",
};

export default function BespokePage() {
    return (
        <main className="relative">
            {/* Hero */}
            <section className="relative h-screen w-full overflow-hidden">
                <ParallaxImage
                    src="/images/parallax/parallax-3.jpg"
                    alt="The Bespoke Experience"
                    className="absolute inset-0 h-full w-full"
                    speed={0.2}
                />
                <div className="absolute inset-0 bg-brand-black/50" />
                <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
                    <p className="font-heading text-xs tracking-[0.4em] text-brand-gold">
                        A Garment Made for One
                    </p>
                    <h1 className="mt-4 font-logo text-[clamp(2rem,8vw,5rem)] tracking-[0.12em] text-brand-white">
                        The Bespoke Experience
                    </h1>
                    <p className="mt-6 max-w-3xl font-body text-sm font-book leading-relaxed text-brand-white/65 md:text-base">
                        A bespoke Adityavardhan piece is not selected &mdash; it is composed. From the first consultation to the final stitch, every garment is a quiet dialogue between your vision and the hands that bring it to life.
                    </p>
                </div>
            </section>

            <WhyBespoke />
            <ProcessTimeline />
            <Testimonials />
        </main>
    );
}
