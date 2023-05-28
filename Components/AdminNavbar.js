import React from 'react'
import logo from '../public/logo.png'
import Image from 'next/image'

export default function AdminNavbar({logout}) {
  return (
    <nav className='admin-navbar'>
        <Image
          src={logo}
          width={100}
          height={200}    
          alt='yo'    
        />
        <button className='admin-btn-logout' onClick={logout}>Se déconnecter</button>
    </nav>
  )
}
