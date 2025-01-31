import { NextRequest, NextResponse } from "next/server";


export const config = {
    matcher: ['/api/:path*', '/page/:path*'],
};

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    console.log(pathname);
    return NextResponse.next();
}