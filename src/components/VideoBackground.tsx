"use client";

import { useEffect, useRef, useState } from "react";

export function VideoBackground() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const allowPlayback = useRef(true);
    const inView = useRef(true);
    const [playing, setPlaying] = useState(false);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
        allowPlayback.current = !reducedMotion.matches;
        const syncPlayback = () => {
            if (allowPlayback.current && inView.current && !document.hidden) {
                video.muted = true;
                // Keep the play control available if the browser blocks autoplay.
                void video.play().catch(() => {});
            } else video.pause();
        };
        const observer = new IntersectionObserver(([entry]) => {
            inView.current = entry.isIntersecting;
            syncPlayback();
        }, { threshold: 0.05 });
        const onMotionChange = () => {
            allowPlayback.current = !reducedMotion.matches;
            syncPlayback();
        };
        observer.observe(video);
        document.addEventListener("visibilitychange", syncPlayback);
        reducedMotion.addEventListener("change", onMotionChange);
        syncPlayback();
        return () => {
            observer.disconnect();
            document.removeEventListener("visibilitychange", syncPlayback);
            reducedMotion.removeEventListener("change", onMotionChange);
            video.pause();
        };
    }, []);

    const togglePlayback = async () => {
        const video = videoRef.current;
        if (!video) return;
        if (!video.paused) {
            allowPlayback.current = false;
            video.pause();
            return;
        }
        allowPlayback.current = true;
        if (failed) video.load();
        try {
            await video.play();
            setFailed(false);
        } catch { setFailed(true); }
    };

    return (
        <div className="absolute inset-0">
            <video ref={videoRef} id="homepage-film" src="/videos/hero-video-optimized.mp4?v=trimmed-20261008"
                poster="/images/hero/hero-video-poster.jpg" muted playsInline loop preload="metadata"
                aria-hidden="true" tabIndex={-1}
                onPlaying={() => setPlaying(true)} onPause={() => setPlaying(false)}
                onError={() => { setFailed(true); setPlaying(false); }}
                className="h-full w-full object-cover" />
            <div className="pointer-events-none absolute inset-0 bg-brand-black/35" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-brand-black/20" />
            <button type="button" onClick={togglePlayback} aria-controls="homepage-film"
                className="absolute bottom-4 right-5 z-20 flex min-h-11 items-center gap-3 px-2 text-[10px] uppercase tracking-[0.2em] text-brand-white/80 transition-colors hover:text-brand-white md:bottom-6 md:right-10">
                <span aria-hidden="true" className="text-sm">{playing ? "Ⅱ" : "▷"}</span>
                {failed ? "Retry film" : playing ? "Pause film" : "Play film"}
            </button>
            {failed && <p role="status" className="absolute bottom-16 right-7 z-20 max-w-52 text-right text-xs text-brand-white/80">The film could not play. Please try again.</p>}
        </div>
    );
}
