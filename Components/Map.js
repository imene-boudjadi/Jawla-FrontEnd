import { useMemo, useState, useEffect } from "react";
import { GoogleMap, useLoadScript, MarkerF, Marker, InfoWindow } from "@react-google-maps/api";
import Filtre from "./Filtre";
import { BarreDeRecherche } from "./BarreDeRecherche";
import { GoogleMapProvider, useAutocomplete, useGoogleMap} from "@ubilabs/google-maps-react-hooks";
import park from '../public/park.png'



import Info from "./Info";

export default function MapComponent() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyClU06NpjUC4pxjzWKjnLMZf1LgCCZ06ew",
    mapIds : ["b9e27567ced5dc10"]
  });

  if (!isLoaded) return <div>
    <Info/>
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

function Map() {
  // const center = useMemo(() => ({ lat: 36.7525000, lng: 3.0419700 }), []);
  const [center, setCenter] = useState({lat : 0, lng : 0})

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [lieu, setLieu] = useState(null)

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
  // useEffect(() => {
  //   if (isAnimating) {
  //     const animationTimeout = setTimeout(() => {
  //       setIsAnimating(false);
  //     }, 5000); // Temps de transition correspondant à la durée de l'animation
  
  //     return () => clearTimeout(animationTimeout);
  //   }
  // }, [isAnimating]);

  

  

  return (
    <div>
      <GoogleMap zoom={15} center={center} mapContainerClassName="map-container" options={{ mapId: "b9e27567ced5dc10" }}>
        <MarkerF position={center}  onClick={() => handleMarkerClick(center)} options={{
          icon : 'https://i.ibb.co/xhxC7Rj/output-onlinepngtools-1.png',
        }}>
        </MarkerF>
        
         {points.map((point)=>{
          const pos = {lat : point.latitude, lng : point.longitude}
          return (
            <div key={point.idPointInteret}>
              <MarkerF position={pos} onClick={() => handleMarkerClick(point)}/>

            </div>
          )
        })}

        {showInfo && <Info/>}

        {/* {selectedMarker && (
          <InfoWindow position={selectedMarker} onCloseClick={() => setSelectedMarker(null)}>
            
            <div>djd</div>
          </InfoWindow>
          
        )} */}
        <div className={`sliding-div ${isAnimating ? 'slide-in' : ''}`}>
        <button onClick={closeDiv}>fermer</button>
  Rani nestena t'codi cette partie
  {lieu && lieu.titre}

</div>
      </GoogleMap>
      

      <div className='h-container'>
        <div className='home-container'>
          <BarreDeRecherche/>
          <Filtre/>
          
        </div>

        
        
      </div>

      


    </div>
  );
}

function Infooo (){
  const [data, setData] = useState(points);
}

// const mapOptions = {
//   zoom : 10,
//   center : {
//     lat : 40,
//     lng : -88
//   },
//   mapId : 'b9e27567ced5dc10'
// }

// export default function Mapo() {

//   const [mapContainer, setMapContainer] = useState();

//   return (
//     <GoogleMapProvider 
//       options={mapOptions}
//       googleMapsAPIKey="AIzaSyClU06NpjUC4pxjzWKjnLMZf1LgCCZ06ew"
//       mapContainer = {mapContainer}
//       version = "beta"
//     >
//         <div ref={(node)=> setMapContainer(node)} style={{height:'100vh'}}/>
//     </GoogleMapProvider>
//   );
// }
