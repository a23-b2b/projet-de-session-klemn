import styles from '../styles/GestionCollab.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {auth} from "../firebase";



function ProjetForm() {
    const navigate = useNavigate();

    // const [, ] = useState<any[]>([])

    const [titre_projet, set_titre_projet] = useState("")
    const [description_projet, set_description_projet] = useState("")
    const [url_repo_git, set_url_repo_git] = useState("")

    const [est_ouvert, set_est_ouvert] = useState(false)


    const creerProjet = () => {
        const user = auth.currentUser
        if (user) {
            user.getIdToken(/* forceRefresh */ true).then((idToken) => {
                fetch(`${process.env.REACT_APP_API_URL}/projet/add`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': idToken
                    },
                    body: JSON.stringify({
                        titre_projet: titre_projet,
                        description_projet: description_projet,
                        url_repo_git: url_repo_git,
                        est_ouvert: est_ouvert
                    })
                }).then(response => {
                    if (response.ok) {
                        toast.success("Projet modifié")
                        navigate('/gestion');
                    } else {
                        toast.error('Une erreur est survenue');
                    }
                }).catch((error) => {
                    toast(error.toString())
                    toast.error('Une erreur est survenue');
                })
            })

        } else {
            navigate("/authenticate")
        }

    }

    return (
        <>
            <div id={styles["conteneurCreerProjet"]} className={'global_container_1'}>

                <div>
                    <p id={styles["titre"]} className={'global_title'}>Créér un nouveau projet</p>
                </div>
                <input onChange={e => { set_titre_projet(e.target.value) }}
                    id={styles["input"]} className={'global_input_field'}
                    type="text" value={titre_projet}
                    placeholder='Titre' />
                <input onChange={e => { set_description_projet(e.target.value) }}
                    id={styles["input"]} className={'global_input_field'}
                    type="text" value={description_projet}
                    placeholder='Description' />
                <input onChange={e => { set_url_repo_git(e.target.value) }}
                    id={styles["input"]} className={'global_input_field'}
                    type="text" value={url_repo_git}
                    placeholder='URL Git' />
                {/*<input onChange={e => {set_compte_id_proprio(e.target.value)}}
                        id={styles["input"]} className={'global_input_field'} 
                        type="text" value={compte_id_proprio}
                        placeholder='Titre' />*/}


                <div className={styles.conteneurRadioBouton}>
                    <div  className={styles.radioBouton}>
                        <input onChange={() => { set_est_ouvert(!est_ouvert) }}
                            id={styles["radioBouton"]}
                            className={'global_input_field'}
                            type="checkbox" />
                    </div>
                    <div className={styles.labelRadioBouton}>
                        <label>J'autorise les utilisateurs de KLEMN à m'envoyer des demandes de collaboration.</label>
                    </div>




                </div>


                <div className={styles.conteneurBoutons}>
                    <button className={'global_selected_bouton'} onClick={creerProjet}>Créer le projet</button>

                </div>



            </div>
        </>
    )


}

export default ProjetForm
