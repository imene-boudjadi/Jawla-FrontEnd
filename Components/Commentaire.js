import React from "react";
import { useState } from "react";
import StarRating from "./StarRating";

import axios from "axios";

const Commentaire = ({lieu,user}) => {

  const [stars, setStars] = useState(0);
  const [leComm, setLeComm] = useState('');

  const handleRate = (rating) => {
    console.log(`La note sélectionnée est : ${rating}`);
    setStars(rating);
  };

  const handleChange = (event) => {
    setLeComm(event.target.value);
  }

  const handleClick = () => {
    // Logique pour envoyer les données avec Axios
    
    const data = {
      nombreEtoile : stars,
      commentaire : leComm
    };

    axios
      .post(`http://localhost:4000/utilisateur/AjouterCommentaire/${user}/${lieu}`, data)
      .then((response) => {
        console.log("Réponse de la requête POST :", response.data);
        // Gérer la réponse de la requête ici
      })
      .catch((error) => {
        console.error("Erreur lors de la requête POST :", error);
        // Gérer les erreurs de la requête ici
      });
  };

  return (
    <div className="commentaire-post">
      <h1>Donnez une note :</h1>
      <StarRating onRate={handleRate} />
      <div className="comm-input-container">
        <input name="commentaire" type="text" className="commentaire-input" required onChange={handleChange} value={leComm}/>
        <button className="btn-soumettre-commentaire" onClick={handleClick}>Soumettre</button>
      </div>
    </div>
  );
};

export default Commentaire;