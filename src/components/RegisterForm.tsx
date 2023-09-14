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
            })
            .then((user) => {
                fetch('http://localhost:1111/inscription', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: username,
                        email: email,
                        telephone: telephone,
                        prenom: prenom,
                        nom: nom,
                        id_compte: user.uid
                    }),
                }).catch((error) => {
                    console.log(error)
                })
            }).then(() => {
                toast.success('Vous êtes connecté!')
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
            <motion.div initial={{ opacity: 0, height: 323, scale: 0.9 }} animate={{ opacity: 1, height: "auto", scale: 1 }} >
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

                    <button className={'global_button'} onClick={() => registerWithEmailAndPassword(email, password)}>
                        Inscription
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

export default RegisterForm;