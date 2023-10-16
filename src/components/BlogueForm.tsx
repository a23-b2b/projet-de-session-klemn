import styles from '../styles/PostsForm.module.css'
import { auth } from "../firebase";
import toast from 'react-hot-toast';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'

function BlogueForm() {
    const navigate = useNavigate();

    const [titre, setTitre] = useState('');
    const [contenu, setContenu] = useState('');
    const [nbCaracteres, setNbCaracteres] = useState(0)
    // Hook pour le type de post
    const [type, setType] = useState('blogue');
    const [hidden, setHidden] = useState(true);
    const [urlGit, setUrlGit] = useState("");

    const changerType = (event: any) => {
        setType(event.target.value);

        if (event.target.value == 'collab') {
            setHidden(true)
        } else {
            setHidden(false)
        }
    };

    async function publierBlogue() {
        // const idToken = await auth.currentUser?.getIdToken(/* forceRefresh */ true)
        const utilisateur = auth.currentUser;
        if (utilisateur) {
            if (contenu) {
                utilisateur.getIdToken(/* forceRefresh */ true)
                    .then((idToken) => {
                        fetch(`${process.env.REACT_APP_API_URL}/publier-blogue/${type}`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                id_compte: utilisateur.uid,
                                titre: titre,
                                contenu: contenu,
                                urlGit: urlGit,
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
                    <ChakraProvider>
                        <Select className={'global_input_field'} variant='filled' size='sm' value={type} onChange={changerType}>
                            <option value='blogue'>Blogue</option>
                            <option value='question'>Question</option>
                            <option value='collab'>Collaboration</option>
                        </Select>
                
                    </ChakraProvider>
                    {hidden && <div >
                        <label className={'global_input_field_label'}>URL du projet GitHub</label>
                        <input
                            placeholder='https://github.com/'                                                      
                            type="text"
                            className={'global_input_field'}
                            onChange={(e) => setUrlGit(e.target.value)}/>
                    </div>}
            </div>
            <span>{nbCaracteres}/4000</span>
            <button className={'global_bouton'} onClick={() => publierBlogue()}>
                Publier
            </button>
        </div>
    )
}

export default BlogueForm