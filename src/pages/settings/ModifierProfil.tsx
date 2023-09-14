import { useEffect, useState } from 'react';
import styles from '../../styles/ModifierProfil.module.css'
import { motion, AnimatePresence } from "framer-motion";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';

function ModifierProfil() {
    const [firebaseLoading, setFirebaseLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setFirebaseLoading(false)
                setLoggedIn(true)
            }

            else {
                setFirebaseLoading(false)
                setLoggedIn(false)
            }
        })
    })
    
    return (
        <motion.div className={styles.container} initial={{ x: "-15%", opacity: 0 }} animate={{ x: "5%", opacity: 1 }}>
            <h1>Modifier Profil</h1>

            <h2>Modifier le courriel</h2>

            <div className={styles.form}>
                <label className={'global_input_field_label'}>Nom d'utilisateur</label>
                <input
                    className={'global_input_field'}
                    type="text"
                // onChange={(e) => setUsername(e.target.value)} 
                />
                <label className={'global_input_field_label'}>Courriel</label>
                <input
                    className={'global_input_field'}
                    type="text"
                // onChange={(e) => setUsername(e.target.value)} 
                />
            </div>
        </motion.div>
    );
}

export default ModifierProfil;