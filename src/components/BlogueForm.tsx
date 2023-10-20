import styles from '../styles/PostsForm.module.css'
import { auth } from "../firebase";
import toast from 'react-hot-toast';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Divider } from '@chakra-ui/react';


function BlogueForm() {
    const navigate = useNavigate();

    const [titre, setTitre] = useState('');
    const [contenu, setContenu] = useState('');
    const [nbCaracteres, setNbCaracteres] = useState(0)
    // Hook pour le type de post
    const [type, setType] = useState('blogue');
    const [IdChoixDeProjet, setIdChoixDeProjet] = useState("");

    const [projets, setProjets] = useState<any[]>([]);
    const naviguate = useNavigate()


    useEffect(() => {
        getProjets()
    }, []);

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

    async function publierBlogue() {
        // const idToken = await auth.currentUser?.getIdToken(/* forceRefresh */ true)
        const utilisateur = auth.currentUser;
        if (utilisateur) {
            if (contenu) {
                utilisateur.getIdToken(/* forceRefresh */ true).then((idToken) => {
                    fetch(`${process.env.REACT_APP_API_URL}/post`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': idToken
                        },
                        body: JSON.stringify({
                            titre: titre,
                            contenu: contenu,
                            idProjet: IdChoixDeProjet,
                            type: type
                        }),
                    }).then(response => response.json()).then(response => {
                        console.log(response)
                        toast.success('Votre message a été publié!');

                        navigate(`/p/${response['id_post']}`)
                    }).catch((error) => {
                        console.log(error)
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
        <div className={'global_conteneur'} id={styles["conteneur"]}>
            <div className={styles.conteneurDiv}>
                <h2 className={'global_title'}>Publication</h2>
            </div>

            <div className={styles.form}>
                <input
                    className={'global_input_field'}
                    id={styles["input"]}
                    type="text"
                    placeholder="Titre"
                    onChange={(e) => setTitre(e.target.value)} />
                <textarea className={'global_input_field'}
                    id={styles["textarea"]}
                    rows={10}
                    maxLength={4000}
                    placeholder="Exprimez-vous!"
                    value={contenu}
                    onChange={e => {
                        setContenu(e.target.value)
                        setNbCaracteres(e.target.textLength)
                    }}></textarea>

                <select className={'global_input_field'} value={type} onChange={e => setType(e.target.value)}>
                    <option value='blogue'>Blogue</option>
                    <option value='question'>Question</option>
                    <option value='collab'>Collaboration</option>
                </select>

                {type === "collab" && (
                    <div >
                        <label className={'global_input_field_label'}>Source d'URL du projet GitHub</label>
                        <select                             
                            className={'global_input_field'}
                            onChange={(e) => { 
                                    setIdChoixDeProjet(e.target.value)
                                }}>
                                {projets && projets?.map(({
                                    compte_id_proprio,
                                    id_projet,
                                    titre_projet,
                                    description_projet,
                                    est_ouvert
                                }) => { return (<>                       
                                    {est_ouvert && <option key={id_projet} value={id_projet}>{titre_projet}</option>}
                                </>)
                            })}
                        </select>
                    </div>
                )}
            </div>

            <div className={styles.conteneurDiv} id={styles["conteneurDivFooter"]}>
                <span id={styles["span"]}>{nbCaracteres}/4000</span>
                <button className={'global_bouton'} onClick={() => publierBlogue()}>
                    Publier
                </button>
            </div>
        </div>
    )
}

export default BlogueForm