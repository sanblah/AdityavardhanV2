import { Hero } from "@/components/Hero";
import { ParallaxGallery } from "@/components/ParallaxGallery";
import { ParallaxCards } from "@/components/ParallaxCards";
import { About } from "@/components/About";
import { Testimonials } from "@/components/Testimonials";
import { VideoBackground } from "@/components/VideoBackground";

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
            {/* About has transparent bg - video visible behind glass cards */}
            <About />
            {/* Client Testimonials */}
            <Testimonials />
        </main>
    );
}
