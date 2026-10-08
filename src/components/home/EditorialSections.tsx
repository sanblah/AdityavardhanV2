import Image from "next/image";
import Link from "next/link";
import { commissions } from "./homepage-content";

export function PracticeIntroduction() {
    return (
        <div className="relative flex min-h-[65svh] items-end overflow-hidden md:min-h-[85svh]">
            <Image src="/images/parallax/parallax-1.jpg" alt="A relaxed conversation at the Adityavardhan atelier" fill sizes="100vw" className="object-cover object-[center_40%]" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/25 to-transparent" />
            <div className="relative mx-auto w-full max-w-7xl px-6 pb-14 pt-48 md:px-12 md:pb-20">
                <p className="editorial-label">It all begins with you</p>
                <h2 className="editorial-heading mt-5 max-w-2xl">You want more than<br className="hidden md:block" /> what is available.</h2>
            </div>
        </div>
    );
}

export function Craftsmanship() {
    return (
        <section aria-labelledby="craft-title" className="bg-brand-black">
            <div className="mx-auto grid max-w-7xl gap-6 border-t border-brand-gold/25 px-6 py-16 md:grid-cols-2 md:px-12 md:py-24">
                <p className="editorial-label">Bespoke, as we understand it</p>
                <p className="max-w-lg text-3xl leading-snug tracking-[-0.025em] md:text-4xl">Not an off the rack adjusted fit.</p>
            </div>
            <div className="grid md:grid-cols-2">
                <div className="relative min-h-[65svh] md:min-h-[850px]">
                    <Image src="/images/process/hand-embroidery.jpg" alt="An artisan’s hands placing gold embroidery on the shoulder of a bespoke blue jacket" fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover" />
                    <p className="absolute bottom-8 left-6 text-[10px] uppercase tracking-[0.25em] text-brand-white md:left-12">Elevated Craftsmanship</p>
                </div>
                <div className="flex flex-col justify-center px-6 py-16 md:px-12 lg:px-20">
                    <p className="editorial-label">The making is personal</p>
                    <h2 id="craft-title" className="mt-6 text-3xl leading-tight tracking-[-0.025em] md:text-4xl lg:text-5xl">Every sketch, every placement, every element designed just for you.</h2>
                    <p className="editorial-body mt-8">When a commission calls for more, the same discipline flows into every thread, bead, stone, colour and placement. There is no ready embroidery design. The artwork is drawn for the garment, multiple sketches, individually sourced elements, prototyping ideal placement and palette, considering fabric, silhouette, fall before a single element reaches the embroiderer, impossible to find on any rack.</p>
                    <p className="mt-6 text-lg text-brand-white/90">A true labour of love, just for you.</p>
                    <div className="relative mt-8 aspect-[16/9] max-w-sm overflow-hidden">
                        <Image src="/images/process/shoulder-detail.jpg" alt="The finished gold embroidery and individual embellishments on the jacket’s shoulder" fill sizes="(max-width: 767px) 100vw, 384px" className="object-cover object-[center_25%]" />
                    </div>
                    <p className="mt-10 max-w-sm border-t border-brand-gold/30 pt-6 text-sm leading-7 text-brand-gold">Bespoke in method. Couture in expression. Personal in every decision.</p>
                </div>
            </div>
            <div className="mx-auto max-w-5xl px-6 py-24 text-center md:py-36">
                <p className="text-xl leading-relaxed text-brand-white/50 md:text-3xl">What emerges is not our version of you.</p>
                <p className="mt-4 text-3xl leading-tight tracking-[-0.03em] text-brand-white md:text-6xl">It is you, more fully expressed.</p>
            </div>
        </section>
    );
}

export function SelectedCommissions() {
    return (
        <section id="selected-work" aria-labelledby="work-title" className="scroll-mt-20 bg-[#292425] px-6 py-20 md:px-12 md:py-28">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-8 md:grid-cols-2 md:items-end">
                    <div>
                        <p className="editorial-label">Selected commissions</p>
                        <h2 id="work-title" className="editorial-heading mt-6">What bespoke<br />can become.</h2>
                    </div>
                    <p className="editorial-body max-w-md md:justify-self-end">Some commissions call for restraint. Others need to be remembered across a room. Both deserve the same seriousness.</p>
                </div>
                {/* Editorial imagery accompanies the range; no unverified image-to-commission attribution. */}
                <div className="mt-14 grid items-start gap-5 md:grid-cols-[1.2fr_1fr] md:gap-12">
                    <div className="relative aspect-[3/4] overflow-hidden">
                        <Image src="/images/parallax/parallax-3.jpg" alt="Relaxed grey tailoring photographed inside the atelier" fill sizes="(max-width: 767px) 100vw, 55vw" className="object-cover transition-transform duration-1000 hover:scale-[1.025]" />
                    </div>
                    <div className="relative aspect-[3/4] overflow-hidden md:mt-32">
                        <Image src="/images/parallax/parallax-11.jpg" alt="A pale pink embroidered Indianwear ensemble" fill sizes="(max-width: 767px) 100vw, 45vw" className="object-cover transition-transform duration-1000 hover:scale-[1.025]" />
                    </div>
                </div>
                <div className="mt-12 grid gap-x-12 md:grid-cols-2">
                    {commissions.map((item, i) => (
                        <div key={item.title} className="flex items-start gap-5 border-t border-brand-white/15 py-7 md:py-9">
                            <span className="pt-1 text-xs text-brand-gold">0{i + 1}</span>
                            <div>
                                <p className="editorial-label">{item.category}</p>
                                <h3 className="mt-3 text-2xl font-book tracking-[-0.02em] md:text-3xl">{item.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function Atelier() {
    return (
        <section id="atelier" aria-labelledby="atelier-title" className="scroll-mt-20 bg-brand-black">
            <div className="relative min-h-[70svh] md:min-h-[90svh]">
                <Image src="/images/store/store-1.jpg" alt="Cream embroidered garments displayed beneath the Adityavardhan name inside the Kala Ghoda atelier" fill sizes="100vw" className="object-cover object-[center_45%]" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/65 via-transparent to-transparent" />
                <h2 id="atelier-title" className="absolute bottom-10 left-6 text-sm uppercase tracking-[0.3em] text-brand-white md:bottom-14 md:left-12">The Atelier · Kala Ghoda</h2>
            </div>
            <div className="mx-auto flex min-h-[40svh] max-w-5xl flex-col justify-center px-6 py-16 text-center md:py-20">
                <p className="text-3xl leading-snug tracking-[-0.025em] md:text-4xl">The work is exacting. Your experience of it should feel like coming home.</p>
                <p className="editorial-body mx-auto mt-6 max-w-2xl">We host you, and as you settle in we listen closely, and shape the vision of your single garment, or entire wardrobe with equal intent.</p>
            </div>
            <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-12 md:grid-cols-2 md:px-12 md:py-20">
                <div className="relative aspect-[4/5] max-h-[650px]">
                    <Image src="/images/store/store-3.jpg" alt="An arched doorway and seating inside the atelier" fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover" />
                </div>
                <div className="md:pl-8">
                    <p className="editorial-label">An enduring pattern</p>
                    <h3 className="editorial-heading mt-6">Your pattern remains in our archive, growing with you.</h3>
                    <p className="editorial-body mt-8 max-w-md">Each time you return, it is revisited and refined. The relationship does not begin again. It deepens.</p>
                </div>
            </div>
            <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
                <h3 className="editorial-label">In their words</h3>
                <div className="mt-10 grid gap-12 md:grid-cols-2 md:gap-20">
                    <figure className="border-t border-brand-gold/30 pt-8">
                        <blockquote className="text-xl leading-relaxed text-brand-white/85 md:text-2xl">“The designer personally caters to all his clients. The entire staff was very patient and attentive, making me feel extremely comfortable.”</blockquote>
                        <figcaption className="mt-7 text-xs uppercase leading-6 tracking-[0.12em] text-brand-gold">Viraj Belgaonkar · Google Review</figcaption>
                    </figure>
                    <figure className="border-t border-brand-gold/30 pt-8">
                        <blockquote className="text-xl leading-relaxed text-brand-white/85 md:text-2xl">“I knew you would absolutely nail it, but you ended up over delivering and how. Thanks for being a part of my big day.”</blockquote>
                        <figcaption className="mt-7 text-xs uppercase leading-6 tracking-[0.12em] text-brand-gold">Rohan Kurup · Wedding Client</figcaption>
                    </figure>
                </div>
            </div>
        </section>
    );
}

export function CommissionInvitation() {
    return (
        <section id="commission" aria-labelledby="commission-title" className="grid scroll-mt-20 bg-[#302a29] md:min-h-[90svh] md:grid-cols-2">
            <div className="relative min-h-[65svh] md:min-h-[90svh]">
                <Image src="/images/edited/edited-3.jpg" alt="A rust-coloured bespoke suit at the Adityavardhan atelier" fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover object-top" />
            </div>
            <div className="flex flex-col justify-center px-6 py-20 md:px-12 lg:px-20">
                <p className="editorial-label">Begin a Commission</p>
                <h2 id="commission-title" className="editorial-heading mt-6">Tell us what you are dressing for.</h2>
                <p className="editorial-body mt-8 max-w-md">Bring us a precise idea, or simply the feeling that what you have found is not quite you. Either is enough to have a conversation.</p>
                <Link href="/appointment" className="editorial-link mt-9 self-start">Request an Appointment <span aria-hidden="true">↗</span></Link>
                <p className="mt-8 text-xs text-brand-white/55">By appointment in Kala Ghoda, Mumbai</p>
            </div>
        </section>
    );
}
