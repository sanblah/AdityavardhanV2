"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { DrawLineLink } from "./DrawLineLink";

const testimonials = [
    {
        name: "Viraj Belgaonkar",
        quote: "One of the best places you'll find for all your bespoke fashion needs. The designer is extremely polite and personally caters to all his clients. The entire staff was very patient and attentive, making me feel extremely comfortable. Do check it out especially if there's a wedding or a party around the corner.",
        occasion: "Google Review",
    },
    {
        name: "Rohan Kurup",
        quote: "I'm so glad I reached out to you this year for my outfits. I knew you would absolutely nail it but you ended up over delivering and how. Thanks for being a part of my big day this year.",
        occasion: "Wedding Client",
    },
    {
        name: "Maitreya Kundalia",
        quote: "Simply the best! Go here to see your dreams turn into reality.",
        occasion: "Google Review",
    },
    {
        name: "Aashika Patel",
        quote: "The trial pieces are excellent! Hat tip to the tailor, all three pieces are nicely done. First women's suit we did at the atelier.",
        occasion: "Bespoke Client",
    },
    {
        name: "Satisfied Client",
        quote: "Celebrations were incredible! The ensembles created by you guys were just top!! Couldn't be happier! Going to be seeing each other more down the road for events and also general stuff!",
        occasion: "Event Client",
    },
];

const starIcon = (
    <svg
        className="h-4 w-4 fill-brand-gold"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

/* ─── 3D Tilt Card ─── */
function TiltCard({
    children,
    index,
}: {
    children: React.ReactNode;
    index: number;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
    const [glare, setGlare] = useState({ x: 50, y: 50 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!cardRef.current) return;
            const rect = cardRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            const rotateX = (y - 0.5) * -20; // ±10deg
            const rotateY = (x - 0.5) * 20;

            setTilt({ rotateX, rotateY });
            setGlare({ x: x * 100, y: y * 100 });
        },
        []
    );

    const handleMouseLeave = useCallback(() => {
        setTilt({ rotateX: 0, rotateY: 0 });
        setIsHovering(false);
    }, []);

    const handleMouseEnter = useCallback(() => {
        setIsHovering(true);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, rotateX: 8 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
                duration: 1,
                delay: index * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            style={{ perspective: "1200px" }}
            className="h-full"
        >
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={handleMouseEnter}
                className="group relative h-full overflow-hidden rounded-2xl border border-brand-white/10 bg-black/25 backdrop-blur-2xl transition-[border-color,background-color] duration-500 hover:border-brand-gold/30 hover:bg-black/35"
                style={{
                    transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                    transition: isHovering
                        ? "transform 0.1s ease-out"
                        : "transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)",
                    transformStyle: "preserve-3d",
                    willChange: "transform",
                }}
            >
                {/* Glare Overlay */}
                <div
                    className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                        background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(161,132,108,0.15) 0%, transparent 60%)`,
                    }}
                />

                {/* Soft Glow on Hover */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-gold/10 blur-3xl" />
                </div>

                {/* Card Content */}
                <div className="relative z-0 flex h-full flex-col p-6 md:p-8">{children}</div>

                {/* Bottom Border Accent */}
                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-brand-gold/50 transition-all duration-700 group-hover:w-full" />
            </div>
        </motion.div>
    );
}

export function Testimonials() {
    return (
        <section
            id="testimonials"
            className="relative z-10 overflow-hidden py-20 md:py-32"
        >
            {/* Ambient Glow */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-32 top-1/4 h-[400px] w-[400px] rounded-full bg-brand-gold/5 blur-[180px]" />
                <div className="absolute -right-32 bottom-1/4 h-[300px] w-[300px] rounded-full bg-brand-gold/5 blur-[150px]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 md:px-12">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                        duration: 1.2,
                        ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="mb-16 text-center md:mb-24"
                >
                    <DrawLineLink
                        className="text-brand-gold"
                        strokeWidth={14}
                    >
                        <span className="font-heading text-xs font-bold uppercase tracking-[0.5em] text-brand-gold">
                            Testimonials
                        </span>
                    </DrawLineLink>
                    <p className="mx-auto mt-6 max-w-2xl font-heading text-xl font-bold leading-relaxed text-brand-white md:mt-8 md:text-2xl lg:text-4xl">
                        Words from those who&apos;ve experienced the{" "}
                        <span className="text-brand-gold">
                            Adityavardhan difference
                        </span>
                    </p>
                </motion.div>

                {/* 3D Testimonial Cards */}
                <div className="grid gap-6 md:grid-cols-3 md:gap-8">
                    {testimonials.slice(0, 3).map((testimonial, index) => (
                        <TiltCard key={testimonial.name} index={index}>
                            {/* Star Rating */}
                            <div className="mb-5 flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{
                                            opacity: 1,
                                            scale: 1,
                                        }}
                                        viewport={{ once: true }}
                                        transition={{
                                            duration: 0.3,
                                            delay:
                                                index * 0.15 + i * 0.06 + 0.3,
                                        }}
                                    >
                                        {starIcon}
                                    </motion.div>
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="mb-6 flex-grow font-body text-sm font-book leading-relaxed text-brand-white/70 md:text-base">
                                &ldquo;{testimonial.quote}&rdquo;
                            </p>

                            {/* Divider */}
                            <div className="mb-4 h-[1px] w-full bg-brand-white/10" />

                            {/* Client Info */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-heading text-sm font-bold uppercase tracking-[0.1em] text-brand-white">
                                        {testimonial.name}
                                    </p>
                                    <p className="mt-1 font-body text-xs font-book uppercase tracking-[0.15em] text-brand-gold/70">
                                        {testimonial.occasion}
                                    </p>
                                </div>
                                {/* Decorative Diamond */}
                                <span className="text-lg text-brand-gold/40 transition-colors duration-300 group-hover:text-brand-gold/70">
                                    ◇
                                </span>
                            </div>
                        </TiltCard>
                    ))}
                </div>

                {/* Bottom Row - 2 centered cards */}
                <div className="mx-auto mt-6 grid max-w-5xl gap-6 md:mt-8 md:grid-cols-2 md:gap-8">
                    {testimonials.slice(3).map((testimonial, index) => (
                        <TiltCard key={testimonial.name} index={index + 3}>
                            {/* Star Rating */}
                            <div className="mb-5 flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{
                                            opacity: 1,
                                            scale: 1,
                                        }}
                                        viewport={{ once: true }}
                                        transition={{
                                            duration: 0.3,
                                            delay:
                                                (index + 3) * 0.15 +
                                                i * 0.06 +
                                                0.3,
                                        }}
                                    >
                                        {starIcon}
                                    </motion.div>
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="mb-6 flex-grow font-body text-sm font-book leading-relaxed text-brand-white/70 md:text-base">
                                &ldquo;{testimonial.quote}&rdquo;
                            </p>

                            {/* Divider */}
                            <div className="mb-4 h-[1px] w-full bg-brand-white/10" />

                            {/* Client Info */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-heading text-sm font-bold uppercase tracking-[0.1em] text-brand-white">
                                        {testimonial.name}
                                    </p>
                                    <p className="mt-1 font-body text-xs font-book uppercase tracking-[0.15em] text-brand-gold/70">
                                        {testimonial.occasion}
                                    </p>
                                </div>
                                {/* Decorative Diamond */}
                                <span className="text-lg text-brand-gold/40 transition-colors duration-300 group-hover:text-brand-gold/70">
                                    ◇
                                </span>
                            </div>
                        </TiltCard>
                    ))}
                </div>

                {/* Google Reviews Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-12 flex justify-center md:mt-16"
                >
                    <a
                        href="https://www.google.com/search?kgmid=/g/11l71d9gbj&q=Adityavardhan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 rounded-full border border-brand-white/10 bg-brand-white/5 px-6 py-3 backdrop-blur-lg transition-all duration-300 hover:border-brand-gold/30 hover:bg-brand-white/10"
                    >
                        {/* Google "G" icon */}
                        <svg
                            className="h-5 w-5"
                            viewBox="0 0 48 48"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill="#EA4335"
                                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                            />
                            <path
                                fill="#4285F4"
                                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                            />
                            <path
                                fill="#34A853"
                                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                            />
                        </svg>
                        <div className="flex items-center gap-1.5">
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className="h-3.5 w-3.5 fill-brand-gold"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="font-heading text-xs font-bold uppercase tracking-[0.1em] text-brand-white/80">
                                5.0
                            </span>
                        </div>
                        <span className="font-body text-xs font-book text-brand-white/50 transition-colors duration-300 group-hover:text-brand-white/70">
                            See all reviews →
                        </span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
