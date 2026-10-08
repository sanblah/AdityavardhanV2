"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "./BrandLogo";
import { homepageNavigation } from "./home/homepage-content";

export function Footer() {
    const pathname = usePathname();
    if (pathname === "/appointment") return null;
    return (
        <footer className="relative border-t border-brand-gold/20 bg-brand-black px-6 pb-8 pt-16 md:px-12 md:pt-20">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-12 md:grid-cols-[1.3fr_1fr]">
                    <div>
                        <Link href="/#top" aria-label="Adityavardhan home" className="inline-block"><BrandLogo className="h-auto w-[240px] md:w-[310px]" alt="ADITYAVARDHAN" /></Link>
                        <p className="mt-6 max-w-sm text-sm leading-7 text-brand-white/65">True bespoke menswear · Contemporary design · Couture handcraft</p>
                        <p className="mt-4 text-xs text-brand-gold">Kala Ghoda, Mumbai</p>
                    </div>
                    <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-2 self-start">
                        {homepageNavigation.map(item => <Link key={item.href} href={item.href} className="flex min-h-11 items-center text-[10px] uppercase leading-6 tracking-[0.16em] text-brand-white/70 transition-colors hover:text-brand-gold">{item.name}</Link>)}
                        <Link href="/appointment" className="flex min-h-11 items-center text-[10px] uppercase tracking-[0.16em] text-brand-white/70 hover:text-brand-gold">Contact</Link>
                    </nav>
                </div>
                <p className="mt-14 border-t border-brand-white/10 pt-7 text-[10px] tracking-[0.05em] text-brand-white/45">© {new Date().getFullYear()} Adityavardhan. All rights reserved.</p>
            </div>
        </footer>
    );
}
