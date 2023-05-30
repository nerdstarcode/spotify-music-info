'use client'
import { api } from '@/lib/api'
import { getUser } from '@/lib/client'
import { useEffect, useState } from 'react'
import { TopTracksReponseDTO, TopTracksReponseSchema, TrackDTO } from './interaces.dto';
import Image from 'next/image'
export default function TopTracks() {

  async function getTopTracks(user: any): Promise<TopTracksReponseDTO> {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://api.spotify.com/v1/me/top/tracks',
      headers: { 'Authorization': 'Bearer ' + user.auth }
    };
    const topTracksResponse = await api.request(config)
      .catch((error) => {
        console.log(error);
      });
    console.log(topTracksResponse?.data)
    const response = TopTracksReponseSchema.parse(topTracksResponse?.data)
    return response
  }
  if (typeof (window) !== undefined) {
    console.log(getUser())
    const user = getUser()
    const [topTracks, setTopTracks] = useState<any[]>()
    useEffect(() => {
      getTopTracks(user).then((response: TopTracksReponseDTO) => {
        setTopTracks(response.items)
      });
    }, [])
    const playAudio = async(event: any) => {
      const imageElement = document.getElementById(event.target.id)
      const playMusic = event.target.id.replace('sound-image-', '')
      const audioElement = document.getElementById(`sound-${playMusic}`) as HTMLAudioElement | null;
      if (audioElement) {
        if (audioElement.paused) {
          audioElement.play();
          imageElement?.classList.add('animate-spin-slow')
          setTimeout(()=>{imageElement?.classList.remove('animate-spin-slow')},(audioElement.duration - audioElement.currentTime + 0.5)*1000)
        } else {
          audioElement.pause();
          imageElement?.classList.remove('animate-spin-slow')
        }
      }
    };
    return (
      <div
        className='
        grid 
        sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7
        gap-4

        '
      >
        {topTracks?.map((track: TrackDTO, index) => {
          const artists = track.artists.map(artist => artist.name)
          return (
            <article id={`top-${index}`} key={index}
              className={`
              flex sm:flex-row md:flex-col
              h-32 md:h-44 hover:scale-105
              px-2 
              justify-around 
              rounded 
              gap-1
              text-center 
              items-center 
              bg-gray-700 
              transition-all
              duration-400

              shadow-[0_0_0_2px] hover:shadow-[0_0_10px_2px] 
              shadow-gray-600 hover:shadow-green-500
              `}
            >
              <header className='flex flex-col justify-center items-center'>
                <h2 className='w-fit text-green-500'>
                  <a href={track.external_urls.spotify} target='_blank'>
                    {track.name}
                  </a>
                </h2>
                <h3 className='text-gray-500 text-xs'>{artists.join(", ")}</h3>
              </header>
              <Image id={`sound-image-${index}`} onClick={playAudio} className='rounded-full h-auto w-auto' priority height={track.album.images[2].height} width={track.album.images[2].width} alt='' src={track.album.images[2].url} />
              {track.preview_url &&
                <audio id={`sound-${index}`}>
                  <source src={track.preview_url} type="audio/mpeg" />
                  Seu navegador não suporta a reprodução de áudio.
                </audio>
              }
              <h5 className='text-xl font-bold text-purple-400'>{index + 1}º</h5>
            </article>
          )
        })

        }

      </div>
    )
  }
  return null
}

