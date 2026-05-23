"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
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

const imageSizes = [
    { width: 2560, height: 3838 },
    { width: 2560, height: 3840 },
    { width: 2560, height: 3313 },
    { width: 2560, height: 3838 },
    { width: 2560, height: 1707 },
    { width: 2560, height: 3838 },
    { width: 2560, height: 3838 },
    { width: 2560, height: 3313 },
];

// Evenly-spaced 4×2 grid in container-query units. Same z for every card so
// they sit on one plane (no overlap, no depth jitter). Subtle rotation per
// card adds character without breaking the symmetry.
const COLS = [-36, -12, 12, 36];
const ROWS = [-22, 22];
const ROTATIONS = [-3, 2, -2, 3, 3, -3, 2, -2];

const cardPositions = images.map((_, i) => ({
    x: COLS[i % 4],
    y: ROWS[Math.floor(i / 4)],
    z: 0.4,
    rotate: ROTATIONS[i],
    w: 240,
    h: 320,
}));

interface ParallaxCardsProps {
    perspective?: number;
    mouseSensitivity?: number;
}

export function ParallaxCards({
    perspective = 2500,
    mouseSensitivity = 2,
}: ParallaxCardsProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const targetMouse = useRef({ x: 0, y: 0 });
    const animFrame = useRef<number>(0);
    const isMobile = useIsMobile();

    const effectiveSensitivity = isMobile ? mouseSensitivity * 0.4 : mouseSensitivity;

    useEffect(() => {
        const animate = () => {
            setMouse((prev) => {
                const nx = prev.x + (targetMouse.current.x - prev.x) * 0.08;
                const ny = prev.y + (targetMouse.current.y - prev.y) * 0.08;
                if (Math.abs(nx - prev.x) < 0.0005 && Math.abs(ny - prev.y) < 0.0005) {
                    return prev;
                }
                return { x: nx, y: ny };
            });
            animFrame.current = requestAnimationFrame(animate);
        };
        animFrame.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animFrame.current);
    }, []);

    // ESC closes the lightbox; body scroll locks while it's open.
    useEffect(() => {
        if (lightboxIndex === null) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setLightboxIndex(null);
        };
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [lightboxIndex]);

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

    const openLightbox = useCallback((index: number) => {
        setLightboxIndex(index);
    }, []);

    const closeLightbox = useCallback(() => {
        setLightboxIndex(null);
    }, []);

    const selectedImageSize = lightboxIndex === null ? null : imageSizes[lightboxIndex];
    const selectedImageRatio = selectedImageSize
        ? selectedImageSize.width / selectedImageSize.height
        : 1;
    const cardScale = isMobile ? 0.6 : 1;

    return (
        <section
            id="lookbook"
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative z-20 flex flex-col overflow-hidden bg-brand-black"
            style={{ height: isMobile ? "100vh" : "120vh" }}
        >
            {/* Header */}
            <div className="relative z-40 flex-shrink-0 px-6 pt-24 pb-4 text-center md:pt-28">
                <h2 className="font-heading text-xs font-bold tracking-[0.5em] text-brand-gold">
                    Lookbook
                </h2>
                <DrawLineLink className="mt-3 text-brand-gold" strokeWidth={18}>
                    <span className="font-heading text-2xl font-bold tracking-[0.12em] text-brand-white md:text-4xl">
                        Muses &amp; Masterpieces
                    </span>
                </DrawLineLink>
                <p className="mx-auto mt-4 max-w-md font-body text-sm text-brand-white/50">
                    {isMobile
                        ? "Tap a piece to view it in full"
                        : "Hover to drift the scene · click any piece to view it in full"}
                </p>
            </div>

            {/* 3D Scene */}
            <div
                className="relative z-30 flex w-full flex-1 items-center justify-center"
                style={{
                    containerType: "size",
                    perspective: `${perspective}px`,
                }}
            >
                <div
                    className="relative h-full w-full"
                    style={{
                        transformStyle: "preserve-3d",
                        transform: `rotateY(${mouse.x * effectiveSensitivity * 0.6}deg) rotateX(${-mouse.y * effectiveSensitivity * 0.6}deg)`,
                        transition: "transform 0.1s linear",
                    }}
                >
                    {images.map((src, index) => {
                        const pos = cardPositions[index];
                        const parallaxX = mouse.x * pos.z * effectiveSensitivity * 30;
                        const parallaxY = mouse.y * pos.z * effectiveSensitivity * 30;

                        return (
                            <button
                                key={src}
                                type="button"
                                onClick={() => openLightbox(index)}
                                aria-label={`View piece ${index + 1} in full`}
                                className="absolute left-1/2 top-1/2 cursor-pointer rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                                style={{
                                    width: `${pos.w * cardScale}px`,
                                    height: `${pos.h * cardScale}px`,
                                    transform: `translate(-50%, -50%) translate3d(calc(${pos.x}cqw + ${parallaxX}px), calc(${pos.y}cqh + ${parallaxY}px), 0px) rotate(${pos.rotate}deg)`,
                                    transformStyle: "preserve-3d",
                                    transition: "transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
                                    padding: 0,
                                    border: "none",
                                    background: "transparent",
                                }}
                            >
                                <div
                                    className="relative h-full w-full overflow-hidden rounded-lg transition-transform duration-500 hover:scale-[1.04]"
                                    style={{
                                        boxShadow: "0 18px 36px rgba(0,0,0,0.45)",
                                    }}
                                >
                                    <Image
                                        src={src}
                                        alt={`Collection piece ${index + 1}`}
                                        fill
                                        sizes="240px"
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 rounded-lg border border-brand-white/10" />
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <motion.div
                        key="lightbox"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={closeLightbox}
                        className="fixed inset-0 z-[80] flex items-center justify-center bg-brand-black/90 backdrop-blur-md px-4 py-10"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Lookbook image viewer"
                    >
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                closeLightbox();
                            }}
                            aria-label="Close"
                            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-brand-white/30 text-brand-white/80 transition hover:border-brand-gold hover:text-brand-gold"
                        >
                            <span aria-hidden className="text-lg leading-none">&times;</span>
                        </button>

                        <motion.div
                            initial={{ scale: 0.92, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.96, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-h-[85vh] max-w-[90vw]"
                            style={{
                                aspectRatio: selectedImageSize
                                    ? `${selectedImageSize.width} / ${selectedImageSize.height}`
                                    : undefined,
                                width: `min(90vw, calc(85vh * ${selectedImageRatio}))`,
                            }}
                        >
                            <Image
                                src={images[lightboxIndex]}
                                alt={`Collection piece ${lightboxIndex + 1}`}
                                fill
                                sizes="90vw"
                                className="object-contain"
                                priority
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
