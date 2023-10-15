import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styles from '../../styles/QuotePostModal.module.css'
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import BlogueForm from '../BlogueForm';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router';
import { GrFormClose } from 'react-icons/gr'


interface Props {
    isModalOpen: boolean;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;

    quotedPostId: string;
}

function QuotePostModal(props: Props) {
    const navigate = useNavigate();

    const [shouldModalBeDisplayed, setShouldModalBeDisplayed] = useState(false)
    const [contenu, setContenu] = useState('');
    const [nbCaracteres, setNbCaracteres] = useState(0)

    useEffect(() => {
        if (props.isModalOpen) {
            openModal()
        }
    }, [props.isModalOpen])


    function openModal() {
        setShouldModalBeDisplayed(true)
    }

    function afterOpenModal() {
        // toast.success("hello")
    }

    function closeModal() {
        setShouldModalBeDisplayed(false)
        props.setIsModalOpen(false)
    }

    async function publierBlogue() {
        // const idToken = await auth.currentUser?.getIdToken(/* forceRefresh */ true)
        const utilisateur = auth.currentUser;
        if (utilisateur) {
            if (contenu) {
                utilisateur.getIdToken(/* forceRefresh */ true)
                    .then((idToken) => {
                        fetch(process.env.REACT_APP_API_URL + '/publier-blogue', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                id_compte: utilisateur.uid,
                                contenu: contenu,
                                quoted_post_id: props.quotedPostId,
                                firebase_id_token: idToken
                            }),
                        }).then(response => response.json())
                            .then(response => {
                                console.log(response)
                                toast.success('Votre message a été publié!');

                                navigate(`/p/${response[2][0]['id_post']}`)
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
        <AnimatePresence> {shouldModalBeDisplayed &&
            <motion.div
                className={styles.window}
                initial={{ backdropFilter: 'blur(0)' }}
                animate={{ backdropFilter: 'blur(4px) saturate(50%) brightness(50%)' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15, ease: 'circOut' }}>
                <motion.div
                    className={styles.modal}
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{
                        scale: 1,
                        opacity: 1,
                        transition: { duration: 0.4, ease: "circOut", opacity: { duration: 0.2 } }
                    }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.15, ease: "linear" }
                    }}>

                    <button className={styles.bouton_fermer} onClick={closeModal}><GrFormClose className={styles.bouton_fermer_icone}/></button>


                    <div className={styles.conteneur}>
                        <h2 className={styles.titre}>Publication</h2>
                        <div className={styles.form}>


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
                </motion.div>
            </motion.div>
        } </AnimatePresence>
    );
}

export default QuotePostModal;