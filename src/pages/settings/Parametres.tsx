import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import styles from '../../styles/Parametres.module.css'
import ModifierProfil from './ModifierProfil';
import { motion, AnimatePresence } from "framer-motion";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { useEffect, useState } from 'react';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { PiLayoutFill } from 'react-icons/pi';
import { GoShieldLock } from "react-icons/go";

function Parametres() {
    const navigate = useNavigate()
    const [firebaseLoading, setFirebaseLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    const [selectedSettingsItem, setSelectedSettingsItem] = useState(0);

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
    }, [loggedIn]);

    if (!loggedIn && !firebaseLoading) {
        navigate('/')
    }

    /*Set Theme on Refresh*/
    let hueLS = parseInt(window.localStorage.getItem('hue') || "");
    let saturationLS = parseInt(window.localStorage.getItem('saturation') || "");
     
    function changeTheme(hue: number, saturation: number) {
        document.documentElement.style.setProperty('--base_h', hue.toString())
        document.documentElement.style.setProperty('--base_s', saturation.toString() + "%")

    }

    useEffect(() => {
        if (localStorage.getItem("hue") === null || localStorage.getItem("saturation") === null ) {
            changeTheme(270, 30);
        } else {
            changeTheme(hueLS, saturationLS);
        }
      }, []);

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <div className={styles.sidebar}>

                    <Link className={styles.link} to={'profil'} onClick={() => setSelectedSettingsItem(1)} >
                        <div className={`${styles.settings_link} ${selectedSettingsItem === 1 ? styles.selected : ''}`} id={styles.first_link}>
                            <span>
                                <BsFillPersonLinesFill className={styles.setting_icon} />
                                <span className={styles.setting_link_title}>Profil</span>
                            </span>
                        </div>
                    </Link>

                    <Link className={styles.link} to={'securite'} onClick={() => setSelectedSettingsItem(2)} >
                        <div className={`${styles.settings_link} ${selectedSettingsItem === 2 ? styles.selected : ''}`}>
                            <span>
                                <GoShieldLock className={styles.setting_icon} />
                                <span className={styles.setting_link_title}>Sécurité</span>
                            </span>
                        </div>
                    </Link>

                    <Link className={styles.link} to={'interface'} onClick={() => setSelectedSettingsItem(3)} >
                        <div className={`${styles.settings_link} ${selectedSettingsItem === 3 ? styles.selected : ''}`}>
                            <span>
                                <PiLayoutFill className={styles.setting_icon} />
                                <span className={styles.setting_link_title}>Interface</span>
                            </span>
                        </div>
                    </Link>
                </div>

                <Outlet />

            </div>
        </div>

    );

}

export default Parametres;