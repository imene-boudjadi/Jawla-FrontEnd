import { useMemo, useState, useEffect } from "react";
import { GoogleMap, useLoadScript, MarkerF, Marker, InfoWindow, Geocoder } from "@react-google-maps/api";
import Filtre from "./Filtre";
import { BarreDeRecherche } from "./BarreDeRecherche";
import { GoogleMapProvider, useAutocomplete, useGoogleMap} from "@ubilabs/google-maps-react-hooks";
import park from '../public/park.png'
import axios from "axios";



import Loading from "./Loading";

export default function MapComponent() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyClU06NpjUC4pxjzWKjnLMZf1LgCCZ06ew",
    mapIds : ["b9e27567ced5dc10"]
  });

  if (!isLoaded) return <div>
    <Loading/>
  </div>;
  return <Map />;
}

const content = `<div class="infowin">
                  <h3>Titre de l'InfoWindow</h3>
                  <p>ouvert</p>
                </div>`;

const points = [
  {
    "idPointInteret" : 1,
    "titre" : "Le Jardin d’Essai du Hamma",
    "description" : "Le Jardin d’Essai du Hamma",
    "adresse" : "P3XF+RR7, Rue Mohamed Belouizdad, Belouizdad",
    "valide" : true,
    "latitude" : 36.74965798108621,
    "longitude" : 3.074531703893012,
    "idResponsable" : 1
  },
  {
    "idPointInteret" : 2,
    "titre" : "Aniss yo",
    "description" : "Le Jardin d’Essai du Hamma",
    "adresse" : "P3XF+RR7, Rue Mohamed Belouizdad, Belouizdad",
    "valide" : true,
    "latitude" : 35.74965798108621,
    "longitude" : 2.074531703893012,
    "idResponsable" : 1
  }
];


const options = {
  restriction: {
    latLngBounds: {
      north: 39, // Limite nord de la zone affichée
      south: 18.8, // Limite sud de la zone affichée
      west: -8.7, // Limite ouest de la zone affichée
      east: 11.9, // Limite est de la zone affichée
    },
    strictBounds: true, // Empêche le déplacement de la carte en dehors des limites
  },
  minZoom: 3, // Niveau de zoom minimum
  maxZoom: 10, // Niveau de zoom maximum
  mapId: "b9e27567ced5dc10"
};

function Map() {

  const [coordinates, setCoordinates] = useState(null);

  const handleGeocode = (results) => {
    if (results && results.length > 0) {
      const { lat, lng } = results[0].geometry.location;
      setCoordinates({ latitude: lat(), longitude: lng() });
    }
  };

  useEffect(()=>{
    const geocodeAddress = async (address) => {
      try {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({address}, handleGeocode);
      } catch (error) {
        console.log("erreur lors de la géocodification");
      }
    }
    const address = "Jardin d'essai";
    geocodeAddress(address);
  }, [])



  // const center = useMemo(() => ({ lat: 36.7525000, lng: 3.0419700 }), []);
  const [center, setCenter] = useState({lat : 0, lng : 0})
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [lieu, setLieu] = useState(null)
  const [lieux, setLieux] = useState([]); 
  async function fetchLieux() {
    try {
      const response = await axios.get('http://localhost:4000/lieu');
      console.log(response)
      return response.data;
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des données de l\'API :', error);
      return null;
    }
  }
  useEffect(() => {
    async function fetchLieuxFromAPI() {
      
      
      const apiLieux = await fetchLieux();
      console.log(apiLieux);
      setLieux(apiLieux);
    }
    fetchLieuxFromAPI();
    console.log(lieux);
  }, []);

  const closeDiv = () => {
    setShowInfo(false);
    setIsAnimating(false);
  };

  const  handleMarkerClick =  (point) => {
    //setSelectedMarker(marker);
    closeDiv();
    setLieu(point);
    setShowInfo(true);
    setIsAnimating(true);
    console.log("yoo")
  };

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(({coords : {latitude, longitude}})=>{
      setCenter({lat : latitude, lng : longitude})
      console.log(center);
    })
  }, [])

  const markerOptions = {
    icon: {
      url: 'https://i.ibb.co/hXsWPKn/park.png',
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(20, 20),
    },
    draggable: false
  }

  const optionss = {
    pixelOffset: new window.google.maps.Size(0, -40),
    closeBoxURL: '',
  };



  return (
    <div>
      <GoogleMap zoom={10} center={center} mapContainerClassName="map-container" options={options}>
        <MarkerF position={center}  onClick={() => handleMarkerClick(center)}>
        </MarkerF>
        {lieux?.map((point)=>{
          const pos = {lat : parseFloat(point.latitude), lng : parseFloat(point.longitude)}
          return (
            <div key={point.idPointInteret}>
              <MarkerF position={pos} onClick={() => handleMarkerClick(point)} options={markerOptions}/>
              <InfoWindow position={pos} options={optionss}>
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </InfoWindow>
            </div>
          )
        })}
        <div className={`sliding-div ${isAnimating ? 'slide-in' : ''}`}>
          <button onClick={closeDiv}>fermer</button>
          Rani nestena t'codi cette partie
          {lieu?.titre}
          <br />
          {lieu?.description}
          {}

        </div>
      </GoogleMap>
      

      <div className={`h-container ${isAnimating ? 'slide-inn' : ''}`}>
        <div className='home-container'>
          <BarreDeRecherche/>
          {coordinates?.latitude} ! {coordinates?.longitude}
          <Filtre/>  
        </div>   
      </div>

    </div>
  );
}


