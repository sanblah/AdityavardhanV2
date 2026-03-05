"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { TextGenerateEffect } from "@/components/ui/aceternity/TextGenerateEffect";
import { BrandLogo } from "@/components/BrandLogo";

export function FounderVision() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!sectionRef.current) return;
        gsap.to(sectionRef.current, {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom top",
                pin: true,
                pinSpacing: true,
            },
        });
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="relative flex min-h-screen items-center justify-center bg-brand-black"
        >
            {/* Ambient glow */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gold/5 blur-[200px] md:h-[600px] md:w-[600px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
                <p className="font-heading text-xs uppercase tracking-[0.4em] text-brand-gold">
                    The Vision
                </p>

                <div className="mt-10">
                    <TextGenerateEffect
                        words="We don't just make clothes. We craft an identity — a second skin that speaks of who you are, where you've been, and where you're going."
                        className="font-logo text-2xl leading-relaxed text-brand-gold/90 md:text-4xl md:leading-relaxed"
                        duration={0.6}
                    />
                </div>

                <div className="mt-12">
                    <div className="flex justify-center">
                        <BrandLogo className="h-auto w-[min(70vw,420px)] opacity-75" alt="Brand logo" />
                    </div>
                    <p className="mt-2 font-body text-xs uppercase tracking-[0.2em] text-brand-white/30">
                        Founder & Creative Director
                    </p>
                </div>
            </div>
        </section>
    );
}
