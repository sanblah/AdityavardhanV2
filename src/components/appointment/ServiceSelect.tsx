"use client";

const services = [
    {
        id: "consultation",
        title: "Initial Consultation",
        description: "Discuss your style, occasion, and preferences with our expert tailors.",
    },
    {
        id: "fabric",
        title: "Fabric Selection",
        description: "Explore our curated library of premium fabrics from around the world.",
    },
    {
        id: "trial",
        title: "Trial Fitting",
        description: "Experience the evolving garment on your body with guided adjustments.",
    },
    {
        id: "alteration",
        title: "Alterations",
        description: "Fine-tune an existing garment for a renewed, perfect fit.",
    },
    {
        id: "final",
        title: "Final Fitting",
        description: "The last review before your bespoke creation is complete.",
    },
];

interface ServiceSelectProps {
    selected: string | null;
    onSelect: (id: string) => void;
}

export function ServiceSelect({ selected, onSelect }: ServiceSelectProps) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
                <button
                    key={service.id}
                    onClick={() => onSelect(service.id)}
                    className={`group p-6 text-left transition-all duration-300 border ${
                        selected === service.id
                            ? "border-brand-gold bg-brand-gold/10"
                            : "border-brand-white/10 bg-transparent hover:border-brand-white/20"
                    }`}
                >
                    <h3
                        className={`font-heading text-sm font-bold uppercase tracking-[0.1em] ${
                            selected === service.id ? "text-brand-gold" : "text-brand-white"
                        }`}
                    >
                        {service.title}
                    </h3>
                    <p className="mt-2 font-body text-xs font-book leading-relaxed text-brand-white/50">
                        {service.description}
                    </p>
                </button>
            ))}
        </div>
    );
}
