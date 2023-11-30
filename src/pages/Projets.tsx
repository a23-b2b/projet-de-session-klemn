import styles from '../styles/AccueilConnecte.module.css'
import { useEffect } from 'react';

function Projets() {

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

        <div className={styles.h1}>
            <h1> Bonjour , Projets</h1>
        </div>

    );

}

export default Projets;