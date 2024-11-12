import { NextRequest , NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";


export async function middleware(request : NextRequest) {

    const token = await getToken({req : request})
    const url = request.nextUrl

    if(token && 
        (
            url.pathname.startsWith('/login') ||
            url.pathname.startsWith('/register') ||
            url.pathname.startsWith('/')
        )
    ) {
        return NextResponse.redirect(new URL('/dashboard' , request.url))
    }

    if(!token && url.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/login' , request.url))
    }


    return NextResponse.next()
}


export const config = {
    matcher : ['/login' , '/register' , '/dashboard']
}