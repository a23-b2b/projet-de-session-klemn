import styles from '../styles/GestionProjetRapide.module.css';
import filtre from '../images/icn-filter.png';
import poubelle from '../images/icn-delete.png';
import ouvert from '../images/icn-open.png';
import collaboration from '../images/icn-collaboration.png';
import fermer from '../images/icn-closed.png';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {Link, useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import { ChangeEvent, EventHandler, useEffect, useState } from 'react';
import { ExceptionHandler } from 'winston';
import METHODE from '../pages/GestionCollab'
import { RiTeamLine } from 'react-icons/ri';
import { HiLockOpen } from 'react-icons/hi';
import { HiLockClosed } from 'react-icons/hi';
import { HiFunnel } from 'react-icons/hi2';
import { GoTrash } from 'react-icons/go';
import {Tooltip} from "@chakra-ui/react";
import {VscEdit} from "react-icons/vsc";




export interface PropsProjet {
    id_projet: String,
    titre: String,
    description: String,
    url_repo_git: String,
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
                user.getIdToken(/* forceRefresh */ true).then((idToken) => {
                    fetch(`${process.env.REACT_APP_API_URL}/projet/delete/${props.id_projet}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': idToken
                        }
                    })
                }).catch(error => toast.error(JSON.stringify(error)));
            } else {
                navigate("/authenticate")
            }
        })
    }

    async function rendreProjetOuvertAuCollab() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user?.uid == props.compte_id_proprio) {
                user.getIdToken(/* forceRefresh */ true).then((idToken) => {
                    fetch(`${process.env.REACT_APP_API_URL}/projet/open/${props.id_projet}/${!estOuvert}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': idToken
                        }
                    })
                        .then(() => {
                            if (!estOuvert) {
                                toast(`Projet: ${props.titre} est maintenant ouvert au demande de collaboration!`)
                            }
                            setEstOuvert(!estOuvert)
                        })
                        .catch(error => {
                            if (error) {
                                toast.error(error)
                            }
                        });
                })
            } else {
                navigate("/authenticate")
            }
        })
    }


    return (



        <div className={styles.conteneur_gestion_rapide}>



            {/* Rang/e du haut */}

            <div className={styles.conteneur_info_projet}>
                <p className={styles.titre_projet}>Titre: {props.titre}</p>
                <p className={styles.description_projet}>Description: {props.description}</p>
                <p className={styles.description_projet}>URL Git: {props.url_repo_git.trim() ? props.url_repo_git : "Aucun dépôt associé"}</p>
            </div>

            <div className={styles.conteneur_action_projet}>


                <div className={styles.ligne1}>
                    <Tooltip className={styles.tooltip} label={"Ajouter Collaborateur"} placement={"top"}>
                        <div className={styles.conteneurIcone}>
                            <button onClick={() => props.montrerFormulaireAjoutCollaborateur(props.id_projet, props.compte_id_proprio)}>
                                <RiTeamLine size={50} className={styles.icone} />
                            </button>
                        </div>
                    </Tooltip>

                    <div className={styles.conteneurIcone}>

                        <Tooltip className={styles.tooltip} label={estOuvert ? "Verrouiller" : "Déverrouiller"} placement={"top"}>
                            <button onClick={rendreProjetOuvertAuCollab}>

                                {Boolean(estOuvert) && <HiLockOpen size={55} className={styles.icone} />}

                                {Boolean(!estOuvert) && <HiLockClosed size={55} className={styles.icone} />}

                            </button>
                        </Tooltip>
                    </div>

                </div>


                <div className={styles.ligne2}>
                    <div className={styles.conteneurIcone}>
                        <Tooltip className={styles.tooltip} label={"Modifier"} placement={"bottom"}>
                            <Link to={`/projet/${props.id_projet}`}>
                                <button>
                                    <VscEdit size={50} className={styles.icone} />
                                </button>
                            </Link>
                        </Tooltip>
                    </div>
                    <div className={styles.conteneurIcone}>
                        <Tooltip className={styles.tooltip} label={"Supprimer"} placement={"bottom"}>
                            <button onClick={supprimerProjet}>
                                <GoTrash size={55} className={styles.icone} />
                            </button>
                        </Tooltip>

                    </div>


                </div>

            </div>

        </div>

    )
}

export default GestionProjetRapide