'use client'
import queryString from 'query-string'
export default function LoginAnchorButton() {
  return (
    <a href={`https://accounts.spotify.com/authorize?${queryString.stringify({
      response_type: 'code',
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      scope: process.env.NEXT_PUBLIC_SCOPE,
      redirect_uri: 'http://localhost:3000/api/auth/callback',
      state: 'loging'
    })}
      `}
      className='
        flex
        w-fit
        h-fit
        px-4
        py-2
        rounded
        items-center
        justify-center
        text-black
        font-semibold
        bg-green-500

        transition-all
        hover:scale-105
        hover:bg-green-400
        hover:text-green-200

        relative
        before:w-4
        before:h-4
        before:absolute
        before:top-0
        before:right-1/2
        before:translate-x-1/2
        before:rounded-full
        before:transition-all
        before:hover:-translate-y-12
        before:hover:w-10
        before:hover:h-10
        before:hover:bg-spotify-logo
        before:hover:bg-center
        before:hover:object-
        before:hover:bg-no-repeat 
      '
    >
      Login on Spotify
    </a>
  )
}
