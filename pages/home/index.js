import React from 'react';
import { BarreDeRecherche } from '@/Components/BarreDeRecherche';
import Filtre from '@/Components/Filtre';
import Navbar from '@/Components/Navbar';

import { GoogleMap, LoadScript, useLoadScript } from '@react-google-maps/api';

import Map from '@/Components/Map';

export default function Home() {
  return (
    <div> 
      <Navbar/>
      <Map/>
    </div>
  )
}

