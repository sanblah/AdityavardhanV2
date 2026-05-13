import { LookbookGallery } from "@/components/lookbook/LookbookGallery";

export const metadata = {
    title: "Lookbook | ADITYAVARDHAN",
    description: "Discover the craftsmanship of Adityavardhan's bespoke collections — from ceremonial ensembles to refined everyday wear.",
};

export default function LookbookPage() {
    return (
        <main className="relative min-h-screen bg-brand-black pt-32">
            <section className="mx-auto max-w-5xl px-6 text-center">
                <h1 className="font-logo text-[clamp(2rem,6vw,4.5rem)] tracking-[0.1em] text-brand-white">
                    True Bespoke Craftsmanship
                </h1>
            </section>

            <LookbookGallery />
        </main>
    );
}
