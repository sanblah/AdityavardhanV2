// ASVS 7.4.1 — Generic error messages that do not leak implementation details
import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-brand-black px-6 text-center">
            <p className="font-heading text-xs uppercase tracking-[0.4em] text-brand-gold">
                404
            </p>
            <h1 className="mt-4 font-heading text-4xl font-book uppercase tracking-[0.12em] text-brand-white md:text-5xl">
                Page Not Found
            </h1>
            <p className="mt-6 max-w-sm font-body text-sm font-book text-brand-white/50">
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <Link
                href="/"
                className="mt-10 inline-flex min-h-12 items-center justify-center border border-brand-gold px-8 py-3 text-center font-heading text-xs uppercase tracking-[0.18em] text-brand-gold transition-all duration-500 hover:bg-brand-gold hover:text-brand-black md:px-10 md:tracking-[0.25em]"
            >
                Return Home
            </Link>
        </main>
    );
}
