"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DrawLineLink } from "./DrawLineLink";
import { BrandLogo } from "./BrandLogo";
import { homepageNavigation } from "./home/homepage-content";

const navItems = homepageNavigation;

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!isOpen) return;

        const previousOverflow = document.body.style.overflow;
        const backgroundElements = Array.from(
            document.querySelectorAll<HTMLElement>("main, footer")
        );
        const previousBackgroundState = backgroundElements.map((element) => ({
            element,
            ariaHidden: element.getAttribute("aria-hidden"),
            inert: element.inert,
        }));

        document.body.style.overflow = "hidden";
        backgroundElements.forEach((element) => {
            element.setAttribute("aria-hidden", "true");
            element.inert = true;
        });

        return () => {
            document.body.style.overflow = previousOverflow;
            previousBackgroundState.forEach(({ element, ariaHidden, inert }) => {
                if (ariaHidden === null) {
                    element.removeAttribute("aria-hidden");
                } else {
                    element.setAttribute("aria-hidden", ariaHidden);
                }
                element.inert = inert;
            });
        };
    }, [isOpen]);

    const closeMobileMenu = () => setIsOpen(false);

    const handleNavClick = () => {
        closeMobileMenu();
    };

    return (
        <>
            {/* Desktop Navbar */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
                    isScrolled
                        ? "bg-brand-black/90 backdrop-blur-xl border-b border-brand-white/10"
                        : "bg-transparent"
                }`}
            >
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-12">
                    {/* Logo */}
                    <Link
                        href="/#top"
                        scroll
                        className="transition-opacity hover:opacity-80"
                        aria-label="Home"
                        onClick={handleNavClick}
                    >
                        <BrandLogo
                            className="h-auto w-[180px] md:w-[220px]"
                            alt="Brand logo"
                            priority
                        />
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden items-center gap-2 lg:flex">
                        {navItems.map((item) => (
                            <Link key={item.name} href={item.href} scroll onClick={handleNavClick}>
                                <DrawLineLink
                                    className="text-brand-gold/80"
                                >
                                    <span
                                        className={`font-body text-[10px] uppercase tracking-[0.16em] transition-colors hover:text-brand-white ${
                                            pathname === item.href
                                                ? "text-brand-gold"
                                                : "text-brand-white/70"
                                        }`}
                                    >
                                        {item.name}
                                    </span>
                                </DrawLineLink>
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="relative z-50 flex h-11 w-11 items-center justify-center lg:hidden"
                        aria-label="Toggle menu"
                        aria-expanded={isOpen}
                        aria-controls="mobile-navigation"
                    >
                        <div className="flex flex-col gap-1.5">
                            <motion.span
                                animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                                className="block h-[1px] w-5 bg-brand-white"
                            />
                            <motion.span
                                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                                className="block h-[1px] w-5 bg-brand-white"
                            />
                            <motion.span
                                animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                                className="block h-[1px] w-5 bg-brand-white"
                            />
                        </div>
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        id="mobile-navigation-panel"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 flex min-h-[100dvh] items-center justify-center bg-brand-black/95 px-6 backdrop-blur-2xl lg:hidden"
                        style={{
                            paddingTop: "calc(5rem + var(--safe-top))",
                            paddingBottom: "calc(2rem + var(--safe-bottom))",
                        }}
                    >
                        <nav
                            id="mobile-navigation"
                            aria-label="Mobile navigation"
                            className="flex w-full max-w-sm flex-col items-center gap-6"
                        >
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        href={item.href}
                                        scroll
                                        onClick={handleNavClick}
                                        className={`min-h-12 text-center font-heading text-xl font-book uppercase leading-relaxed tracking-[0.22em] transition-colors hover:text-brand-gold ${
                                            pathname === item.href
                                                ? "text-brand-gold"
                                                : "text-brand-white"
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
