import styles from '../styles/AccueilConnecte.module.css'
import PosteBlogue from '../components/Post/PosteBlogue';
import PosteQuestion from '../components/PosteQuestion';
import { useEffect } from 'react';

function AccueilConnecte() {

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

        <div id={styles["ConteneurAccueil"]}>
            <div id={styles.BarreNavigation}>
                {/* Barre de navigations */}
                <input className="global_input_field" type='text' id='searchBar' placeholder="Recherche..."></input>
                {/* <img src={search} width="30" height="30" alt="searchLoop" /> */}

            </div>
            <div style={{ maxWidth: "700px"}}>
            {/*<PosteBlogue/> */}
            </div>
            <div style={{ maxWidth: "700px"}}>
            </div>

        </div>



    );
}

export default AccueilConnecte;