const distinctions = [
    {
        title: "A fit that is yours alone.",
        body: "Drawn from more than thirty measurements and refined through successive fittings, a bespoke garment moves with your body, not against it. No alteration of an off-the-rack piece can replicate a pattern that was drafted, from the beginning, around your frame.",
    },
    {
        title: "Materials chosen, never sourced in bulk.",
        body: "From Italian superfine wools and English worsteds to handwoven Banarasi silks, rare tissues, and pure zari thread, every fabric is selected for the individual piece and the individual wearer.",
    },
    {
        title: "A garment built to outlast trends.",
        body: "With full canvas construction, reinforced hand-stitching, and finishing a machine cannot perform, a true bespoke piece is not consumed. It is worn, repaired, re-fitted, and ultimately inherited.",
    },
];

export function WhyBespoke() {
    return (
        <section className="relative z-10 bg-brand-black py-24 md:py-32">
            <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-[0.85fr_1.15fr] md:px-12">
                <div>
                    <p className="font-heading text-xs tracking-[0.4em] text-brand-gold">
                        An Education in Craft
                    </p>
                    <h2 className="mt-4 font-heading text-3xl font-bold tracking-[0.08em] text-brand-white md:text-5xl">
                        Beyond Designer
                    </h2>
                </div>

                <div className="space-y-8 font-body text-sm font-book leading-relaxed text-brand-white/65 md:text-base">
                    <p>
                        A designer garment is made for an idea of a person. A bespoke garment is made for you, and only you.
                    </p>
                    <p>
                        Where ready-to-wear, even the most premium luxury tier, is cut from a standardised pattern and assembled largely by machine, every Adityavardhan ensemble begins as a pattern drafted to your, and only your measurements. Canvases are pad-stitched by hand. Buttonholes are cut and finished in silk thread. Each motif of zardozi, aari, dabka, and resham is set stitch by stitch, often across hundreds, sometimes thousands of hours by artisans whose families have practised these crafts for generations.
                    </p>
                    <p className="font-demi text-brand-white">
                        The difference reveals itself in three ways:
                    </p>
                    <div className="space-y-6">
                        {distinctions.map((item) => (
                            <div key={item.title} className="border-t border-brand-white/10 pt-5">
                                <p className="font-demi text-brand-gold">{item.title}</p>
                                <p className="mt-2">{item.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
