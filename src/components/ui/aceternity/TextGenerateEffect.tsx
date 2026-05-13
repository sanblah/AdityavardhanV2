"use client";

import { useEffect, useRef } from "react";
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
    const hasAnimated = useRef(false);
    const textTokens = words.split(/(\s+)/);

    useEffect(() => {
        if (!isInView || hasAnimated.current) return;

        hasAnimated.current = true;
        animate(
            "span",
            { opacity: 1, filter: filter ? "blur(0px)" : "none" },
            { duration, delay: stagger(0.08) }
        );
    }, [isInView, animate, duration, filter]);

    return (
        <div ref={scope} className={cn(className)}>
            {textTokens.map((token, idx) => {
                if (/^\s+$/.test(token)) {
                    return token;
                }

                return (
                    <motion.span
                        key={token + idx}
                        className="inline-block"
                        style={{
                            opacity: 0,
                            filter: filter ? "blur(10px)" : "none",
                        }}
                    >
                        {token}
                    </motion.span>
                );
            })}
        </div>
    );
}
