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
    const sceneRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
    const pointerStateRef = useRef({
        currentX: 0,
        currentY: 0,
        targetX: 0,
        targetY: 0,
        rafId: 0,
    });
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const isMobile = useIsMobile();

    // Sensitivity reduced on mobile for lighter touch interaction
    const effectiveSensitivity = isMobile ? mouseSensitivity * 0.4 : mouseSensitivity;
    const cardScale = isMobile ? 0.55 : 1;

    const applyTransforms = useCallback(
        (mouseX: number, mouseY: number) => {
            if (sceneRef.current) {
                sceneRef.current.style.transform = `rotateY(${mouseX * effectiveSensitivity * 0.8}deg) rotateX(${-mouseY * effectiveSensitivity * 0.8}deg)`;
            }

            images.forEach((src, index) => {
                const card = cardRefs.current[index];
                if (!card) return;

                const pos = cardPositions[index];
                const isSelected = selectedIndex === index;
                const anotherIsSelected = selectedIndex !== null && selectedIndex !== index;
                const parallaxX = mouseX * pos.z * effectiveSensitivity * 40;
                const parallaxY = mouseY * pos.z * effectiveSensitivity * 40;
                const zTranslate = pos.z * -400;
                const fogOpacity = enableDepthFog ? 1 - pos.z * 0.5 * fogIntensity : 1;
                const fogBlur = enableDepthFog ? pos.z * 2 * fogIntensity : 0;
                const finalOpacity = anotherIsSelected ? 0.25 : fogOpacity;
                const finalScale = isSelected
                    ? (isMobile ? 1.4 : 1.8)
                    : anotherIsSelected ? 0.85 : 1;

                card.style.transform = isSelected
                    ? `translate(-50%, -50%) translate3d(0px, 0px, 200px) rotate(0deg) scale(${finalScale})`
                    : `translate(-50%, -50%) translate3d(calc(${pos.x}cqw + ${parallaxX}px), calc(${pos.y}cqh + ${parallaxY}px), ${zTranslate}px) rotate(${pos.rotate}deg) scale(${finalScale})`;
                card.style.opacity = `${finalOpacity}`;
                card.style.filter = fogBlur > 0 && !isSelected ? `blur(${fogBlur}px)` : "none";
                card.style.zIndex = `${isSelected ? 50 : Math.round((1 - pos.z) * 10)}`;
            });
        },
        [effectiveSensitivity, enableDepthFog, fogIntensity, isMobile, selectedIndex]
    );

    const animatePointer = useCallback(function runPointerAnimation() {
        const pointer = pointerStateRef.current;
        pointer.currentX += (pointer.targetX - pointer.currentX) * 0.08;
        pointer.currentY += (pointer.targetY - pointer.currentY) * 0.08;

        applyTransforms(pointer.currentX, pointer.currentY);

        const deltaX = Math.abs(pointer.targetX - pointer.currentX);
        const deltaY = Math.abs(pointer.targetY - pointer.currentY);
        if (deltaX > 0.01 || deltaY > 0.01) {
            pointer.rafId = window.requestAnimationFrame(runPointerAnimation);
            return;
        }

        pointer.currentX = pointer.targetX;
        pointer.currentY = pointer.targetY;
        applyTransforms(pointer.currentX, pointer.currentY);
        pointer.rafId = 0;
    }, [applyTransforms]);

    const queuePointerAnimation = useCallback(() => {
        if (pointerStateRef.current.rafId !== 0) return;
        pointerStateRef.current.rafId = window.requestAnimationFrame(animatePointer);
    }, [animatePointer]);

    useEffect(() => {
        const pointer = pointerStateRef.current;

        applyTransforms(pointer.currentX, pointer.currentY);

        return () => {
            if (pointer.rafId !== 0) {
                window.cancelAnimationFrame(pointer.rafId);
                pointer.rafId = 0;
            }
        };
    }, [applyTransforms]);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        pointerStateRef.current.targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        pointerStateRef.current.targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        queuePointerAnimation();
    }, [queuePointerAnimation]);

    const handleMouseLeave = useCallback(() => {
        pointerStateRef.current.targetX = 0;
        pointerStateRef.current.targetY = 0;
        queuePointerAnimation();
    }, [queuePointerAnimation]);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        if (!containerRef.current) return;
        const touch = e.touches[0];
        const rect = containerRef.current.getBoundingClientRect();
        pointerStateRef.current.targetX = ((touch.clientX - rect.left) / rect.width - 0.5) * 2;
        pointerStateRef.current.targetY = ((touch.clientY - rect.top) / rect.height - 0.5) * 2;
        queuePointerAnimation();
    }, [queuePointerAnimation]);

    const handleTouchEnd = useCallback(() => {
        pointerStateRef.current.targetX = 0;
        pointerStateRef.current.targetY = 0;
        queuePointerAnimation();
    }, [queuePointerAnimation]);

    const handleCardClick = useCallback((index: number) => {
        setSelectedIndex((prev) => (prev === index ? null : index));
    }, []);

    const handleBackdropClick = useCallback(() => {
        setSelectedIndex(null);
    }, []);

    return (
        <section
            id="lookbook"
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={selectedIndex !== null ? handleBackdropClick : undefined}
            className="relative z-20 overflow-hidden bg-brand-black"
            style={{ height: isMobile ? "100vh" : "130vh" }}
        >
            {/* Section Header */}
            <div className="absolute left-0 right-0 top-12 z-10 text-center">
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
                        ? "Tap a card to explore each piece"
                        : "Move your cursor to explore each piece in depth"}
                </p>
            </div>

            {selectedIndex !== null && (
                <div className="pointer-events-none absolute inset-0 z-20 bg-brand-black/35 backdrop-blur-sm" />
            )}

            {/* 3D Scene */}
            <div
                className="relative z-30 flex h-full w-full items-center justify-center"
                style={{ perspective: `${perspective}px` }}
            >
                <div
                    ref={sceneRef}
                    className="relative h-full w-full"
                    style={{
                        transformStyle: "preserve-3d",
                    }}
                >
                    {images.map((src, index) => {
                        const pos = cardPositions[index];
                        const isSelected = selectedIndex === index;

                        return (
                            <div
                                key={src}
                                ref={(node) => {
                                    cardRefs.current[index] = node;
                                }}
                                className="absolute left-1/2 top-1/2 cursor-pointer"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    handleCardClick(index);
                                }}
                                role="button"
                                tabIndex={0}
                                aria-expanded={isSelected}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter" || event.key === " ") {
                                        event.preventDefault();
                                        handleCardClick(index);
                                    }
                                }}
                                style={{
                                    width: `${pos.w * cardScale}px`,
                                    height: `${pos.h * cardScale}px`,
                                    transformStyle: "preserve-3d",
                                    transition: isSelected
                                        ? "transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.4s ease, z-index 0s"
                                        : "transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.4s ease, z-index 0s 0.6s",
                                    willChange: "transform, opacity",
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
