import React from 'react'
import Image from 'next/image'
import boutonRecherche from '../public/boutonRecherche.png'

export const BarreDeRecherche = () => {
  return (
    
      <div className='home-barreDeRecherche-container'>
          <input type="text" className='home-barreDeRecherche' placeholder='Alger'/>
          <button>
            <Image
              src={boutonRecherche}
              width={40}
              height={40}    
              alt='yo'    
            />
          </button>
      </div>
   
  )
}
