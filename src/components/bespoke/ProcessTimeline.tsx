"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useIsMobile } from "@/hooks/useIsMobile";

const steps = [
    {
        number: "01",
        title: "Consultation",
        description:
            "We begin with a personal consultation to understand your style, occasion, and vision. Together we define the garment that will become uniquely yours.",
        image: "/images/parallax/parallax-16.jpg",
    },
    {
        number: "02",
        title: "Fabric Selection",
        description:
            "Explore our curated selection of the world's finest fabrics — from Italian superfine wools to rare silks. Each chosen for its drape, texture, and character.",
        image: "/images/parallax/parallax-9.jpg",
    },
    {
        number: "03",
        title: "Measurements",
        description:
            "Our master tailors take over 30 precise measurements, capturing every nuance of your form. This blueprint ensures a fit that feels as natural as your own skin.",
        image: "/images/edited/edited-5.jpg",
    },
    {
        number: "04",
        title: "Fitting Sessions",
        description:
            "Through multiple fittings, we refine the garment on your body. Every adjustment is deliberate — the slope of a shoulder, the break of a trouser, the ease of movement.",
        image: "/images/parallax/parallax-11.jpg",
    },
    {
        number: "05",
        title: "Final Delivery",
        description:
            "Your finished garment is presented in our signature packaging. The result: a piece that tells your story, crafted with the precision and care it deserves.",
        image: "/images/group/group-5.jpg",
    },
];

export function ProcessTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    const sectionHeight = steps.length * (isMobile ? 80 : 100);

    useGSAP(() => {
        if (!containerRef.current || !panelRef.current) return;
        const panels = panelRef.current.querySelectorAll(".timeline-step");

        // Pin the container and scrub through steps
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: `+=${steps.length * (isMobile ? 80 : 100)}%`,
            pin: panelRef.current,
            pinSpacing: false,
        });

        // Animate each step in and out
        panels.forEach((panel, i) => {
            const start = i / steps.length;
            const end = (i + 1) / steps.length;

            // Fade in
            gsap.fromTo(
                panel,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: `${start * 100}% top`,
                        end: `${(start + 0.1) * 100}% top`,
                        scrub: true,
                    },
                }
            );

            // Fade out (except last)
            if (i < steps.length - 1) {
                gsap.to(panel, {
                    opacity: 0,
                    y: -30,
                    ease: "power2.in",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: `${(end - 0.1) * 100}% top`,
                        end: `${end * 100}% top`,
                        scrub: true,
                    },
                });
            }
        });

        // Progress line
        const progressLine = containerRef.current.querySelector(".progress-line-fill");
        if (progressLine) {
            gsap.fromTo(
                progressLine,
                { scaleY: 0 },
                {
                    scaleY: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: true,
                    },
                }
            );
        }

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, { scope: containerRef, dependencies: [isMobile] });

    return (
        <section
            ref={containerRef}
            className="relative overflow-hidden bg-brand-black"
            style={{ height: `${sectionHeight}vh` }}
        >
            <div
                ref={panelRef}
                className="relative flex h-screen items-center overflow-hidden"
            >
                {/* Gold progress line */}
                <div className="absolute left-6 top-[15%] h-[70%] w-[1px] bg-brand-white/10 md:left-12">
                    <div className="progress-line-fill h-full w-full origin-top bg-brand-gold" />
                </div>

                {/* Steps */}
                {steps.map((step, i) => (
                    <div
                        key={step.number}
                        className="timeline-step absolute inset-0 flex items-center px-6 md:px-12"
                        style={{ opacity: i === 0 ? 1 : 0 }}
                    >
                        <div className="mx-auto grid h-full max-h-screen w-full max-w-6xl items-center gap-6 overflow-hidden py-8 md:gap-12 md:grid-cols-2 md:py-12">
                            {/* Text */}
                            <div className="pl-8 md:pl-16">
                                <span className="font-heading text-4xl font-bold text-brand-gold/20 md:text-6xl lg:text-8xl">
                                    {step.number}
                                </span>
                                <h3 className="mt-3 font-heading text-xl font-bold uppercase tracking-[0.1em] text-brand-white md:mt-4 md:text-2xl lg:text-4xl">
                                    {step.title}
                                </h3>
                                <p className="mt-4 max-w-md font-body text-sm font-book leading-relaxed text-brand-white/60 md:mt-6 md:text-base">
                                    {step.description}
                                </p>
                            </div>
                            {/* Image */}
                            <div className="relative aspect-[3/4] max-h-[40vh] overflow-hidden rounded-sm md:max-h-[60vh]">
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
        </section>
    );
}
