import { useState } from "react";
import styles from '../styles/LoginRegisterForm.module.css'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { error } from "console";
import { response } from "express";

function RegisterForm() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    // const [telephone, setTelephone] = useState('');
    const [username, setUsername] = useState('');
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [registerError, setRegisterError] = useState('')

    function registerWithEmailAndPassword(email: string, password: string) {
        if (password !== passwordConfirmation) {
            toast.error("Les mots de passe ne correspondent pas.");

        } else {
            createUserWithEmailAndPassword(auth, email, password)

                .then((userCredential) => {

                    const user = userCredential.user;
                    // Successfully created user, now make API call

                    return user;

                })
                .then((user) => {
                    fetch(process.env.REACT_APP_API_URL + '/inscription', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            username: username,
                            email: email,
                            prenom: prenom,
                            nom: nom,
                            id_compte: user.uid
                        })
                    }).then(response => response.json())
                        .then(response => {
                            console.log(response)

                            if (response.code == "ERR_USERNAME_TAKEN") {
                                toast.error(response.message);
                            }

                        }).catch((error) => {
                            console.log(error);
                            setRegisterError(error.code);
                        })


                }).catch((error) => {
                    console.log(error.code);
                    setRegisterError(error.code)

                    if (error.code === "auth/email-already-in-use") {
                        toast.error("L'adresse e-mail est déjà associée à un compte.");
                    } else if (error.code === "auth/invalid-email") {
                        toast.error("Le courriel est invalide.");
                    } else {
                        toast.error('Une erreur est survenue: ' + error.message);
                    }
                });

            // if (registerError) {
            //     if (registerError === "auth/email-already-in-use") {
            //         toast.error("L'adresse e-mail est déjà associée à un compte.");
            //     } else if (registerError === "auth/invalid-email") {
            //         toast.error("Le courriel est invalide.");

            //     } else if (registerError === "ERR_USERNAME_TAKEN") {
            //         toast.error("Le nom d'utilisateur existe déjà ");


            //     } else {
            //         toast.error('Une erreur est survenue: ' + registerError);
            //     }
            // }
        }

    }

    return (
        <div className={'global_conteneur'}>
            <h2 className={'global_title'}>Inscription</h2>
            <motion.div initial={{ opacity: 0, height: 323 }} animate={{ opacity: 1, height: "auto" }}>
                <div className={styles.form}>

                    <label className={'global_input_field_label'}>Nom d'utilisateur</label>
                    <input
                        className={'global_input_field'}
                        type="text"
                        onChange={(e) => setUsername(e.target.value)} />
                    <label className={'global_input_field_label'}>Courriel</label>

                    <input
                        className={'global_input_field'}
                        type="email"
                        onChange={(e) => setEmail(e.target.value)} />

                    <label className={'global_input_field_label'}>Mot de passe</label>
                    <input
                        className={'global_input_field'}
                        type="password"
                        onChange={(e) => setPassword(e.target.value)} />

                    <label className={'global_input_field_label'}>Confirmation mot de passe</label>

                    <input
                        className={'global_input_field'}
                        type="password"
                        onChange={(e) => setPasswordConfirmation(e.target.value)} />

                    <label className={'global_input_field_label'}>Nom</label>
                    <input
                        className={'global_input_field'}
                        type="text"
                        onChange={(e) => setNom(e.target.value)} />


                    <label className={'global_input_field_label'}>Prénom</label>
                    <input
                        className={'global_input_field'}
                        type="text"
                        onChange={(e) => setPrenom(e.target.value)} />


                    <div className={styles.containerBouton}>
                        <button className={'global_bouton'} onClick={() => registerWithEmailAndPassword(email, password)
                        } >
                            Inscription
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default RegisterForm;