import styles from '../styles/PostsForm.module.css'
import { auth } from "../firebase";
import toast from 'react-hot-toast';
import { ChangeEventHandler, SetStateAction, useEffect, useState } from "react";
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
    const [IdChoixDeProjet, setIdChoixDeProjet] = useState<String>();;

    const [projets, setProjets] = useState<any[]>([]);
    const naviguate = useNavigate()

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value
        setIdChoixDeProjet(value)
    }

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
    const [urlGit, setUrlGit] = useState("");
    const [estMarkdown, setEstMarkdown] = useState(false);

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
                            type: type,
                            est_markdown: estMarkdown
                        }),
                    }).then(response => response.json()).then(response => {
                        toast.success('Votre message a été publié!');

                        navigate(`/p/${response['id_post']}`)
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

    const [isBlogueSelected, setBlogueIsSelected] = useState(true);
    const [isQuestionSelected, setQuestionIsSelected] = useState(false);
    const [isCollabSelected, setCollabIsSelected] = useState(false);

    function handleClickBlogue() {
        setBlogueIsSelected(true)
        setQuestionIsSelected(false)
        setCollabIsSelected(false)
    }

    function handleClickQuestion() {
        setBlogueIsSelected(false)
        setQuestionIsSelected(true)
        setCollabIsSelected(false)
    }

    function handleClickCollab() {
        setBlogueIsSelected(false)
        setQuestionIsSelected(false)
        setCollabIsSelected(true)
    }

    return (
        <div className={'global_container_2'} id={styles["conteneur"]}>
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
                <textarea className={'global_textarea'}
                    rows={10}
                    maxLength={4000}
                    placeholder="Exprimez-vous!"
                    value={contenu}
                    onChange={e => {
                        setContenu(e.target.value)
                        setNbCaracteres(e.target.textLength)
                    }}></textarea>

                <div className={styles.conteneurBoutons}>
                    <button className={isBlogueSelected ? 'global_selected_bouton' : 'global_unselected_bouton'} onClick={e => {
                        setType("blogue");
                        handleClickBlogue();
                    }}>Blogue</button>
                    <button id={styles["boutonQuestion"]} className={isQuestionSelected ? 'global_selected_bouton' : 'global_unselected_bouton'} onClick={e => {
                        setType("question");
                        handleClickQuestion();
                    }}>Question</button>

                    <button id={styles["boutonCollab"]} className={isCollabSelected ? 'global_selected_bouton' : 'global_unselected_bouton'} onClick={e => {
                        setType("collab");
                        handleClickCollab();
                    }}>Collaboration</button>
                </div>

                {type == "collab" && (
                    <div id={styles["ConteneurSelectURL"]}>
                        <label className={'global_label'}>Source d'URL du projet GitHub</label>
                        <select
                            id={styles["selectURL"]}
                            className={'global_input_field'}
                            onChange={e => handleChange(e)}>
                            {projets && projets?.map(({
                                id_projet,
                                titre_projet,
                                est_ouvert
                            }) => {
                                return (<>
                                    {est_ouvert &&
                                        <option value={id_projet}>{titre_projet}</option>}
                                </>)
                            })}
                        </select>
                    </div>
                )}
            </div>

            <div className={styles.conteneurDiv} id={styles["conteneurDivFooter"]}>
                <span id={styles["span"]}>{nbCaracteres}/4000</span>
                <button className={'global_selected_bouton'} onClick={() => publierBlogue()}>
                    Publier
                </button>
            </div>
        </div>
    )
}

export default BlogueForm