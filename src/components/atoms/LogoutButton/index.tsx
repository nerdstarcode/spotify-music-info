'use client'

import { LucideLogOut } from "lucide-react"

export default function LogoutButton() {

  return (
    <a 
      className={`
        flex
        text-sm
        items-center
        group
        hover:text-red-200
      `} 
      href={'/api/auth/logout'}
    >
      <LucideLogOut className="transition-transform duration-500 h-4 group-hover:scale-150"/>
      Logout
    </a>
  )
}
