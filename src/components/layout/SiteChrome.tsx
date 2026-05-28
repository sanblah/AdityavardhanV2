"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/layout/PageTransition";

interface SiteChromeProps {
    children: React.ReactNode;
    forceStandalone?: boolean;
}

const standaloneRoutes = new Set(["/coming-soon"]);

export function SiteChrome({ children, forceStandalone = false }: SiteChromeProps) {
    const pathname = usePathname();
    const isStandalone = forceStandalone || standaloneRoutes.has(pathname);

    return (
        <>
            {!isStandalone && <Navbar />}
            <PageTransition>{children}</PageTransition>
            {!isStandalone && <Footer />}
        </>
    );
}
