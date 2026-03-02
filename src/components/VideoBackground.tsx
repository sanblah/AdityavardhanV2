"use client";

import { useRef, useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

export function VideoBackground() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState({ x: 0, y: 0 });
    const isMobile = useIsMobile();
    const LOOP_START = 0;
    const LOOP_END = 14.5;

    // Video loop logic
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        video.volume = 0.15;
        video.currentTime = LOOP_START;

        const handleTimeUpdate = () => {
            if (video.currentTime >= LOOP_END || video.currentTime < LOOP_START) {
                video.currentTime = LOOP_START;
            }
        };

        video.addEventListener("timeupdate", handleTimeUpdate);

        video.play().catch(() => {
            video.muted = true;
            video.play();
        });

        return () => {
            video.removeEventListener("timeupdate", handleTimeUpdate);
        };
    }, []);

    // Mouse parallax — desktop only
    useEffect(() => {
        if (isMobile) return;

        let rafId: number;
        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            targetX = x * 30;
            targetY = y * 20;
        };

        const animate = () => {
            currentX += (targetX - currentX) * 0.06;
            currentY += (targetY - currentY) * 0.06;
            setTransform({ x: currentX, y: currentY });
            rafId = requestAnimationFrame(animate);
        };

        window.addEventListener("mousemove", handleMouseMove);
        rafId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(rafId);
        };
    }, [isMobile]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-0 overflow-hidden">
            <div
                style={
                    isMobile
                        ? {
                              transform: "scale(1.05)",
                              willChange: "auto",
                          }
                        : {
                              transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(1.15)`,
                              willChange: "transform",
                              transition: "none",
                          }
                }
                className={
                    isMobile
                        ? "absolute inset-[-2%] h-[104%] w-[104%]"
                        : "absolute inset-[-8%] h-[116%] w-[116%]"
                }
            >
                <video
                    ref={videoRef}
                    playsInline
                    muted
                    className="h-full w-full object-cover"
                >
                    <source src="/videos/hero-video.mp4" type="video/mp4" />
                </video>
            </div>
            {/* Soft overlay */}
            <div className="absolute inset-0 bg-brand-black/40" />
        </div>
    );
}
