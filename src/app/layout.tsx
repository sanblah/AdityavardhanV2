import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/layout/PageTransition";

const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-playfair",
    display: "swap",
});

export const metadata: Metadata = {
    title: "ADITYAVARDHAN | Premium Fashion",
    description:
        "Discover the world of AdityaVardhan - Where timeless elegance meets contemporary design.",
    keywords: ["fashion", "premium", "luxury", "AdityaVardhan", "bespoke", "tailoring"],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={playfair.variable}>
            <body>
                <Navbar />
                <PageTransition>{children}</PageTransition>
                <Footer />
            </body>
        </html>
    );
}
