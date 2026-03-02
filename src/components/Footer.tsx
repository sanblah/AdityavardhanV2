"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const pageLinks = [
    { name: "About", href: "/about" },
    { name: "Bespoke", href: "/bespoke" },
    { name: "Journal", href: "/journal" },
    { name: "Appointment", href: "/appointment" },
];

const socialLinks = [
    { name: "Instagram", href: "#" },
    { name: "Facebook", href: "#" },
    { name: "Pinterest", href: "#" },
];

export function Footer() {
    const pathname = usePathname();
    const isAppointmentPage = pathname === "/appointment";

    return (
        <footer className="relative z-20 overflow-hidden bg-brand-black">
            {/* CTA Section - hidden on appointment page */}
            {!isAppointmentPage && (
                <div className="relative flex min-h-[60vh] flex-col justify-center border-t border-brand-gold/20 py-12 md:min-h-[85vh] md:py-20">
                    {/* Ambient Glow */}
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gold/5 blur-[150px] md:h-[500px] md:w-[500px]" />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
                    >
                        <h2 className="font-heading text-sm uppercase tracking-[0.4em] text-brand-gold">
                            Get in Touch
                        </h2>
                        <p className="mt-6 font-heading text-3xl font-bold uppercase tracking-[0.1em] text-brand-white md:text-4xl lg:text-6xl">
                            Let&apos;s Create Together
                        </p>
                        <p className="mx-auto mt-6 max-w-lg text-brand-white/60">
                            Ready to elevate your style? Reach out to discover our bespoke services
                            and exclusive collections.
                        </p>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="mt-10 inline-block"
                        >
                            <Link
                                href="/appointment"
                                className="inline-flex items-center gap-3 rounded-full border border-brand-gold bg-transparent px-8 py-4 font-heading text-sm uppercase tracking-[0.2em] text-brand-gold transition-all duration-300 hover:bg-brand-gold hover:text-brand-black"
                            >
                                <span>Book Appointment</span>
                                <span className="text-lg">&rarr;</span>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            )}

            {/* Footer Bottom */}
            <div className="border-t border-brand-gold/10 bg-brand-black px-6 py-8">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="font-logo text-xl uppercase tracking-[0.15em] text-brand-white md:text-2xl"
                    >
                        ADITYAVARDHAN
                    </Link>

                    {/* Page Links */}
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                        {pageLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="font-body text-xs uppercase tracking-[0.15em] text-brand-white/50 transition-colors hover:text-brand-gold"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Social Links */}
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="font-body text-xs uppercase tracking-[0.15em] text-brand-white/50 transition-colors hover:text-brand-gold"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* Copyright */}
                    <p className="font-body text-xs text-brand-white/30">
                        &copy; {new Date().getFullYear()} AdityaVardhan. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
