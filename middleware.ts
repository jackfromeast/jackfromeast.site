import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host')

  // Serve all the poc subdomain requests
  if (hostname === 'poc.jackfromeast.site') {
    if (request.nextUrl.pathname === '/dyad.html') {
      return NextResponse.rewrite(new URL('/exp/dyad-poc.html', request.url))
    }
  }

  // Check if the request is for the zeplin subdomain
  if (hostname === 'app.zeplin.io.jackfromeast.site') {
    // Serve the zeplin-poc.html file for any path on this subdomain
    return NextResponse.rewrite(new URL('/exp/zeplin-poc.html', request.url))
  }

  // If hostname === 'notejoy.com.jackfromeast.site' and path = "alink.html"
  if (hostname === 'notejoy.com.jackfromeast.site' && request.nextUrl.pathname === '/alink.html') {
    // Serve the alink-poc.html file for this specific path
    return NextResponse.rewrite(new URL('/exp/alink-poc.html', request.url))
  }

  if (hostname === 'notejoy.com.jackfromeast.site') {
    // Serve the notejoy-poc.html file for any path on this subdomain
    return NextResponse.rewrite(new URL('/exp/notejoy-poc.html', request.url))
  }


  if (hostname === 'trae.jackfromeast.site') {
    // Handle specific paths first
    if (request.nextUrl.pathname === '/ide/auth-callback/desktop') {
      // Serve the poc.html file for this specific path
      return NextResponse.rewrite(new URL('/exp/trae/poc.html', request.url))
    }
    
    if (request.nextUrl.pathname === '/gg.gzip') {
      // Serve the gzip file with appropriate headers
      const response = NextResponse.rewrite(new URL('/exp/trae/gg.gzip', request.url))
      response.headers.set('Content-Type', 'application/octet-stream')
      response.headers.set('Content-Encoding', 'gzip')
      return response
    }
    
    // For any other path on trae subdomain, redirect to /ide/auth-callback/desktop
    return NextResponse.redirect(new URL('/ide/auth-callback/desktop', request.url))
  }

  if (hostname === 'trae.cn.jackfromeast.site') {
    // Handle specific paths first
    if (request.nextUrl.pathname === '/ide/auth-callback/desktop') {
      // Serve the poc.html file for this specific path
      return NextResponse.rewrite(new URL('/exp/trae/poc-cn.html', request.url))
    }
    
    if (request.nextUrl.pathname === '/gg.gzip') {
      // Serve the gzip file with appropriate headers
      const response = NextResponse.rewrite(new URL('/exp/trae/gg.gzip', request.url))
      response.headers.set('Content-Type', 'application/octet-stream')
      response.headers.set('Content-Encoding', 'gzip')
      return response
    }
    
    // For any other path on trae subdomain, redirect to /ide/auth-callback/desktop
    return NextResponse.redirect(new URL('/ide/auth-callback/desktop', request.url))
  }

  // Continue with normal processing for other domains
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
