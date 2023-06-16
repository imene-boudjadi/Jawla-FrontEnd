import Link from "next/link"
import { useRouter } from "next/router";
import styles from '../styles/siteDetails.module.css'
import { useState } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import Slider from 'react-styled-carousel';
import { useSpringCarousel } from "react-spring-carousel";

import Commentaire from "./Commentaire";

import axios from 'axios';




const SiteDetails = ({lieu}) => {
    const [siteName, setSiteName] = useState("Mémorial du martyr");
    const [siteDescription, setSiteDescription] = useState(`The Maqam Echahid is a concrete monument commemorating the Algerian War. The monument was opened in 1982, on the 20th anniversary of Algeria's independence. It is fashioned in the shape of three standing palm leaves, which shelter the "Eternal Flame" under it. At the edge of each palm leaf is a statue of a soldier representing a stage of Algeria's struggle for independence.`);
    const [imageLink, setImageLink] = useState('https://i.ibb.co/SKLwVHT/monument.png');
    const [infoDisplayed, setInfoDisplayed] = useState('selectionner une icone pour avoir des informations');
    const [buttonClicked, setButtonClicked] = useState('contact');
    const [quizAvailable, setQuizAvailable] = useState(true);
    const [HawassClicked, setHawassClicked] = useState(false);
    const images = [
        "https://i.ibb.co/XJcdHzj/Banner.jpg",
        "https://i.ibb.co/NC22JKs/monument.png",
        "https://i.ibb.co/djMg3gP/museum.png",
        "https://i.ibb.co/tYpqGqF/park.png",
        "https://i.ibb.co/qxQ9N2L/LOGO-ETIC.png",
        "https://i.ibb.co/6rzQSbR/LOGO-ETIC-BLANC.png",

    ];
    const events = [
        {
            id: 0,
            name: 'Event 1',
            description: 'Lorem ipsum dolor sit amet'
        },
        {
            id: 1,
            name: 'Event 2',
            description: 'Description of Event 2'
        },
        {
            id: 2,
            name: 'Event 3',
            description: 'Description of Event 3'
        }
    ];


    for (let i = 0; i < events.length; i++) {
        const event = events[i];
        const imageIndex = i % images.length;
        const image = images[imageIndex];

        event.image = image;
    }

    const HawassClick = () => {
        setHawassClicked(!HawassClicked);
    }
    

    


    const like = async () => {
        try {
          const response = await axios.post(`http://localhost:4000/utilisateur/AjouterAuFavoris/7/${lieu.idPointInteret}`);
          console.log(response.data); // Handle the response data
        } catch (error) {
          console.error(error); // Handle the error
        }
      };



    return (
        <div className={styles.container}>
            
            
            {/* <div className={styles.siteInformation}>
                <h1 className={styles.subtitles}>Informations</h1>
                <div className={styles.infoIcons}>
                    <button onClick={() => handleButtonClick('transport')}>
                        <img className={styles.iconButton} src="https://i.ibb.co/8dsW001/transport.png" id="transport" />
                    </button>
                    <button onClick={() => handleButtonClick('respo')}>
                        <img className={styles.iconButton} src="https://i.ibb.co/4t6Hbn4/respo.png" id="respo" />
                    </button>
                    <button onClick={() => handleButtonClick('contact')}>
                        <img className={styles.iconButton} src="https://i.ibb.co/vvGzDFn/contact.png" id="contact" />
                    </button>
                    <button onClick={() => handleButtonClick('website')}>
                        <img className={styles.iconButton} src="https://i.ibb.co/cvY2s1r/website.png" id="website" />
                    </button>
                    <button onClick={() => handleButtonClick('localisation')}>
                        <img className={styles.iconButton} src="https://i.ibb.co/gS00vNt/localisation.png" id="localisation" />
                    </button>
                </div>
                <div className={styles.infoDetails}>
                    <img className={`${styles.pointyThing} ${buttonClicked === 'contact' ? styles.translateXContact : ''} ${buttonClicked === 'transport' ? styles.translateXTransport : ''} ${buttonClicked === 'respo' ? styles.translateXRespo : ''} ${buttonClicked === 'localisation' ? styles.translateXLocalisation : ''} ${buttonClicked === 'website' ? styles.translateXWebsite : ''}`}
                        src="https://i.ibb.co/3ymQ1cc/pointy-Thing.png"
                        id="pointyThing" />
                    <span className={styles.iconDetails}>{infoDisplayed}</span>
                </div>
            </div> */}
            <div className={styles.commentsDiv}>
                <h1 className={styles.subtitles}>Commentaires</h1>
                <Commentaire lieu={lieu?.idPointInteret} user={7} />
            </div>
            <div className={styles.offresDiv}>
                <h1 className={styles.subtitles}>Evènements & offres</h1>
                {events.map(event => (
                    <div key={event.id} className={styles.eventE}>
                        <div className={styles.eventND}>
                            <h1 className={styles.subsubtitles}>{event.name}</h1>
                            <p className={styles.plainText}>{event.description}</p>
                        </div>
                        <div className={styles.eventI}>
                            <img className={styles.iconButton} src={event.image} id="localisation" />
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.stickyDiv}>
                {HawassClicked === false ?
                    <div className={styles.HawassDiv1}>
                        <img className={styles.Hawass} src="https://i.ibb.co/jZpLQKD/leading-To-Quizz.png" id="quiz" onClick={HawassClick} />
                    </div>
                    : (
                        <div className={styles.HawassDiv2}>
                            <span className={styles.HawassSpan}>
                                <a href="/home/quiz">Click here to take the quiz</a>
                            </span>
                            <img className={styles.Hawass} src="https://i.ibb.co/rtfd49h/interested-In-Quizz.png" id="quiz" onClick={HawassClick} />
                        </div>
                    )
                }
            </div>
        </div >
    )
}

export default SiteDetails