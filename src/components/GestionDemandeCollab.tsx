import styles from '../styles/GestionCollab.module.css';
import accepter from '../images/icn-check-mark.png';
import refuser from '../images/icn-cross-mark.png'
export interface PropDemandeCollab {
    // ID de compte sera insert dans collaborateur comme FK
    id_compte: String,
    url_image_profil: String,
    nom_utilisateur: String,

    // A quel projet le collaborateur sera attaché
    id_projet: String,
    titre_projet: String,
    description_projet: String    
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
                <img className={styles.image_profil} src={props.url_image_profil.toString()} alt="Image de profil du collaborateur potentiel" />

                <div className={styles.conteneur_info_compte}>
                    <p className={styles.nom_utilisateur}>@{props.nom_utilisateur}</p>
                    <p className={styles.titre_projet}>{props.titre_projet}</p>
                </div>
                <div className={styles.bouton}>
                    <img className={styles.icone} src={accepter} alt="Bouton accepter" />
                </div>
                <div className={styles.bouton}>
                    <img className={styles.icone} src={refuser} alt="Bouton refuser" />
                </div>
            </div>
        </>
    )
} 

export default GestionDemandeCollab