import styles from '../styles/PostsForm.module.css'
import { auth } from "../firebase";
import toast from 'react-hot-toast';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface CommentaireFormProps {
    idParent: string
    ajouterNouvCommentaire: (nouvCommentaire: any) => void
}

function CommentaireForm(props: CommentaireFormProps) {
    const navigate = useNavigate();

    const [contenu, setContenu] = useState('');
    const [nbCaracteres, setNbCaracteres] = useState(0)

    async function publierCommentaire() {
        // const idToken = await auth.currentUser?.getIdToken(/* forceRefresh */ true)
        const utilisateur = auth.currentUser;
        if (utilisateur) {
            if (contenu) {
                utilisateur.getIdToken(/* forceRefresh */ true)
                    .then((idToken) => {
                        fetch('http://localhost:1111/publier-commentaire', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                id_compte: utilisateur.uid,
                                id_parent: props.idParent,
                                contenu: contenu,
                                firebase_id_token: idToken
                            }),
                        }).then(response => response.json())
                            .then(response => {
                                props.ajouterNouvCommentaire(response);
                                setContenu('');
                                setNbCaracteres(0);
                                toast.success('Votre commentaire a été publié!');
                            }).catch((error) => {
                                console.log(error)
                                toast.error('Une erreur est survenue');
                            })

                    })

            } else {
                toast.error('Le contenu du commentaire ne peut pas être vide.')
            }
        } else {
            toast.error('Veuillez vous connecter avant de publier.');
            navigate('/');
        }

    }

    return (
        <div className={styles.conteneurCommentaire}>
            <div className={styles.form}>
                <textarea className={'global_input_field'}
                          rows={5}
                          maxLength={4000}
                          placeholder="Écrivez un commentaire"
                          value={contenu}
                          onChange={e => {
                              setContenu(e.target.value)
                              setNbCaracteres(e.target.textLength)
                          }}></textarea>
            </div>
            <span>{nbCaracteres}/4000</span>
            <button className={'global_bouton'} onClick={() => publierCommentaire()}>
                Publier
            </button>
        </div>
    )
}

export default CommentaireForm