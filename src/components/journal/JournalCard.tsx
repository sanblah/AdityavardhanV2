"use client";

import Image from "next/image";

interface JournalCardProps {
    image: string;
    title: string;
    category: string;
    height?: "tall" | "medium" | "short";
}

export function JournalCard({ image, title, category, height = "medium" }: JournalCardProps) {
    const heightClass =
        height === "tall"
            ? "h-[350px] md:h-[500px]"
            : height === "short"
            ? "h-[200px] md:h-[280px]"
            : "h-[260px] md:h-[380px]";

    return (
        <div
            className={`journal-card group relative mb-4 w-full overflow-hidden break-inside-avoid ${heightClass}`}
            style={{ opacity: 0 }}
        >
            <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            {/* Mobile: permanent bottom gradient overlay so text is always readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent md:bg-none md:transition-all md:duration-500 md:group-hover:bg-brand-black/60" />

            {/* Text: always visible on mobile (bottom), hover-reveal on desktop (center) */}
            <div className="absolute bottom-0 left-0 right-0 flex flex-col items-start p-4 md:inset-0 md:items-center md:justify-center md:opacity-0 md:transition-opacity md:duration-500 md:group-hover:opacity-100">
                <p className="font-heading text-xs uppercase tracking-[0.4em] text-brand-gold">
                    {category}
                </p>
                <h3 className="mt-1 font-heading text-sm font-bold uppercase tracking-[0.1em] text-brand-white md:mt-2 md:px-4 md:text-center md:text-lg">
                    {title}
                </h3>
            </div>
        </div>
    );
}
