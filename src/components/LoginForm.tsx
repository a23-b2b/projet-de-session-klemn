import { useState } from "react";
import styles from '../styles/LoginRegisterForm.module.css'
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase";
import toast from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";

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
                navigate('/accueilConnecte')
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

    return (
        <div className={styles.conteneur}>
            <h2 className={styles.titre}>Connexion</h2>
            <div className={styles.form}>
                <label className={styles.label}>Courriel</label>
                <input
                    className={styles.text_field}
                    type="email"
                    onChange={(e) => setEmail(e.target.value)} />

                <label className={styles.label}>Mot de passe</label>
                <input
                    className={styles.text_field}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)} />
                <div className={styles.button}>
                    <button onClick={() => loginWithEmailAndPassword(email, password)}>
                        Connexion
                    </button>
                </div>

            </div>
        </div>
    );
}

export default LoginForm;