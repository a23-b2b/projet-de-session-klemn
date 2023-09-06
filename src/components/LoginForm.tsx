import { useState } from "react";
import styles from '../styles/LoginRegisterForm.module.css'
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../database";
import toast from 'react-hot-toast';

function loginWithEmailAndPassword(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            toast.success('Vous êtes connecté!')
            // TODO: Ajouter le ID dans la BD MySQL
        })
        .catch((error) => {
            console.log(error.code)
            switch (error.code) {
                case 'auth/user-not-found':
                    toast.error('Le compte spécifié n\'existe pas.')
                    break;
                case 'auth/wrong-password':
                    toast.error('Le mot de passe est incorrect.')
                    break;
                default:
                    toast.error('Une erreur est survenue: ' + error.name)
                    break;
            }
        });
}

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    return (
        <div>
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

                <button onClick={() => loginWithEmailAndPassword(email, password)}>
                    Connexion
                </button>
            </div>
        </div>
    );
}

export default LoginForm;