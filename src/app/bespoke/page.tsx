import { ParallaxImage } from "@/components/shared/ParallaxImage";
import { ProcessTimeline } from "@/components/bespoke/ProcessTimeline";
import { Testimonials } from "@/components/bespoke/Testimonials";

export const metadata = {
    title: "Bespoke Experience | ADITYAVARDHAN",
    description: "Discover the five-step bespoke tailoring journey at AdityaVardhan.",
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
                    <p className="font-heading text-xs uppercase tracking-[0.4em] text-brand-gold">
                        Five Steps to Perfection
                    </p>
                    <h1 className="mt-4 font-logo text-[clamp(2rem,8vw,5rem)] uppercase tracking-[0.15em] text-brand-white">
                        The Bespoke Experience
                    </h1>
                    <p className="mt-6 max-w-lg font-body text-sm font-book leading-relaxed text-brand-white/60">
                        From the first consultation to the final stitch, every step is a dialogue between your vision and our craft.
                    </p>
                </div>
            </section>

            <ProcessTimeline />
            <Testimonials />
        </main>
    );
}
