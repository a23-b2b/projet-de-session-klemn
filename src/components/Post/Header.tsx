import { Link, useNavigate } from 'react-router-dom';
import styles from '../../styles/Post.module.css'
import { Tooltip } from "@chakra-ui/react"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import BadgesContainer from '../Badges/_BadgesContainer';
import { Menu, MenuItem } from "@szhsin/react-menu";
import { SlOptionsVertical } from "react-icons/sl";
import { MdDeleteForever, MdEdit, MdHistoryEdu } from "react-icons/md";
import { FaEdit, FaCrown } from "react-icons/fa";
import toast from "react-hot-toast";
import { SetStateAction, useState } from 'react';
import Modal from '../Modal';
import Timestamp from '../Timestamp';
import modalStyles from '../../styles/Modal.module.css'
import Chargement from '../EcranChargement';

interface HeaderProps {
    date: string;
    idPost: string;
    idCompte: string;
    nomAffichage: string;
    nomUtilisateur: string;
    urlImageProfil: string;
    isDeleted: boolean;
    estModifie: Boolean;
    contenu: string;

    // Est un commentaire sur un post question qui nous appartient et qui n'est pas encore resolu
    meilleureReponseMayBeSet?: boolean;
    idQuestion?: string;
}

const PostHeader = (props: HeaderProps) => {
    const auth = getAuth();
    const navigate = useNavigate();
    const user = auth.currentUser;


    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [contenu, setContenu] = useState(props.contenu);
    const [nbCaracteres, setNbCaracteres] = useState(0)

    const [isEditHistoryModalOpen, setIsEditHistoryModalOpen] = useState(false);
    const [editHistory, setEditHistory] = useState<any[]>([])

    const estProprietaire = auth.currentUser ? auth.currentUser.uid === props.idCompte : false


    console.log(props.urlImageProfil)

    function handleOptionsItemClick(item: string) {
        // Ce switch permettrait d'implémenter plus d'options dans le futur
        switch (item) {
            case 'delete':
                handleDeletePost()
                break;
            case 'edit':
                setIsEditModalOpen(true);
                // setContenu(props.idPost);
                break;
            case 'edit_history':
                handleGetEditHistory()
                setIsEditHistoryModalOpen(true);
                break;
            case 'set_best':
                setIsBest()
                break;
            default:
                break;
        }
    }

    function setIsBest() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                user.getIdToken(true).then((idToken) => {
                    fetch(`${process.env.REACT_APP_API_URL}/question/${props.idQuestion}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            authorization: idToken
                        },
                        body: JSON.stringify({
                            id_reply: props.idPost
                        })
                    }).then(response => {
                        console.log(JSON.stringify(response))
                    }).catch((error) => {
                        console.log(error.toString())
                    })
                })
            } else {
                navigate("/authenticate")
            }
        });
    }

    function handleDeletePost() {
        const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce post ?");

        if (confirmDelete) {
            const utilisateur = auth.currentUser;
            if (utilisateur) {
                utilisateur.getIdToken(/* forceRefresh */ true)
                    .then((idToken) => {
                        fetch(`${process.env.REACT_APP_API_URL}/post/${props.idPost}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                'authorization': idToken
                            },
                        }).then(response => response.json())
                            .then(response => {
                                toast.success('La publication à été supprimée!');
                            }).catch(() => {
                                toast.error('Une erreur est survenue');
                            })
                    }).catch((error) => {
                        toast.error('Une erreur est survenue');
                    })
            }
        }
    }

    function handleEditPost() {
        if (contenu === props.contenu) {
            setIsEditModalOpen(false);
            return '';
        }

        const utilisateur = auth.currentUser;
        if (utilisateur) {
            if (contenu) {
                utilisateur.getIdToken(/* forceRefresh */ true)
                    .then((idToken) => {
                        fetch(`${process.env.REACT_APP_API_URL}/post/${props.idPost}/edit`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'authorization': idToken
                            },
                            body: JSON.stringify({
                                new_content: contenu
                            }),
                        }).then(response => response.json())
                            .then(response => {
                                toast.success('Votre message a été modifié!');
                                navigate(`/p/${props.idPost}`)
                            }).catch((error) => {
                                toast.error('Une erreur est survenue');
                            })

                        setIsEditModalOpen(false);
                    })

            } else {
                toast.error('Le contenu de la publication ne peut pas être vide.')
            }
        } else {
            toast.error('Veuillez vous connecter avant de publier.');
            navigate('/');
        }
    }

    function handleGetEditHistory() {
        const utilisateur = auth.currentUser;
        if (utilisateur) {
            if (contenu) {
                utilisateur.getIdToken(/* forceRefresh */ true)
                    .then((idToken) => {
                        fetch(`${process.env.REACT_APP_API_URL}/post/${props.idPost}/edit/history`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'authorization': idToken
                            }
                        }).then(response => response.json())
                            .then(response => {
                                setEditHistory(response)
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
        <div className={styles.header}>

            <div className={styles.grid_container}>

                {!props.isDeleted && (
                    <div className={styles.grid_item} id={styles.infos_utilisateur}>
                        <Link to={`/u/${props.nomUtilisateur}`}>
                            <img className={styles.image_profil} src={props.urlImageProfil} />
                        </Link>

                        <div id={styles["inner_droit_nom_utilisateur"]}>
                            <Link to={`/u/${props.nomUtilisateur}`} className={styles.user_info}>
                                <p className={styles.display_name}>{props.nomAffichage}</p>
                                {/* <BadgesContainer badgesInt={15}/> */}
                                <p className={styles.username}>@{props.nomUtilisateur}</p>
                            </Link>
                        </div>
                    </div>
                )}

                {props.isDeleted && (
                    <div className={styles.grid_item} id={styles.infos_utilisateur}>
                        <img className={styles.image_profil} src={props.urlImageProfil} />
                        <div id={styles["inner_droit_nom_utilisateur"]}>
                            <div className={styles.user_info}>
                                <p className={styles.display_name}>{props.nomAffichage}</p>
                                {/* <BadgesContainer badgesInt={15}/> */}
                                <p className={styles.username}>@{props.nomUtilisateur}</p>
                            </div>
                        </div>
                    </div>
                )}

                <div>
                    {props.estModifie ? <p style={{ marginRight: "8px" }}><MdEdit /></p> : ''}
                </div>

                <div className={styles.grid_item}>
                    <p className={styles.date}>
                        <Timestamp date={props.date} />
                    </p>
                </div>

                {!props.isDeleted && (
                    <div className={styles.grid_item}>
                        <Menu menuButton={
                            <div className={styles.bouton_interraction} id={styles.bouton_interraction_options}>
                                <SlOptionsVertical className={styles.icone} id={styles.icone_options} />
                            </div>
                        }
                            transition={true}
                            menuClassName={styles.share_menu}
                            onItemClick={(e) => handleOptionsItemClick(e.value)}>

                            {props.meilleureReponseMayBeSet &&
                                <>
                                    <MenuItem value={'set_best'} className={styles.share_menu_item}>
                                        <FaCrown
                                            className={styles.share_menu_icon} />
                                        <span>Set comme meilleure réponse</span>
                                    </MenuItem>
                                </>
                            }

                            {estProprietaire && (
                                <>
                                    <MenuItem value={'delete'} className={styles.share_menu_item}>
                                        <MdDeleteForever
                                            className={styles.share_menu_icon}
                                            id={styles.icone_supprimer} />
                                        <span>Supprimer</span>
                                    </MenuItem>

                                    <MenuItem value={'edit'} className={styles.share_menu_item}>
                                        <FaEdit className={styles.share_menu_icon} />
                                        <span>Modifier</span>
                                    </MenuItem>
                                </>
                            )}

                            {props.estModifie ? (
                                <MenuItem value={'edit_history'} className={styles.share_menu_item}>
                                    <MdHistoryEdu className={styles.share_menu_icon} />
                                    <span>Modifications</span>
                                </MenuItem>
                            ) : ''}
                            <MenuItem className={styles.share_menu_item}><span>Rien</span></MenuItem>

                        </Menu>
                    </div>
                )}

            </div>


            <Modal isModalOpen={isEditModalOpen} setIsModalOpen={setIsEditModalOpen}>
                <div className={styles.conteneur}>
                    <h2 className={styles.titre}>Publication</h2>
                    <div className={styles.form}>
                        <textarea
                            className={'global_textarea'}
                            rows={10}
                            maxLength={4000}
                            placeholder="Exprimez-vous!"
                            value={contenu}
                            onChange={e => {
                                setContenu(e.target.value)
                                setNbCaracteres(e.target.textLength)
                            }} />
                    </div>

                    <div className={modalStyles.conteneurDiv} id={modalStyles["conteneurDivFooter"]}>
                        <span id={modalStyles["span"]}>{nbCaracteres}/4000</span>
                        <button className={'global_selected_bouton'} onClick={() => handleEditPost()}>
                            Publier
                        </button>
                    </div>

                </div>
            </Modal>

            <Modal isModalOpen={isEditHistoryModalOpen} setIsModalOpen={setIsEditHistoryModalOpen}>
                <div className={styles.conteneur}>
                    <h2 className={styles.titre}>Historique de modifications</h2>
                    <p style={{ marginTop: "-16px" }}>Récent ➝ ancien</p>
                    {!editHistory ? <Chargement /> :
                        <div className={styles.edit_history_container}>
                            {editHistory.map(version => {
                                return (
                                    <div className={styles.edit_history_item}>
                                        {version.ancien_contenu}
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>
            </Modal>
        </div>
    )
}

export default PostHeader;


