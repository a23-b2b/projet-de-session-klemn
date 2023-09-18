import { useEffect, useState } from 'react';
import styles from '../../styles/ModifierProfil.module.css'
import { motion, AnimatePresence } from "framer-motion";
import { EmailAuthProvider, onAuthStateChanged, reauthenticateWithCredential, updateEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import toast from 'react-hot-toast';

function ModifierProfil() {
    const [firebaseLoading, setFirebaseLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    const [newEmail, setNewEmail] = useState('');
    const [newEmailConfirmation, setNewEmailConfirmation] = useState('');


    const changeEmail = () => {

        let password = prompt('Pour continuer, entrez votre mot de passe');

        

        let user = auth.currentUser;

        if (user && user.email && password) {
            var credential = EmailAuthProvider.credential(
                user.email,
                password
            );

            reauthenticateWithCredential(user, credential).then((user) => {
                updateEmail(user.user, newEmail).then(() => {
                    toast.success("Courriel mis à jour!")
                }).catch((error) => {
                    toast.error(`Une erreur est survenue! (${error.code})`)
                });
            }).catch((error) => {
                toast.error(`Une erreur est survenue! (${error.code})`)
                // An error ocurred
                // ...
            });

        }
    }



    return (
        <motion.div className={styles.container} initial={{ x: "-15%", opacity: 0 }} animate={{ x: "5%", opacity: 1 }}>
            <h1>Modifier Profil</h1>

            <h3>Modifier le courriel</h3>

            <div className={styles.form}>
                <label className={'global_input_field_label'}>Nouveau courriel</label>
                <input
                    className={'global_input_field'}
                    type="email"
                    onChange={(e) => setNewEmail(e.target.value)}
                />
                <label className={'global_input_field_label'}>Confirmez le courriel</label>
                <input
                    className={'global_input_field'}
                    type="email"
                    onChange={(e) => setNewEmailConfirmation(e.target.value)}
                />
                <button className={'global_button'} onClick={() => changeEmail()} disabled={newEmail !== newEmailConfirmation}>
                    Inscription
                </button>
            </div>
        </motion.div>
    );
}

export default ModifierProfil;