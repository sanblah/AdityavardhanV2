import { JournalGrid } from "@/components/journal/JournalGrid";

export const metadata = {
    title: "Journal | Premium Fashion Atelier",
    description: "Explore the lookbook, behind-the-scenes stories, and fabric journals.",
};

export default function JournalPage() {
    return (
        <main className="relative min-h-screen bg-brand-black pt-32">
            {/* Hero Header */}
            <div className="mx-auto max-w-4xl px-6 text-center">
                <p className="font-heading text-xs uppercase tracking-[0.4em] text-brand-gold">
                    Stories & Lookbook
                </p>
                <h1 className="mt-4 font-logo text-[clamp(2rem,6vw,4rem)] uppercase tracking-[0.15em] text-brand-white">
                    The Journal
                </h1>
                <p className="mt-4 font-body text-sm font-book text-brand-white/50">
                    A curated visual narrative of craft, fabric, and the art of dressing well.
                </p>
            </div>

            <JournalGrid />
        </main>
    );
}
