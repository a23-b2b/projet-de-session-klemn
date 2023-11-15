import styles from '../styles/GestionCollab.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {useParams} from "react-router";
import {auth} from "../firebase";
import {response} from "express";



function ModifProjetForm() {
    const navigate = useNavigate();

    let { projetId } = useParams();

    const [titre_projet, set_titre_projet] = useState("")
    const [description_projet, set_description_projet] = useState("")
    const [url_repo_git, set_url_repo_git] = useState("")

    const [est_ouvert, set_est_ouvert] = useState(false)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                fetch(`${process.env.REACT_APP_API_URL}/projet/${projetId}`, {
                    method: 'GET'
                }).then(response => response.json())
                    .then(response => {
                        const data = response[0];
                        if (data.compte_id_proprio != user.uid) {
                            toast.error('Vous n\'êtes pas le propriétaire de ce projet');
                            navigate('/');
                        }
                        set_titre_projet(data.titre_projet);
                        set_description_projet(data.description_projet);
                        set_url_repo_git(data.url_repo_git);
                        set_est_ouvert(data.est_ouvert);
                    })
            } else {
                navigate('/authenticate')
            }
        })
    }, [projetId])


    // async function creerProjet() {
    //     const auth = getAuth();
    //     onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             const uid = user.uid
    //             user.getIdToken(/* forceRefresh */ true).then((idToken) => {
    //                 fetch(`${process.env.REACT_APP_API_URL}/projet/add`, {
    //                     method: 'POST',
    //                     headers: {
    //                         'Content-Type': 'application/json',
    //                         'authorization': idToken
    //                     },
    //                     body: JSON.stringify({
    //                         titre_projet: titre_projet,
    //                         description_projet: description_projet,
    //                         url_repo_git: url_repo_git,
    //                         compte_id_proprio: uid
    //                     })
    //                 })
    //                 navigate("/gestion")
    //             }).then(() => {
    //                 toast("Projet publier")
    //             }).catch((error) => {
    //                 toast(error.toString())
    //                 toast.error('Une erreur est survenue');
    //             })
    //
    //         } else {
    //             navigate("/authenticate")
    //         }
    //     })
    // }

    return (
        <>
            <div className={styles.conteneurCreerProjet}>

                <div>
                    <p id={styles["titre"]} className={'global_title'}>Modifier un projet</p>
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
                               type="checkbox" checked={est_ouvert} />
                    </div>
                    <div className={styles.labelRadioBouton}>
                        <label>J'autorise les utilisateurs de KLEMN à m'envoyer des demandes de collaboration.</label>
                    </div>




                </div>


                <div className={styles.conteneurBoutons}>
                    <button className={'global_bouton'} onClick={() => {}}>Sauvegarder les changements</button>

                </div>



            </div>
        </>
    )


}

export default ModifProjetForm
