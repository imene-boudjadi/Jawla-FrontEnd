import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import Image from 'next/image';

import Cardo from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';

import Navbar from '@/Components/Navbar';

import FullyFeaturedSidesheetExample from '@/Components/Side';
import {  SideSheet, Pane, Heading, Paragraph, Tablist, Tab, Card, Button } from 'evergreen-ui'


export default function Favoris({photos}) {

  const [user, setUser] = useState(7);

  const [favoris, setFavoris] = useState([]);

  const [details, setDetails] = useState({
    themes : [""],
    categories : [""],
    evenements : [""],
    offres : [""],
    horaires : [""],
    arretsTransport : [""],
    commentaires : [""],
    responsable : [""],
    photos : [""]
  })
  

  useEffect(() => {
    // Logique pour effectuer la requête GET avec Axios
    axios
      .get(`http://localhost:4000/utilisateur/AfficherFavoris/${user}`)
      .then((response) => {
        console.log("Réponse de la requête GET :");
        
        setFavoris(response.data);
        
        // Gérer les données récupérées ici en les stockant dans l'état du composant
      })
      .catch((error) => {
        console.error("Erreur lors de la requête GET :", error);
        // Gérer les erreurs de la requête ici
      });

    }
  , []);

  function arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  const aniss = null;

  function yo(imageData) {
    console.log("yo",URL.createObjectURL(new Blob([imageData])))
    return URL.createObjectURL(new Blob([imageData]));   
  }

  
  const [isShown, setIsShown] = React.useState(false)
    const [selectedIndex, setSelectedIndex] = React.useState(0)
  
    const [selected, setSelected] = React.useState(null)

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

  return (
    <div className='favoris'>
        
        <Navbar/>
        <div className='favoris-liste'>

            
          
            {favoris.map((lieu,index) => (
              <div key={lieu.idPointInteret} onClick={() => clicko(lieu)} className='card'>
                          <Cardo sx={{ maxWidth: 500 }}>
                            <CardActionArea>                              
                              <CardMedia
                                component="picture"
                                height="10"
                                image={photos[0]?.download_url}
                                alt="green iguana"
                              />
                            <CardContent>
                              <Typography gutterBottom variant="h5" component="div">
                                {lieu.titre}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {lieu.description}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                            <CardActions>
                              <Button variant="contained" color="primary">
                                Afficher sur la carte
                              </Button>
                              <Button variant="contained" color="red" onClick>
                                Supprimer
                              </Button>
                            </CardActions>
                      </Cardo>      
              </div>
            ))}

        </div>

        <div className="slido">
        <React.Fragment >
        <SideSheet
          isShown={isShown}
          onCloseComplete={() => setIsShown(false)}
          containerProps={{
            display: 'flex',
            flex: '1',
            flexDirection: 'column'
          }}
        >
          <Pane zIndex={111111111111} flexShrink={0} elevation={1111111111} backgroundColor="white">
            <Pane padding={16} borderBottom="muted">
              <Heading size={600}>Title</Heading>
              <Paragraph size={400} color="muted">
                Optional description or sub title
              </Paragraph>
            </Pane>
            <Pane display="flex" padding={8}>
              <Tablist>
                {['Informations', 'Evénements', 'Photos'].map((tab, index) => (
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
            {(selectedIndex==0) && <Card
              backgroundColor="white"
              elevation={0}
              height={240}
              display="flex"
            >
              <Heading>{details.responsable[0].nom} test</Heading>
              <Heading>{selected?.titre} test</Heading>
              <Heading>{selected?.description} test</Heading>

            </Card>}
            {(selectedIndex==1) && <Card
              backgroundColor="white"
              elevation={0}
              height={240}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Heading>evegveeg</Heading>
            </Card>}
            {(selectedIndex==2) && <Card
              backgroundColor="white"
              elevation={0}
              height={240}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Heading>phojo</Heading>
            </Card>}
          </Pane>
        </SideSheet>
        
      </React.Fragment>
        </div>
    </div>
  )
}

export const fetchRandomPhotos = async (count) => {
  try {
    const response = await axios.get(`https://picsum.photos/v2/list?limit=${count}`);

    return response.data;
  } catch (error) {
    console.error('Error fetching random photos:', error);
    return [];
  }
};

export async function getServerSideProps() {
  const photos = await fetchRandomPhotos(1);

  return {
    props: {
      photos,
    },
  };
}
