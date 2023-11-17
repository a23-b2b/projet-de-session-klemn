import { useState } from "react";
import styles from '../styles/LoginRegisterForm.module.css'
import { GithubAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth } from "../firebase";
import toast from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AiFillGithub } from 'react-icons/ai';

function LoginForm() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

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

    function handleGithubLogin(): void {
        const provider = new GithubAuthProvider();

        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                const credential = GithubAuthProvider.credentialFromResult(result);
                if (credential) {
                    const token = credential.accessToken;
                    console.log("Credentials: " + JSON.stringify(credential))
                }

                // The signed-in user info.
                const user = result.user;
                if (user) {
                    console.log("User info: " + JSON.stringify(user))
                }                  
                
                // si uid pas dans BD mysql il faut logout et redirect /authenticate

                navigate('/')
            }).catch((error) => {
                console.log(JSON.stringify(error))
            });
    }

    return (

        <div className={'global_conteneur'}>
            <h2 className={'global_title'}>Connexion</h2>
            <motion.div initial={{ opacity: 0, height: 660 }} animate={{ opacity: 1, height: "auto"}}>
                <div className={styles.form}>
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
                    <div className={styles.containerBouton}>
                        <button className={'global_bouton'} onClick={() => loginWithEmailAndPassword(email, password)}>
                            Connexion
                        </button>

                        <button className={'global_bouton'} style={{ margin: '10px' }} onClick={() => handleGithubLogin()}>
                            Connexion avec GitHub <AiFillGithub />
                        </button>
                    </div>

                </div>
            </motion.div>
        </div>
    );
}

export default LoginForm;