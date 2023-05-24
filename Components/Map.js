import { useMemo, useState } from "react";
import { GoogleMap, useLoadScript, MarkerF, InfoWindow } from "@react-google-maps/api";
import Filtre from "./Filtre";
import { BarreDeRecherche } from "./BarreDeRecherche";
import { GoogleMapProvider, useAutocomplete, useGoogleMap} from "@ubilabs/google-maps-react-hooks";


export default function MapComponent() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyClU06NpjUC4pxjzWKjnLMZf1LgCCZ06ew",
    mapIds : ["b9e27567ced5dc10"]
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const center = useMemo(() => ({ lat: 36.7525000, lng: 3.0419700 }), []);

  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  return (
    <div>
      <GoogleMap zoom={15} center={center} mapContainerClassName="map-container" options={{ mapId: "b9e27567ced5dc10" }}>
        <MarkerF position={center} onClick={() => handleMarkerClick(center)}/>
        {selectedMarker && (
          <InfoWindow position={selectedMarker} onCloseClick={() => setSelectedMarker(null)}>
            <div>test</div>
          </InfoWindow>
        )}
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
