import Cookie from 'js-cookie'
import decode from 'jwt-decode'
import { cookies } from 'next/headers';
import { z } from 'zod'

export const UserSchema = z.object({
  exp: z.number(),
  iat: z.number(),
  name: z.string(),
  spotifyID: z.string(),
  sub: z.string(),
  urlImageProfile: z.string().url(),
  urlProfile: z.string().url(),
  auth: z.string()
});
export const tokenSchema = z.string();
export type SpotifyAuthDTO = z.infer<typeof UserSchema>

export function getUser(): SpotifyAuthDTO {
  const token = cookies().get('token')?.value;
  if (!token) {
    throw new Error('Unauthenticated.')
  }
  const user: SpotifyAuthDTO = decode(token)

  return user
}