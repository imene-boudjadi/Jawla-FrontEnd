

import styles from '../styles/Home.module.css';
import cs from '../public/tipaza.png'
import Image from 'next/image';
import logo from '../public/Logo.png'
import Link from 'next/link';
import { useState } from 'react';
import logoggl from '../public/Logoggl.png';
import axios  from 'axios';




export default function Login() {
  const [formData, setFormData] = useState({

    email: '',
    password: '',
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
    axios.post('http://localhost:3000/utilisateur/loginutilisateur', formData)
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
    <div className={styles.containerLogin}>
         <div classname={styles.sideOne}>
                <Image className={styles.imgWilaya} src={cs}/>
            </div>
            <div className={styles.sidetwo}>
                <Image className={styles.logo} src={logo}/>
                <div className={styles.title}>Log in to your account</div>
                <div className={styles.havingAccount}>
                    <h>Don't Have An Account?
                        <span><Link className={styles.linksign} href="/SignIn"> Sign Up!</Link></span>
                    </h>
                </div>
                <form className={styles.formLogIn} onSubmit={handleSubmit}> 
                            <div className={styles.email}>
                                <label htmlFor="email">Email</label>
                                <br></br>
                                <br></br>
                                <input
                                placeholder=' E-mail'
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                />
                            </div>
                            <div className={styles.password}>
                                <label className ={styles.lab}htmlFor="password">Password</label>
                                <br></br>
                                <br></br>
                                <input
                                placeholder=' ************************'
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                />
                            </div>
                            <br></br>
                            {formData.error && <div className={styles.errorMessage}>{formData.error}</div>}
                            <br></br>
                                    <button type="submit"className={styles.signInBtn}>Sign In</button>
                                    
                            </form>
                           
                            

                </div>
            </div>
    
  );
}