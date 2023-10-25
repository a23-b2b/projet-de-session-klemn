import styles from '../styles/PostsForm.module.css'
import { auth } from "../firebase";
import toast from 'react-hot-toast';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function BlogueForm() {
    const navigate = useNavigate();

    const [titre, setTitre] = useState('');
    const [contenu, setContenu] = useState('');
    const [nbCaracteres, setNbCaracteres] = useState(0)
    // Hook pour le type de post
    const [type, setType] = useState('blogue');
    const [urlGit, setUrlGit] = useState("");


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
                            urlGit: urlGit,
                            type: 1
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



                {/*
                <select className={'global_input_field'} value={type} onChange={e => setType(e.target.value)}>
                    <option value='blogue'>Blogue</option>
                    <option value='question'>Question</option>
                    <option value='collab'>Collaboration</option>
                </select>

*/}

                <div className={styles.conteneurBoutons}>
                    <button className={isBlogueSelected ? styles.boutonSelectionne : styles.boutonNonSelectionne} onClick={e => {
                        setType("blogue");
                        handleClickBlogue();
                    }}>Blogue</button>
                    <button id={styles["boutonQuestion"]} className={isQuestionSelected ? styles.boutonSelectionne : styles.boutonNonSelectionne} onClick={e => {
                        setType("question");
                        handleClickQuestion();
                    }}>Question</button>

                    <button id={styles["boutonCollab"]} className={isCollabSelected ? styles.boutonSelectionne : styles.boutonNonSelectionne} onClick={e => {
                        setType("collab");
                        handleClickCollab();
                    }}>Collaboration</button>
                </div>

                {type === "collab" && (
                    <div id={styles["divCollab"]} >
                        <label className={'global_input_field_label'}>URL du projet GitHub</label>
                        <input
                            placeholder='https://github.com/'
                            type="text"
                            className={'global_input_field'}
                            id={styles["inputCollab"]}
                            onChange={(e) => setUrlGit(e.target.value)} />
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