import { Dispatch, SetStateAction, useState } from 'react';
import styles from '../../../styles/Modal.module.css'
import toast from 'react-hot-toast';
import { auth } from '../../../firebase';
import { useNavigate } from 'react-router';
import Modal from '../../../components/Modal';


interface Props {
    isModalOpen: boolean;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;

    quotedPostId: string;
}

function QuotePostModal(props: Props) {
    const navigate = useNavigate();

    const [contenu, setContenu] = useState('');
    const [nbCaracteres, setNbCaracteres] = useState(0)


    async function publierBlogue() {
        // const idToken = await auth.currentUser?.getIdToken(/* forceRefresh */ true)
        const utilisateur = auth.currentUser;
        if (utilisateur) {
            if (contenu) {
                utilisateur.getIdToken(/* forceRefresh */ true)
                    .then((idToken) => {
                        fetch(`${process.env.REACT_APP_API_URL}/post/${props.quotedPostId}/quote`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'authorization': idToken
                            },
                            body: JSON.stringify({
                                contenu: contenu
                            }),
                        }).then(response => response.json())
                            .then(response => {
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


    return (
        <Modal isModalOpen={props.isModalOpen} setIsModalOpen={props.setIsModalOpen}>
            <h2 className={'global_title'} id={styles["titre"]}>Publication</h2>
            <div className={styles.form}>
                <textarea className={'global_textarea'}
                    rows={10}
                    maxLength={4000}
                    placeholder="Exprimez-vous!"
                    value={contenu}
                    onChange={e => {
                        setContenu(e.target.value)
                        setNbCaracteres(e.target.textLength)
                    }}></textarea>
            </div>
            <div className={styles.conteneurDiv} id={styles["conteneurDivFooter"]}>

                <span id={styles["span"]}>{nbCaracteres}/4000</span>
                <button className={'global_selected_bouton'} onClick={() => publierBlogue()}>
                    Publier
                </button>
            </div>
        </Modal>

    );
}

export default QuotePostModal;