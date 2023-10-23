import styles from '../styles/GestionCollab.module.css';
import GestionDemandeCollab, { PropDemandeCollab } from '../components/GestionDemandeCollab'
import GestionProjetRapide from  '../components/GestionProjetRapide'
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function GestionCollab() {
    const navigate = useNavigate();

    // get demande de collab
    const [demandesCollab, setDemandesCollab] = useState<any[]>([])
    const [projets, setProjets] = useState<any[]>([])
    const [idProjetFiltre, setIdProjetFiltre] = useState("")
    
    // https://builtin.com/software-engineering-perspectives/react-api 
    useEffect(() => {
        getDemandeCollab()
    }, []);

    useEffect(() => {
        getProjets()
    }, []);

    const filtrer = (idProjet: String) => { 
        setDemandesCollab((demandesCollab: any[]) => demandesCollab.filter((demandeCollab: PropDemandeCollab) => demandeCollab.id_projet == idProjet))
    }

    return (
        <> 
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
                        <GestionProjetRapide filtrerDemandeParIdProjet={filtrer}
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
