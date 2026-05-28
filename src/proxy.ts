import { NextResponse, type NextRequest } from "next/server";

const comingSoonOnly = process.env.COMING_SOON_ONLY === "true";

export function proxy(request: NextRequest) {
    if (!comingSoonOnly) {
        return NextResponse.next();
    }

    const { pathname } = request.nextUrl;
    if (pathname === "/coming-soon") {
        return NextResponse.next();
    }

    return NextResponse.rewrite(new URL("/coming-soon", request.url));
}

export const config = {
    matcher: ["/((?!_next|api|images|videos|robots.txt|favicon.ico|.*\\..*).*)"],
};
