import styles from '../styles/GestionCollab.module.css';
import GestionDemandeCollab, { PropDemandeCollab } from '../components/GestionDemandeCollab'
import GestionProjetRapide from  '../components/GestionProjetRapide'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authPlugins } from 'mysql2';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const METHODE = {
    EMAIL: "1",
    ID: "2",
    USERNAME: "3"
}

const METHODE_AFFICHAGE = {
    query: `
    INSERT INTO projet 
        (id_projet, 
        titre_projet, 
        description_projet, 
        url_repo_git, 
        compte_id_proprio, 
        est_ouvert)
    VALUES
        (SUBSTRING(MD5(UUID()) FROM 1 FOR 12), 
        ?, 
        ?,
        ?, 
        ?, 
        ?,)
    ;`
}

function ProjetForm() {
    const navigate = useNavigate();

    // const [, ] = useState<any[]>([])

    const [titre_projet, set_titre_projet] = useState("")
    const [description_projet, set_description_projet] = useState("")
    const [url_repo_git, set_url_repo_git] = useState("")
    const [compte_id_proprio, set_compte_id_proprio] = useState("")

    const [est_ouvert, set_est_ouvert] = useState(false)

    const [formPret, setFormPret] = useState(false)

    async function creerProjet() {    
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                const nouveauProjet = {
                    titre_projet: titre_projet,
                    description_projet: description_projet,
                    url_repo_git: url_repo_git,
                    compte_id_proprio: uid
                }
                fetch(`${process.env.REACT_APP_API_URL}/get-all-projets/${uid}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(nouveauProjet)        
                })
                .catch(error => toast.error(error.toString()));
            } else {
                navigate("/authenticate")
            }
        })
    }

    return (
        <>
            <div>
                <form className={styles.form}>
                    <input onChange={e => {set_titre_projet(e.target.value)}} 
                        id={styles["input"]} className={'global_input_field'} 
                        type="text" value={titre_projet} 
                        placeholder='Titre'/>
                    <input  onChange={e => {set_description_projet(e.target.value)}}
                        id={styles["input"]} className={'global_input_field'} 
                        type="text" value={description_projet}
                        placeholder='Description' />
                    <input onChange={e => {set_url_repo_git(e.target.value)}} 
                        id={styles["input"]} className={'global_input_field'} 
                        type="text" value={url_repo_git}
                        placeholder='URL Git' />
                    {/*<input onChange={e => {set_compte_id_proprio(e.target.value)}}
                        id={styles["input"]} className={'global_input_field'} 
                        type="text" value={compte_id_proprio}
                        placeholder='Titre' />*/}

                    
                    
                    <label htmlFor={styles["input"]}>
                        J'autorise les utilisateurs de Klemn a vous envoyer des demandes de collaboration
                        <input onChange={e => {set_est_ouvert(!est_ouvert)}}
                            id={styles["input"]} className={'global_input_field'} 
                            type="radio" value={titre_projet}/>
                    </label>
                      

                    <button onClick={creerProjet} disabled={formPret} type='submit'>+++Creer le projet+++</button>
                </form>
            </div>
        </> 
    )

    
} 

export default ProjetForm
