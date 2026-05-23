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
                    className="mx-auto max-w-lg space-y-7"
                >
                    {/* ASVS 5.1.3 — Input length limits prevent DoS and truncation attacks */}
                    <div>
                        <label
                            htmlFor="appointment-name"
                            className="block font-heading text-xs uppercase tracking-[0.2em] text-brand-white/50"
                        >
                            Full Name
                        </label>
                        <input
                            id="appointment-name"
                            name="name"
                            type="text"
                            required
                            minLength={2}
                            maxLength={100}
                            autoComplete="name"
                            spellCheck={false}
                            className="mt-2 w-full border-b border-brand-white/20 bg-transparent pb-3 font-body text-base text-brand-white outline-none transition-colors focus:border-brand-gold"
                            placeholder="Your full name"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="appointment-email"
                            className="block font-heading text-xs uppercase tracking-[0.2em] text-brand-white/50"
                        >
                            Email Address
                        </label>
                        <input
                            id="appointment-email"
                            name="email"
                            type="email"
                            required
                            maxLength={254}         /* RFC 5321 maximum email length */
                            autoComplete="email"
                            inputMode="email"
                            spellCheck={false}
                            className="mt-2 w-full border-b border-brand-white/20 bg-transparent pb-3 font-body text-base text-brand-white outline-none transition-colors focus:border-brand-gold"
                            placeholder="your@email.com"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="appointment-phone"
                            className="block font-heading text-xs uppercase tracking-[0.2em] text-brand-white/50"
                        >
                            Phone Number
                        </label>
                        <input
                            id="appointment-phone"
                            name="phone"
                            type="tel"
                            maxLength={20}
                            autoComplete="tel"
                            inputMode="tel"
                            pattern="^[+\d\s\-().]{7,20}$"
                            title="Enter a valid phone number (digits, spaces, +, -, parentheses)"
                            className="mt-2 w-full border-b border-brand-white/20 bg-transparent pb-3 font-body text-base text-brand-white outline-none transition-colors focus:border-brand-gold"
                            placeholder="+91 XXXXX XXXXX"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="appointment-notes"
                            className="block font-heading text-xs uppercase tracking-[0.2em] text-brand-white/50"
                        >
                            Special Requests / Notes
                        </label>
                        <textarea
                            id="appointment-notes"
                            name="notes"
                            rows={3}
                            maxLength={500}
                            autoComplete="off"
                            className="mt-2 w-full resize-none border-b border-brand-white/20 bg-transparent pb-3 font-body text-base text-brand-white outline-none transition-colors focus:border-brand-gold"
                            placeholder="Any specific requirements or preferences..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-4 min-h-12 w-full border border-brand-gold bg-transparent px-4 py-4 font-heading text-xs uppercase tracking-[0.18em] text-brand-gold transition-all duration-500 hover:bg-brand-gold hover:text-brand-black"
                    >
                        Request Appointment
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
