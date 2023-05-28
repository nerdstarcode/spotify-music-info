import { NextRequest, NextResponse } from "next/server";
import queryString from 'query-string'
const singInURL = `https://accounts.spotify.com/authorize?${queryString.stringify({
  response_type: 'code',
  client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
  scope: process.env.NEXT_PUBLIC_SCOPE,
  redirect_uri: 'http://localhost:3000/api/auth/callback',
  state: 'loging'
})}`

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  if (!token) {
    return NextResponse.redirect(singInURL, {
      headers: {
        'Set-Cookie': `redirectTo=${request.url}; Path=/; HttpOnly; max-age=20;`
      }
    })
  }
  return NextResponse.next()
}
export const config = {
  matcher: '/authenticated/:path*',
}