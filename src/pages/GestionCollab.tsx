import styles from '../styles/GestionCollab.module.css';
import GestionDemandeCollab, { PropDemandeCollab } from '../components/GestionDemandeCollab'
import GestionProjetRapide from  '../components/GestionProjetRapide'
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const METHODE = {
    EMAIL: "1",
    ID: "2",
    USERNAME: "3"
}

const METHODE_AFFICHAGE = {
    EMAIL:"Courriel",
    ID:"ID",
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
            if (user?.uid == idProprio) {
                {/* Nous utilison le meme code de serveur que pour la reponse au demande de collab, id_demande_collab donne le context*/}
                fetch(`${process.env.REACT_APP_API_URL}/collab/p/${idProjet}/${informationIdentifianteCollaborateur}/true`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id_demande_collab: null
                    })
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
        {afficherForm && <div className={styles.overlay}>
                <form className={styles.form}>
                    <div>
                
                        <label className={'global_input_field_label'} > 
                            {affichageMethode}
                        </label>
                        <input className={'global_input_field'}
                            name='informationIdentifiante'
                            id={styles["input"]}
                            type="text"
                            placeholder="affichageMethode"
                            onChange={(e) => setInformationIdentifianteCollaborateur(e.target.value)} />
                    </div>
                    <div>
                        <select className={'global_input_field'} value={methode} onChange={e => {modifierMethodeAjoutCollaborateur(e.target.value)}}>
                            <option value={METHODE.EMAIL}>Email</option>
                            <option value={METHODE.ID}>ID</option>
                            <option value={METHODE.USERNAME}>Nom Utilisateur</option>
                        </select>
                    </div>
                    <button onClick={() => ajouterCollab()}>Ajouter le collaborateur au projet ID: {idProjet}</button>
                    <button onClick={() => {setAfficherForm(!afficherForm)}}>Annuler</button>
                </form>
            </div>}

        <div className={styles.conteneur_gestion}>  
            <div>
                <p>ID FILTRE: {idProjetFiltre}</p>
            </div>

            <div className={styles.conteneur_gestion_collab}>
                    <div className={styles.titre_mes_demandes}>
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
                    }) => { return (<> 
                    <div key={id_demande_collab}>
                        { (idProjetFiltre == "") &&  
                            
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
                            { ( id_projet == idProjetFiltre) &&  
                            
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

                <div className={styles.conteneur_gestion_collab}>
                    
                    <div className={styles.titre_mes_projets_rapide}>
                        <h1>Mes Projets - Edition Rapide</h1>
                    </div>
                    {projets && projets?.map(({
                        compte_id_proprio,
                        id_projet,
                        titre_projet,
                        description_projet,
                        est_ouvert
                    }) => { return (<>
                    
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
        
        const auth = getAuth();
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
                    .catch(error => toast.error(error));
            } else {
                navigate("/authenticate")
            }
        })
    }

     
    async function getDemandeCollab() {    
        
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                // https://builtin.com/software-engineering-perspectives/react-api 
                fetch(`${process.env.REACT_APP_API_URL}/get-all-demande-collab/${uid}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },                
                })
                    .then(response => response.json())
                    .then(json => { 
                        setDemandesCollab(json) 
                    })
                    .catch(error => toast.error(error));
            } else {
                navigate("/authenticate")
            }
        })
    }

    
    
} 

export default GestionCollab
