import React from 'react'
import { useContext } from 'react';
import {context} from '@/context';

export default function Accueil() {

    const {authState, logout} = useContext(context);
    const handleLogout = () => {
        logout();
    }

  return (
    <div>
        <p> {JSON.stringify(authState)}</p>

        {(authState != null) && (authState.isAuth) && <h1>Bienvenu {authState.admin.nomUtilisateur} !</h1>}



        <button onClick={handleLogout}>logout</button>
    </div>
    )
}
