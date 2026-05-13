import type { NextConfig } from "next";

/**
 * Security configuration for AdityaVardhan
 *
 * Standards alignment:
 *   OWASP ASVS v4       — https://owasp.org/www-project-application-security-verification-standard/
 *   OWASP Top 10 2021   — https://owasp.org/Top10/
 *   OWASP Secure Headers— https://owasp.org/www-project-secure-headers/
 *   NIST SSDF           — PO.4, PW.6, RV.1
 *   CIS Benchmark       — Web Server hardening controls
 */

const isDev = process.env.NODE_ENV === "development";

/**
 * Content Security Policy
 * ASVS 14.4.3 | OWASP XSS Prevention Cheat Sheet
 *
 * Documented trade-offs:
 *   script-src 'unsafe-inline' — Next.js 15 App Router emits inline <script> tags for
 *     hydration/data serialization. Migrate to nonce-based CSP when adding external scripts.
 *   style-src  'unsafe-inline' — Framer Motion injects CSS transforms as inline styles at runtime.
 *   unsafe-eval (dev only)     — Turbopack HMR evaluation; never shipped to production.
 */
const csp = [
  "default-src 'self'",
  isDev
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
    : "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "media-src 'self'",
  "font-src 'self'",
  // Turbopack uses WebSocket for HMR in dev; restrict to self in production
  isDev ? "connect-src 'self' ws: wss:" : "connect-src 'self'",
  "frame-src 'none'",
  "frame-ancestors 'none'",      // clickjacking — ASVS 14.4.5
  "form-action 'self'",          // prevent form hijacking
  "base-uri 'self'",             // prevent base-tag injection
  "object-src 'none'",           // block Flash/plugins — ASVS 14.4.3
  "upgrade-insecure-requests",   // force HTTPS for subresource requests
]
  .filter(Boolean)
  .join("; ");

/**
 * Security response headers applied to every route.
 * OWASP Secure Headers Project — https://owasp.org/www-project-secure-headers/
 */
const securityHeaders = [
  // ASVS 14.4.3 | OWASP Top 10 A03 — XSS via CSP
  { key: "Content-Security-Policy", value: csp },

  // ASVS 14.4.4 | OWASP Top 10 A05 — Prevent MIME-type sniffing attacks
  { key: "X-Content-Type-Options", value: "nosniff" },

  // ASVS 14.4.5 — Clickjacking defence (belt-and-suspenders with CSP frame-ancestors)
  { key: "X-Frame-Options", value: "DENY" },

  // ASVS 14.4.6 — HTTP Strict Transport Security: 2 years, preload-eligible
  // Submit to https://hstspreload.org once deployed on a stable domain
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },

  // ASVS 14.4.7 — Limit referrer information sent to other origins
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

  // OWASP Secure Headers — Restrict browser feature access to this origin only
  {
    key: "Permissions-Policy",
    value: [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "payment=()",
      "usb=()",
      "magnetometer=()",
      "gyroscope=()",
      "accelerometer=()",
      "display-capture=()",
    ].join(", "),
  },

  // OWASP Top 10 A05 — Prevent cross-origin window opener attacks
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },

  // Prevent hotlinking and cross-origin data exfiltration via our assets
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },

  // Disable legacy browser XSS filter — superseded by CSP; legacy filter can be exploited
  { key: "X-XSS-Protection", value: "0" },
];

const nextConfig: NextConfig = {
  // ASVS 14.4.1 — Remove X-Powered-By to avoid fingerprinting the stack
  poweredByHeader: false,

  // NIST SSDF PW.6.2 — Strict mode surfaces React anti-patterns during development
  reactStrictMode: true,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },

  images: {
    // No external image domains — eliminates SSRF via Next.js image proxy
    // OWASP Top 10 A10 — Server-Side Request Forgery
    remotePatterns: [],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 3600,
  },
};

export default nextConfig;
