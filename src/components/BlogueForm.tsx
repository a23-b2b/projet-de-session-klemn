import styles from '../styles/BlogueForm.module.css'
import { auth } from "../firebase";
import toast from 'react-hot-toast';
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'


function BlogueForm() {
    const navigate = useNavigate();

    const [hidden, setHidden] = useState(false);

    const [titre, setTitre] = useState('');
    const [contenu, setContenu] = useState('');
    const [nbCaracteres, setNbCaracteres] = useState(0)
    const [urlGit, setUrlGit] = useState('');

    // Hook pour le type de post
    const [type, setType] = useState('blogue');

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
                        var bodyUrlGit;

                        if (urlGit.trim() == '') {
                            bodyUrlGit = null;
                        } else {
                            bodyUrlGit = urlGit;
                        }

                        fetch(`http://localhost:1111/publier/${type}`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ 
                                id_compte: utilisateur.uid,
                                titre: titre,
                                contenu: contenu,
                                firebase_id_token: idToken,
                                urlGit: bodyUrlGit
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
        
    
        <ChakraProvider>
            <div className={styles.conteneur}>
                <h2 className={styles.titre}>Publication</h2>
                <div className={styles.form}>
                {hidden && <div >
                        <label className={'global_input_field_label'}>URL du projet GitHub</label>
                        <input
                            placeholder='https://github.com/'                                                      
                            type="text"
                            className={'global_input_field'}
                            onChange={(e) => setUrlGit(e.target.value)}/>
                    </div>}
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
                                
                {/*Selection du type de post a générer lors de la publication*/}                

                <label className={'global_input_field_label'}>
                    <Select className={'global_input_field'} variant='filled' size='sm' value={type} onChange={changerType}>
                        <option value='blogue'>Blogue</option>
                        <option value='question'>Question</option>
                        <option value='collab'>Collaboration</option>
                    </Select>
                </label>
                <button className={'global_bouton'} onClick={() => publierBlogue()}>
                    Publier
                </button>
            </div>
        </ChakraProvider>
    )
}

export default BlogueForm