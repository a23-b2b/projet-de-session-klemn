import styles from '../styles/GestionCollab.module.css';
import accepter from '../images/icn-check-mark.png';
import refuser from '../images/icn-cross-mark.png'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import testProfilePic from '../images/test_pfp.png'
import toast from 'react-hot-toast';
import METHODE from '../pages/GestionCollab'

export interface PropDemandeCollab {
    // ID de compte sera insert dans collaborateur comme FK
    id_compte: String,
    url_image_profil: string,
    nom_utilisateur: String,

    // A quel projet le collaborateur sera attaché
    id_projet: String,
    titre_projet: String,
    description_projet: String,
    id_demande_collab: String
}

/*
Si la demande est accepter, on fait un insert dans la table collaborateur et update pour vrai
Sinon on change le statut de la demande a refusé
TODO: Dans tout les cas il faut supprimer la demande refusé apres un certain temps
*/

function GestionDemandeCollab(props: PropDemandeCollab) {
    const navigate = useNavigate();
    const accepterDemande = 'true';
    const refuserDemande = 'false';

    function repondreDemandeCollab(reponse: String) {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // https://builtin.com/software-engineering-perspectives/react-api 
                user.getIdToken(/* forceRefresh */ true).then((idToken) => {
                    fetch(`${process.env.REACT_APP_API_URL}/collab/p/${props.id_projet}/${props.id_compte}/${reponse}`, {
                        method: 'POST',
                        headers: { 
                            'Content-Type': 'application/json' ,
                            'authorization': idToken
                        },
                        body: JSON.stringify({
                            id_demande_collab: props.id_demande_collab,
                        })
                })})
                .then(response => response.json())
                .catch(error => toast(error.toString()));
            } else {
                navigate("/authenticate")
            }
        })
    }

    return (
        <>
            <div className={styles.ligne_gestion_demande_collab}>
                {/*Info de compte*/}
                <div className={styles.conteneur_image_profil}>
                    <img className={styles.image_profil} src={testProfilePic} alt="Image de profil du collaborateur potentiel" />
                </div>


                <div className={styles.conteneur_info_compte}>
                    <p className={styles.nom_utilisateur}>@{props.nom_utilisateur}</p>
                    <p className={styles.titre_projet}>{props.titre_projet}</p>
                </div>

                <div className={styles.conteneur_bouton}>
                    {/*Boutons pour accepter et refuser une demande de collab respectivement*/}
                    <div className={styles.bouton}>
                        <div>
                            <button onClick={() => { repondreDemandeCollab(accepterDemande) }}>
                                <img src={accepter} className={styles.icone} />
                            </button>
                        </div>

                        <div>
                            <button onClick={() => { repondreDemandeCollab(refuserDemande) }}>
                                <img src={refuser} className={styles.icone} />
                            </button>
                        </div>

                    </div>
                    
                </div>


            </div>
        </>
    )
}

export default GestionDemandeCollab