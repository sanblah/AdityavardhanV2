"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function VideoBackground() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const motionLayerRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();
    const prefersReducedMotion = usePrefersReducedMotion();
    const shouldUsePosterOnly = isMobile || prefersReducedMotion;
    const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
    const [isVideoReady, setIsVideoReady] = useState(false);
    const isVideoVisible = !shouldUsePosterOnly && isVideoReady;
    const LOOP_START = 0;
    const LOOP_END = 14.5;

    useEffect(() => {
        if (shouldUsePosterOnly) return;

        const container = containerRef.current;
        if (!container) return;

        let timeoutId: ReturnType<typeof setTimeout> | null = null;
        let observer: IntersectionObserver | null = null;

        const scheduleVideoLoad = () => {
            timeoutId = setTimeout(() => {
                setShouldLoadVideo(true);
            }, isMobile ? 1200 : 700);
        };

        observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (!entry?.isIntersecting) return;
                scheduleVideoLoad();
                observer?.disconnect();
            },
            { threshold: 0.15 }
        );

        observer.observe(container);

        return () => {
            observer?.disconnect();
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [isMobile, shouldUsePosterOnly]);

    useEffect(() => {
        if (shouldUsePosterOnly) return;

        const video = videoRef.current;
        if (!video || !shouldLoadVideo) return;

        const playVideo = () => {
            const playAttempt = video.play();
            if (!playAttempt) return;

            playAttempt.catch(() => {
                video.muted = true;
                void video.play().catch(() => {});
            });
        };

        video.volume = 0;
        video.currentTime = LOOP_START;

        const handleTimeUpdate = () => {
            if (video.currentTime >= LOOP_END || video.currentTime < LOOP_START) {
                video.currentTime = LOOP_START;
            }
        };

        const handleLoadedData = () => {
            setIsVideoReady(true);
            playVideo();
        };

        video.addEventListener("timeupdate", handleTimeUpdate);
        video.addEventListener("loadeddata", handleLoadedData);

        video.load();

        if (video.readyState >= 2) {
            handleLoadedData();
        }

        return () => {
            video.removeEventListener("timeupdate", handleTimeUpdate);
            video.removeEventListener("loadeddata", handleLoadedData);
        };
    }, [shouldLoadVideo, shouldUsePosterOnly]);

    useEffect(() => {
        const layer = motionLayerRef.current;
        if (!layer) return;

        if (isMobile) {
            layer.style.transform = "scale(1.05)";
            layer.style.willChange = "auto";
            return;
        }

        let rafId = 0;
        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;

        const applyTransform = () => {
            layer.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) scale(1.15)`;
            layer.style.willChange = "transform";
        };

        const animate = () => {
            currentX += (targetX - currentX) * 0.08;
            currentY += (targetY - currentY) * 0.08;
            applyTransform();

            const deltaX = Math.abs(targetX - currentX);
            const deltaY = Math.abs(targetY - currentY);
            if (deltaX > 0.1 || deltaY > 0.1) {
                rafId = window.requestAnimationFrame(animate);
                return;
            }

            currentX = targetX;
            currentY = targetY;
            applyTransform();
            rafId = 0;
        };

        const queueAnimation = () => {
            if (rafId !== 0) return;
            rafId = window.requestAnimationFrame(animate);
        };

        const handleMouseMove = (event: MouseEvent) => {
            const x = (event.clientX / window.innerWidth - 0.5) * 2;
            const y = (event.clientY / window.innerHeight - 0.5) * 2;
            targetX = x * 30;
            targetY = y * 20;
            queueAnimation();
        };

        const handleMouseLeave = () => {
            targetX = 0;
            targetY = 0;
            queueAnimation();
        };

        applyTransform();

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
            if (rafId !== 0) {
                window.cancelAnimationFrame(rafId);
            }
        };
    }, [isMobile]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-0 overflow-hidden">
            <div
                ref={motionLayerRef}
                className={
                    isMobile
                        ? "absolute inset-[-2%] h-[104%] w-[104%]"
                        : "absolute inset-[-8%] h-[116%] w-[116%]"
                }
            >
                <Image
                    src="/images/hero/hero-video-poster.jpg"
                    alt=""
                    fill
                    priority
                    aria-hidden="true"
                    className={`object-cover transition-opacity duration-700 ${isVideoVisible ? "opacity-0" : "opacity-100"}`}
                    sizes="100vw"
                />
                <video
                    ref={videoRef}
                    playsInline
                    muted
                    preload="none"
                    poster="/images/hero/hero-video-poster.jpg"
                    className={`h-full w-full object-cover transition-opacity duration-700 ${isVideoVisible ? "opacity-100" : "opacity-0"}`}
                >
                    {!shouldUsePosterOnly && shouldLoadVideo ? (
                        <source src="/videos/hero-video-optimized.mp4" type="video/mp4" />
                    ) : null}
                </video>
            </div>
            {/* Soft overlay */}
            <div className="absolute inset-0 bg-brand-black/40" />
        </div>
    );
}
