import { useMemo, useState, useEffect, Fragment } from "react";
import { GoogleMap, useLoadScript, MarkerF, Marker, InfoWindow, Geocoder } from "@react-google-maps/api";
import Filtre from "./Filtre";
import { BarreDeRecherche } from "./BarreDeRecherche";
import axios from "axios";
import SiteDetails from "./SiteDetails";
import Loading from "./Loading";
import Evenements from './Evenements'

import styles from '../styles/siteDetails.module.css'
import SimpleImageSlider from "react-simple-image-slider";
import Slider from 'react-styled-carousel';
import { useSpringCarousel } from "react-spring-carousel";

import { Typography, Icon } from '@mui/material';

import ReactDOM from 'react-dom'
import { Position, SideSheet, Pane, Heading, Paragraph, Tablist, Tab, Card, Button } from 'evergreen-ui'

import MosqueIcon from '@mui/icons-material/Mosque';
import Side from './Side'

import RechercheAutoComplete from '../Components/RechercheAutoComplete'


export default function MapComponent() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyClU06NpjUC4pxjzWKjnLMZf1LgCCZ06ew",
    mapIds : ["b9e27567ced5dc10"]
  });

  const clé = "AIzaSyClU06NpjUC4pxjzWKjnLMZf1LgCCZ06ew";

  if (!isLoaded) return <div>
    <Loading/>
  </div>;
  return <Map />;
}

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

//options de la map
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


  
  const images = [
    "https://i.ibb.co/XJcdHzj/Banner.jpg",
    "https://i.ibb.co/NC22JKs/monument.png",
    "https://i.ibb.co/djMg3gP/museum.png",
    "https://i.ibb.co/tYpqGqF/park.png",
    "https://i.ibb.co/qxQ9N2L/LOGO-ETIC.png",
    "https://i.ibb.co/6rzQSbR/LOGO-ETIC-BLANC.png",
  ];
  
  

  // const center = useMemo(() => ({ lat: 36.7525000, lng: 3.0419700 }), []);
  const [center, setCenter] = useState({lat : 0, lng : 0})
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [lieu, setLieu] = useState(null)
  const [lieux, setLieux] = useState([]);

  const [isShown, setIsShown] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)



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

  const [details, setDetails] = useState({
    themes : [],
    categories : [],
    evenements :[],
    offres : [],
    horaires : [],
    arretsTransport : [],
    responsable : [],
    commentaires : [],
    photos : []
  })

  const clicko = (lieu) => {

    setSelected(lieu);

    axios
      .get(`http://localhost:4000/utilisateur/AfficherDetailsPI/${lieu.idPointInteret}`)
      .then((response) => {
        console.log("Réponse de la requête GET details :", response.data);
        
        setDetails(response.data);

        setIsShown(true)
        
        // Gérer les données récupérées ici en les stockant dans l'état du composant
      })
      .catch((error) => {
        console.error("Erreur lors de la requête GET :", error);
        // Gérer les erreurs de la requête ici
      });
    
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
    setSelectedMarker(null);
  };

  const  handleMarkerClick =  (point) => {
    setSelectedMarker(point);
    closeDiv();
    setShowInfo(true);
    
    setLieu(point);

    setTimeout(setIsAnimating(true), 1000);
    
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
      scale : 1
    },
    draggable: false
  }

  const handleDataFromChild = (childData) => {
    setLieux(childData);
  };


  

  return (
    <div>
      <GoogleMap zoom={10} center={center} mapContainerClassName="map-container" options={options}>
        <MarkerF position={center}></MarkerF>
        {lieux?.map((point)=>{
          const pos = {lat : parseFloat(point.latitude), lng : parseFloat(point.longitude)}
          return (
            <div key={point.idPointInteret} className="marker">
              <MarkerF key={point.idPointInteret} position={pos} onClick={() => {
                setShowInfo(true);
                console.log(showInfo);



                setLieu(point);
                axios
      .get(`http://localhost:4000/utilisateur/AfficherDetailsPI/${point.idPointInteret}`)
      .then((response) => {
        console.log("Réponse de la requête GET details :", response.data);
        
        setDetails(response.data);

        setIsShown(true)
        
        // Gérer les données récupérées ici en les stockant dans l'état du composant
      })
      .catch((error) => {
        console.error("Erreur lors de la requête GET :", error);
        // Gérer les erreurs de la requête ici
      });


              }} options={markerOptions}/>
            </div>
          )
        })}
        
      </GoogleMap>

      {/* <div className={`sliding-div ${isAnimating ? 'slide-in' : ''}`}>
          <button onClick={closeDiv}>fermer</button>
         <SiteDetails lieu={lieu}/>
      </div> */}

<Fragment>
        <SideSheet
          position={Position.LEFT}
          isShown={showInfo}
          onCloseComplete={() => setShowInfo(false)}
          containerProps={{
            display: 'flex',
            flex: '1',
            flexDirection: 'column'
          }}
        >
          <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
            <Pane padding={16} borderBottom="muted">
              <Heading size={600}>Title</Heading>
              <Paragraph size={400} color="muted">
                Optional description or sub title
              </Paragraph>
            </Pane>
            <Pane display="flex" padding={8}>
              <Tablist>
                {['Informations', 'Commentaires', 'Evénements'].map((tab, index) => (
                  <Tab
                    key={tab}
                    isSelected={selectedIndex === index}
                    onSelect={() => setSelectedIndex(index)}
                  >
                    {tab}
                  </Tab>
                ))}
              </Tablist>
            </Pane>
          </Pane>
          <Pane flex="1" overflowY="scroll" background="tint1" padding={16}>
            {(selectedIndex==0) && (<Card
              backgroundColor="white"
              elevation={2}
              height="100%"
              display="flex"
              flexDirection="column"
              padding={10}
            >
                  <div className="flex m-5">
                    <Icon component={MosqueIcon} sx={{ fontSize: 40, marginRight: 2, fontFamily: 'Poppins' }} />
                    <Typography variant="h4">{lieu?.titre}</Typography>
                   
                  </div>
                  <SiteDetails lieu={lieu}/>
                  
            </Card>)}
            {(selectedIndex==1) && (<Card
              backgroundColor="white"
              elevation={0}
              height="100%"
              display="flex"
              flexDirection="column"
              padding={10}
            >
              <div className="flex m-5">
                    <Icon component={MosqueIcon} sx={{ fontSize: 40, marginRight: 2, fontFamily: 'Poppins' }} />
                    <Typography variant="h4">{lieu?.titre}</Typography>
                   
                  </div>
                  <div className={styles.offresDiv}>
                <h1 className={styles.subtitles}>Evènements & offres</h1>
                {details?.commentaires?.map(comm => (
                    <div key={comm.idCommentaire} className={styles.eventE}>
                        <div className={styles.eventND}>
                        <h1 className={styles.subsubtitles}>{comm.nom}</h1>
                            <h1 className={styles.subsubtitles}>{comm.texte}</h1>
                            <p className={styles.plainText}>{comm.nombreEtoile}</p>
                            <p>{event.date}</p>
                        </div>
                        
                    </div>
                ))}
            </div>
                    
            </Card>)}

            {(selectedIndex==2) && (<Card
              backgroundColor="white"
              elevation={2}
              height="100%"
              display="flex"
              flexDirection="column"
              padding={10}
            >
              <div className="flex m-5">
                    <Icon component={MosqueIcon} sx={{ fontSize: 40, marginRight: 2, fontFamily: 'Poppins' }} />
                    <Typography variant="h4">{lieu?.titre}</Typography>
                   
                  </div>
                  <div className={styles.offresDiv}>
                <h1 className={styles.subtitles}>Evènements & offres</h1>
                {details?.evenements?.map(event => (
                    <div key={event.idEvenement} className={styles.eventE}>
                        <div className={styles.eventND}>
                            <h1 className={styles.subsubtitles}>{event.titre}</h1>
                            <p className={styles.plainText}>{event.description}</p>
                            <p>{event.date}</p>
                        </div>
                        
                    </div>
                ))}
            </div>
            </Card>)}

          </Pane>
        </SideSheet>
        
      </Fragment>
      

      <div className={`h-container ${isAnimating ? 'slide-inn' : ''}`}>
        
          <BarreDeRecherche data={lieux} sendDataToParent={handleDataFromChild}/>
          
          {/* {coordinates?.latitude} ! {coordinates?.longitude} */}
           

          
          
      </div>

    </div>
  );
}


