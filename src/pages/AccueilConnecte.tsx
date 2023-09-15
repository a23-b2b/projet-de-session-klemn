import styles from '../styles/AccueilConnecte.module.css'
import PosteBlogue from '../components/PosteBlogue';
import PosteQuestion from '../components/PosteQuestion';

function AccueilConnecte() {
    return (

        <div id={styles["ConteneurAccueil"]}>
            <div style={{ maxWidth: "700px"}}>
            {/*<PosteBlogue/> */}
            </div>
            <div style={{ maxWidth: "700px"}}>
            </div>
            

        </div>



    );
}

export default AccueilConnecte;