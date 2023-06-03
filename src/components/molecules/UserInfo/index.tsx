import { getUser } from '@/lib/auth'
import Image from 'next/image'
import Link from 'next/link'
export default function UserInfo() {
  if (typeof (window) !== undefined) {
    const user = getUser()
    return (
      <Link href={'/authenticated'} className='flex gap-3 items-center'>
        <Image className='rounded-full shadow-[0_0_1px_2px] shadow-green-400' width={40} height={40} src={`${user.urlImageProfile}`} alt='' />
        <h4>{user.name}</h4>
      </Link>
    )
  }
  return null
}
