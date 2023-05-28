import { cookies } from 'next/headers'
import decode from 'jwt-decode'
import { z } from 'zod'

export const SpotifyAuthSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.string(),
  refresh_token: z.string(),
  scope: z.string()
})

export type SpotifyAuthDTO = z.infer<typeof SpotifyAuthSchema>

export function getUser(): SpotifyAuthDTO {
  const token = cookies().get('token')?.value
  if (!token) {
    throw new Error('Unauthenticated.')
  }
  const user: SpotifyAuthDTO = decode(token)

  return user
}