import Image from "next/image";

interface BrandLogoProps {
    className?: string;
    alt?: string;
    priority?: boolean;
}

export function BrandLogo({
    className = "",
    alt = "Brand logo",
    priority = false,
}: BrandLogoProps) {
    return (
        <Image
            src="/images/logo/brand-logo-transparent.png"
            alt={alt}
            width={1170}
            height={157}
            priority={priority}
            className={className}
        />
    );
}
