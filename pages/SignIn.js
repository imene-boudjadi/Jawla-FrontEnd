import styles from '../styles/SignIn.module.css';
import cs from '../public/tipaza.png'
import Image from 'next/image';
import logo from '../public/Logo.png'
import Link from 'next/link';
import { useState } from 'react';
import axios  from 'axios';

export default function SignIn() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    mail: '',
    motdepasse: '',
    numeroDeTel: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Send form data to the server
    axios.post('http://localhost:3000/utilisateur/signUpUtilisateur', formData)
      .then(response => {
        console.log('Data sent successfully');
      })
      .catch(error => {
        if (error.response && error.response.data) {
          setFormData(prevData => ({
            ...prevData,
            error: error.response.data,
          }));
        }
        console.error('Error sending data:', error);
      });
  };
  

  return (
    <div className={styles.containerSignIn}>
        
                <div className={styles.sideOne}>
                      
                        <Image className={styles.logo} src={logo}/>
                        <div className={styles.title}>Create an account</div>
                        <div className={styles.nhavingAccount}>
                            <h>Already have an account?
                                <span><Link className={styles.linksign} href="/Home"> Login</Link></span>
                            </h>
                        </div>
                         <form className={styles.formSignIn} onSubmit={handleSubmit}>
                         <div className={styles.namelastname}>
                            <div className={styles.name}>
                                <label htmlFor="prenom">Name</label>
                                <br></br>
                                <br></br>
                                <input
                                placeholder=' Name'
                                type="text"
                                id="prenom"
                                name="prenom"
                                value={formData.prenom}
                                onChange={handleChange}
                                required
                                />
                            </div>
                            <div className={styles.lastname}>
                                <label htmlFor="nom">Last Name</label>
                                <br></br>
                                <br></br>
                                <input
                                placeholder=' Last Name'
                                type="text"
                                id="nom"
                                name="nom"
                                value={formData.nom}
                                onChange={handleChange}
                                required
                                />
                            </div>
                            </div>
                            <div className={styles.email}>
                                <label htmlFor="mail">Email</label>
                                <br></br>
                                <br></br>
                                <input
                                placeholder=' E-mail'
                                type="email"
                                id="mail"
                                name="mail"
                                value={formData.mail}
                                onChange={handleChange}
                                required
                                />
                            </div>
                            <div className={styles.numtel}>
                                <label htmlFor="numeroDeTel">Phone number</label>
                                <br></br>
                                <br></br>
                                <input
                                placeholder='xxxxxxxxxx'
                                type="number"
                                id="numeroDeTel"
                                name="numeroDeTel"
                                value={formData.numeroDeTel}
                                onChange={handleChange}
                                required
                                />
                            </div>
                            <div className={styles.password}>
                                <label htmlFor="motdepasse">Password</label>
                                <br></br>
                                <br></br>
                                <input
                                placeholder=' ************************'
                                type="password"
                                id="motdepasse"
                                name="motdepasse"
                                value={formData.motdepasse}
                                onChange={handleChange}
                                required 
                                />
                            </div>
                            <div className={styles.err}>
                            {formData.error && <div className={styles.errorMessage}>{formData.error}</div>}
                            </div>

                                    <button type="submit"className={styles.signInBtn}>Sign In</button>
                                
                            </form>
                    
                        
                </div>
                <div classname={styles.sideTwo}>
                    <Image className={styles.imgWilaya} src={cs}/>
                </div>
 </div>
 
  );

}