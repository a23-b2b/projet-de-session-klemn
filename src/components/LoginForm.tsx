import { useState } from "react";
import styles from '../styles/LoginRegisterForm.module.css'
import { signInWithCustomToken, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase";
import toast from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Client } from "@passwordlessdev/passwordless-client";

function LoginForm() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const passwordlessClient = new Client({
        apiKey: "klemn:public:8557b931c74a43ae8990c94bbb5aa62c"
    });

    function loginWithEmailAndPassword(email: string, password: string) {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                toast.success('Vous êtes connecté!')
                // TODO: Ajouter le ID dans la BD MySQL
                navigate('/')
            })
            .catch((error) => {
                switch (error.code) {
                    case 'auth/user-not-found':
                        toast.error('Le compte spécifié n\'existe pas.')
                        break;
                    case 'auth/wrong-password':
                        toast.error('Le mot de passe est incorrect.')
                        break;
                    case 'auth/invalid-email':
                        toast.error('Le courriel est invalide.')
                        break;
                    default:
                        toast.error('Une erreur est survenue: ' + error.name)
                        break;
                }
            });
    }

    function loginWithPasskey() {
        passwordlessClient.signinWithDiscoverable().then(token => {
            fetch(process.env.REACT_APP_API_URL + '/user/passkeys/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token["token"]
                })
            }).then(response => response.json()).then(json => {
                const customToken = json["customToken"];

                signInWithCustomToken(auth, customToken).then((user) => {
                    toast.success('Vous êtes connecté!')
                    navigate('/')
                    
                }).catch((error) => {
                    console.log(error)
                    toast.error(`Une erreur est survenue: (${error.code})`)
                })
            })
        })
    }

    return (

        <div className={'global_container_1'}>
            <h2 className={'global_title'}>Connexion</h2>
            <motion.div initial={{ opacity: 0, height: 660 }} animate={{ opacity: 1, height: "auto" }}>
                <div className={styles.form}>
                    <label className={'global_label'}>Courriel</label>
                    <input
                        className={'global_input_field'}
                        type="email"
                        onChange={(e) => setEmail(e.target.value)} />

                    <label className={'global_label'}>Mot de passe</label>
                    <input
                        className={'global_input_field'}
                        type="password"
                        onChange={(e) => setPassword(e.target.value)} />
                    <div className={styles.containerBouton}>
                        <button className={'global_selected_bouton'} onClick={() => loginWithEmailAndPassword(email, password)}>
                            Connexion
                        </button>
                    </div>

                </div>

                <div className={styles.containerBouton}>
                    <button className={'global_selected_bouton'} onClick={() => loginWithPasskey()}>
                        Se connecter avec Passkey
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

export default LoginForm;