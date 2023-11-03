import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' *.googletagmanager.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    connect-src *;
    font-src 'self';
`;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("X-DNS-Prefetch-Control", "on");
  requestHeaders.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload",
  );
  requestHeaders.set("X-Frame-Options", "SAMEORIGIN");
  requestHeaders.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  );
  requestHeaders.set("X-Content-Type-Options", "nosniff");
  requestHeaders.set("Referrer-Policy", "origin-when-cross-origin");

  requestHeaders.set(
    "Content-Security-Policy",
    cspHeader.replace(/\s{2,}/g, " ").trim(),
  );

  return NextResponse.next({
    headers: requestHeaders,
    request: {
      headers: requestHeaders,
    },
  });
};
