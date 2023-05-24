import Image from 'next/image'
import { Inter } from 'next/font/google'


import AdminLoginForm from '@/Components/AdminLoginForm'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

import { useContext } from 'react';
import {context} from '@/context';

import logo from '../../public/logo.png'



export default function Employe() {

  const {authState, isLoading, error, admin, login, logout} = useContext(context);
  
  return (

    
    <div>
      <div className='login-container'>

        <Image
          src={logo}
          width={200}
          height={200}    
          alt='yo'    
        />
        <div className='login-texte'>
          <h1>Bienvenu dans la platforme</h1>
          <h1>administrateur</h1>
        </div>
        
        
        <div className='login-form'>
          <h3>Connectez-vous à votre compte admin</h3>
          <AdminLoginForm/>
        </div>
     </div>
    </div>
  )
}
