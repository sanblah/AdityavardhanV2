"use client";

import { ScrollReveal } from "./ScrollReveal";

interface SectionHeadingProps {
    subtitle?: string;
    title: string;
    description?: string;
    align?: "left" | "center";
    light?: boolean;
}

export function SectionHeading({
    subtitle,
    title,
    description,
    align = "center",
    light = false,
}: SectionHeadingProps) {
    const textAlign = align === "center" ? "text-center" : "text-left";

    return (
        <div className={textAlign}>
            {subtitle && (
                <ScrollReveal>
                    <p className="font-heading text-xs font-bold uppercase tracking-[0.4em] text-brand-gold">
                        {subtitle}
                    </p>
                </ScrollReveal>
            )}
            <ScrollReveal delay={0.1}>
                <h2
                    className={`mt-4 font-heading text-3xl font-bold uppercase tracking-[0.1em] md:text-5xl ${
                        light ? "text-brand-white" : "text-brand-white"
                    }`}
                >
                    {title}
                </h2>
            </ScrollReveal>
            {description && (
                <ScrollReveal delay={0.2}>
                    <p
                        className={`mx-auto mt-6 max-w-2xl font-body text-base font-book leading-relaxed ${
                            light ? "text-brand-white/60" : "text-brand-white/60"
                        }`}
                    >
                        {description}
                    </p>
                </ScrollReveal>
            )}
        </div>
    );
}
