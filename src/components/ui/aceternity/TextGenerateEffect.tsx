"use client";

import { useEffect, useRef, useState } from "react";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextGenerateEffectProps {
    words: string;
    className?: string;
    filter?: boolean;
    duration?: number;
}

export function TextGenerateEffect({
    words,
    className,
    filter = true,
    duration = 0.5,
}: TextGenerateEffectProps) {
    const [scope, animate] = useAnimate();
    const isInView = useInView(scope, { once: true, margin: "-100px" });
    const [hasAnimated, setHasAnimated] = useState(false);
    const wordsArray = words.split(" ");

    useEffect(() => {
        if (isInView && !hasAnimated) {
            animate(
                "span",
                { opacity: 1, filter: filter ? "blur(0px)" : "none" },
                { duration, delay: stagger(0.08) }
            );
            setHasAnimated(true);
        }
    }, [isInView, hasAnimated, animate, duration, filter]);

    return (
        <div ref={scope} className={cn(className)}>
            {wordsArray.map((word, idx) => (
                <motion.span
                    key={word + idx}
                    className="inline-block"
                    style={{
                        opacity: 0,
                        filter: filter ? "blur(10px)" : "none",
                    }}
                >
                    {word}{" "}
                </motion.span>
            ))}
        </div>
    );
}
