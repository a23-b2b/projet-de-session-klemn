import { useState } from "react";
import styles from '../styles/LoginRegisterForm.module.css'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function RegisterForm() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [telephone, setTelephone] = useState('');
    const [username, setUsername] = useState('');
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');

    function registerWithEmailAndPassword(email: string, password: string) {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                return user;
            }).catch((error) => {
                switch (error.code) {
                    case 'auth/invalid-email':
                        toast.error('Le courriel est invalide.')
                        break;
                    case 'auth/email-already-exists':
                        toast.error('Le courriel est déjà inscrit.');
                        break;

                    case 'auth/weak-password':
                        toast.error('Le mot de passe est trop faible.');
                        break;
                    case 'auth/wrong-password':
                        toast.error('Le mot de passe est invalide. Il doit faire au moins 6 caractères.');
                        break;
                    default:
                        toast.error('Une erreur est survenue: ' + error.name)
                        break;
                }
            });
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


                    <label className={'global_input_field_label'}>Numéro de téléphone</label>
                    <input
                        className={'global_input_field'}
                        type="tel"
                        onChange={(e) => setTelephone(e.target.value)} />

                    <div className={styles.containerBouton}>
                        <button className={'global_bouton'} onClick={() => registerWithEmailAndPassword(email, password)}>
                            Inscription
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default RegisterForm;