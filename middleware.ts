import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  console.log('middleware - before', req.url)
  if (req.nextUrl.pathname === '/') {
    const slug = 'demo'
    console.log('middleware - rewrite', req.url, slug);
    const url = req.nextUrl.clone();
    url.pathname = `/${slug}`;
    console.log('middleware new pathname', url.pathname);
    return NextResponse.rewrite(url);
  }

  console.log("middleware - error (not configured)", {
    url: req.url,
    pathname: req.nextUrl.pathname,
  });

  return NextResponse.next();
}


// See "Matching Paths" below to learn more https://nextjs.org/docs/advanced-features/middleware#matching-paths
export const config = {
  matcher: '/',
};
