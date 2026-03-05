import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/layout/PageTransition";

const avantGarde = localFont({
    src: [
        { path: "../../Fonts/ITCAvantGardeStd-XLt.otf", weight: "200", style: "normal" },
        { path: "../../Fonts/ITCAvantGardeStd-Bk.otf", weight: "300", style: "normal" },
        { path: "../../Fonts/ITCAvantGardeStd-Md.otf", weight: "500", style: "normal" },
        { path: "../../Fonts/ITCAvantGardeStd-Demi.otf", weight: "600", style: "normal" },
        { path: "../../Fonts/ITCAvantGardeStd-Bold.otf", weight: "700", style: "normal" },
        { path: "../../Fonts/ITCAvantGardeStd-XLtObl.otf", weight: "200", style: "italic" },
        { path: "../../Fonts/ITCAvantGardeStd-BkObl.otf", weight: "300", style: "italic" },
        { path: "../../Fonts/ITCAvantGardeStd-MdObl.otf", weight: "500", style: "italic" },
        { path: "../../Fonts/ITCAvantGardeStd-DemiObl.otf", weight: "600", style: "italic" },
        { path: "../../Fonts/ITCAvantGardeStd-BoldObl.otf", weight: "700", style: "italic" },
    ],
    variable: "--font-avant-garde",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Premium Fashion Atelier",
    description:
        "Where timeless elegance meets contemporary design.",
    keywords: ["fashion", "premium", "luxury", "bespoke", "tailoring"],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={avantGarde.variable}>
            <body>
                <Navbar />
                <PageTransition>{children}</PageTransition>
                <Footer />
            </body>
        </html>
    );
}
