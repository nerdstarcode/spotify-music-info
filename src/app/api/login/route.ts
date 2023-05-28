import { api } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const registerResponse = await api.post('/login');
  const cookieExpiresInSeconds = 1 * 60 * 60
  return NextResponse.redirect('/', {
    headers: {
      'Set-Cookie': `token=${registerResponse}; Path=/; max-age=${cookieExpiresInSeconds};`
    }
  })
}