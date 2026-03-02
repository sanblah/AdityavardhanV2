"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function HeroMinimal() {
    return (
        <section className="relative z-10 flex h-screen w-full items-center justify-center">
            <div className="flex flex-col items-center px-6 text-center">
                {/* Brand Name */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                    className="font-logo text-[clamp(2.5rem,10vw,7rem)] uppercase tracking-[0.15em] text-brand-white"
                >
                    ADITYAVARDHAN
                </motion.h1>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="mt-6 max-w-xl text-sm font-demi uppercase tracking-[0.3em] text-brand-white/60 md:text-base"
                >
                    Bespoke Tailoring for the Modern Gentleman
                </motion.p>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
                    className="mt-10"
                >
                    <Link
                        href="/appointment"
                        className="inline-flex items-center gap-3 border border-brand-gold bg-transparent px-10 py-4 font-heading text-xs uppercase tracking-[0.25em] text-brand-gold transition-all duration-500 hover:bg-brand-gold hover:text-brand-black"
                    >
                        Book Appointment
                    </Link>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="absolute bottom-12 flex flex-col items-center gap-3"
                >
                    <span className="text-[10px] font-book uppercase tracking-[0.4em] text-brand-white/40">
                        Scroll
                    </span>
                    <motion.div
                        animate={{ y: [0, 6, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="h-10 w-[1px] bg-gradient-to-b from-brand-gold/60 to-transparent"
                    />
                </motion.div>
            </div>
        </section>
    );
}
