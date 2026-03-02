"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DetailsFormProps {
    onSubmit: () => void;
}

export function DetailsForm({ onSubmit }: DetailsFormProps) {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        onSubmit();
    };

    return (
        <AnimatePresence mode="wait">
            {!submitted ? (
                <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="mx-auto max-w-lg space-y-8"
                >
                    <div>
                        <label className="block font-heading text-xs uppercase tracking-[0.2em] text-brand-white/50">
                            Full Name
                        </label>
                        <input
                            type="text"
                            required
                            className="mt-2 w-full border-b border-brand-white/20 bg-transparent pb-3 font-body text-base text-brand-white outline-none transition-colors focus:border-brand-gold"
                            placeholder="Your full name"
                        />
                    </div>
                    <div>
                        <label className="block font-heading text-xs uppercase tracking-[0.2em] text-brand-white/50">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            className="mt-2 w-full border-b border-brand-white/20 bg-transparent pb-3 font-body text-base text-brand-white outline-none transition-colors focus:border-brand-gold"
                            placeholder="your@email.com"
                        />
                    </div>
                    <div>
                        <label className="block font-heading text-xs uppercase tracking-[0.2em] text-brand-white/50">
                            Phone
                        </label>
                        <input
                            type="tel"
                            className="mt-2 w-full border-b border-brand-white/20 bg-transparent pb-3 font-body text-base text-brand-white outline-none transition-colors focus:border-brand-gold"
                            placeholder="+91 XXXXX XXXXX"
                        />
                    </div>
                    <div>
                        <label className="block font-heading text-xs uppercase tracking-[0.2em] text-brand-white/50">
                            Preferences & Requests
                        </label>
                        <textarea
                            rows={3}
                            className="mt-2 w-full resize-none border-b border-brand-white/20 bg-transparent pb-3 font-body text-base text-brand-white outline-none transition-colors focus:border-brand-gold"
                            placeholder="Tell us about your vision..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-4 w-full border border-brand-gold bg-transparent py-4 font-heading text-xs uppercase tracking-[0.25em] text-brand-gold transition-all duration-500 hover:bg-brand-gold hover:text-brand-black"
                    >
                        Confirm Appointment
                    </button>
                </motion.form>
            ) : (
                <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mx-auto max-w-lg py-16 text-center"
                >
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-brand-gold">
                        <svg
                            className="h-8 w-8 text-brand-gold"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="font-heading text-2xl font-bold uppercase tracking-[0.1em] text-brand-white">
                        Appointment Confirmed
                    </h3>
                    <p className="mt-4 font-body text-sm font-book text-brand-white/60">
                        We&apos;ll be in touch shortly to confirm the details. We look forward to welcoming you.
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
