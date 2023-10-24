import styles from '../styles/GestionProjetRapide.module.css';
import filtre from '../images/icn-filter.png';
import poubelle from '../images/icn-delete.png';
import ouvert from '../images/icn-open.png';
import collaboration from '../images/icn-collaboration.png';
import fermer from '../images/icn-closed.png';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ChangeEvent, EventHandler, useEffect, useState } from 'react';
import { ExceptionHandler } from 'winston';


export interface PropsProjet {
    id_projet: String,
    titre: String,
    description: String,
    compte_id_proprio: String, 
    est_ouvert: Boolean
    
    /* https://upmostly.com/tutorials/how-to-pass-a-function-as-a-prop-in-react */
    filtrerDemandeParIdProjet: Function
    montrerFormulaireAjoutCollaborateur: Function
}



function GestionProjetRapide(props: PropsProjet) {
    const navigate = useNavigate();
    const [estOuvert, setEstOuvert] = useState(props.est_ouvert)

    async function supprimerProjet() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user?.uid == props.compte_id_proprio) {
                // https://builtin.com/software-engineering-perspectives/react-api 
                fetch(`${process.env.REACT_APP_API_URL}/projet/delete/${props.id_projet}`, {
                    method: 'POST'
                })
                .catch(error => toast.error(JSON.stringify(error)));
            } else {
                navigate("/authenticate")
            }
        })
    }

    async function rendreProjetOuvertAuCollab() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user?.uid == props.compte_id_proprio) {
                fetch(`${process.env.REACT_APP_API_URL}/projet/open/${props.id_projet}/${!(props.est_ouvert)}`, {
                    method: 'POST',
                })
                .then(() => {
                    setEstOuvert(!estOuvert)            
                    if (!estOuvert) {
                        toast(`Projet: ${props.titre} est maintenant ouvert au demande de collaboration!`)
                    }

                })
                .catch(error => {
                    if (error) {
                        toast.error(error) 
                    } 
                });
            } else {
                navigate("/authenticate")
            }
        })
    }

    
    return (
        <> 
        
            
            <div className={styles.ligne_gestion_projet}>

                    {/* Rang/e du haut */}
                    
                        <div className={styles.conteneur_titre_projet}>
                            <p>Titre: {props.titre}</p>
                        </div>

                        <div className={styles.filtre}>
                                <button onClick={() => props.filtrerDemandeParIdProjet(props.id_projet)}>
                                        <img src={filtre} className={styles.icone} />
                                </button>           
                        </div>

                        <div className={styles.poubelle}>
                            <button onClick={supprimerProjet}>
                                <img src={poubelle} className={styles.icone} />
                            </button>
                        </div>

                        {/* Rang/e du bas */}     
                        <div className={styles.conteneur_description_projet}>
                            <p>Description: {props.description}</p>
                        </div>

                        <div className={styles.collaboration}>
                            <button onClick={() => props.montrerFormulaireAjoutCollaborateur(props.id_projet, props.compte_id_proprio)}>
                                    <img src={collaboration} className={styles.icone} />
                            </button>
                        </div>

                        <div className={styles.ouvert}>
                            <button onClick={ rendreProjetOuvertAuCollab }>
                                {estOuvert && 
                                    <img src={ouvert} className={styles.icone} alt='Ce projet est ouvert au collab.' />
                                }
                                {!estOuvert && 
                                    <img src={fermer} className={styles.icone} alt='Ce projet est ferme au collab.' />
                                }
                            </button>
                        </div>
                    
                

                
            </div>
        </>
    )
} 

export default GestionProjetRapide