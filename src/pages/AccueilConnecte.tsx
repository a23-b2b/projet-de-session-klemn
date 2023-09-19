import styles from '../styles/AccueilConnecte.module.css'
import PosteBlogue from '../components/PosteBlogue';
import PosteQuestion from '../components/PosteQuestion';

function AccueilConnecte() {
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