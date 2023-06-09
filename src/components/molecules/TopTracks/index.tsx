'use client'
import { getUser } from '@/lib/client'
import { useEffect, useState } from 'react'
import { TopTracksReponseDTO, TrackDTO } from './interaces.dto';
import Image from 'next/image'
import { Plus, Sparkles } from 'lucide-react';
import { addToQueue, getTopTracks, recomendations } from '@/lib/spotify';
import toast, { Toaster } from 'react-hot-toast';
const playAudio = async (event: any) => {
  const regex = /(\D+)?(\d+)(\D+)?/;
  const match = event.target.id.match(regex);
  const indexSound = match ? match[2] : null;
  const imageElement = await document.getElementById(`sound-image-${indexSound}`)
  const audioElement = await document.getElementById(`sound-${indexSound}`) as HTMLAudioElement | null;
  if (audioElement) {
    audioElement.volume = 0.1
    audioElement.play();
    imageElement?.classList.add('animate-spin-slow')
    setTimeout(() => { imageElement?.classList.remove('animate-spin-slow') }, (audioElement.duration - audioElement.currentTime + 0.5) * 1000)
  }
};
const stopMusic = async (event: any) => {
  const regex = /(\D+)?(\d+)(\D+)?/;
  const match = event.target.id.match(regex);
  const indexSound = match ? match[2] : null;
  const imageElement = await document.getElementById(`sound-image-${indexSound}`)
  const audioElement = await document.getElementById(`sound-${indexSound}`) as HTMLAudioElement | null;
  if (audioElement) {
    audioElement.pause();
    imageElement?.classList.remove('animate-spin-slow')
  }
}
export default function TopTracks() {
  if (typeof (window) !== undefined) {
    const user = getUser()
    const [topTracks, setTopTracks] = useState<any[]>()
    useEffect(() => {
      getTopTracks(user)
        .then((response: TopTracksReponseDTO) => {
          setTopTracks(response.items)
        })
        .catch((error) => {
          console.error(error);
        });
    }, [])

    return (
      <div
        className='
        grid 
        sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7
        gap-4
        w-full
        md:px-8
        '
      >
        {topTracks?.map((track: TrackDTO, index) => {
          const artists = track.artists.map(artist => artist.name)
          return (
            <article onMouseEnter={playAudio} onMouseLeave={stopMusic} id={`top-${index}`} key={index}
              className={`
              flex sm:flex-row md:flex-col
              h-32 md:h-44 hover:scale-105
              px-2 
              w-full
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
              <header id={`header-card-${index}`} className='w-40 md:w-full flex flex-col justify-center items-center'>
                <h2 id={`title-card-${index}`} className='text-green-500'>
                  <a id={`link-music-${index}`} href={track.external_urls.spotify} target='_blank'>
                    {track.name}
                  </a>
                </h2>
                <h3 id={`artists-${index}`} className=' text-gray-500 text-xs'>
                  <a id={`link-album-${index}`} href={track.external_urls.spotify} target='_blank'>
                    {artists.join(", ")}
                  </a>
                </h3>
              </header>
              <Image id={`sound-image-${index}`} className='rounded-full sm:h-auto sm:w-auto' priority height={track.album.images[2].height} width={track.album.images[2].width} alt='' src={track.album.images[2].url} />
              {track.preview_url &&
                <audio id={`sound-${index}`}>
                  <source src={track.preview_url} type="audio/mpeg" />
                  Seu navegador não suporta a reprodução de áudio.
                </audio>
              }
              <footer id={`footer-card-${index}`}
                className='
                flex flex-col md:flex-row
                justify-between 
                w-fit md:w-full 
                items-center 
                px-2
                '
              >
                <Sparkles id={`footer-card-recomendations-${index}`} className='cursor-pointer text-gray-500 w-5 hover:text-blue-400' onClick={() => { recomendations({ user, track }) }} />
                <h5 id={`top-index-${index}`} className='text-xl font-bold text-purple-400 pointer-events-none'>{index + 1}º</h5>
                <Plus id={`footer-card-add-${index}`} className='cursor-pointer text-gray-500 w-5 hover:text-blue-400'
                  onClick={() => {
                    addToQueue({ user, track })
                      .then(() => {
                        toast.success('Added to queue')
                      })
                      .catch(() => {
                        toast.error('Failed to add to queue')
                      })
                  }}
                />
              </footer>
            </article>
          )
        })

        }

      </div>
    )
  }
  return null
}

