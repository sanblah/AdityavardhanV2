"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    useEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }

        const scrollToTop = () => {
            // Preserve homepage section links when returning from another route.
            if (window.location.hash) {
                const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
                if (target) {
                    target.scrollIntoView({ behavior: "instant", block: "start" });
                    return;
                }
            }
            window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        };

        scrollToTop();
        const frame = window.requestAnimationFrame(scrollToTop);

        return () => window.cancelAnimationFrame(frame);
    }, [pathname]);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15, ease: "easeInOut" }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
