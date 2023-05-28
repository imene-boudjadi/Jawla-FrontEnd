import React from 'react'
import Image from 'next/image'
import logo from '../public/LogoVert.png'

export default function Loading() {
  return (
    <div className='loading'>
        
        <Image
              src={logo}
              width={200}
              height={200}    
              alt='yo'    
            />
        
    </div>
  )
}
