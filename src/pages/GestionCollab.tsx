import styles from '../styles/GestionCollab.module.css';
import GestionDemandeCollab, { PropDemandeCollab } from '../components/GestionDemandeCollab'
import GestionProjetRapide from '../components/GestionProjetRapide'
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { auth } from '../firebase';
import { RxCross2 } from 'react-icons/rx';
import { RiAddCircleLine } from 'react-icons/ri';

export const METHODE = {
    EMAIL: "1",
    ID: "2",
    USERNAME: "3"
}

const METHODE_AFFICHAGE = {
    EMAIL: "Courriel",
    ID: "ID",
    USERNAME: "Nom d'Utilisateur",
    NONE: "Définissez une méthode d'addition de collaborateur"
}

function GestionCollab() {
    const navigate = useNavigate();
    const [demandesCollab, setDemandesCollab] = useState<any[]>([])
    const [projets, setProjets] = useState<any[]>([])
    const [idProjetFiltre, setIdProjetFiltre] = useState("")
    const [methode, setMethode] = useState("1")
    const [affichageMethode, setaffichageMethode] = useState("")
    const [afficherForm, setAfficherForm] = useState(false)
    const [informationIdentifianteCollaborateur, setInformationIdentifianteCollaborateur] = useState(METHODE_AFFICHAGE.NONE)
    const [idProjet, setIdProjet] = useState("")
    const [idProprio, setIdProprio] = useState("")


    // https://builtin.com/software-engineering-perspectives/react-api 
    useEffect(() => {
        getDemandeCollab()
        getProjets()
    }, []);

    const filtrer = (idProjet: String) => {
        setIdProjetFiltre(idProjet.toString())
    }

    function montrerFormulaireAjoutCollaborateur(idProjet: String, idProprio: String) {
        setAfficherForm(!afficherForm)
        setIdProjet(idProjet.toString())
        setIdProprio(idProprio.toString())
    }

    async function ajouterCollab() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user?.uid === idProprio) {
                {/* Nous utilison le meme code de serveur que pour la reponse au demande de collab, id_demande_collab donne le context*/ }
                user.getIdToken(/* forceRefresh */ true).then((idToken) => {
                    fetch(`${process.env.REACT_APP_API_URL}/collab/p/${idProjet}/${informationIdentifianteCollaborateur}/true`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': idToken
                        },
                        body: JSON.stringify({
                            id_demande_collab: null,
                            methode: methode
                        })
                    })
                }).catch(error => {
                    if (error) {
                        toast.error(error)
                    }
                });
            } else {
                navigate("/authenticate")
            }
        })
    }

    /*Set Theme on Refresh*/
    let hueLS = parseInt(window.localStorage.getItem('hue') || "");
    let saturationLS = parseInt(window.localStorage.getItem('saturation') || "");
     
    function changeTheme(hue: number, saturation: number) {
        document.documentElement.style.setProperty('--base_h', hue.toString())
        document.documentElement.style.setProperty('--base_s', saturation.toString() + "%")

    }

    useEffect(() => {
        if (localStorage.getItem("hue") === null || localStorage.getItem("saturation") === null ) {
            changeTheme(270, 30);
        } else {
            changeTheme(hueLS, saturationLS);
        }
      }, []);

    return (
        <>
            <div>

            </div>

            {afficherForm && <div id={styles["coteneurAjoutCollaborateur"]} className={'global_container_3'}>
                <form className={styles.form}>

                    <div className={styles.conteneurBoutonX}>
                        <button onClick={() => { setAfficherForm(!afficherForm) }}>
                            <RxCross2 size={20} className={styles.icone} />
                        </button>
                    </div>

                    <div>
                        <p id={styles["titre"]} className={'global_title'}>
                            Projet ID: {idProjet}
                        </p>
                    </div>


                    {/*dropdown*/}

                    <div className={styles.conteneurInputDropdown}>

                        <div className={styles.conteneurDropdown}>
                            <select id={styles["selectDropdown"]} className={'global_input_field'} value={methode} onChange={e => { modifierMethodeAjoutCollaborateur(e.target.value) }}>
                                <option value={METHODE.EMAIL} >Email</option>
                                <option value={METHODE.ID}>ID</option>
                                <option value={METHODE.USERNAME}>Nom Utilisateur</option>
                            </select>

                        </div>


                        <div className={styles.conteneurInput}>
                            {/*<label className={'global_input_field_label'} >
                            {affichageMethode}
                        </label>*/}

                            <input className={'global_input_field'}
                                name={`Entrez l'identification correspondant a votre methode d'ajout.`}
                                id={styles["input"]}
                                type="text"
                                placeholder="Email / Id / Nom d'utilisateur"
                                onChange={(e) => setInformationIdentifianteCollaborateur(e.target.value)} />
                        </div>
                    </div>



                    <div className={styles.conteneurBoutons}>
                        <div>
                            <button className={'global_bouton'} onClick={() => ajouterCollab()}>Ajouter le collaborateur</button>
                        </div>

                    </div>

                </form>

            </div>}


            <div >


                <div className={styles.conteneur_gestion}>


                    <div className={styles.conteneur_gestion_projet}>



                        <div className={styles.titre_projet}>
                            <h1>Mes Projets - Edition Rapide</h1>
                        </div>

                        <div  className={styles.conteneurFiltreAjout}>

                            <div className={styles.conteneurFiltreId}>
                                <div className={styles.conteneurFiltreId}>
                                    <p className={styles.filtre}>ID Filtre: {idProjetFiltre}</p>
                                </div>
                            </div>
                            <div className={styles.conteneurBoutonAjouter}>
                                <Link to={`/projet`}>
                                    <button id={styles["boutonNouveauProjet"]}  >

                                        <RiAddCircleLine size={25} id={styles["iconeAjout"]} />

                                    </button>
                                </Link>
                            </div>

                        </div>





                        {projets && projets?.map(({
                            compte_id_proprio,
                            id_projet,
                            titre_projet,
                            description_projet,
                            est_ouvert
                        }) => {
                            return (<>

                                <div key={id_projet}>
                                    <GestionProjetRapide
                                        filtrerDemandeParIdProjet={filtrer}
                                        montrerFormulaireAjoutCollaborateur={montrerFormulaireAjoutCollaborateur}

                                        id_projet={id_projet}
                                        titre={titre_projet}
                                        description={description_projet}
                                        compte_id_proprio={compte_id_proprio}
                                        est_ouvert={est_ouvert}
                                    />
                                </div>
                            </>)
                        })}
                    </div>


                    <div className={styles.conteneur_gestion_collab}>
                        <div className={styles.titre_projet}>
                            <h1>Mes demandes de collaboration</h1>
                        </div>

                        {/*Faire map sur retour de demande de collab*/}
                        {demandesCollab && demandesCollab?.map(({
                            id_compte,
                            url_image_profil,
                            nom_utilisateur,
                            id_projet,
                            titre_projet,
                            description_projet,
                            id_demande_collab
                        }) => {
                            return (<>
                                <div key={id_demande_collab}>
                                    {(idProjetFiltre == "") &&

                                        <GestionDemandeCollab
                                            id_compte={id_compte}
                                            url_image_profil={url_image_profil}
                                            nom_utilisateur={nom_utilisateur}

                                            id_projet={id_projet}
                                            titre_projet={titre_projet}
                                            description_projet={description_projet}
                                            id_demande_collab={id_demande_collab}
                                        />
                                    }
                                    {(id_projet == idProjetFiltre) &&

                                        <GestionDemandeCollab
                                            id_compte={id_compte}
                                            url_image_profil={url_image_profil}
                                            nom_utilisateur={nom_utilisateur}

                                            id_projet={id_projet}
                                            titre_projet={titre_projet}
                                            description_projet={description_projet}
                                            id_demande_collab={id_demande_collab}
                                        />
                                    }
                                </div>
                            </>)
                        })}
                    </div>


                </div>
            </div>
        </>
    )

    function modifierMethodeAjoutCollaborateur(m: string) {
        setMethode(m)

        switch (m) {
            case METHODE.EMAIL:
                setaffichageMethode(METHODE_AFFICHAGE.EMAIL)
                break;
            case METHODE.ID:
                setaffichageMethode(METHODE_AFFICHAGE.ID)
                break;
            case METHODE.USERNAME:
                setaffichageMethode(METHODE_AFFICHAGE.USERNAME)
                break;
            default:
                setaffichageMethode(METHODE_AFFICHAGE.NONE)
        }
    }

    async function getProjets() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                fetch(`${process.env.REACT_APP_API_URL}/get-all-projets/${uid}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                })
                    .then(response => response.json())
                    .then(json => {
                        setProjets(json)
                    })
                    .catch(error => toast.error("Erreur"));
            } else {
                navigate("/authenticate")
            }
        })
    }


    async function getDemandeCollab() {
        onAuthStateChanged(auth, (user) => {
            if (user) {

                user.getIdToken(/* forceRefresh */ true).then((idToken) => {
                    fetch(`${process.env.REACT_APP_API_URL}/get-all-demande-collab`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': idToken
                        },

                    }).then(response => response.json()).then(json => {
                        setDemandesCollab(json)
                    }).catch(error => toast.error("Erreur"));
                })
            } else {
                navigate("/authenticate")
            }
        })
    }



}

export default GestionCollab
