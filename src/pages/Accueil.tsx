import { useNavigate } from 'react-router-dom';
import styles from '../styles/Accueil.module.css'

function Accueil() {
    const navigate = useNavigate()
    return (

        <div className={styles.div}>
            <div >
                <h1>Acceuil </h1>
                <p>Lien vers la page accueil pour les usages connecté</p>
                <div>
                    <h1 onClick={() => navigate('/accueilConnecte')}>Accueil Connecté</h1>
                </div>
            </div>

        </div>



    );
}

export default Accueil;
