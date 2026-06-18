import { NextResponse, type NextRequest } from "next/server";

const comingSoonHosts = new Set([
    "adityavardhan.design",
    "www.adityavardhan.design",
]);
const standaloneHeader = "x-adityavardhan-standalone";

export function proxy(request: NextRequest) {
    const hostname = request.headers.get("host")?.split(":")[0].toLowerCase();

    if (!hostname || !comingSoonHosts.has(hostname)) {
        return NextResponse.next();
    }

    const { pathname } = request.nextUrl;
    if (pathname === "/coming-soon") {
        return NextResponse.next();
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(standaloneHeader, "1");

    return NextResponse.rewrite(new URL("/coming-soon", request.url), {
        request: {
            headers: requestHeaders,
        },
    });
}

export const config = {
    matcher: ["/((?!_next|api|images|videos|robots.txt|favicon.ico|.*\\..*).*)"],
};
