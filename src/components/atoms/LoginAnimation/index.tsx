import Image from 'next/image'
import sound from '../../../../public/sound.svg'

export default function LoginAnimation() {
  return (
    <Image priority src={sound} alt='sound wave image' />
  )
}
