"use client";

import { useState, useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ThreeDCardProps {
    children: ReactNode;
    className?: string;
    containerClassName?: string;
}

export function ThreeDCard({
    children,
    className,
    containerClassName,
}: ThreeDCardProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState("");

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 25;
        const y = (e.clientY - rect.top - rect.height / 2) / 25;
        setTransform(`perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`);
    };

    const handleMouseLeave = () => {
        setTransform("perspective(1000px) rotateY(0deg) rotateX(0deg)");
    };

    return (
        <div
            ref={containerRef}
            className={cn("relative", containerClassName)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transformStyle: "preserve-3d" }}
        >
            <div
                className={cn("transition-transform duration-200 ease-out", className)}
                style={{ transform }}
            >
                {children}
            </div>
        </div>
    );
}
