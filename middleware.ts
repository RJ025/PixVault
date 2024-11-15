import { NextRequest , NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";


export async function middleware(request : NextRequest) {

    const token = await getToken({req : request , secret : process.env.AUTH_SECRET})
    const url = request.nextUrl

    console.log('token'  , token)

    if(token && 
        (
            url.pathname.startsWith('/login') ||
            url.pathname.startsWith('/register')
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
    matcher : ['/login'  , '/dashboard' , '/((?!api|_next|.*\\..*).*)']
}