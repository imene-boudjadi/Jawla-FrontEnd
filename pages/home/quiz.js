import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '../../styles/quizz.module.css'
import { useState } from 'react'


const inter = Inter({ subsets: ['latin'] })

function Quizz() {

  const [points, setPoints] = useState(0);
  const [nomSite, setNomSite] = useState('Le monument du martyr');
  const [descriptionSite, setDescriptionSite] = useState(`The monument was opened in 1982, on the 20th anniversary of Algeria's independence. It is fashioned in the shape of three standing palm leaves, which shelter the "Eternal Flame" under it. At the edge of each palm leaf is a statue of a soldier representing a stage of Algeria's struggle for independence.`);
  const [imageLink, setImageLink] = useState('https://i.ibb.co/SKLwVHT/monument.png');
  const [maxQuestionNumber, setMaxQuestion] = useState(0);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [currentQuestionDescription, setCurrentQuestionDescription] = useState(`Which year was the martyr memorial built?`);
  const [buttonCount, setButtonCount] = useState(4);
  const [disabledButtons, setDisabledButtons] = useState(Array(buttonCount).fill(false));






  const handleButtonClick = (buttonIndex) => {
    setDisabledButtons(Array(buttonCount).fill(true));
    setDisabledButtons((prevDisabledButtons) => {
      const updatedDisabledButtons = [...prevDisabledButtons];
      updatedDisabledButtons.push(false);
      return updatedDisabledButtons;
    });
    console.log(`Button ${buttonIndex + 1} clicked.`);
  };



  const renderButtons = () => {
    const buttons = [];

    for (let i = 0; i < buttonCount; i++) {
      buttons.push(
        <button id={`buttonsuggestions${i + 1}`} key={i} onClick={() => handleButtonClick(i)} disabled={disabledButtons[i]}>
          Button {i + 1}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className={styles.container}>
      <div className={styles.descriptionDiv}>
        <h1 className={styles.title}>Points : {points}</h1>
        <div className={styles.name}>
          <img className={styles.categoryIcon} src={imageLink} alt="category" />
          <p className={styles.title}>{nomSite}</p>
        </div>
        <p className={styles.paragraphDescription}>{descriptionSite}</p>
      </div>
      <div className={styles.hawass}>
        <img className={`${styles.hawassImage} ${styles.movedImage}`} src='https://i.ibb.co/Gvmyt3x/quizz.png' alt="hawass" />
      </div>
      <div className={styles.questionDiv}>
        <span className={styles.questionNumber}>
          Question {currentQuestionNumber}/{maxQuestionNumber}
        </span>
        <div className={styles.coloredDiv}>
          <p className={styles.question}>{currentQuestionDescription}</p>
          <div className={styles.buttonsDiv}>
            {renderButtons()}
          </div>
          <div className={styles.next}>
            <button className={styles.nextButton}>Suivant ►</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Quizz