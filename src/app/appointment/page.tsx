import { BookingFlow } from "@/components/appointment/BookingFlow";

export const metadata = {
    title: "Book Appointment | ADITYAVARDHAN",
    description: "Schedule your bespoke tailoring consultation at AdityaVardhan.",
};

export default function AppointmentPage() {
    return (
        <main className="relative min-h-screen bg-brand-black pt-32">
            {/* Hero Header */}
            <div className="mx-auto max-w-4xl px-6 text-center">
                <p className="font-heading text-xs uppercase tracking-[0.4em] text-brand-gold">
                    Your First Step
                </p>
                <h1 className="mt-4 font-logo text-[clamp(2rem,6vw,4rem)] uppercase tracking-[0.15em] text-brand-white">
                    Book Your Initial Fitting
                </h1>
                <p className="mt-4 font-body text-sm font-book text-brand-white/50">
                    Schedule a personal consultation with our master tailors to discuss your style, take measurements, and begin your bespoke journey.
                </p>
            </div>

            <BookingFlow />
        </main>
    );
}
