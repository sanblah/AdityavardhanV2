import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { ProcessTimeline } from "@/components/bespoke/ProcessTimeline";
import { PracticeIntroduction, Craftsmanship, SelectedCommissions, Atelier, CommissionInvitation } from "@/components/home/EditorialSections";
import { homepageProcess } from "@/components/home/homepage-content";

export const metadata: Metadata = {
    title: "Adityavardhan | True Bespoke Menswear Atelier, Mumbai",
    description: "True bespoke suits, contemporary menswear, sherwanis, bandhgalas and one-of-one ceremonial commissions, designed at the Adityavardhan atelier in Kala Ghoda, Mumbai.",
};

export default function Home() {
    return (
        <main id="main-content" className="relative">
            <Hero />
            <section id="practice" aria-label="The Practice" className="scroll-mt-20">
                <PracticeIntroduction />
                <ProcessTimeline steps={homepageProcess} eyebrow="Then we begin to draw" />
            </section>
            <Craftsmanship />
            <SelectedCommissions />
            <Atelier />
            <CommissionInvitation />
        </main>
    );
}
