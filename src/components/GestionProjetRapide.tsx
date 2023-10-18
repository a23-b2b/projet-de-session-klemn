import styles from '../styles/GestionCollab.module.css';

export interface PropsProjet {
    id_projet: String,
    titre: String,
    description: String,
    compte_id_proprio: String, 
    est_ouvert: String
}

function GestionProjetRapide(props: PropsProjet) {
    
    return (
        <>
            <div className={styles.ligne_gestion_projet}>
                
            </div>
        </>
    )
} 

export default GestionProjetRapide