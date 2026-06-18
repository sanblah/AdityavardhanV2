"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/layout/PageTransition";

interface SiteChromeProps {
    children: React.ReactNode;
}

const standaloneRoutes = new Set(["/coming-soon"]);

export function SiteChrome({ children }: SiteChromeProps) {
    const pathname = usePathname();
    const isStandalone = standaloneRoutes.has(pathname);

    return (
        <>
            {!isStandalone && <Navbar />}
            <PageTransition>{children}</PageTransition>
            {!isStandalone && <Footer />}
        </>
    );
}
