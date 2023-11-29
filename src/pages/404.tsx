import styles from '../styles/Accueil.module.css'
import { useEffect } from 'react';

function Erreur404() {

    /*Set Theme on Refresh*/
    let hueLS = parseInt(window.localStorage.getItem('hue') || "");
    let saturationLS = parseInt(window.localStorage.getItem('saturation') || "");
     
    function changeTheme(hue: number, saturation: number) {
        document.documentElement.style.setProperty('--base_h', hue.toString())
        document.documentElement.style.setProperty('--base_s', saturation.toString() + "%")

    }

    useEffect(() => {
        changeTheme(hueLS, saturationLS);
      }, []);
    return (
        <div style={{ margin: "auto", minHeight: "100vh", textAlign: "center" }}>
            <h1 style={{fontSize:"5rem"}}>404</h1>
            <h2>Vous vous êtes perdu! La page que vous tentez d'atteindre n'existe pas.</h2>
        </div>
    );
}

export default Erreur404;