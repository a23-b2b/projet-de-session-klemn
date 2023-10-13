import styles from '../styles/GestionCollab.module.css';

export interface PropDemandeCollab {
    // ID de compte sera insert dans collaborateur comme FK
    id_compte: String,
    // A quel projet le collaborateur sera attaché
    id_projet: String,
    
    titre: String,
    description: String    
}

/*
Si la demande est accepter, on fait un insert dans la table collaborateur
Sinon on change le statut de la demande a refusé
Dans tout les cas il faut supprimer la demande apres un certain temps
*/ 

function GestionDemandeCollab(props: PropDemandeCollab) {
    // 
    
    
    return (
        <>
            <div className={styles.ligne_gestion_demande_collab}>

            </div>
        </>
    )
} 

export default GestionDemandeCollab