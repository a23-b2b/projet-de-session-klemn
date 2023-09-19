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
        <div className={styles.conteneur}>
            <h2 className={styles.titre}>Publication</h2>
            <div className={styles.form}>
                <label className={'global_input_field_label'}>Titre</label>
                <input
                    className={'global_input_field'}
                    type="text"
                    placeholder="Titre"
                    onChange={(e) => setTitre(e.target.value)} />

                <label className={'global_input_field_label'}>Contenu</label>
                <textarea className={'global_input_field'}
                    rows={10}
                    maxLength={4000}
                    placeholder="Exprimez-vous!"
                    value={contenu}
                    onChange={e => {
                        setContenu(e.target.value)
                        setNbCaracteres(e.target.textLength)
                    }}></textarea>
            </div>
            <span>{nbCaracteres}/4000</span>
            <button className={'global_bouton'} onClick={() => publierBlogue()}>
                Publier
            </button>
        </div>
    )
}

export default BlogueForm