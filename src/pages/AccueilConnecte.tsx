import styles from '../styles/AccueilConnecte.module.css'
import PosteBlogue from '../components/PosteBlogue';

function AccueilConnecte() {
    return (

        <div id={styles["ConteneurLanding"]}>
            <PosteBlogue></PosteBlogue>

        </div>



    );
}

export default AccueilConnecte;