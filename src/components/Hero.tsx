import Link from "next/link";
import { VideoBackground } from "./VideoBackground";

export function Hero() {
    return (
        <section id="top" className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden bg-brand-black">
            <VideoBackground />
            <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pb-8 pt-36 md:px-12 md:pb-12 md:pt-40">
                <p className="editorial-label !text-brand-white/80">True bespoke menswear · Kala Ghoda</p>
                <h1 className="mt-7 max-w-4xl text-[clamp(3.5rem,9vw,8rem)] font-book leading-[1.05] tracking-[-0.04em] text-brand-white">Made once.<br />For one.</h1>
                <p className="mt-7 max-w-md text-base leading-relaxed text-brand-white/85 md:text-xl">Fine bespoke tailoring for every moment of life.</p>
                <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
                    <Link href="/appointment" className="editorial-link">Begin a Commission <span aria-hidden="true">↗</span></Link>
                    <a href="#practice" className="editorial-link text-brand-white/75">Discover the Practice <span aria-hidden="true">↓</span></a>
                </div>
            </div>
            <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 md:px-12 md:pb-24">
                <p className="max-w-3xl border-t border-brand-white/25 pt-5 text-xs leading-relaxed text-brand-white/80 md:text-sm">Suits, sherwanis, bandhgalas, jackets, shirts, trousers and relaxed silhouettes, and entire wardrobes — drawn, cut and made for one person.</p>
            </div>
        </section>
    );
}
