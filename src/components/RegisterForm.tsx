import { useState } from "react";
import styles from '../styles/LoginRegisterForm.module.css'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

function RegisterForm() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    function registerWithEmailAndPassword(email: string, password: string) {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                toast.success('Vous êtes connecté!')
                // TODO: Ajouter le ID dans la BD MySQL
                navigate('/accueil')
            })
            .catch((error) => {
                switch (error.code) {
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
            <h2 className={styles.titre}>Inscription</h2>
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
                    <button onClick={() => registerWithEmailAndPassword(email, password)}>
                        Inscription
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;