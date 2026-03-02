"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { DrawLineLink } from "./DrawLineLink";
import { useIsMobile } from "@/hooks/useIsMobile";

const images = [
    "/images/parallax/parallax-3.jpg",
    "/images/parallax/parallax-9.jpg",
    "/images/parallax/parallax-11.jpg",
    "/images/parallax/parallax-1.jpg",
    "/images/parallax/parallax-15.jpg",
    "/images/parallax/parallax-19.jpg",
    "/images/parallax/parallax-22.jpg",
    "/images/parallax/parallax-13.jpg",
];

// Scattered card positions — spread out to avoid overlap
const cardPositions = [
    { x: -30, y: -26, z: 0.2, rotate: -4, w: 280, h: 370 },
    { x: 4, y: -30, z: 0.7, rotate: 3, w: 260, h: 350 },
    { x: 32, y: -22, z: 0.4, rotate: -2, w: 270, h: 360 },
    { x: -33, y: 6, z: 0.6, rotate: 5, w: 265, h: 355 },
    { x: 33, y: 10, z: 0.3, rotate: -3, w: 275, h: 365 },
    { x: -28, y: 28, z: 0.5, rotate: 3, w: 260, h: 345 },
    { x: 5, y: 30, z: 0.8, rotate: -5, w: 255, h: 340 },
    { x: 30, y: 30, z: 0.15, rotate: 2, w: 270, h: 360 },
];

interface ParallaxCardsProps {
    perspective?: number;
    mouseSensitivity?: number;
    enableDepthFog?: boolean;
    fogIntensity?: number;
}

export function ParallaxCards({
    perspective = 2500,
    mouseSensitivity = 3,
    enableDepthFog = false,
    fogIntensity = 1,
}: ParallaxCardsProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const targetMouse = useRef({ x: 0, y: 0 });
    const animFrame = useRef<number>(0);
    const isMobile = useIsMobile();

    // Sensitivity reduced on mobile for lighter touch interaction
    const effectiveSensitivity = isMobile ? mouseSensitivity * 0.4 : mouseSensitivity;

    useEffect(() => {
        const animate = () => {
            setMouse((prev) => ({
                x: prev.x + (targetMouse.current.x - prev.x) * 0.08,
                y: prev.y + (targetMouse.current.y - prev.y) * 0.08,
            }));
            animFrame.current = requestAnimationFrame(animate);
        };
        animFrame.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animFrame.current);
    }, []);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        targetMouse.current = {
            x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
            y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
        };
    }, []);

    const handleMouseLeave = useCallback(() => {
        targetMouse.current = { x: 0, y: 0 };
    }, []);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        if (!containerRef.current) return;
        const touch = e.touches[0];
        const rect = containerRef.current.getBoundingClientRect();
        targetMouse.current = {
            x: ((touch.clientX - rect.left) / rect.width - 0.5) * 2,
            y: ((touch.clientY - rect.top) / rect.height - 0.5) * 2,
        };
    }, []);

    const handleTouchEnd = useCallback(() => {
        targetMouse.current = { x: 0, y: 0 };
    }, []);

    const handleCardClick = useCallback((index: number) => {
        setSelectedIndex((prev) => (prev === index ? null : index));
    }, []);

    const handleBackdropClick = useCallback(() => {
        setSelectedIndex(null);
    }, []);

    // Card scale factor on mobile
    const cardScale = isMobile ? 0.55 : 1;

    return (
        <section
            id="lookbook"
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative z-20 overflow-hidden bg-brand-black"
            style={{ height: isMobile ? "100vh" : "130vh" }}
        >
            {/* Section Header */}
            <div className="absolute left-0 right-0 top-12 z-10 text-center">
                <h2 className="font-heading text-xs font-bold uppercase tracking-[0.5em] text-brand-gold">
                    Lookbook
                </h2>
                <DrawLineLink className="mt-3 text-brand-gold" strokeWidth={18}>
                    <span className="font-heading text-2xl font-bold uppercase tracking-[0.2em] text-brand-white md:text-4xl">
                        The Collection
                    </span>
                </DrawLineLink>
                <p className="mx-auto mt-4 max-w-md font-body text-sm text-brand-white/50">
                    {isMobile
                        ? "Tap a card to explore each piece"
                        : "Move your cursor to explore each piece in depth"}
                </p>
            </div>

            {/* Backdrop for dismissing selected card */}
            {selectedIndex !== null && (
                <div
                    className="absolute inset-0 z-30"
                    onClick={handleBackdropClick}
                />
            )}

            {/* 3D Scene */}
            <div
                className="relative flex h-full w-full items-center justify-center"
                style={{ perspective: `${perspective}px` }}
            >
                <div
                    className="relative h-full w-full"
                    style={{
                        transformStyle: "preserve-3d",
                        transform: `rotateY(${mouse.x * effectiveSensitivity * 0.8}deg) rotateX(${-mouse.y * effectiveSensitivity * 0.8}deg)`,
                    }}
                >
                    {images.map((src, index) => {
                        const pos = cardPositions[index];
                        const isSelected = selectedIndex === index;
                        const anotherIsSelected = selectedIndex !== null && selectedIndex !== index;

                        const parallaxX = mouse.x * pos.z * effectiveSensitivity * 40;
                        const parallaxY = mouse.y * pos.z * effectiveSensitivity * 40;
                        const zTranslate = pos.z * -400;

                        const fogOpacity = enableDepthFog ? 1 - pos.z * 0.5 * fogIntensity : 1;
                        const fogBlur = enableDepthFog ? pos.z * 2 * fogIntensity : 0;

                        const finalOpacity = anotherIsSelected ? 0.25 : fogOpacity;
                        const finalScale = isSelected
                            ? (isMobile ? 1.4 : 1.8)
                            : anotherIsSelected ? 0.85 : 1;

                        return (
                            <div
                                key={src}
                                className="absolute left-1/2 top-1/2 cursor-pointer"
                                onClick={() => handleCardClick(index)}
                                style={{
                                    width: `${pos.w * cardScale}px`,
                                    height: `${pos.h * cardScale}px`,
                                    transform: isSelected
                                        ? `translate(-50%, -50%) translate3d(0px, 0px, 200px) rotate(0deg) scale(${finalScale})`
                                        : `translate(-50%, -50%) translate3d(calc(${pos.x}cqw + ${parallaxX}px), calc(${pos.y}cqh + ${parallaxY}px), ${zTranslate}px) rotate(${pos.rotate}deg) scale(${finalScale})`,
                                    opacity: finalOpacity,
                                    filter: fogBlur > 0 && !isSelected ? `blur(${fogBlur}px)` : "none",
                                    transformStyle: "preserve-3d",
                                    zIndex: isSelected ? 50 : Math.round((1 - pos.z) * 10),
                                    transition: isSelected
                                        ? "transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.4s ease, z-index 0s"
                                        : "transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.4s ease, z-index 0s 0.6s",
                                }}
                            >
                                <div
                                    className="relative h-full w-full overflow-hidden rounded-lg"
                                    style={{
                                        boxShadow: isSelected
                                            ? "0 40px 100px rgba(0,0,0,0.7), 0 0 60px rgba(161,132,108,0.25)"
                                            : "0 15px 30px rgba(0,0,0,0.4)",
                                        transition: "box-shadow 0.6s ease",
                                    }}
                                >
                                    <Image
                                        src={src}
                                        alt={`Collection piece ${index + 1}`}
                                        fill
                                        sizes="300px"
                                        className="object-cover"
                                    />
                                    <div
                                        className="absolute inset-0 rounded-lg border"
                                        style={{
                                            borderColor: isSelected ? "rgba(161,132,108,0.5)" : "rgba(255,255,255,0.1)",
                                            transition: "border-color 0.6s ease",
                                        }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
