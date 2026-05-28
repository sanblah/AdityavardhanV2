import type { Metadata } from "next";
import Image from "next/image";
import { BrandLogo } from "@/components/BrandLogo";

export const metadata: Metadata = {
    title: "Coming Soon | ADITYAVARDHAN",
    description: "ADITYAVARDHAN is preparing a new bespoke atelier experience.",
};

export default function ComingSoonPage() {
    return (
        <main className="relative isolate h-[100dvh] overflow-hidden bg-brand-black text-brand-white">
            <Image
                src="/images/hero/hero-video-poster.jpg"
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover object-[38%_center]"
            />
            <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster="/images/hero/hero-video-poster.jpg"
                aria-hidden="true"
                tabIndex={-1}
                className="absolute inset-0 h-full w-full object-cover object-[38%_center]"
            >
                <source src="/videos/hero-video-optimized.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-brand-black/35" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(35,31,32,0.92)_0%,rgba(35,31,32,0.62)_38%,rgba(35,31,32,0.16)_72%,rgba(35,31,32,0.34)_100%)]" />
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-brand-black/55 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-brand-black/80 to-transparent" />

            <section className="relative z-10 mx-auto grid h-full w-full max-w-7xl grid-rows-[auto_1fr] px-5 py-7 md:px-12 md:py-10">
                <header className="flex items-start justify-between gap-6">
                    <BrandLogo
                        className="h-auto w-[min(58vw,300px)]"
                        alt="ADITYAVARDHAN"
                        priority
                    />
                    <p className="hidden max-w-[18rem] text-right font-heading text-[10px] font-book uppercase leading-relaxed tracking-[0.28em] text-brand-white/55 md:block">
                        Bespoke tailoring and ceremonial ensembles
                    </p>
                </header>

                <div className="grid items-end gap-10 pb-8 pt-20 md:grid-cols-[1fr_0.72fr] md:pb-14 md:pt-16">
                    <div className="max-w-3xl">
                        <p className="font-heading text-[11px] font-book uppercase tracking-[0.42em] text-brand-gold">
                            Private Atelier
                        </p>
                        <h1 className="mt-5 text-balance font-heading text-[clamp(3.4rem,11vw,9rem)] font-book uppercase leading-[0.86] tracking-[0.08em] text-brand-white">
                            Coming Soon
                        </h1>
                    </div>

                    <div className="border-l border-brand-white/20 pl-5 md:mb-5 md:pl-8">
                        <p className="max-w-sm font-body text-sm font-book leading-7 tracking-[0.08em] text-brand-white/72 md:text-base">
                            A quieter home for personalised craft is being prepared. The full
                            ADITYAVARDHAN experience will open shortly.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
