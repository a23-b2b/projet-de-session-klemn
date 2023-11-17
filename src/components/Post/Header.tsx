import { Link, useNavigate } from 'react-router-dom';
import styles from '../../styles/Post.module.css'
import { Tooltip } from "@chakra-ui/react"
import { getAuth } from "firebase/auth";
import BadgesContainer from '../Badges/_BadgesContainer';
import { Menu, MenuItem } from "@szhsin/react-menu";
import { SlOptionsVertical } from "react-icons/sl";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import { useState } from 'react';
import Modal from '../Modal';

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
}


const UNE_MINUTE_EN_SECONDES = 60
const UNE_HEURE_EN_SECONDES = 3600
const UN_JOUR_EN_SECONDES = 86400
const DEUX_SEMAINES_EN_SECONDES = 1209600


const PostHeader = (props: HeaderProps) => {
    const auth = getAuth();
    const navigate = useNavigate();
    const user = auth.currentUser;

    const datePost = new Date(props.date)
    const datePostUTC = new Date(Date.UTC(datePost.getUTCFullYear(), datePost.getUTCMonth(), datePost.getUTCDate(), datePost.getUTCHours() - datePost.getTimezoneOffset() / 60, datePost.getUTCMinutes(), datePost.getUTCSeconds()))
    const datePostSeconds = Math.round(datePostUTC.getTime() / 1000)

    const dateNow = new Date()
    const dateNowUTC = new Date(dateNow.toISOString())
    const dateNowSeconds = Math.round(dateNowUTC.getTime() / 1000)

    const timeDifference = dateNowSeconds - datePostSeconds

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [contenu, setContenu] = useState(props.contenu);
    const [nbCaracteres, setNbCaracteres] = useState(0)

    const formattedData = datePostUTC.toLocaleString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    })

    const estProprietaire = auth.currentUser ? auth.currentUser.uid === props.idCompte : false

    let timeStampText = ""
    // afficher en secondes
    if (timeDifference >= 0 && timeDifference < UNE_MINUTE_EN_SECONDES) {
        timeStampText = `${timeDifference}s`
    }

    // afficher en minutes
    if (timeDifference >= UNE_MINUTE_EN_SECONDES && timeDifference < UNE_HEURE_EN_SECONDES) {
        timeStampText = `${Math.round(timeDifference / 60)} min`
    }

    // afficher en heures
    if (timeDifference >= UNE_HEURE_EN_SECONDES && timeDifference < UN_JOUR_EN_SECONDES) {
        timeStampText = `${Math.round(timeDifference / 60 / 60)}h`
    }

    // afficher quand il y a 1 jour. multiplier par 1.5 pour contrer l'effet du Round
    if (timeDifference >= UN_JOUR_EN_SECONDES && timeDifference < UN_JOUR_EN_SECONDES * 1.5) {
        timeStampText = `${Math.round(timeDifference / 60 / 60 / 24)} jour`
    }

    // afficher en jours
    if (timeDifference >= UN_JOUR_EN_SECONDES * 1.5 && timeDifference < DEUX_SEMAINES_EN_SECONDES) {
        timeStampText = `${Math.round(timeDifference / 60 / 60 / 24)} jours`
    }

    // la date
    if (timeDifference >= DEUX_SEMAINES_EN_SECONDES) {
        timeStampText = datePost.toLocaleDateString()
    }

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
            default:
                break;
        }
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

    return (
        <div className={styles.header}>
            {!props.isDeleted && (
                <>
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
                </>
            )}

            {props.estModifie ? <MdEdit /> : ''}

            {props.isDeleted && (
                <>
                    <img className={styles.image_profil} src={props.urlImageProfil} />
                    <div id={styles["inner_droit_nom_utilisateur"]}>
                        <div className={styles.user_info}>
                            <p className={styles.display_name}>{props.nomAffichage}</p>
                            {/* <BadgesContainer badgesInt={15}/> */}
                            <p className={styles.username}>@{props.nomUtilisateur}</p>
                        </div>
                    </div>
                </>
            )}

            <Tooltip className={styles.tooltip} label={formattedData} placement='top'>
                <p className={styles.date}>{timeStampText}</p>
            </Tooltip>

            {!props.isDeleted && (
                <Menu menuButton={
                    <div className={styles.bouton_interraction} id={styles.bouton_interraction_options}>
                        <SlOptionsVertical className={styles.icone} id={styles.icone_options} />
                    </div>
                }
                    transition={true}
                    menuClassName={styles.share_menu}
                    onItemClick={(e) => handleOptionsItemClick(e.value)}>

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
                    <MenuItem className={styles.share_menu_item}><span>Rien</span></MenuItem>

                </Menu>
            )}

            <Modal isModalOpen={isEditModalOpen} setIsModalOpen={setIsEditModalOpen}>
                <div className={styles.conteneur}>
                    <h2 className={styles.titre}>Publication</h2>
                    <div className={styles.form}>
                        <textarea
                            className={styles.textarea}
                            rows={10}
                            maxLength={4000}
                            placeholder="Exprimez-vous!"
                            value={contenu}
                            onChange={e => {
                                setContenu(e.target.value)
                                setNbCaracteres(e.target.textLength)
                            }} />
                    </div>

                    <div className={styles.conteneurDiv} id={styles["conteneurDivFooter"]}>
                        <span id={styles["span"]}>{nbCaracteres}/4000</span>
                        <button className={'global_bouton'} onClick={() => handleEditPost()}>
                            Publier
                        </button>
                    </div>

                </div>
            </Modal>

        </div>
    )
}

export default PostHeader;