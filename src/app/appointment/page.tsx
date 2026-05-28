import { BookingFlow } from "@/components/appointment/BookingFlow";

export const metadata = {
    title: "Book Appointment | Premium Fashion Atelier",
    description: "Schedule your bespoke tailoring consultation at our atelier.",
};

export default function AppointmentPage() {
    return (
        <main className="relative min-h-screen bg-brand-black pt-28 md:pt-32">
            {/* Hero Header */}
            <div className="mx-auto max-w-4xl px-5 text-center md:px-6">
                <h1 className="font-logo text-[clamp(2rem,6vw,4rem)] uppercase tracking-[0.1em] text-brand-white">
                    Come home, settle in, dress up
                </h1>
                <p className="mx-auto mt-4 max-w-2xl font-body text-sm font-book leading-relaxed text-brand-white/55 md:text-base">
                    Come begin your journey, embrace elevated design and let us handcraft your dreams upon you
                </p>
            </div>

            <BookingFlow />
        </main>
    );
}
