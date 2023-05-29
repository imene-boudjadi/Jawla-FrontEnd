import Link from "next/link"
import { useRouter } from "next/router";
import styles from '../styles/siteDetails.module.css'
import { useState } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import Slider from 'react-styled-carousel';
import { useSpringCarousel } from "react-spring-carousel";



const SiteDetails = () => {
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
    const handleButtonClick = (buttonId) => {
        switch (buttonId) {
            case 'transport':
                setInfoDisplayed('site.transport');
                setButtonClicked('transport');
                break;
            case 'respo':
                setInfoDisplayed('site.respo');
                setButtonClicked('respo');
                break;
            case 'contact':
                setInfoDisplayed('site.contact');
                setButtonClicked('contact');

                break;
            case 'website':
                setInfoDisplayed('site.website');
                setButtonClicked('website');

                break;
            case 'localisation':
                setInfoDisplayed('site.localisation');
                setButtonClicked('localisation');

                break;
            default:
                setInfoDisplayed('selectionner une icone pour avoir des informations');
                setButtonClicked('contact');

                break;
        }
    };
    const updatedImages = images.map((image, index) => ({
        id: index,
        url: image,
    }));

    const { carouselFragment, thumbsFragment, slideToPrevItem, slideToNextItem, slideToItem } = useSpringCarousel({
        withLoop: true,
        withThumbs: true,
        itemsPerSlide: 1,
        slideAmount: 375,
        freeScroll: false,
        items: updatedImages.map((image) => ({
            renderItem: <img className={styles.siteImage} src={image.url} alt="share" />,
            renderThumb: <button onClick={() => slideToItem(image.id)} ><img className={styles.siteImage} src={image.url} alt="share" /></button>,
        }))
    })
    return (
        <div className={styles.container}>
            <div className={styles.nameContainer}>
                <img className={styles.categoryIcon} src={imageLink} alt="category" />
                <h1 className={styles.siteName}>
                    {siteName}
                </h1>
                <div className={styles.topButtons}>
                    <button className={styles.likeButton}>
                        <img className={styles.Icon} src="https://i.ibb.co/Y8tRjfR/like-Button.png" alt="like" />
                    </button>
                    <button className={styles.shareButton}>
                        <img className={styles.Icon} src="https://i.ibb.co/0p50tpj/share-Button.png" alt="share" />
                    </button>
                </div>
            </div>
            <div className={styles.imageSliderContainer}>
                <button className={styles.nextPrevButton} onClick={slideToPrevItem}>
                    <img className={styles.Icon} src="https://i.ibb.co/NWHCfTg/left.png" alt="prev" />
                </button>
                <div className={styles.slider}>
                    {carouselFragment}
                </div>
                <button className={styles.nextPrevButton} onClick={slideToNextItem}>
                    <img className={styles.Icon} src="https://i.ibb.co/hHdrq0s/right.png" alt="next" />
                </button>
            </div>
            <div className={styles.thumbSliderContainer}>{thumbsFragment}</div>
            <div className={styles.siteDescription}>
                <h1 className={styles.subtitles}>Description</h1>
                <p className={styles.plainText}>{siteDescription}</p>
            </div>
            <div className={styles.siteInformation}>
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
            </div>
            <div className={styles.commentsDiv}>
                <h1 className={styles.subtitles}>Commentaires</h1>
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
                                <a href="/quiz">Click here to take the quiz</a>
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