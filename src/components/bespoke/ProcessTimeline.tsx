"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { useIsMobile } from "@/hooks/useIsMobile";

const steps = [
    {
        number: "01",
        title: "Consultation",
        description:
            "Every commission begins with an unhurried conversation. We learn the occasion, the silhouettes you favour, and the cultural and personal taste that move you. Together we shape the brief from colour and cut to embroidery and mood. This will guide every sketch, every cut and every hand involved in your garment.",
        image: "/images/parallax/parallax-16.jpg",
    },
    {
        number: "02",
        title: "Fabric & Embellishment Selection",
        description:
            "We curate fabrics drawn from the world's most exacting makers; Italian superfine wools, English worsteds, handwoven Banarasi silks, rare brocades and tissues. For ceremonial pieces, we develop a bespoke sketch in collaboration with you, and personally select embroidery palette and elements: zardozi, aari, dabka, resham, sequin, and pearl, each sampled by hand on the chosen cloth before a single thread is committed to the final garment.",
        image: "/images/parallax/parallax-9.jpg",
    },
    {
        number: "03",
        title: "Measurements & Pattern Drafting",
        description:
            "Our master tailors take over thirty measurements, recording posture, stance, and the small asymmetries every body carries that no standard size can accommodate. From these, a paper pattern is drafted from scratch, a blueprint that exists for you alone, preserved in our archive for every future commission, growing with you.",
        image: "/images/edited/edited-5.jpg",
    },
    {
        number: "04",
        title: "Fittings",
        description:
            "A bespoke garment is sculpted, not sewn once. Across multiple fittings, first in muslin, then in cloth, we refine the slope of a shoulder, the break of a trouser, the rise of a collar, the exact ease of a sherwani across the chest. Hand embroidery is layered onto the panels only after the foundation fits perfectly, so that not a single motif is wasted.",
        image: "/images/parallax/parallax-11.jpg",
    },
    {
        number: "05",
        title: "Hand Finishing & Delivery",
        description:
            "The final hours of any Adityavardhan piece belong to the finishers; artisans who pick-stitch lapels, hand-bind buttonholes, set linings invisibly, and press the garment into its final form. It is then presented in our signature packaging, accompanied by a care guide and a record of the hands that built it: a piece that does not merely fit you, but belongs to you.",
        image: "/images/group/group-5.jpg",
    },
];

export function ProcessTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    useGSAP(() => {
        // Mobile uses a plain stacked layout — no pin/scrub (pinning is
        // unreliable when the section height changes on the isMobile flip).
        if (isMobile) return;
        if (!containerRef.current || !panelRef.current) return;
        const panels = Array.from(
            panelRef.current.querySelectorAll<HTMLElement>(".timeline-step")
        );
        const n = panels.length;
        if (n === 0) return;
        const progressLine =
            containerRef.current.querySelector<HTMLElement>(".progress-line-fill");

        // The panel is pinned by CSS sticky; GSAP only drives opacity and the
        // progress line. This avoids ScrollTrigger mutating the section's
        // layout while the user scrolls through the process steps.
        const fade = 0.08;

        gsap.set(panels, { autoAlpha: 0 });
        gsap.set(panels[0], { autoAlpha: 1 });
        if (progressLine) gsap.set(progressLine, { scaleY: 0 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
                invalidateOnRefresh: true,
            },
        });

        for (let i = 1; i < n; i++) {
            const at = i - fade / 2; // crossfade centred on the boundary
            tl.to(panels[i - 1], { autoAlpha: 0, ease: "none", duration: fade }, at);
            tl.to(panels[i], { autoAlpha: 1, ease: "none", duration: fade }, at);
        }

        if (progressLine) {
            tl.to(progressLine, { scaleY: 1, ease: "none", duration: n }, 0);
        }

        return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
        };
    }, { scope: containerRef, dependencies: [isMobile] });

    if (isMobile) {
        return (
            <section
                ref={containerRef}
                className="relative bg-brand-black px-5 pb-20 pt-24 md:px-6"
            >
                <div className="text-center">
                    <p className="font-heading text-xs uppercase tracking-[0.4em] text-brand-gold">
                        Steps to the Perfect You
                    </p>
                    <h2 className="mt-3 font-heading text-2xl font-book uppercase tracking-[0.08em] text-brand-white">
                        From Vision to Heirloom
                    </h2>
                </div>

                <div className="mt-10 space-y-14">
                    {steps.map((step) => (
                        <div key={step.number}>
                            <span className="font-heading text-5xl font-book text-brand-gold/20">
                                {step.number}
                            </span>
                            <h3 className="mt-2 font-heading text-xl font-book uppercase tracking-[0.08em] text-brand-white">
                                {step.title}
                            </h3>
                            <p className="mt-3 font-body text-[13px] font-book leading-7 text-brand-white/60">
                                {step.description}
                            </p>
                            <div className="relative mt-5 aspect-[4/5] w-full overflow-hidden rounded-sm">
                                <Image
                                    src={step.image}
                                    alt={step.title}
                                    fill
                                    className="object-cover"
                                    sizes="100vw"
                                />
                                <div className="absolute inset-0 bg-brand-black/10" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section
            ref={containerRef}
            className="relative bg-brand-black"
            style={{ height: `${(steps.length + 1) * 100}vh` }}
        >
            <div
                ref={panelRef}
                className="sticky top-0 flex h-screen flex-col overflow-hidden"
            >
                <div className="relative z-10 flex-shrink-0 px-6 pb-6 pt-24 text-center md:pt-28">
                    <p className="font-heading text-xs uppercase tracking-[0.4em] text-brand-gold">
                        Steps to the Perfect You
                    </p>
                    <h2 className="mt-3 font-heading text-2xl font-book uppercase tracking-[0.08em] text-brand-white md:text-4xl">
                        From Vision to Heirloom
                    </h2>
                </div>

                {/* Gold progress line */}
                <div className="absolute left-6 top-[26%] h-[58%] w-[1px] bg-brand-white/10 md:left-12">
                    <div className="progress-line-fill h-full w-full origin-top bg-brand-gold" />
                </div>

                <div className="relative flex-1">
                    {/* Steps */}
                    {steps.map((step, i) => (
                        <div
                            key={step.number}
                            className="timeline-step absolute inset-0 flex items-center px-6 md:px-12"
                            style={{ opacity: i === 0 ? 1 : 0 }}
                        >
                            <div className="mx-auto grid h-full w-full max-w-6xl items-center gap-5 overflow-hidden pb-10 md:grid-cols-2 md:gap-12 md:pb-16">
                                {/* Text */}
                                <div className="flex flex-col justify-center pl-4 md:pl-12">
                                    <span className="font-heading text-4xl font-book text-brand-gold/20 md:text-6xl lg:text-8xl">
                                        {step.number}
                                    </span>
                                    <h3 className="mt-3 font-heading text-lg font-book uppercase tracking-[0.08em] text-brand-white md:mt-4 md:text-2xl lg:text-4xl">
                                        {step.title}
                                    </h3>
                                    <p className="mt-4 max-w-xl font-body text-[13px] font-book leading-relaxed text-brand-white/60 md:mt-6 md:text-base">
                                        {step.description}
                                    </p>
                                </div>
                                {/* Image */}
                                <div className="relative mx-auto aspect-[3/4] h-full max-h-[58vh] w-full max-w-md self-center overflow-hidden rounded-sm">
                                    <Image
                                        src={step.image}
                                        alt={step.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                    <div className="absolute inset-0 bg-brand-black/10" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
