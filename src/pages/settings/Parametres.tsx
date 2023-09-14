import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import styles from '../../styles/Parametres.module.css'
import ModifierProfil from './ModifierProfil';
import { motion, AnimatePresence } from "framer-motion";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { useEffect, useState } from 'react';

function Parametres() {
    const navigate = useNavigate()
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

    if (!loggedIn && !firebaseLoading) {
        navigate('/')
    }

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <div className={styles.sidebar}>

                    <Link className={styles.link} to={'profil'}>
                        <div className={styles.settings_link} id={styles.first_link}>Profil</div>
                    </Link>
                </div>

                <div className={styles.content}>

                </div>

                <Outlet />

            </div>
        </div>

    );

}

export default Parametres;