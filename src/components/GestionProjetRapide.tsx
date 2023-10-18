import styles from '../styles/GestionProjetRapide.module.css';
import filtre from '../images/icn-filter.png';
import poubelle from '../images/icn-delete.png';
import ouvert from '../images/icn-open.png';
import collaboration from '../images/icn-collaboration.png';
import fermer from '../images/icn-closed.png';



export interface PropsProjet {
    id_projet: String,
    titre: String,
    description: String,
    compte_id_proprio: String, 
    est_ouvert: Boolean
}

function GestionProjetRapide(props: PropsProjet) {
    
    return (
        <>
            <div className={styles.ligne_gestion_projet}>
            
                    {/* Rang/e du haut */}
                    
                        <div className={styles.conteneur_titre_projet}>
                            <p>Titre: {props.titre}</p>
                        </div>

                        <div className={styles.filtre}>
                            <button onClick={() => { /* TODO: Filter by */ }}>
                                    <img src={filtre} className={styles.icone} />
                            </button>
                        </div>

                        <div className={styles.poubelle}>
                            <button onClick={() => { /* TODO: Delete project */ }}>
                                <img src={poubelle} className={styles.icone} />
                            </button>
                        </div>
                    

                    


                        {/* Rang/e du bas */}


                    
                        <div className={styles.conteneur_description_projet}>
                            <p>Description: {props.description}</p>
                        </div>

                        <div className={styles.collaboration}>
                            <button onClick={() => { /* TODO: Add user to project by username, UID or email */ }}>
                                    <img src={collaboration} className={styles.icone} />
                            </button>
                        </div>

                        <div className={styles.ouvert}>
                            <button onClick={() => { /* TODO: Make project open to collaborations */ }}>
                                {props.est_ouvert == true && 
                                    <img src={ouvert} className={styles.icone} alt='Ce projet est ouvert au collab.' />
                                }
                                {props.est_ouvert == false && 
                                    <img src={fermer} className={styles.icone} alt='Ce projet est ferme au collab.' />
                                }
                            </button>
                        </div>
                    
                

                
            </div>
        </>
    )
} 

export default GestionProjetRapide