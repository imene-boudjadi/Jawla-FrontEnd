import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useContext } from 'react';
import {context} from '@/context';


export default function AdminLoginForm() {

    const {authState,login,isLoading,error} = useContext(context);

    const handleLogin = (loginFormData) => {
        login(loginFormData);
    }
    

    const [responseData, setResponseData] = useState(null);

    const router = useRouter();
    const handleRedirection = () => {
        router.push('/accueil');
    }

    const [formValue, setformValue] = useState({
        nomUtilisateur : '',
        motDePasse : ''       
      });

      const handleChange = (event) => {
        setformValue({
          ...formValue,
          [event.target.name]: event.target.value
        });
      }

      const handleSubmit = async (e) => {
        e.preventDefault();
        const loginFormData = new FormData();
        loginFormData.append("nomUtilisateur", formValue.nomUtilisateur)
        loginFormData.append("motDePasse", formValue.motDePasse)
        handleLogin(loginFormData);
      }

  return (
    <div>
        <form action="" onSubmit={handleSubmit}>
          <div>
          <label htmlFor="">E-mail</label>
          <input type="text" name="nomUtilisateur" id="" value={formValue.nomUtilisateur} onChange={handleChange} required/>
          </div>

          <div>
          <label htmlFor="">Mot de passe</label>
          <input type="text" name="motDePasse" id="" value={formValue.motDePasse} onChange={handleChange} required/>
          </div>

          <button>Submit</button>
          {isLoading && <p>Chargement ...</p>}
          {/* {error && <p>Une erreur s'est produite : {error}</p>} */}
        </form>

        {/* {!(authState.isAuth) && (<p>wlh ma login</p>)}
        {(authState.isAuth) && (<p>{admin.motDePasse}</p>)} */}
    </div>
  )
}
