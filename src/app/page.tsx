import dynamic from "next/dynamic";
import { Hero } from "@/components/Hero";
import { VideoBackground } from "@/components/VideoBackground";

const ParallaxGallery = dynamic(() =>
    import("@/components/ParallaxGallery").then((m) => ({ default: m.ParallaxGallery }))
);
const ParallaxCards = dynamic(() =>
    import("@/components/ParallaxCards").then((m) => ({ default: m.ParallaxCards }))
);
const Testimonials = dynamic(() =>
    import("@/components/Testimonials").then((m) => ({ default: m.Testimonials }))
);

export default function Home() {
    return (
        <main className="relative">
            {/* Fixed Video Background - visible behind Hero and About */}
            <VideoBackground />

            <Hero />
            {/* Collection has solid background - no video visible */}
            <ParallaxGallery />
            {/* 3D Parallax Cards Lookbook */}
            <ParallaxCards />
            {/* Client Testimonials */}
            <Testimonials />
        </main>
    );
}
