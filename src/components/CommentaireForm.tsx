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
        const utilisateur = auth.currentUser;
        if (utilisateur) {
            if (contenu) {
                utilisateur.getIdToken(/* forceRefresh */ true).then((idToken) => {
                    fetch(`${process.env.REACT_APP_API_URL}/post/${props.idParent}/replies`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': idToken
                        },
                        body: JSON.stringify({
                            id_parent: props.idParent,
                            contenu: contenu,
                        }),
                    }).then(response => response.json()).then(response => {
                        props.ajouterNouvCommentaire(response);
                        setContenu('');
                        setNbCaracteres(0);
                        toast.success('Votre commentaire a été publié!');
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
        <div className={'global_container_2'} id={styles["conteneur_commentaire"]}>
            <div className={styles.form}>
                <textarea className={'global_textarea'}
                id={styles["textarea"]}
                    rows={5}
                    maxLength={4000}
                    placeholder="Écrivez un commentaire"
                    value={contenu}
                    onChange={e => {
                        setContenu(e.target.value)
                        setNbCaracteres(e.target.textLength)
                    }}></textarea>
            </div>


            <div className={styles.conteneurDiv} id={styles["conteneurDivFooter"]}>
                <span id={styles["span"]}>{nbCaracteres}/4000</span>
                <button className={'global_selected_bouton'} onClick={() => publierCommentaire()}>
                    Publier
                </button>
            </div>
        </div>
    )
}

export default CommentaireForm