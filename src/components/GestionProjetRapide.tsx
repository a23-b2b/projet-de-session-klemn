import styles from '../styles/GestionProjetRapide.module.css';
import filtre from '../images/icn-filter.png';
import poubelle from '../images/icn-delete.png';
import ouvert from '../images/icn-open.png';
import collaboration from '../images/icn-collaboration.png';



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
            
                    {/* Rang/e du haut */}
                    
                        <div className={styles.conteneur_titre_projet}>
                            <p className={styles.nom_utilisateur}>Titre: {props.titre}</p>
                        </div>

                        <div className={styles.fonc1}>
                            <button onClick={() => { /* TODO: Filter by */ }}>
                                    <img src={filtre} className={styles.icone} />
                            </button>
                        </div>

                        <div className={styles.fonc2}>
                            <button onClick={() => { /* TODO: Delete project */ }}>
                                    <img src={poubelle} className={styles.icone} />
                            </button>
                        </div>
                    

                    


                    {/* Rang/e du bas */}


                    
                        <div className={styles.conteneur_description_projet}>
                            <p className={styles.titre_projet}>Description: {props.description}</p>
                        </div>

                        <div className={styles.fonc3}>
                            <button onClick={() => { /* TODO: Add user to project by username, UID or email */ }}>
                                    <img src={collaboration} className={styles.icone} />
                            </button>
                        </div>

                        <div className={styles.fonc4}>
                            <button onClick={() => { /* TODO: Make project open to collaborations */ }}>
                                    <img src={ouvert} className={styles.icone} />
                            </button>
                        </div>
                    
                

                
            </div>
        </>
    )
} 

export default GestionProjetRapide