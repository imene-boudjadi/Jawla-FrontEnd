import React from 'react'
import { useContext } from 'react';
import {context} from '@/context';

import AdminNavbar from '@/Components/AdminNavbar';

export default function Accueil() {

    const {authState, logout} = useContext(context);
    const handleLogout = () => {
        logout();
    }

  return (
    <div className="admin-page">
        {/* <p> {JSON.stringify(authState)}</p>
        {(authState != null) && (authState.isAuth) && <h1>Bienvenu {authState.admin.nomUtilisateur} !</h1>}
        <button onClick={handleLogout}>logout</button> */}

        <AdminNavbar logout={logout} />
        <div className='admin-accueil'>

            <div className='admin-header'>
                <h1> <b> Bienvenu Ya {authState?.admin?.nom}</b></h1>
                <p>Administrateur de la région : <b>WILAYA</b> </p>
            </div>

            <div className='admin-menu'>

                <div className='admin-list'>
                    <ul>
                        <li>Demandes d'ajout</li>
                        <li>lieux touristiques</li>
                        <li>Responsables de lieu</li>
                        <li>Tableau de bord</li>
                    </ul>
                </div>

                <div className='admin-map'>
                    map
                </div>

            </div>

        </div>
    </div>
    )
}
