import styles from '../styles/AccueilConnecte.module.css'
import PosteBlogue from '../components/PosteBlogue';
import PosteQuestion from '../components/PosteQuestion';

function AccueilConnecte() {
    return (

        <div id={styles["ConteneurAccueil"]}>
            <div style={{ maxWidth: "700px", minWidth: "600px" }}>
            <PosteBlogue/>
            </div>
            <div style={{ maxWidth: "700px", minWidth: "600px" }}>
            <PosteQuestion/>
            </div>
            

        </div>



    );
}

export default AccueilConnecte;