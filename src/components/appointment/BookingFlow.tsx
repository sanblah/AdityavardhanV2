"use client";

import { useState, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { DateTimePicker } from "./DateTimePicker";
import { DetailsForm } from "./DetailsForm";

const stepLabels = ["Date & Time", "Your Details"];

export function BookingFlow() {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const animateTransition = (next: number) => {
        if (!contentRef.current) {
            setCurrentStep(next);
            return;
        }
        gsap.to(contentRef.current, {
            opacity: 0,
            x: next > currentStep ? -30 : 30,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                setCurrentStep(next);
                gsap.fromTo(
                    contentRef.current!,
                    { opacity: 0, x: next > currentStep ? 30 : -30 },
                    { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }
                );
            },
        });
    };

    const canProceed =
        currentStep === 0 && selectedDate && selectedTime;

    return (
        <div className="mx-auto max-w-4xl px-6 py-16 md:px-12">
            {/* Progress Bar */}
            <div className="mb-16 flex items-center justify-center gap-0">
                {stepLabels.map((label, i) => (
                    <div key={label} className="flex items-center">
                        <div className="flex flex-col items-center">
                            <div
                                className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-heading transition-all duration-300 ${i <= currentStep
                                        ? "border-brand-gold bg-brand-gold text-brand-black"
                                        : "border-brand-white/20 text-brand-white/30"
                                    }`}
                            >
                                {i + 1}
                            </div>
                            <span
                                className={`mt-2 font-heading text-[10px] uppercase tracking-[0.2em] ${i <= currentStep ? "text-brand-gold" : "text-brand-white/30"
                                    }`}
                            >
                                {label}
                            </span>
                        </div>
                        {i < stepLabels.length - 1 && (
                            <div
                                className={`mx-4 h-[1px] w-16 transition-colors duration-300 ${i < currentStep ? "bg-brand-gold" : "bg-brand-white/10"
                                    }`}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Step Content */}
            <div ref={contentRef}>
                {currentStep === 0 && (
                    <DateTimePicker
                        selectedDate={selectedDate}
                        selectedTime={selectedTime}
                        onDateSelect={setSelectedDate}
                        onTimeSelect={setSelectedTime}
                    />
                )}
                {currentStep === 1 && <DetailsForm onSubmit={() => { }} />}
            </div>

            {/* Navigation */}
            {currentStep === 0 && (
                <div className="mt-12 flex items-center justify-end">
                    <button
                        onClick={() => canProceed && animateTransition(1)}
                        disabled={!canProceed}
                        className={`border px-8 py-3 font-heading text-xs uppercase tracking-[0.2em] transition-all duration-300 ${canProceed
                                ? "border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-black"
                                : "border-brand-white/10 text-brand-white/20 cursor-not-allowed"
                            }`}
                    >
                        Next →
                    </button>
                </div>
            )}
        </div>
    );
}
