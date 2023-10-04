import styles from '../styles/BlogueForm.module.css'
import { auth } from "../firebase";
import toast from 'react-hot-toast';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function BlogueForm() {
    const navigate = useNavigate();

    const [titre, setTitre] = useState('');
    const [contenu, setContenu] = useState('');
    const [nbCaracteres, setNbCaracteres] = useState(0)

    async function publierBlogue() {
        // const idToken = await auth.currentUser?.getIdToken(/* forceRefresh */ true)
        const utilisateur = auth.currentUser;
        if (utilisateur) {
            if (contenu) {
                utilisateur.getIdToken(/* forceRefresh */ true)
                    .then((idToken) => {
                        fetch('http://localhost:1111/publier-blogue', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                id_compte: utilisateur.uid,
                                titre: titre,
                                contenu: contenu,
                                firebase_id_token: idToken
                            }),
                        }).then(response => response.json())
                            .then(response => {
                                console.log(response)
                                toast.success('Votre message a été publié!');

                                navigate(`/p/${response[1][0]['id_post']}`)
                            }).catch((error) => {
                                toast.error('Une erreur est survenue');
                            })
                    })

            } else {
                toast.error('Le contenu de la publication ne peut pas être vide.')
            }
        } else {
            toast.error('Veuillez vous connecter avant de publier.');
            navigate('/');
        }

    }

    return (
        <div id={styles["conteneurBlogueForm"]} className={'global_conteneur_blogueForm'}>
            <h2 className={'global_title'}>Publication</h2>
            <div className={styles.form}>
                <input
                    id={styles["inputFieldBlogueForm"]}
                    className={'global_input_field'}
                    type="text"
                    placeholder="Titre"
                    onChange={(e) => setTitre(e.target.value)} />

               <textarea id={styles["textareaBlogueForm"]} className={'global_textarea'}
                    rows={10}
                    maxLength={4000}
                    placeholder="Exprimez-vous!"
                    value={contenu}
                    onChange={e => {
                        setContenu(e.target.value)
                        setNbCaracteres(e.target.textLength)
                    }}></textarea>
            </div>
            <div id={styles["conteneurBoutonSpan"]}>
            <span id={styles["spanBlogueForm"]}>{nbCaracteres}/4000</span>
            <button id={styles["buttonBlogueForm"]} className={'global_bouton'} onClick={() => publierBlogue()}>
                Publier
            </button>
            </div>
            
        </div>
    )
}

export default BlogueForm