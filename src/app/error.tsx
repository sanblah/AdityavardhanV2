"use client";

// ASVS 7.4.1 — Error pages must not expose stack traces, server paths,
// or any implementation detail that could aid an attacker.
import { useEffect } from "react";

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
    useEffect(() => {
        // Log to your error-monitoring service here (e.g. Sentry).
        // Never expose error.message or error.stack to the user.
        if (process.env.NODE_ENV === "development") {
            console.error("[GlobalError]", error);
        }
    }, [error]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-brand-black px-6 text-center">
            <p className="font-heading text-xs uppercase tracking-[0.4em] text-brand-gold">
                Error
            </p>
            <h1 className="mt-4 font-heading text-4xl font-bold uppercase tracking-[0.12em] text-brand-white md:text-5xl">
                Something Went Wrong
            </h1>
            <p className="mt-6 max-w-sm font-body text-sm font-book text-brand-white/50">
                An unexpected error occurred. Please try again or contact us if the
                problem persists.
            </p>
            <button
                onClick={reset}
                className="mt-10 border border-brand-gold px-10 py-3 font-heading text-xs uppercase tracking-[0.25em] text-brand-gold transition-all duration-500 hover:bg-brand-gold hover:text-brand-black"
            >
                Try Again
            </button>
        </main>
    );
}
